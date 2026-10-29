// Intro loader: draw the PD mark with a moving pen, reveal the logo, then lift the screen once the page has loaded.
const loader = document.querySelector(".site-loader");

if (loader && document.documentElement.classList.contains("has-loader")) {
  const root = document.documentElement;
  const paths = [...loader.querySelectorAll("path")];
  const pen = loader.querySelector(".loader-pen");
  const lengths = paths.map((path) => path.getTotalLength());
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const drawTime = 1800;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
    setTimeout(resolve, 3000);
  });

  try {
    sessionStorage.setItem("pd-intro-seen", "1");
  } catch {}

  paths.forEach((path, i) => {
    path.style.strokeDasharray = lengths[i];
    path.style.strokeDashoffset = lengths[i];
  });

  const drawn = new Promise((resolve) => {
    let start;
    function frame(now) {
      start ??= now;
      const progress = Math.min((now - start) / drawTime, 1);
      let remaining = easeInOut(progress) * total;

      paths.forEach((path, i) => {
        const length = Math.min(Math.max(remaining, 0), lengths[i]);
        path.style.strokeDashoffset = lengths[i] - length;
        if (remaining > 0 && remaining <= lengths[i]) {
          const point = path.getPointAtLength(length);
          pen.setAttribute("cx", point.x);
          pen.setAttribute("cy", point.y);
        }
        remaining -= lengths[i];
      });

      if (progress < 1) requestAnimationFrame(frame);
      else resolve();
    }
    requestAnimationFrame(frame);
  });

  drawn
    .then(() => {
      loader.classList.add("is-drawn");
      return Promise.all([pageLoaded, wait(900)]);
    })
    .then(() => {
      root.classList.remove("is-loading");
      loader.classList.add("is-leaving");
      return wait(1000);
    })
    .then(() => {
      root.classList.remove("has-loader");
      loader.remove();
    });
}

const menuBtn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  menu.inert = !open;
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
}

menuBtn.addEventListener("click", () => {
  setMenu(!menu.classList.contains("is-open"));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("is-open")) {
    setMenu(false);
    menuBtn.focus();
  }
});

menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});

// Custom cursor: a dot that tracks the mouse and a ring that trails behind it.
// Only runs on devices with a precise pointer (mouse/trackpad).
const cursor = document.querySelector(".cursor");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

if (cursor && finePointer.matches) {
  const dot = cursor.querySelector(".cursor-dot");
  const ring = cursor.querySelector(".cursor-ring");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { x: mouse.x, y: mouse.y };
  let ringScale = 1;
  let hovering = false;
  let pressed = false;

  document.body.classList.add("has-cursor");

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursor.classList.add("is-visible");
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.addEventListener("mouseover", (e) => {
    hovering = Boolean(e.target.closest("a, button"));
    cursor.classList.toggle("is-hover", hovering);
  });

  document.addEventListener("mousedown", () => { pressed = true; });
  document.addEventListener("mouseup", () => { pressed = false; });

  function render() {
    const follow = reduceMotion ? 1 : 0.18;
    const targetScale = pressed ? 0.8 : hovering ? 1.8 : 1;

    ringPos.x += (mouse.x - ringPos.x) * follow;
    ringPos.y += (mouse.y - ringPos.y) * follow;
    ringScale += (targetScale - ringScale) * (reduceMotion ? 1 : 0.2);

    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) scale(${ringScale})`;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

// Intro statements: words light up one by one as each paragraph scrolls into view.
const revealTexts = [...document.querySelectorAll("[data-reveal-words]")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealTexts.length && !prefersReducedMotion) {
  const reveals = revealTexts.map((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    const spans = words.map((word, i) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;
      el.append(span);
      if (i < words.length - 1) el.append(" ");
      return span;
    });
    return { el, spans };
  });

  let ticking = false;

  function updateReveal() {
    const vh = window.innerHeight;

    reveals.forEach(({ el, spans }) => {
      const top = el.getBoundingClientRect().top;
      // Starts when the paragraph reaches 85% down the screen, finishes at 35%.
      const progress = Math.min(Math.max((vh * 0.85 - top) / (vh * 0.5), 0), 1);
      const lit = progress * spans.length;

      spans.forEach((span, i) => {
        const amount = Math.min(Math.max(lit - i, 0), 1);
        span.style.opacity = 0.15 + amount * 0.85;
      });
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateReveal);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateReveal);
  updateReveal();
}

// Testimonials: step through the quotes with the previous/next buttons.
const testimonials = document.querySelector(".testimonials");

if (testimonials) {
  const quotes = [...testimonials.querySelectorAll(".testimonial")];
  const counter = testimonials.querySelector(".testimonials-current");
  let current = 0;

  function showQuote(next) {
    quotes[current].classList.remove("is-active");
    quotes[current].setAttribute("aria-hidden", "true");
    current = (next + quotes.length) % quotes.length;
    quotes[current].classList.add("is-active");
    quotes[current].removeAttribute("aria-hidden");
    counter.textContent = String(current + 1).padStart(2, "0");
  }

  testimonials.querySelectorAll(".testimonials-btn").forEach((btn) => {
    btn.addEventListener("click", () => showQuote(current + Number(btn.dataset.dir)));
  });
}

// Testimonies: filter the client quotes by the kind of work we did for them.
const voiceFilters = [...document.querySelectorAll(".voices-filter")];

if (voiceFilters.length) {
  const voices = [...document.querySelectorAll(".voice")];
  const voicesStatus = document.querySelector(".voices-status");

  voiceFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      let shown = 0;

      voiceFilters.forEach((other) => other.setAttribute("aria-pressed", other === btn));
      voices.forEach((voice) => {
        voice.hidden = filter !== "all" && voice.dataset.type !== filter;
        if (!voice.hidden) shown++;
      });
      voicesStatus.textContent = `Showing ${shown} of ${voices.length}`;
    });
  });
}

// Contact: copy the email address to the clipboard.
const copyBtn = document.querySelector(".contact-copy");

if (copyBtn && navigator.clipboard) {
  const status = document.querySelector(".contact-copy-status");
  let resetTimer;

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyBtn.textContent = "Copied";
      status.textContent = "Email address copied to clipboard";
    } catch {
      copyBtn.textContent = "Couldn't copy";
      status.textContent = "";
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copyBtn.textContent = "Copy";
      status.textContent = "";
    }, 2000);
  });
} else if (copyBtn) {
  copyBtn.hidden = true;
}

// Contact page: messages are delivered by EmailJS (emailjs.com), so the site needs no back end.
// Each enquiry sends two emails: a notification to the team, then a thank-you to the customer.
// Their designs and recipients (team copy to pentechdevs@gmail.com) are set in the EmailJS dashboard.
const enquiryForm = document.querySelector(".enquiry-form");

if (enquiryForm) {
  const status = enquiryForm.querySelector(".enquiry-status");
  const sendBtn = enquiryForm.querySelector(".enquiry-send");
  const sendLabel = sendBtn.innerHTML;
  const email = enquiryForm.dataset.email;
  const { serviceId, templateId, replyTemplateId, publicKey } = enquiryForm.dataset;

  const escapeHtml = (text) =>
    text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

  async function sendEmail(template, params) {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service_id: serviceId, template_id: template, user_id: publicKey, template_params: params }),
    });
    if (!response.ok) throw new Error(await response.text());
  }

  enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const name = data.get("name").trim();
    const company = data.get("company").trim();

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending…";
    status.textContent = "";

    try {
      // Bots tend to tick the hidden spam trap; act as if it sent, but don't use up the monthly quota.
      if (data.get("botcheck") !== "on") {
        const params = {
          name,
          email: data.get("email").trim(),
          company: company || "Not given",
          sender: company ? `${name} (${company})` : name,
          need: data.get("need"),
          budget: data.get("budget"),
          message_html: escapeHtml(data.get("message").trim()).replace(/\r?\n/g, "<br>"),
          received: new Date().toLocaleString("en-ZA", {
            timeZone: "Africa/Johannesburg",
            dateStyle: "full",
            timeStyle: "short",
          }),
        };

        // The team's copy is what matters, so only its failure counts as "couldn't be sent".
        await sendEmail(templateId, params);
        await sendEmail(replyTemplateId, params).catch(() => {});
      }

      enquiryForm.reset();
      status.textContent = `Thanks, ${name}. Your message is on its way and we'll be in touch within one working day.`;
    } catch {
      status.textContent = `Sorry, your message couldn't be sent. Please try again, or email us directly at ${email}.`;
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = sendLabel;
    }
  });
}

// Perspectives: each member's initial rises into place as their profile scrolls in.
const people = document.querySelectorAll(".person");

if (people.length && "IntersectionObserver" in window && !prefersReducedMotion) {
  document.documentElement.classList.add("has-reveal");

  const peopleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        peopleObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -20% 0px" });

  people.forEach((person) => peopleObserver.observe(person));
}

// Brief: tabs showing where each member would start the same brief.
const brief = document.querySelector(".brief");

if (brief) {
  const tabs = [...brief.querySelectorAll(".brief-tab")];
  const panels = [...brief.querySelectorAll(".brief-panel")];

  function selectTab(index, focus) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute("aria-selected", selected);
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => selectTab(i));

    tab.addEventListener("keydown", (e) => {
      const keys = {
        ArrowDown: i + 1,
        ArrowRight: i + 1,
        ArrowUp: i - 1,
        ArrowLeft: i - 1,
        Home: 0,
        End: tabs.length - 1,
      };
      if (!(e.key in keys)) return;
      e.preventDefault();
      selectTab((keys[e.key] + tabs.length) % tabs.length, true);
    });
  });
}

// Story: the timeline fills and each chapter lights up as you scroll past it.
const story = document.querySelector(".story-list");

if (story) {
  const chapters = [...story.querySelectorAll(".chapter")];
  let storyTicking = false;

  story.classList.add("is-tracking");

  function updateStory() {
    const mark = window.innerHeight * 0.6;
    const rect = story.getBoundingClientRect();
    const progress = Math.min(Math.max((mark - rect.top) / rect.height, 0), 1);

    story.style.setProperty("--progress", progress);
    chapters.forEach((chapter) => {
      chapter.classList.toggle("is-reached", chapter.getBoundingClientRect().top < mark);
    });
    storyTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!storyTicking) {
      requestAnimationFrame(updateStory);
      storyTicking = true;
    }
  }, { passive: true });

  window.addEventListener("resize", updateStory);
  updateStory();
}

// Package builder: live estimate from the chosen starting point, add-ons and deal.
const builder = document.querySelector(".builder-form");

if (builder) {
  const summary = document.querySelector(".summary");
  const summaryList = summary.querySelector(".summary-list");
  const subtotalEl = summary.querySelector(".summary-subtotal");
  const discountRow = summary.querySelector(".summary-discount-row");
  const discountLabel = summary.querySelector(".summary-discount-label");
  const discountEl = summary.querySelector(".summary-discount");
  const totalEl = summary.querySelector(".summary-total");
  const sendLink = summary.querySelector(".summary-send");
  const pagesInput = builder.querySelector('input[name="pages"]');
  const email = sendLink.href.slice("mailto:".length).split("?")[0];

  const formatRand = (amount) => "R" + Math.round(amount).toLocaleString("en-ZA");

  function readPages() {
    return Math.min(Math.max(Math.round(Number(pagesInput.value) || 0), 0), Number(pagesInput.max));
  }

  function updateEstimate() {
    const base = builder.querySelector('input[name="base"]:checked');
    const deal = builder.querySelector('input[name="deal"]:checked');
    const lines = [{ label: base.dataset.label, price: Number(base.dataset.price) }];

    const pages = readPages();
    if (pages > 0) {
      lines.push({ label: `${pages} extra page${pages > 1 ? "s" : ""}`, price: pages * Number(pagesInput.dataset.price) });
    }

    builder.querySelectorAll('input[name="addon"]:checked').forEach((input) => {
      lines.push({ label: input.dataset.label, price: Number(input.dataset.price) });
    });

    const subtotal = lines.reduce((sum, line) => sum + line.price, 0);
    const discount = Math.round(subtotal * Number(deal.dataset.discount));
    const total = subtotal - discount;

    summaryList.replaceChildren(...lines.map((line) => {
      const li = document.createElement("li");
      const name = document.createElement("span");
      const price = document.createElement("span");
      name.textContent = line.label;
      price.textContent = formatRand(line.price);
      li.append(name, price);
      return li;
    }));

    subtotalEl.textContent = formatRand(subtotal);
    discountRow.hidden = discount === 0;
    discountLabel.textContent = deal.dataset.label;
    discountEl.textContent = "−" + formatRand(discount);
    totalEl.textContent = formatRand(total);

    const body = [
      "Hi Pentech Devs,",
      "",
      "I'd like a quote for this package:",
      "",
      ...lines.map((line) => `- ${line.label}: ${formatRand(line.price)}`),
      "",
      `Deal: ${deal.dataset.label}`,
      `Estimated total: ${formatRand(total)}`,
    ].join("\n");
    sendLink.href = `mailto:${email}?subject=${encodeURIComponent("Custom package quote")}&body=${encodeURIComponent(body)}`;
  }

  builder.querySelectorAll("[data-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      pagesInput.value = Math.min(Math.max(readPages() + Number(btn.dataset.step), 0), Number(pagesInput.max));
      updateEstimate();
    });
  });

  pagesInput.addEventListener("change", () => {
    pagesInput.value = readPages();
  });

  // The deal cards above the builder pre-select their deal
  document.querySelectorAll("[data-pick-deal]").forEach((link) => {
    link.addEventListener("click", () => {
      const radio = builder.querySelector(`input[name="deal"][value="${link.dataset.pickDeal}"]`);
      if (radio) radio.checked = true;
      updateEstimate();
    });
  });

  builder.addEventListener("input", updateEstimate);
  builder.addEventListener("submit", (e) => e.preventDefault());
  updateEstimate();
}

// Work list: a floating photo follows the mouse while hovering a project.
const workList = document.querySelector(".work-list");
const preview = document.querySelector(".work-preview");

if (workList && preview && finePointer.matches) {
  const previewImg = preview.querySelector("img");
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let active = false;

  workList.querySelectorAll(".work-row").forEach((row) => {
    const thumb = row.querySelector(".work-thumb");
    new Image().src = thumb.src; // preload so the first hover doesn't flash

    row.addEventListener("mouseenter", (e) => {
      previewImg.src = thumb.src;
      if (!active) {
        current.x = target.x = e.clientX;
        current.y = target.y = e.clientY;
      }
      active = true;
      preview.classList.add("is-active");
    });
  });

  workList.addEventListener("mousemove", (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
  });

  workList.addEventListener("mouseleave", () => {
    active = false;
    preview.classList.remove("is-active");
  });

  function renderPreview() {
    const follow = prefersReducedMotion ? 1 : 0.12;
    current.x += (target.x - current.x) * follow;
    current.y += (target.y - current.y) * follow;
    const tilt = prefersReducedMotion ? 0 : Math.min(Math.max((target.x - current.x) * 0.06, -8), 8);

    preview.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) rotate(${tilt}deg)`;
    requestAnimationFrame(renderPreview);
  }

  requestAnimationFrame(renderPreview);
}

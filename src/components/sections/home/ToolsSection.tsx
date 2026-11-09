import { TOOL_GROUPS, TOOL_MARQUEE } from "../../../data/home";
import { pad } from "../../../lib/format";
import { Card } from "../../ui/Card";
import { Section } from "../../ui/Section";
import { SectionHead } from "../../ui/SectionHead";

export function ToolsSection() {
  return (
    <Section id="tools" aria-labelledby="tools-heading" tone="ink" flush>
      <SectionHead
        id="tools-heading"
        eyebrow="Tools we use"
        intro="The right tools in the right hands. Here's what we reach for every day."
        className="px-8 max-md:px-4"
      />

      {/* Two identical groups scroll left; the track loops after moving by one group */}
      <div aria-hidden="true" className="group/marquee my-[clamp(56px,10vh,120px)] overflow-hidden border-y border-cream/25 py-[clamp(20px,3vh,32px)]">
        <div className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-(--gap) pr-(--gap) text-[clamp(3rem,8vw,7rem)] leading-[1.1] tracking-[-0.02em] whitespace-nowrap text-cream [--gap:clamp(32px,4vw,64px)]"
            >
              {TOOL_MARQUEE.map((tool, i) => (
                <span key={tool} className="contents">
                  <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_var(--color-cream)]" : ""}>{tool}</span>
                  <span className="size-[0.14em] flex-none rounded-full bg-muted" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 px-8 max-lg:grid-cols-2 max-lg:gap-y-12 max-md:grid-cols-1 max-md:gap-y-10 max-md:px-4">
        {TOOL_GROUPS.map((group, i) => (
          <Card key={group.title} num={pad(i + 1)} title={group.title}>
            <ul>
              {group.items.map((tool) => (
                <li key={tool.name} className="group/tool flex flex-col gap-1 border-t border-cream/12 py-4">
                  <span className="text-[1.1rem] text-cream transition-[translate,color] duration-400 ease-smooth group-hover/tool:translate-x-2 group-hover/tool:text-white">
                    {tool.name}
                  </span>
                  <span className="text-[0.8rem] text-muted">{tool.use}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

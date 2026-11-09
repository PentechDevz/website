type IntroProps = {
  eyebrow: string;
  /** Two title lines; the second fades from cream to stone unless `fade` is off */
  title: [string, string];
  fade?: boolean;
  text: string;
};

/** Eyebrow, giant title and lead text shared by the home hero and every page header */
export function Intro({ eyebrow, title, fade = true, text }: IntroProps) {
  return (
    <>
      <p className="mb-5 text-[0.95rem] tracking-[0.2em] uppercase text-muted">{eyebrow}</p>
      <h1 className="text-[clamp(3rem,8.5vw,8rem)] leading-none tracking-[-0.02em]">
        {title[0]}
        <br />
        <span className={fade ? "text-fade" : ""}>{title[1]}</span>
      </h1>
      <p className="mt-7 max-w-[40ch] text-[clamp(1.05rem,1.6vw,1.3rem)] leading-normal text-muted">{text}</p>
    </>
  );
}

import { FadeUp } from "./FadeUp";

type Props = {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function PageHero({ kicker, title, subtitle, align = "left" }: Props) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <section className="border-b border-border/50 bg-cream pt-36 pb-16 lg:pt-44 lg:pb-24">
      <div className={`mx-auto flex max-w-5xl flex-col gap-6 px-6 lg:px-12 ${alignment}`}>
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{kicker}</p>
        </FadeUp>
        <FadeUp delay={100}>
          <h1 className="font-display whitespace-pre-line text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </FadeUp>
        {subtitle && (
          <FadeUp delay={200}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{subtitle}</p>
          </FadeUp>
        )}
      </div>
    </section>
  );
}

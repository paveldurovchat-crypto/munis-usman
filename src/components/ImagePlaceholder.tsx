import logoGold from "@/assets/logo-gold.svg";

type Variant = "cream" | "forest" | "burgundy" | "sand";

const bg: Record<Variant, string> = {
  cream: "bg-cream",
  sand: "bg-sand-dark",
  forest: "bg-forest-deep",
  burgundy: "bg-burgundy",
};

export function ImagePlaceholder({
  variant = "cream",
  label,
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${bg[variant]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, currentColor 1px, transparent 1px), radial-gradient(circle at 70% 70%, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px, 36px 36px",
          color: "var(--color-gold, #C4992D)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <img src={logoGold} alt="" className="h-10 w-auto opacity-70" loading="lazy" />
        {label && (
          <span
            className="text-[10px] uppercase tracking-[0.32em] text-foreground/50"
            style={{ fontFamily: "Jost, system-ui, sans-serif" }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

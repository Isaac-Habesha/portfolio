type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

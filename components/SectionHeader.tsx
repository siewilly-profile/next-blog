type SectionHeaderProps = {
  title: string;
  subtitle: string;
  seal: string;
};

export default function SectionHeader({ title, subtitle, seal }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="header-ornament">
        <span className="orn-line"></span>
        <span className="orn-seal">{seal}</span>
        <span className="orn-line"></span>
      </div>
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{subtitle}</p>
    </div>
  );
}

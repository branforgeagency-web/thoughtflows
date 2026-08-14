export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`glass rounded-2xl p-6 md:p-8 ${
        hover ? "transition-all duration-500 hover:-translate-y-2 hover:border-teal-400/30 hover:shadow-glow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

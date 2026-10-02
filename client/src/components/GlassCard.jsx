export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 md:p-8 border border-[#12BFD1]/15 shadow-[0_10px_30px_-10px_rgba(6,59,122,0.06)] ${
        hover ? "transition-all duration-300 hover:-translate-y-1.5 hover:border-[#12BFD1]/30 hover:shadow-[0_20px_45px_-10px_rgba(6,59,122,0.12)] hover:bg-[#E7F9FB]/30" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}


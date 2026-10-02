/**
 * HeroBackground — Flowing translucent ribbon waves, ambient cyan glow,
 * and soft sunlit campus backdrop in the bottom-right corner matching the mockup.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light Theme Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8FCFD] via-white to-[#F0FAFB]" />

      {/* Sunlit Modern Healthcare Campus Building Backdrop (bottom right) */}
      <div
        className="absolute -bottom-10 -right-10 w-[550px] lg:w-[750px] h-[380px] lg:h-[480px] pointer-events-none opacity-30 mix-blend-multiply bg-no-repeat bg-right-bottom bg-cover filter blur-[0.5px]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80')",
          maskImage: "radial-gradient(ellipse 90% 80% at 85% 85%, black 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 85% 85%, black 35%, transparent 80%)"
        }}
      />

      {/* Flowing 3D Ribbon Wave Curves matching mockup */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M650,-50 C850,160 1050,40 1440,240 L1440,900 L650,900 Z"
          fill="url(#heroWave1)"
        />
        <path
          d="M780,-50 C980,220 1150,110 1440,360 L1440,900 L780,900 Z"
          fill="url(#heroWave2)"
        />
        <path
          d="M520,900 C820,720 1120,800 1440,620 L1440,900 Z"
          fill="url(#heroWave3)"
        />
        <defs>
          <linearGradient id="heroWave1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#E2F6F9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="heroWave2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12BFD1" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#A1E7F0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="heroWave3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#12BFD1" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#A1E7F0" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>

      {/* Luminous Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#12BFD1]/12 blur-[140px] rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-[#A1E7F0]/25 blur-[140px] rounded-full" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-[#D0F3F7]/35 blur-[120px] rounded-full" />
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ArrowRight,
  Users,
  Award,
  Briefcase
} from "lucide-react";
import HeroBackground from "./HeroBackground";

const stats = [
  { value: "10K+", label: ["Students", "Trained"], icon: Users, cls: "bg-[#E7F9FB] text-[#0EA2B2]" },
  { value: "95%", label: ["Course", "Completion"], icon: Award, cls: "bg-[#D0F3F7] text-[#0B808D]" },
  { value: "85%", label: ["Placement", "Support"], icon: Briefcase, cls: "bg-[#E7F9FB] text-[#0EA2B2]" }
];

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function Hero() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);

  // Autoplay silently on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const target = pos * duration;
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="relative min-h-[92vh] w-full pt-28 sm:pt-32 pb-16 flex items-center overflow-hidden bg-[#F8FCFD]">
      <HeroBackground />

      <div className="container-max w-full px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* ============ LEFT: VIDEO PLAYER CARD ============ */}
          <motion.div
            initial={{ opacity: 0, x: -24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div
              ref={containerRef}
              onClick={togglePlay}
              className="relative w-full aspect-[16/10] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden border-[3.5px] border-white/95 shadow-[0_25px_65px_-15px_rgba(6,59,122,0.25)] bg-slate-950 group cursor-pointer select-none"
            >
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>

              {/* Center Play Button (prominent when paused, subtle on hover when playing) */}
              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-10 ${
                  !isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/80 flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5" />
                  )}
                </div>
              </div>

              {/* Bottom Custom Video Scrubber Bar matching mockup */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-3 sm:gap-4 text-white text-xs z-20"
              >
                {/* Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="hover:text-[#12BFD1] transition-colors shrink-0"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
                </button>

                {/* Current Time / Duration */}
                <span className="font-mono text-[11px] sm:text-xs text-white/90 shrink-0 select-none">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* Progress Bar Scrubber */}
                <div
                  onClick={handleSeek}
                  className="flex-1 h-1.5 sm:h-2 bg-white/30 hover:bg-white/40 rounded-full cursor-pointer relative overflow-hidden group/bar transition-all"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#12BFD1] to-white rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Mute / Unmute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="hover:text-[#12BFD1] transition-colors shrink-0"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="hover:text-[#12BFD1] transition-colors shrink-0 hidden sm:block"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ============ RIGHT: CONTENT COLUMN ============ */}
          <div className="lg:col-span-5 xl:col-span-5 text-left space-y-6">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#64748B] uppercase"
            >
              <span>BUILD A GLOBAL CAREER</span>
              <span className="h-px w-10 bg-slate-300" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold text-[#063B7A] tracking-tight leading-[1.12]"
            >
              Master Medical <br />
              <span className="text-[#0B65B5]">Coding Skills</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-xl font-normal"
            >
              Gain industry-ready skills, expert guidance, and real-world training to build a successful career in medical coding.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/courses"
                className="inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-[#063B7A] hover:bg-[#0B4F9C] text-white font-extrabold text-base shadow-xl shadow-[#063B7A]/25 hover:shadow-2xl hover:shadow-[#063B7A]/35 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Explore Our Courses</span>
                <span className="w-7 h-7 rounded-full bg-white text-[#063B7A] flex items-center justify-center transition-transform group-hover:translate-x-1 shrink-0">
                  <ArrowRight size={15} />
                </span>
              </Link>
            </motion.div>

            {/* Old Content Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-slate-200/80"
            >
              {stats.map((s) => (
                <div key={s.value} className="flex items-center gap-2.5 sm:gap-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${s.cls}`}>
                    <s.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-[#04244B] leading-tight">{s.value}</div>
                    <div className="text-[11px] sm:text-xs text-[#64748B] font-semibold leading-tight">
                      {s.label[0]} {s.label[1]}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, ArrowUpRight } from "lucide-react";
import RevealOnScroll from "../RevealOnScroll";

const YOUTUBE_ID = "Ph1XztrKgms";

export default function WelcomeSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="welcome" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container-max px-6 sm:px-8 lg:px-12 relative z-10">
        
        <RevealOnScroll>
          {/* Top Light Blue Background Card Container */}
          <div className="bg-[#E4F2FD] rounded-[2.5rem] pt-12 sm:pt-16 pb-28 sm:pb-36 px-6 sm:px-12 lg:px-16 relative overflow-hidden shadow-[0_20px_50px_rgba(6,59,122,0.09)]">
            
            {/* Split Text Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
              
              {/* Left Column: Bold Main Statement */}
              <div className="lg:col-span-6 space-y-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-[#0A2540] leading-[1.35] tracking-tight">
                  We train/create innovative and engaging programs leading to employment, development, and advancement in the largest and fastest growing fields within healthcare IT industry.
                </h3>
              </div>

              {/* Right Column: Detailed Paragraphs & Coral VIEW MORE Button */}
              <div className="lg:col-span-6 space-y-5">
                <p className="text-[#334E68] text-sm sm:text-base leading-relaxed font-normal">
                  So, we are absolutely 100% committed to healthcare IT training standards and provide the best infrastructure with well-equipped class room and lab facilities.
                </p>

                <p className="text-[#0A2540] text-sm sm:text-base leading-snug font-bold">
                  Everything we update is tied to support and empower learners by focusing on their career progression and future.
                </p>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF5A60] hover:bg-[#E0484E] text-white font-extrabold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span>VIEW MORE</span>
                    <ArrowUpRight size={16} className="stroke-[2.5]" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

          {/* Overlapping Video Card (Extends outside bottom of light blue container) */}
          <div className="relative z-20 -mt-20 sm:-mt-28 max-w-4xl mx-auto px-4">
            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden aspect-video w-full bg-[#063B7A] shadow-[0_20px_50px_rgba(6,59,122,0.2)] border-4 border-white">
              {playing ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title="Thoughtflows Academy Overview Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 h-full w-full cursor-pointer text-left"
                  aria-label="Play video: Thoughtflows Academy Overview"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`}
                    alt="Thoughtflows Academy Overview video preview"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Central Glowing White Play Button */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-20 w-20 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                      <span className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white text-[#063B7A] flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play size={28} className="fill-[#063B7A] text-[#063B7A] ml-1" />
                      </span>
                    </span>
                  </span>

                  {/* Bottom-Left Video Title Text */}
                  <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10">
                    <span className="font-display font-extrabold text-white text-lg sm:text-2xl drop-shadow-md tracking-tight">
                      Thoughtflows Video
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}


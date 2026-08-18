import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Award, ShieldCheck, Mail, Phone, Users, Building2, UserCheck } from "lucide-react";
import RevealOnScroll from "../components/RevealOnScroll";
import FaqSection from "../components/sections/FaqSection";
import CTASection from "../components/sections/CTASection";
import { ourTeamFaqs } from "../config/pageFaqs";

const teamCategories = [
  {
    id: "MANAGEMENT",
    title: "FOUNDERS & MANAGEMENT",
    subtitle: "Visionary leaders driving medical coding excellence across India.",
    members: [
      {
        name: "Mr. BalaMurali",
        role: "Founder & Managing Director",
        dept: "Executive Leadership",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Ms. Banumathy",
        role: "Founder & Chief Executive Officer",
        dept: "Executive Leadership",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "BRANCHES",
    title: "BRANCH MANAGERS",
    subtitle: "Dedicated regional directors overseeing our pan-India academy campuses.",
    members: [
      {
        name: "R. Kamesh",
        role: "Branch Head — Coimbatore",
        dept: "Tamil Nadu Region",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "S. Pradeep",
        role: "Branch Head — Hyderabad",
        dept: "Telangana Region",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "M. Karthikeyan",
        role: "Branch Head — Trichy & Salem",
        dept: "Tamil Nadu Region",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "V. Harikrishnan",
        role: "Branch Head — Kochi & Kerala",
        dept: "Kerala Region",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "ACADEMICS",
    title: "OPERATIONS & ACADEMIC HEADS",
    subtitle: "AAPC & AHIMA certified master directors shaping curriculum & standards.",
    members: [
      {
        name: "Dr. A. Sudhakar",
        role: "Head of Medical Academics (CPC/CCS)",
        dept: "Academic Excellence",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "P. Meenakshi",
        role: "Senior CPC Lead Trainer",
        dept: "Curriculum & Auditing",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "K. Rajesh",
        role: "Hospital Charting & DRG Specialist",
        dept: "Inpatient Academics",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "PLACEMENTS",
    title: "HR & PLACEMENT TEAM",
    subtitle: "Connecting graduates with 500+ corporate healthcare BPO hiring partners.",
    members: [
      {
        name: "V. Divya",
        role: "Head of Corporate Placements",
        dept: "Placement Cell",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "R. Arvind",
        role: "Senior Placement Officer",
        dept: "Corporate Relations",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "S. Malathi",
        role: "Student Relations Lead",
        dept: "Career Counselling",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "FACULTY_TN",
    title: "FACULTY & TRAINERS (TAMIL NADU)",
    subtitle: "Senior AAPC instructors for Coimbatore, Trichy, and Salem campuses.",
    members: [
      {
        name: "S. Vignesh",
        role: "AAPC Certified CPC Instructor",
        dept: "Coimbatore Campus",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "M. Gayathri",
        role: "AHIMA Certified CCS Instructor",
        dept: "Gandhipuram Campus",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "R. Soundarya",
        role: "HCC Risk Adjustment Specialist",
        dept: "Trichy Campus",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "K. Vijay",
        role: "Anatomy & Terminology Faculty",
        dept: "Hope College Campus",
        image: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "T. Anitha",
        role: "Medical Billing Trainer",
        dept: "Salem Campus",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "FACULTY_TS",
    title: "FACULTY & TRAINERS (HYDERABAD & TELANGANA)",
    subtitle: "Experienced CPC & RCM master trainers for Ameerpet & Dilsukhnagar.",
    members: [
      {
        name: "P. Venkat Rao",
        role: "CPC Senior Trainer — Ameerpet",
        dept: "Hyderabad Campus",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "N. Swathi",
        role: "Surgery & E/M Coding Specialist",
        dept: "Dilsukhnagar Campus",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "M. Srinivas",
        role: "Medical Audit & Compliance Lead",
        dept: "Ameerpet Campus",
        image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "K. Lavanya",
        role: "Billing & RCM Trainer",
        dept: "Hyderabad Region",
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "FACULTY_KL_AP",
    title: "FACULTY & TRAINERS (KERALA & ANDHRA PRADESH)",
    subtitle: "Certified faculty leads for Kochi, Trivandrum, Vizag, and Tirupati campuses.",
    members: [
      {
        name: "J. Joseph",
        role: "Kochi Academy Faculty Lead",
        dept: "Kerala Region",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "A. Reshma",
        role: "Trivandrum Coding Instructor",
        dept: "Kerala Region",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "Ch. Ramesh",
        role: "Vizag Campus Trainer",
        dept: "Andhra Pradesh",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "B. Sai Kumar",
        role: "Tirupati Campus Trainer",
        dept: "Andhra Pradesh",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
      }
    ]
  },
  {
    id: "SUPPORT",
    title: "STUDENT COUNSELLORS & SUPPORT",
    subtitle: "Dedicated academic counsellors assisting students from admission to placement.",
    members: [
      {
        name: "G. Priya",
        role: "Senior Academic Counsellor",
        dept: "Student Admissions",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "R. Pavithra",
        role: "Student Counsellor",
        dept: "Career Guidance",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
      },
      {
        name: "M. Saravanan",
        role: "Admission Coordinator",
        dept: "Batch Scheduling",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80"
      }
    ]
  }
];

export default function OurTeam() {
  const [selectedDept, setSelectedDept] = useState("ALL");

  const displayCategories = selectedDept === "ALL" 
    ? teamCategories 
    : teamCategories.filter(c => c.id === selectedDept);

  return (
    <div className="bg-[#FAF8F5] text-navy-900 overflow-hidden min-h-screen">
      
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO HEADER BANNER                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-36 pb-20 bg-gradient-to-r from-navy-950 via-[#0b3347] to-teal-900 text-white overflow-hidden">
        <div className="container-max px-6 sm:px-10 lg:px-16 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-400/30">
            <Users size={14} className="text-teal-400" /> Dedicated Educators & Leaders
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Meet <span className="text-[#16ADBA]">Our Team</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
            Experienced Leadership, AAPC & AHIMA Master Trainers, Regional Branch Heads, and Student Career Counsellors.
          </p>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "ALL", label: "All Departments" },
              { id: "MANAGEMENT", label: "Founders" },
              { id: "BRANCHES", label: "Branch Heads" },
              { id: "ACADEMICS", label: "Academic Heads" },
              { id: "PLACEMENTS", label: "Placements" },
              { id: "FACULTY_TN", label: "Faculty TN" },
              { id: "FACULTY_TS", label: "Faculty TS" },
              { id: "FACULTY_KL_AP", label: "Faculty KL & AP" },
              { id: "SUPPORT", label: "Student Support" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedDept(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedDept === tab.id
                    ? "bg-[#16ADBA] text-white shadow-lg shadow-teal-500/30 scale-105"
                    : "bg-white/10 hover:bg-white/20 text-white/90 border border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. DEPARTMENTAL TEAM DIRECTORY SECTIONS                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="container-max px-6 sm:px-10 lg:px-16 py-16 space-y-16">
        <AnimatePresence mode="popLayout">
          {displayCategories.map((cat) => (
            <motion.section
              layout
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              
              {/* Category Header */}
              <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-1">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight flex items-center gap-2">
                    <UserCheck className="text-[#16ADBA]" size={22} />
                    <span>{cat.title}</span>
                  </h2>
                  <p className="text-xs text-navy-900/60 font-medium mt-0.5">{cat.subtitle}</p>
                </div>
                <span className="text-xs font-extrabold text-[#16ADBA] bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50 w-fit">
                  {cat.members.length} Members
                </span>
              </div>

              {/* Team Member Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cat.members.map((m, mIdx) => (
                  <RevealOnScroll key={m.name} delay={(mIdx % 4) * 0.06}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="bg-white rounded-3xl p-7 shadow-xl border border-slate-100/90 text-center space-y-4 hover:shadow-2xl hover:border-teal-400/40 transition-all duration-300 flex flex-col items-center justify-between h-full group"
                    >
                      {/* Avatar Portrait with Ring */}
                      <div className="relative mt-2">
                        <img
                          src={m.image}
                          alt={m.name}
                          loading="lazy"
                          className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-[#16ADBA] shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Member Details */}
                      <div className="space-y-2 flex-1 flex flex-col justify-center">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full w-fit mx-auto">
                          {m.dept}
                        </span>

                        <h3 className="font-extrabold text-navy-900 text-lg leading-snug group-hover:text-[#16ADBA] transition-colors">
                          {m.name}
                        </h3>

                        <p className="font-bold text-[#16ADBA] text-xs leading-relaxed">
                          {m.role}
                        </p>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                ))}
              </div>

            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <FaqSection items={ourTeamFaqs} />
      <CTASection />
    </div>
  );
}

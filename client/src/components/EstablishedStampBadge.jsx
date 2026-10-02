import { motion } from "framer-motion";

/**
 * Metallic Gold Scalloped Stamp Seal Badge
 * Matches screenshot: scalloped outer stamp edge, rich gold metallic gradient ring,
 * circular curved text "THOUGHTFLOWS ★ ESTABLISHED 2016", tilted center "2016",
 * and smooth left-right oscillation.
 */
export default function EstablishedStampBadge({ variant = "gold" }) {
  // Pre-calculated 32-scallop stamp seal path for viewBox 0 0 200 200 (center 100,100)
  const scallops = 32;
  const cx = 100;
  const cy = 100;
  const rOut = 95;
  const rIn = 88;
  let scallopPath = "";
  for (let i = 0; i < scallops; i++) {
    const a1 = (i / scallops) * 2 * Math.PI;
    const aMid = ((i + 0.5) / scallops) * 2 * Math.PI;
    const a2 = ((i + 1) / scallops) * 2 * Math.PI;

    const x1 = cx + rOut * Math.cos(a1);
    const y1 = cy + rOut * Math.sin(a1);

    const xCtrl = cx + (rOut + 4) * Math.cos(aMid);
    const yCtrl = cy + (rOut + 4) * Math.sin(aMid);

    const x2 = cx + rIn * Math.cos(a2);
    const y2 = cy + rIn * Math.sin(a2);

    if (i === 0) scallopPath += `M ${x1.toFixed(2)},${y1.toFixed(2)} `;
    scallopPath += `Q ${xCtrl.toFixed(2)},${yCtrl.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)} `;
  }
  scallopPath += "Z";

  const isGold = variant === "gold";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative pointer-events-auto select-none"
    >
      <motion.div
        animate={{ rotate: [-18, 18, -18] }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 4.5,
            ease: "easeInOut",
          },
        }}
        className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 drop-shadow-[0_12px_28px_rgba(202,138,4,0.35)] cursor-pointer"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            {/* Circular path for SVG text curved around the ring */}
            <path
              id="goldStampTextPath"
              d="M 100, 100 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
            />
            {/* Gold Metallic Gradients */}
            <linearGradient id="goldSealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="30%" stopColor="#F5D061" />
              <stop offset="70%" stopColor="#D4A017" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCE78A" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#A16207" />
            </linearGradient>

            <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#854D0E" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>
          </defs>

          {/* 1. Scalloped Outer Metallic Gold Stamp Shadow/Body */}
          <path
            d={scallopPath}
            fill={isGold ? "url(#goldSealGrad)" : "#FFFFFF"}
            stroke={isGold ? "#FEF08A" : "#E2F3FA"}
            strokeWidth="2"
          />

          {/* 2. Inner Circular Band Ring */}
          <circle cx="100" cy="100" r="75" fill={isGold ? "url(#goldRingGrad)" : "#CBEBF6"} />
          <circle cx="100" cy="100" r="50" fill="#FFFFFF" />

          {/* Inner ring fine border lines */}
          <circle cx="100" cy="100" r="75" fill="none" stroke={isGold ? "#FEF08A" : "#12BFD1"} strokeWidth="1" opacity="0.6" />
          <circle cx="100" cy="100" r="50" fill="none" stroke={isGold ? "#D4A017" : "#12BFD1"} strokeWidth="1" opacity="0.6" />

          {/* 3. Circular Curved Text on Path */}
          <text
            fill={isGold ? "#713F12" : "#0E7490"}
            fontSize="9.5"
            fontWeight="900"
            letterSpacing="2"
            className="uppercase"
          >
            <textPath href="#goldStampTextPath" startOffset="0%">
              ESTABLISHED ★ THOUGHTFLOWS ★ ESTABLISHED ★
            </textPath>
          </text>

          {/* 4. Center Angled Text (ESTABLISHED 2016) */}
          <g transform="translate(100, 100) rotate(-18)">
            <text
              x="0"
              y="-10"
              textAnchor="middle"
              fill={isGold ? "#CA8A04" : "#12BFD1"}
              fontSize="9.5"
              fontWeight="900"
              letterSpacing="1.5"
            >
              ESTABLISHED
            </text>
            <text
              x="0"
              y="16"
              textAnchor="middle"
              fill="#063B7A"
              fontSize="28"
              fontWeight="900"
              letterSpacing="-0.5"
            >
              2016
            </text>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

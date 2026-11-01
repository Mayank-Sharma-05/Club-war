"use client";

import React from "react";
import { ChiefEmotion } from "@/types/chief";
import { motion } from "framer-motion";

interface ChiefAvatarProps {
  emotion: ChiefEmotion;
  isSpeaking: boolean;
  size?: number | "sm" | "md" | "lg";
}

export const ChiefAvatar: React.FC<ChiefAvatarProps> = ({
  emotion,
  isSpeaking,
  size = 56,
}) => {
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 40
      : size === "md"
      ? 56
      : 72;

  // Eye expression based on emotion
  const getEyePath = () => {
    switch (emotion) {
      case "happy":
      case "celebrating":
        // Curved joyful arcs (^_^)
        return (
          <>
            <path
              d="M17 25 Q21 21 25 25"
              fill="none"
              stroke="#39FF88"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M31 25 Q35 21 39 25"
              fill="none"
              stroke="#39FF88"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        );
      case "sarcastic":
        // One raised eyebrow / flat squint
        return (
          <>
            <line
              x1="17"
              y1="23"
              x2="25"
              y2="23"
              stroke="#A855F7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="35" cy="24" r="2.8" fill="#00E5FF" />
          </>
        );
      case "impressed":
        // Wide bright pupils
        return (
          <>
            <circle cx="21" cy="24" r="3.5" fill="#00E5FF" />
            <circle cx="22" cy="23" r="1.2" fill="#FFFFFF" />
            <circle cx="35" cy="24" r="3.5" fill="#00E5FF" />
            <circle cx="36" cy="23" r="1.2" fill="#FFFFFF" />
          </>
        );
      case "disappointed":
        // Drooping eyes (-_-)
        return (
          <>
            <line
              x1="17"
              y1="25"
              x2="25"
              y2="25"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="31"
              y1="25"
              x2="39"
              y2="25"
              stroke="#64748B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </>
        );
      case "warning":
        // Alert triangular / slanted eyes
        return (
          <>
            <polygon points="18,26 24,22 24,26" fill="#FF365D" />
            <polygon points="38,26 32,22 32,26" fill="#FF365D" />
          </>
        );
      default:
        // Confident normal eyes
        return (
          <>
            <circle cx="21" cy="24" r="2.8" fill="#00E5FF" />
            <circle cx="35" cy="24" r="2.8" fill="#00E5FF" />
          </>
        );
    }
  };

  return (
    <div
      style={{ width: pixelSize, height: pixelSize }}
      className="relative shrink-0 flex items-center justify-center select-none"
    >
      <svg
        viewBox="0 0 56 56"
        width={pixelSize}
        height={pixelSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(0,229,255,0.3)]"
      >
        {/* Antennas / Radar Nodes */}
        <line
          x1="28"
          y1="8"
          x2="28"
          y2="2"
          stroke="#00E5FF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="28"
          cy="2"
          r="2.5"
          fill={isSpeaking ? "#39FF88" : emotion === "warning" ? "#FF365D" : "#00E5FF"}
          className={isSpeaking ? "animate-pulse" : ""}
        />

        {/* Head Shell Outer (Dark Futuristic Helmet) */}
        <rect
          x="10"
          y="8"
          width="36"
          height="32"
          rx="12"
          fill="#171127"
          stroke="#35264D"
          strokeWidth="2"
        />

        {/* Earpieces with neon glow */}
        <rect x="7" y="19" width="3" height="10" rx="1.5" fill="#00E5FF" />
        <rect x="46" y="19" width="3" height="10" rx="1.5" fill="#00E5FF" />

        {/* Visor Area (Glowing Dark Cyan Visor) */}
        <rect
          x="14"
          y="15"
          width="28"
          height="16"
          rx="6"
          fill="#080611"
          stroke="#00E5FF"
          strokeWidth="1.2"
        />

        {/* Eyes / Expression */}
        {getEyePath()}

        {/* Mouth / Audio Equalizer Vocalizer */}
        {isSpeaking ? (
          <motion.rect
            animate={{
              height: [2, 5, 2],
              y: [33, 31.5, 33],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.3,
              ease: "easeInOut",
            }}
            x="22"
            y="33"
            width="12"
            height="2"
            rx="1"
            fill="#00E5FF"
          />
        ) : emotion === "happy" || emotion === "celebrating" ? (
          <path
            d="M24 33 Q28 36 32 33"
            fill="none"
            stroke="#39FF88"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : emotion === "disappointed" ? (
          <path
            d="M24 35 Q28 33 32 35"
            fill="none"
            stroke="#64748B"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ) : (
          <line
            x1="24"
            y1="34"
            x2="32"
            y2="34"
            stroke="#00E5FF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        )}

        {/* Neck & Collar */}
        <rect x="23" y="40" width="10" height="4" rx="1" fill="#35264D" />
        <path
          d="M16 44 L40 44 L44 52 L12 52 Z"
          fill="#A855F7"
          opacity="0.9"
        />
        <circle cx="28" cy="48" r="1.8" fill="#00E5FF" />
      </svg>
    </div>
  );
};

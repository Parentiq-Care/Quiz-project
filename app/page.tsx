"use client";

import { useState } from "react";

type Personality = "bold" | "sweet" | "social" | "artisan";

interface Answer {
  emoji: string;
  text: string;
  personality: Personality;
}

interface Question {
  question: string;
  answers: Answer[];
}

const questions: Question[] = [
  {
    question: "What's your ideal Saturday morning?",
    answers: [
      { emoji: "\u26f0\ufe0f", text: "An intense workout or outdoor adventure", personality: "bold" },
      { emoji: "\ud83c\udf70", text: "Brunch at my favorite cozy spot with a pastry", personality: "sweet" },
      { emoji: "\ud83d\udc4b", text: "Meeting up with friends for coffee", personality: "social" },
      { emoji: "\ud83c\udf3f", text: "Exploring a new cafe or farmers market", personality: "artisan" },
    ],
  },
  {
    question: "You're on vacation - what are you doing?",
    answers: [
      { emoji: "\ud83e\ude82", text: "Skydiving, hiking, or something adrenaline-filled", personality: "bold" },
      { emoji: "\ud83c\udf69", text: "Eating my way through the best dessert shops", personality: "sweet" },
      { emoji: "\ud83c\udf89", text: "Bar-hopping or joining a group tour to meet people", personality: "social" },
      { emoji: "\ud83d\uddfa\ufe0f", text: "Finding the hidden gem restaurant only locals know about", personality: "artisan" },
    ],
  },
  {
    question: "How do you pick a restaurant?",
    answers: [
      { emoji: "\ud83c\udf36\ufe0f", text: "Wherever has the most intense flavors - spicy, bold, strong", personality: "bold" },
      { emoji: "\ud83e\uddc1", text: "Wherever has the best dessert menu", personality: "sweet" },
      { emoji: "\ud83d\udc6f", text: "Wherever my friends want to go", personality: "social" },
      { emoji: "\ud83d\udcd6", text: "I read 10 reviews and only go to places with craft menus", personality: "artisan" },
    ],
  },
  {
    question: "What's your go-to weekend outfit?",
    answers: [
      { emoji: "\ud83c\udfcb\ufe0f", text: "Athletic wear - ready for anything", personality: "bold" },
      { emoji: "\ud83e\uddf8", text: "Something soft, comfy, and cute", personality: "sweet" },
      { emoji: "\ud83d\udcac", text: "Whatever my friends say looks good", personality: "social" },
      { emoji: "\ud83d\udc54", text: "A curated outfit I put real thought into", personality: "artisan" },
    ],
  },
  {
    question: "Pick a superpower:",
    answers: [
      { emoji: "\ud83d\udcaa", text: "Super strength", personality: "bold" },
      { emoji: "\ud83d\ude0a", text: "Making anyone smile instantly", personality: "sweet" },
      { emoji: "\ud83e\udde0", text: "Reading minds", personality: "social" },
      { emoji: "\u2728", text: "Knowing the best version of everything", personality: "artisan" },
    ],
  },
  {
    question: "Your phone's home screen is mostly:",
    answers: [
      { emoji: "\ud83c\udfc3", text: "Fitness and adventure apps", personality: "bold" },
      { emoji: "\ud83c\udf55", text: "Food delivery and recipe apps", personality: "sweet" },
      { emoji: "\ud83d\udcf1", text: "Group chats and social media", personality: "social" },
      { emoji: "\ud83c\udfa7", text: "Curated news, podcasts, and niche apps", personality: "artisan" },
    ],
  },
];

const personalityInfo: Record<
  Personality,
  { name: string; coffee: string; tagline: string; color: string; emoji: string; bg: string }
> = {
  bold: {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live for intensity",
    color: "#c8a455",
    emoji: "\u26a1",
    bg: "linear-gradient(135deg, #fff9ed, #fef0d0)",
  },
  sweet: {
    name: "Sweet Enthusiast",
    coffee: "Caramel Latte",
    tagline: "Life's too short for bitter",
    color: "#d4848c",
    emoji: "\ud83e\uddc1",
    bg: "linear-gradient(135deg, #fff5f5, #fee2e5)",
  },
  social: {
    name: "Social Butterfly",
    coffee: "Cappuccino",
    tagline: "Coffee is better with company",
    color: "#a888b5",
    emoji: "\ud83e\udd8b",
    bg: "linear-gradient(135deg, #f9f5ff, #ede5f5)",
  },
  artisan: {
    name: "Artisan Snob",
    coffee: "Pour-Over, Single Origin",
    tagline: "You know what you like",
    color: "#8faa80",
    emoji: "\u2728",
    bg: "linear-gradient(135deg, #f2f9ee, #e2f0d8)",
  },
};

const personalityIllustrations: Record<Personality, (size: number) => React.ReactNode> = {
  bold: (size) => (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes b-glow { 0%,100% { r: 50; opacity: 1; } 50% { r: 55; opacity: 0.7; } }
        @keyframes b-bolt { 0%,100% { opacity: 1; } 40% { opacity: 0.6; } 50% { opacity: 1; } 70% { opacity: 0.4; } 80% { opacity: 1; } }
        @keyframes b-steam { 0% { transform: translateY(0); opacity: 0.35; } 100% { transform: translateY(-8px); opacity: 0; } }
        @keyframes b-twinkle { 0%,100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 0.2; transform: scale(0.5); } }
        .b-glow { animation: b-glow 2s ease-in-out infinite; }
        .b-boltL { animation: b-bolt 3s ease-in-out infinite; }
        .b-boltR { animation: b-bolt 3s ease-in-out infinite 0.5s; }
        .b-boltC { animation: b-bolt 3s ease-in-out infinite 1s; }
        .b-steam1 { animation: b-steam 2.5s ease-out infinite; }
        .b-steam2 { animation: b-steam 2.5s ease-out infinite 0.8s; }
        .b-steam3 { animation: b-steam 2.5s ease-out infinite 1.6s; }
        .b-twinkle1 { animation: b-twinkle 1.5s ease-in-out infinite; transform-origin: 18px 21px; }
        .b-twinkle2 { animation: b-twinkle 1.5s ease-in-out infinite 0.5s; transform-origin: 105px 7px; }
        .b-twinkle3 { animation: b-twinkle 1.5s ease-in-out infinite 1s; transform-origin: 22px 43.5px; }
      `}</style>
      <defs>
        <linearGradient id="boldCupGrad" x1="30" y1="50" x2="95" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8c96e" />
          <stop offset="50%" stopColor="#c8a455" />
          <stop offset="100%" stopColor="#9a7a2e" />
        </linearGradient>
        <linearGradient id="boldCremaGrad" x1="40" y1="52" x2="40" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4a54a" />
          <stop offset="100%" stopColor="#3b2514" />
        </linearGradient>
        <radialGradient id="boldGlow" cx="60" cy="35" r="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
        <filter id="boldShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
        <filter id="boltGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Energy glow behind cup */}
      <circle cx="65" cy="55" r="50" fill="url(#boldGlow)" className="b-glow" />
      {/* Saucer shadow */}
      <ellipse cx="62" cy="116" rx="42" ry="6" fill="#00000010" />
      {/* Saucer bottom */}
      <ellipse cx="60" cy="113" rx="44" ry="9" fill="#d4b85c" />
      <ellipse cx="60" cy="111" rx="44" ry="9" fill="#e8d5a3" />
      {/* Saucer top rim */}
      <ellipse cx="60" cy="109" rx="40" ry="7" fill="#f0e2b8" />
      <ellipse cx="60" cy="108" rx="32" ry="5" fill="#f5ebd0" />
      {/* Saucer highlight */}
      <ellipse cx="52" cy="107" rx="12" ry="2" fill="white" opacity="0.3" />
      {/* Cup body */}
      <path d="M28 56 L34 100 C35 106 45 112 60 112 C75 112 85 106 86 100 L92 56 Z" fill="url(#boldCupGrad)" filter="url(#boldShadow)" />
      {/* Cup shading (left dark, right highlight) */}
      <path d="M28 56 L34 100 C35 106 45 112 60 112 L60 56 Z" fill="#b8943e" opacity="0.3" />
      <path d="M78 58 L84 98 C84 103 78 108 70 110 L75 58 Z" fill="white" opacity="0.12" />
      {/* Cup rim outer */}
      <ellipse cx="60" cy="56" rx="32" ry="9" fill="#dbb863" />
      {/* Cup rim inner */}
      <ellipse cx="60" cy="55" rx="29" ry="7" fill="url(#boldCremaGrad)" />
      {/* Crema swirl detail */}
      <ellipse cx="55" cy="54" rx="10" ry="3" fill="#c8944a" opacity="0.5" />
      <ellipse cx="65" cy="56" rx="6" ry="2" fill="#c8944a" opacity="0.3" />
      {/* Cup rim highlight */}
      <path d="M35 53 Q48 48 60 49 Q72 48 85 53" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Handle */}
      <path d="M92 62 Q110 60 112 76 Q112 92 92 92" stroke="url(#boldCupGrad)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M92 62 Q110 60 112 76 Q112 92 92 92" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.2" />
      {/* Handle inner shadow */}
      <path d="M94 67 Q106 66 107 76 Q107 88 94 88" stroke="#9a7a2e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.3" />
      {/* Lightning bolt left - larger with glow */}
      <g className="b-boltL">
        <polygon points="35,8 26,30 36,27 29,46 48,22 38,25 44,8" fill="#FFD700" stroke="#e6b800" strokeWidth="1.5" filter="url(#boltGlow)" />
        <polygon points="35,8 26,30 36,27 29,46 48,22 38,25 44,8" fill="url(#boltGradL)" />
      </g>
      {/* Lightning bolt right - larger with glow */}
      <g className="b-boltR">
        <polygon points="85,4 76,26 86,23 79,42 98,18 88,21 94,4" fill="#FFD700" stroke="#e6b800" strokeWidth="1.5" filter="url(#boltGlow)" />
        <polygon points="85,4 76,26 86,23 79,42 98,18 88,21 94,4" fill="url(#boltGradR)" />
      </g>
      {/* Mini bolt center */}
      <polygon points="60,18 56,28 61,27 58,34 66,24 62,25 64,18" fill="#FFD700" opacity="0.7" className="b-boltC" />
      {/* Sparkle stars */}
      <g className="b-twinkle1">
        <line x1="18" y1="25" x2="18" y2="17" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="14" y1="21" x2="22" y2="21" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className="b-twinkle2">
        <line x1="105" y1="10" x2="105" y2="4" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
        <line x1="102" y1="7" x2="108" y2="7" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
      </g>
      <g className="b-twinkle3">
        <line x1="22" y1="46" x2="22" y2="41" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
        <line x1="19.5" y1="43.5" x2="24.5" y2="43.5" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
      </g>
      {/* Wavy steam lines */}
      <path d="M48 42 Q46 32 50 24 Q52 18 49 10" stroke="#c8a455" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" className="b-steam1" />
      <path d="M60 40 Q58 30 62 22 Q64 16 61 8" stroke="#c8a455" strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round" className="b-steam2" />
      <path d="M72 42 Q70 32 74 24 Q76 18 73 10" stroke="#c8a455" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" className="b-steam3" />
      {/* Coffee beans scattered */}
      <ellipse cx="16" cy="105" rx="4" ry="3" fill="#5c3a1e" transform="rotate(-20 16 105)" />
      <line x1="14" y1="104" x2="18" y2="106" stroke="#3b2514" strokeWidth="0.8" />
      <ellipse cx="108" cy="108" rx="3.5" ry="2.5" fill="#5c3a1e" transform="rotate(15 108 108)" />
      <line x1="106.5" y1="107.5" x2="109.5" y2="108.5" stroke="#3b2514" strokeWidth="0.7" />
      <defs>
        <linearGradient id="boltGradL" x1="26" y1="8" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
        <linearGradient id="boltGradR" x1="76" y1="4" x2="94" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  ),
  sweet: (size) => (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes s-float { 0% { transform: translateY(0); opacity: 0.9; } 50% { transform: translateY(-6px); opacity: 1; } 100% { transform: translateY(0); opacity: 0.9; } }
        @keyframes s-float2 { 0% { transform: translateY(0); opacity: 0.7; } 50% { transform: translateY(-5px); opacity: 0.9; } 100% { transform: translateY(0); opacity: 0.7; } }
        @keyframes s-wobble { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(3deg); } 75% { transform: rotate(-3deg); } }
        @keyframes s-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes s-twinkle { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .s-heart1 { animation: s-float 3s ease-in-out infinite; }
        .s-heart2 { animation: s-float2 3s ease-in-out infinite 0.8s; }
        .s-heart3 { animation: s-float 4s ease-in-out infinite 1.5s; }
        .s-heart4 { animation: s-float2 3.5s ease-in-out infinite 0.4s; }
        .s-cherry { animation: s-wobble 2s ease-in-out infinite; transform-origin: 61px 18px; }
        .s-cream { animation: s-pulse 3s ease-in-out infinite; transform-origin: 62px 42px; }
        .s-sprinkle1 { animation: s-twinkle 2s ease-in-out infinite; }
        .s-sprinkle2 { animation: s-twinkle 2s ease-in-out infinite 0.6s; }
        .s-sprinkle3 { animation: s-twinkle 2s ease-in-out infinite 1.2s; }
      `}</style>
      <defs>
        <linearGradient id="sweetCupGrad" x1="35" y1="48" x2="90" y2="118" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8dde1" />
          <stop offset="40%" stopColor="#f2c4ca" />
          <stop offset="100%" stopColor="#c96b78" />
        </linearGradient>
        <linearGradient id="caramelDrip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4944a" />
          <stop offset="100%" stopColor="#b87530" />
        </linearGradient>
        <filter id="sweetShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
        </filter>
        <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Saucer shadow */}
      <ellipse cx="62" cy="120" rx="40" ry="5" fill="#00000008" />
      {/* Saucer */}
      <ellipse cx="60" cy="117" rx="42" ry="8" fill="#f0d0d5" />
      <ellipse cx="60" cy="115" rx="40" ry="7" fill="#f8e4e7" />
      <ellipse cx="60" cy="114" rx="34" ry="5" fill="#fceef0" />
      {/* Saucer decorative dots */}
      <circle cx="38" cy="114" r="1" fill="#d4848c" opacity="0.3" />
      <circle cx="48" cy="112.5" r="1" fill="#d4848c" opacity="0.3" />
      <circle cx="72" cy="112.5" r="1" fill="#d4848c" opacity="0.3" />
      <circle cx="82" cy="114" r="1" fill="#d4848c" opacity="0.3" />
      {/* Cup body (tall latte glass) */}
      <path d="M36 50 L40 106 C41 111 50 116 62 116 C74 116 83 111 84 106 L88 50 Z" fill="url(#sweetCupGrad)" filter="url(#sweetShadow)" />
      {/* Glass highlight streak */}
      <path d="M42 55 L44 104 Q46 108 50 110 L48 55 Z" fill="white" opacity="0.15" />
      <path d="M80 55 L78 104 Q76 108 73 110 L76 55 Z" fill="white" opacity="0.08" />
      {/* Latte layers */}
      <path d="M42 85 L43 104 C44 109 52 114 62 114 C72 114 80 109 81 104 L82 85 Z" fill="#f5e0d0" opacity="0.5" />
      <path d="M41 70 L42 85 L82 85 L83 70 Z" fill="#e8c4aa" opacity="0.3" />
      <line x1="41" y1="70" x2="83" y2="70" stroke="#d4a880" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="85" x2="82" y2="85" stroke="#d4a880" strokeWidth="0.5" opacity="0.3" />
      {/* Caramel drizzle on inside */}
      <path d="M50 54 Q48 65 52 72 Q50 78 53 85" stroke="#d4944a" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M72 56 Q74 66 70 74 Q73 80 71 86" stroke="#d4944a" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* Cup rim */}
      <ellipse cx="62" cy="50" rx="26" ry="7" fill="#f8d5da" />
      <ellipse cx="62" cy="49" rx="24" ry="6" fill="#fceef0" />
      {/* Whipped cream - more voluminous and detailed */}
      <ellipse cx="62" cy="46" rx="24" ry="10" fill="white" />
      <ellipse cx="62" cy="44" rx="22" ry="9" fill="#fffafa" />
      {/* Cream bumps */}
      <circle cx="48" cy="44" r="7" fill="white" />
      <circle cx="62" cy="42" r="8" fill="#fffafa" />
      <circle cx="75" cy="44" r="7" fill="white" />
      <circle cx="55" cy="40" r="6" fill="white" />
      <circle cx="69" cy="40" r="6" fill="white" />
      {/* Cream peak / swirl */}
      <path d="M58 38 Q60 28 64 30 Q66 26 62 22 Q60 20 61 18" stroke="#f5f5f5" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M58 38 Q60 28 64 30 Q66 26 62 22 Q60 20 61 18" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Cream highlights */}
      <circle cx="50" cy="42" r="2" fill="white" opacity="0.8" />
      <circle cx="72" cy="42" r="1.5" fill="white" opacity="0.7" />
      {/* Cherry on top */}
      <g className="s-cherry">
        <circle cx="61" cy="15" r="5" fill="#e84060" />
        <circle cx="61" cy="15" r="5" fill="url(#cherryGrad)" />
        <ellipse cx="59.5" cy="13.5" rx="2" ry="1.5" fill="white" opacity="0.4" />
        {/* Cherry stem */}
        <path d="M61 10 Q63 5 67 4" stroke="#4a8030" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="68" cy="4" rx="3" ry="1.5" fill="#5a9940" transform="rotate(-10 68 4)" />
      </g>
      {/* Caramel drizzle on cream */}
      <path d="M46 46 Q50 42 54 46 Q58 42 62 46 Q66 42 70 46 Q74 42 78 46" stroke="#d4944a" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
      {/* Sprinkles on cream - more of them */}
      <rect x="50" y="39" width="5" height="1.8" rx="0.9" fill="#FFB6C1" transform="rotate(-30 52 40)" className="s-sprinkle1" />
      <rect x="66" y="38" width="5" height="1.8" rx="0.9" fill="#87CEEB" transform="rotate(25 68 39)" className="s-sprinkle2" />
      <rect x="57" y="36" width="5" height="1.8" rx="0.9" fill="#FFD700" transform="rotate(-10 59 37)" className="s-sprinkle3" />
      <rect x="72" y="42" width="4" height="1.5" rx="0.75" fill="#98FB98" transform="rotate(40 74 43)" className="s-sprinkle1" />
      <rect x="46" y="43" width="4" height="1.5" rx="0.75" fill="#DDA0DD" transform="rotate(-45 48 44)" className="s-sprinkle2" />
      <rect x="62" y="34" width="4" height="1.5" rx="0.75" fill="#FF6347" transform="rotate(15 64 35)" className="s-sprinkle3" />
      {/* Floating hearts */}
      <g filter="url(#heartGlow)" className="s-heart1">
        <path d="M22 28 C22 24 16 22 16 27 C16 32 22 36 22 36 C22 36 28 32 28 27 C28 22 22 24 22 28 Z" fill="#d4848c" />
      </g>
      <g filter="url(#heartGlow)" className="s-heart2">
        <path d="M100 20 C100 17 96 15.5 96 19 C96 22.5 100 25 100 25 C100 25 104 22.5 104 19 C104 15.5 100 17 100 20 Z" fill="#e8a0a8" />
      </g>
      <path d="M112 38 C112 36 109.5 35 109.5 37.5 C109.5 40 112 42 112 42 C112 42 114.5 40 114.5 37.5 C114.5 35 112 36 112 38 Z" fill="#f0b8c0" className="s-heart3" />
      <path d="M16 48 C16 46.5 14 45.8 14 47.5 C14 49.2 16 50.8 16 50.8 C16 50.8 18 49.2 18 47.5 C18 45.8 16 46.5 16 48 Z" fill="#f0b8c0" className="s-heart4" />
      {/* Straw */}
      <rect x="76" y="8" width="3" height="48" rx="1.5" fill="#ff8fa0" transform="rotate(8 77 32)" />
      <rect x="76" y="8" width="3" height="48" rx="1.5" fill="url(#strawGrad)" transform="rotate(8 77 32)" />
      {/* Straw stripes */}
      <line x1="76.5" y1="14" x2="79.5" y2="14" stroke="white" strokeWidth="2" opacity="0.4" transform="rotate(8 77 32)" />
      <line x1="76.5" y1="22" x2="79.5" y2="22" stroke="white" strokeWidth="2" opacity="0.4" transform="rotate(8 77 32)" />
      <line x1="76.5" y1="30" x2="79.5" y2="30" stroke="white" strokeWidth="2" opacity="0.4" transform="rotate(8 77 32)" />
      <line x1="76.5" y1="38" x2="79.5" y2="38" stroke="white" strokeWidth="2" opacity="0.4" transform="rotate(8 77 32)" />
      <defs>
        <radialGradient id="cherryGrad" cx="59%" cy="40%">
          <stop offset="0%" stopColor="#ff6080" />
          <stop offset="100%" stopColor="#c83050" />
        </radialGradient>
        <linearGradient id="strawGrad" x1="76" y1="8" x2="79" y2="8">
          <stop offset="0%" stopColor="#ff7088" />
          <stop offset="50%" stopColor="#ff8fa0" />
          <stop offset="100%" stopColor="#ff7088" />
        </linearGradient>
      </defs>
    </svg>
  ),
  social: (size) => (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes so-sparkle { 0%,100% { r: 4; opacity: 0.9; } 50% { r: 6; opacity: 1; } }
        @keyframes so-sparkleInner { 0%,100% { r: 2; } 50% { r: 3; } }
        @keyframes so-ray { 0%,100% { opacity: 0.8; } 50% { opacity: 0.3; } }
        @keyframes so-dot { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes so-confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 0.7; } 100% { transform: translateY(8px) rotate(15deg); opacity: 0.2; } }
        @keyframes so-bubble { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes so-steam { 0% { transform: translateY(0); opacity: 0.35; } 100% { transform: translateY(-8px); opacity: 0; } }
        .so-sparkle { animation: so-sparkle 1.5s ease-in-out infinite; }
        .so-sparkleI { animation: so-sparkleInner 1.5s ease-in-out infinite; }
        .so-ray1 { animation: so-ray 1.5s ease-in-out infinite; }
        .so-ray2 { animation: so-ray 1.5s ease-in-out infinite 0.3s; }
        .so-ray3 { animation: so-ray 1.5s ease-in-out infinite 0.6s; }
        .so-dot1 { animation: so-dot 2s ease-in-out infinite; transform-origin: 52px 32px; }
        .so-dot2 { animation: so-dot 2s ease-in-out infinite 0.5s; transform-origin: 68px 32px; }
        .so-dot3 { animation: so-dot 2s ease-in-out infinite 1s; transform-origin: 45px 42px; }
        .so-dot4 { animation: so-dot 2s ease-in-out infinite 1.5s; transform-origin: 75px 42px; }
        .so-conf1 { animation: so-confetti 3s ease-in infinite; }
        .so-conf2 { animation: so-confetti 3s ease-in infinite 0.7s; }
        .so-conf3 { animation: so-confetti 3s ease-in infinite 1.4s; }
        .so-conf4 { animation: so-confetti 3s ease-in infinite 2.1s; }
        .so-bubbleL { animation: so-bubble 2s ease-in-out infinite; }
        .so-bubbleR { animation: so-bubble 2s ease-in-out infinite 1s; }
        .so-steam1 { animation: so-steam 2.5s ease-out infinite; }
        .so-steam2 { animation: so-steam 2.5s ease-out infinite 0.6s; }
        .so-steam3 { animation: so-steam 2.5s ease-out infinite 1.2s; }
        .so-steam4 { animation: so-steam 2.5s ease-out infinite 1.8s; }
      `}</style>
      <defs>
        <linearGradient id="socialCup1" x1="15" y1="52" x2="62" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dcc4ec" />
          <stop offset="50%" stopColor="#c4a8d4" />
          <stop offset="100%" stopColor="#8a68a4" />
        </linearGradient>
        <linearGradient id="socialCup2" x1="58" y1="52" x2="105" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d0b4e0" />
          <stop offset="50%" stopColor="#b898c8" />
          <stop offset="100%" stopColor="#7e5898" />
        </linearGradient>
        <filter id="socialShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12" />
        </filter>
        <radialGradient id="clinkGlow" cx="60" cy="42" r="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
        <filter id="sparkleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Confetti / celebration bits */}
      <rect x="20" y="10" width="5" height="2" rx="1" fill="#FFD700" opacity="0.7" transform="rotate(-30 22 11)" className="so-conf1" />
      <rect x="110" y="15" width="5" height="2" rx="1" fill="#c4a8d4" opacity="0.7" transform="rotate(20 112 16)" className="so-conf2" />
      <rect x="30" y="20" width="4" height="1.5" rx="0.75" fill="#ff8fa0" opacity="0.6" transform="rotate(45 32 21)" className="so-conf3" />
      <rect x="100" y="8" width="4" height="1.5" rx="0.75" fill="#87CEEB" opacity="0.6" transform="rotate(-25 102 9)" className="so-conf4" />
      <circle cx="15" cy="30" r="2" fill="#FFD700" opacity="0.4" />
      <circle cx="125" cy="28" r="1.5" fill="#ff8fa0" opacity="0.4" />
      <circle cx="70" cy="6" r="1.5" fill="#b898c8" opacity="0.5" />
      {/* Clink glow */}
      <circle cx="60" cy="42" r="25" fill="url(#clinkGlow)" />
      {/* Left saucer */}
      <ellipse cx="38" cy="114" rx="30" ry="6" fill="#d0c0d8" />
      <ellipse cx="38" cy="112" rx="28" ry="5" fill="#e4d8ec" />
      <ellipse cx="35" cy="111.5" rx="10" ry="1.5" fill="white" opacity="0.15" />
      {/* Right saucer */}
      <ellipse cx="82" cy="114" rx="30" ry="6" fill="#d0c0d8" />
      <ellipse cx="82" cy="112" rx="28" ry="5" fill="#e4d8ec" />
      <ellipse cx="79" cy="111.5" rx="10" ry="1.5" fill="white" opacity="0.15" />
      {/* Left cup - tilted slightly right */}
      <g transform="rotate(4 40 80)">
        <path d="M16 56 L21 100 C22 106 29 112 40 112 C51 112 58 106 59 100 L64 56 Z" fill="url(#socialCup1)" filter="url(#socialShadow)" />
        <path d="M22 58 L25 98 C25 102 32 106 40 106 L40 58 Z" fill="#a888b5" opacity="0.15" />
        <path d="M52 58 L50 98 C50 102 46 106 43 107 L48 58 Z" fill="white" opacity="0.1" />
        <ellipse cx="40" cy="56" rx="24" ry="7" fill="#d4b8e4" />
        <ellipse cx="40" cy="55" rx="21" ry="5.5" fill="#6b4a3a" />
        {/* Latte art - leaf */}
        <path d="M40 52 Q36 54 38 56 Q40 54 42 56 Q44 54 40 52 Z" fill="#c8a080" opacity="0.5" />
        <line x1="40" y1="52" x2="40" y2="57" stroke="#c8a080" strokeWidth="0.5" opacity="0.4" />
        {/* Left handle */}
        <path d="M16 62 Q2 62 2 75 Q2 88 16 88" stroke="#c4a8d4" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M16 62 Q2 62 2 75 Q2 88 16 88" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2" />
        <path d="M17 66 Q6 66 6 75 Q6 84 17 84" stroke="#a080b8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
      </g>
      {/* Right cup - tilted slightly left */}
      <g transform="rotate(-4 80 80)">
        <path d="M56 56 L61 100 C62 106 69 112 80 112 C91 112 98 106 99 100 L104 56 Z" fill="url(#socialCup2)" filter="url(#socialShadow)" />
        <path d="M62 58 L65 98 C65 102 72 106 80 106 L80 58 Z" fill="#9070a8" opacity="0.15" />
        <path d="M92 58 L90 98 C90 102 86 106 83 107 L88 58 Z" fill="white" opacity="0.1" />
        <ellipse cx="80" cy="56" rx="24" ry="7" fill="#c8a8d8" />
        <ellipse cx="80" cy="55" rx="21" ry="5.5" fill="#6b4a3a" />
        {/* Latte art - heart */}
        <path d="M80 53 C80 51.5 78 51 78 52.5 C78 54 80 55.5 80 55.5 C80 55.5 82 54 82 52.5 C82 51 80 51.5 80 53 Z" fill="#c8a080" opacity="0.5" />
        {/* Right handle */}
        <path d="M104 62 Q118 62 118 75 Q118 88 104 88" stroke="#b898c8" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M104 62 Q118 62 118 75 Q118 88 104 88" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2" />
        <path d="M103 66 Q114 66 114 75 Q114 84 103 84" stroke="#9070a8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
      </g>
      {/* Big clink sparkle burst */}
      <g filter="url(#sparkleGlow)">
        <circle cx="60" cy="44" r="4" fill="#FFD700" opacity="0.9" className="so-sparkle" />
        <circle cx="60" cy="44" r="2" fill="white" opacity="0.8" className="so-sparkleI" />
      </g>
      {/* Sparkle rays */}
      <line x1="60" y1="30" x2="60" y2="36" stroke="#FFD700" strokeWidth="2" opacity="0.8" strokeLinecap="round" className="so-ray1" />
      <line x1="60" y1="52" x2="60" y2="56" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" className="so-ray2" />
      <line x1="48" y1="36" x2="52" y2="40" stroke="#FFD700" strokeWidth="2" opacity="0.7" strokeLinecap="round" className="so-ray2" />
      <line x1="72" y1="36" x2="68" y2="40" stroke="#FFD700" strokeWidth="2" opacity="0.7" strokeLinecap="round" className="so-ray2" />
      <line x1="46" y1="46" x2="50" y2="45" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" className="so-ray3" />
      <line x1="74" y1="46" x2="70" y2="45" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" className="so-ray3" />
      {/* Smaller sparkle dots */}
      <circle cx="52" cy="32" r="2" fill="#FFD700" opacity="0.6" className="so-dot1" />
      <circle cx="68" cy="32" r="2" fill="#FFD700" opacity="0.6" className="so-dot2" />
      <circle cx="45" cy="42" r="1.5" fill="#FFD700" opacity="0.4" className="so-dot3" />
      <circle cx="75" cy="42" r="1.5" fill="#FFD700" opacity="0.4" className="so-dot4" />
      {/* Steam from left cup */}
      <path d="M32 46 Q30 36 34 28 Q36 22 33 14" stroke="#b898c8" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" className="so-steam1" />
      <path d="M42 44 Q40 34 44 26 Q46 20 43 12" stroke="#b898c8" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" className="so-steam2" />
      {/* Steam from right cup */}
      <path d="M78 44 Q76 34 80 26 Q82 20 79 12" stroke="#b898c8" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" className="so-steam3" />
      <path d="M88 46 Q86 36 90 28 Q92 22 89 14" stroke="#b898c8" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" className="so-steam4" />
      {/* Chat bubbles */}
      <g opacity="0.6" className="so-bubbleL">
        <rect x="8" y="35" width="18" height="12" rx="6" fill="#e4d8ec" />
        <polygon points="18,47 22,47 18,52" fill="#e4d8ec" />
        <circle cx="13" cy="41" r="1.2" fill="#a888b5" />
        <circle cx="17" cy="41" r="1.2" fill="#a888b5" />
        <circle cx="21" cy="41" r="1.2" fill="#a888b5" />
      </g>
      <g opacity="0.5" className="so-bubbleR">
        <rect x="108" y="40" width="16" height="10" rx="5" fill="#e4d8ec" />
        <polygon points="116,50 112,50 116,54" fill="#e4d8ec" />
        <circle cx="112.5" cy="45" r="1" fill="#a888b5" />
        <circle cx="116" cy="45" r="1" fill="#a888b5" />
        <circle cx="119.5" cy="45" r="1" fill="#a888b5" />
      </g>
    </svg>
  ),
  artisan: (size) => (
    <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @keyframes a-drip { 0% { transform: translateY(0); opacity: 0.8; } 60% { opacity: 0.6; } 100% { transform: translateY(12px); opacity: 0; } }
        @keyframes a-drip2 { 0% { transform: translateY(0); opacity: 0.5; } 100% { transform: translateY(10px); opacity: 0; } }
        @keyframes a-steam { 0% { transform: translateY(0); opacity: 0.3; } 100% { transform: translateY(-8px); opacity: 0; } }
        @keyframes a-timer { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes a-pour { 0%,100% { opacity: 0.6; } 50% { opacity: 0.3; } }
        .a-drip1 { animation: a-drip 2s ease-in infinite; }
        .a-drip2 { animation: a-drip2 2s ease-in infinite 0.8s; }
        .a-drip3 { animation: a-drip2 2s ease-in infinite 1.4s; }
        .a-steam1 { animation: a-steam 2.5s ease-out infinite; }
        .a-steam2 { animation: a-steam 2.5s ease-out infinite 0.8s; }
        .a-steam3 { animation: a-steam 2.5s ease-out infinite 1.6s; }
        .a-timer { animation: a-timer 8s linear infinite; transform-origin: 108px 80px; }
        .a-pour { animation: a-pour 2s ease-in-out infinite; }
      `}</style>
      <defs>
        <linearGradient id="artDripperGrad" x1="32" y1="22" x2="88" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0edda" />
          <stop offset="50%" stopColor="#c5d9b8" />
          <stop offset="100%" stopColor="#7a9a68" />
        </linearGradient>
        <linearGradient id="artCarafeGrad" x1="38" y1="82" x2="82" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e8f0e4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c5d9b8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="artCoffeeGrad" x1="48" y1="95" x2="48" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#5c3a1e" />
        </linearGradient>
        <filter id="artShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12" />
        </filter>
        <filter id="dripGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Wooden stand */}
      <rect x="40" y="126" width="40" height="5" rx="2.5" fill="#8B6B4A" />
      <rect x="42" y="126" width="36" height="2" rx="1" fill="#a07d58" />
      {/* Stand vertical post */}
      <rect x="57" y="60" width="6" height="68" rx="2" fill="#9a8060" />
      <rect x="58" y="60" width="2" height="68" fill="#a89070" opacity="0.4" />
      {/* Stand cross bar */}
      <rect x="38" y="76" width="44" height="4" rx="2" fill="#8B6B4A" />
      <rect x="38" y="76" width="44" height="2" rx="1" fill="#a07d58" opacity="0.5" />
      {/* Carafe / server - glass with detail */}
      <path d="M40 84 L44 114 C45 118 52 122 60 122 C68 122 75 118 76 114 L80 84 Z" fill="url(#artCarafeGrad)" filter="url(#artShadow)" />
      <path d="M40 84 L44 114 C45 118 52 122 60 122 C68 122 75 118 76 114 L80 84 Z" stroke="#8faa80" strokeWidth="1.5" fill="none" />
      {/* Carafe rim */}
      <ellipse cx="60" cy="84" rx="20" ry="5.5" fill="none" stroke="#8faa80" strokeWidth="1.5" />
      <ellipse cx="60" cy="83.5" rx="18" ry="4.5" fill="#f0f5ed" opacity="0.4" />
      {/* Carafe spout */}
      <path d="M40 84 Q36 82 34 78" stroke="#8faa80" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Carafe handle */}
      <path d="M80 86 Q90 86 90 95 Q90 104 80 104" stroke="#8faa80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M80 86 Q90 86 90 95 Q90 104 80 104" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.3" />
      {/* Coffee in carafe - layered */}
      <path d="M47 100 L48 113 C49 117 54 120 60 120 C66 120 71 117 72 113 L73 100 Z" fill="url(#artCoffeeGrad)" opacity="0.6" />
      {/* Coffee surface */}
      <ellipse cx="60" cy="100" rx="13" ry="3.5" fill="#8B5E3C" opacity="0.5" />
      {/* Carafe measurement lines */}
      <line x1="76" y1="96" x2="73" y2="96" stroke="#8faa80" strokeWidth="0.8" opacity="0.4" />
      <line x1="77" y1="104" x2="74" y2="104" stroke="#8faa80" strokeWidth="0.8" opacity="0.4" />
      <line x1="78" y1="112" x2="75" y2="112" stroke="#8faa80" strokeWidth="0.8" opacity="0.4" />
      {/* Glass highlight */}
      <path d="M44 88 L46 112 Q48 116 52 118 L50 88 Z" fill="white" opacity="0.15" />
      {/* Dripper cone - detailed */}
      <path d="M32 22 L44 58 C45 62 52 66 60 66 C68 66 75 62 76 58 L88 22 Z" fill="url(#artDripperGrad)" filter="url(#artShadow)" />
      {/* Dripper ridges/ribs */}
      <line x1="38" y1="30" x2="50" y2="58" stroke="#8faa80" strokeWidth="0.6" opacity="0.3" />
      <line x1="44" y1="26" x2="54" y2="60" stroke="#8faa80" strokeWidth="0.6" opacity="0.3" />
      <line x1="50" y1="24" x2="58" y2="62" stroke="#8faa80" strokeWidth="0.6" opacity="0.3" />
      <line x1="70" y1="24" x2="62" y2="62" stroke="#8faa80" strokeWidth="0.6" opacity="0.3" />
      <line x1="76" y1="26" x2="66" y2="60" stroke="#8faa80" strokeWidth="0.6" opacity="0.3" />
      <line x1="82" y1="30" x2="70" y2="58" stroke="#8faa80" strokeWidth="0.6" opacity="0.3" />
      {/* Dripper shading */}
      <path d="M32 22 L44 58 C44 60 48 62 54 64 L52 22 Z" fill="#7a9a68" opacity="0.12" />
      <path d="M78 24 L72 58 C72 60 68 62 65 64 L74 24 Z" fill="white" opacity="0.1" />
      {/* Dripper rim outer */}
      <ellipse cx="60" cy="22" rx="28" ry="8" fill="#c5d9b8" />
      <ellipse cx="60" cy="21" rx="28" ry="8" fill="#d4e5c8" />
      {/* Dripper rim inner */}
      <ellipse cx="60" cy="20" rx="24" ry="6" fill="#f5f0e6" />
      {/* Rim highlight */}
      <path d="M38 18 Q50 14 60 15 Q70 14 82 18" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
      {/* Coffee grounds inside */}
      <ellipse cx="60" cy="23" rx="20" ry="5" fill="#5c3a1e" opacity="0.7" />
      <ellipse cx="60" cy="22" rx="18" ry="4" fill="#6b4a3a" opacity="0.5" />
      {/* Grounds texture */}
      <circle cx="52" cy="22" r="1.5" fill="#4a2e14" opacity="0.3" />
      <circle cx="60" cy="24" r="1" fill="#4a2e14" opacity="0.3" />
      <circle cx="68" cy="22" r="1.2" fill="#4a2e14" opacity="0.3" />
      <circle cx="56" cy="24" r="0.8" fill="#4a2e14" opacity="0.2" />
      <circle cx="64" cy="23" r="0.8" fill="#4a2e14" opacity="0.2" />
      {/* Water being poured - kettle spout hint */}
      <path d="M28 8 Q26 12 30 14 L36 18" stroke="#b0b0b0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M20 4 Q18 6 22 10 L28 8" stroke="#c0c0c0" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Water stream */}
      <path d="M36 18 Q38 20 40 22" stroke="#a8d4f0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" className="a-pour" />
      <ellipse cx="42" cy="24" rx="3" ry="1" fill="#a8d4f0" opacity="0.3" className="a-pour" />
      {/* Coffee drip stream */}
      <path d="M60 66 L60 72" stroke="#6b4a3a" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
      <ellipse cx="60" cy="74" rx="2" ry="3" fill="#6b4a3a" opacity="0.7" filter="url(#dripGlow)" className="a-drip1" />
      <ellipse cx="60" cy="80" rx="1.5" ry="2" fill="#6b4a3a" opacity="0.4" className="a-drip2" />
      {/* Steam wisps - more detailed */}
      <path d="M50 14 Q48 6 52 0" stroke="#8faa80" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" className="a-steam1" />
      <path d="M60 12 Q57 4 62 -2" stroke="#8faa80" strokeWidth="2" fill="none" opacity="0.35" strokeLinecap="round" className="a-steam2" />
      <path d="M70 14 Q68 6 72 0" stroke="#8faa80" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" className="a-steam3" />
      {/* Scattered coffee beans */}
      <g transform="rotate(-25 18 120)">
        <ellipse cx="18" cy="120" rx="4.5" ry="3" fill="#5c3a1e" />
        <path d="M15.5 119 Q18 121.5 20.5 119" stroke="#3b2514" strokeWidth="0.8" fill="none" />
      </g>
      <g transform="rotate(15 110 126)">
        <ellipse cx="110" cy="126" rx="4" ry="2.8" fill="#6b4a3a" />
        <path d="M108 125.2 Q110 127.5 112 125.2" stroke="#3b2514" strokeWidth="0.7" fill="none" />
      </g>
      <g transform="rotate(-10 24 130)">
        <ellipse cx="24" cy="130" rx="3.5" ry="2.5" fill="#5c3a1e" />
        <path d="M22 129.5 Q24 131.5 26 129.5" stroke="#3b2514" strokeWidth="0.6" fill="none" />
      </g>
      {/* Timer icon (small) */}
      <circle cx="108" cy="80" r="8" fill="none" stroke="#8faa80" strokeWidth="1.5" opacity="0.4" />
      <circle cx="108" cy="80" r="6.5" fill="#f2f9ee" opacity="0.3" />
      <line x1="108" y1="76" x2="108" y2="80" stroke="#8faa80" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <line x1="108" y1="80" x2="111" y2="82" stroke="#8faa80" strokeWidth="1" opacity="0.5" strokeLinecap="round" className="a-timer" />
      <line x1="108" y1="72" x2="108" y2="70" stroke="#8faa80" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  ),
};

function calculateResults(
  answers: Personality[]
): { personality: Personality; percentage: number }[] {
  const counts: Record<Personality, number> = {
    bold: 0,
    sweet: 0,
    social: 0,
    artisan: 0,
  };

  answers.forEach((a) => {
    counts[a]++;
  });

  const total = answers.length;
  const results = (Object.keys(counts) as Personality[]).map((p) => ({
    personality: p,
    percentage: Math.round((counts[p] / total) * 100),
  }));

  results.sort((a, b) => b.percentage - a.percentage);
  return results;
}

export default function Home() {
  const [screen, setScreen] = useState<"welcome" | "quiz" | "results">(
    "welcome"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Personality[]>([]);
  const [shareText, setShareText] = useState("");

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (personality: Personality) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen("results");
    }
  };

  const handleRestart = () => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      {/* Welcome Screen */}
      {screen === "welcome" && (
        <div className="quiz-card text-center fade-in-up">
          <div className="mb-6 text-6xl">&#9749;</div>
          <h1
            className="mb-4 text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            What&apos;s Your Coffee Personality?
          </h1>
          <p className="mb-8 text-lg opacity-70">
            Answer 6 quick questions to discover your perfect brew and what it
            says about you.
          </p>
          <button className="start-btn" onClick={handleStart}>
            Start Quiz
          </button>
        </div>
      )}

      {/* Quiz Screen */}
      {screen === "quiz" && (
        <div className="quiz-card fade-in-up" key={currentQuestion}>
          {/* Progress bar */}
          <div className="mb-2 flex items-center justify-between text-sm opacity-60">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="pct-bar-bg mb-8">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: "100%",
                borderRadius: "999px",
              }}
            />
          </div>

          {/* Question */}
          <h2
            className="mb-6 text-2xl font-semibold"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {questions[currentQuestion].question}
          </h2>

          {/* Answer options */}
          <div className="flex flex-col gap-3">
            {questions[currentQuestion].answers.map((answer, i) => (
              <button
                key={i}
                className="answer-btn flex items-center gap-3"
                onClick={() => handleAnswer(answer.personality)}
              >
                <span className="text-2xl">{answer.emoji}</span>
                <span>{answer.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Screen */}
      {screen === "results" && (() => {
        const results = calculateResults(answers);
        const topResult = personalityInfo[results[0].personality];
        return (
        <div className="fade-in-up" style={{ maxWidth: 600, width: "100%" }}>
          {/* Hero card for top result */}
          <div
            className="top-result-card text-center"
            style={{ background: topResult.bg }}
          >
            <div className="mb-2 result-bounce">{personalityIllustrations[results[0].personality](120)}</div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest opacity-50">
              You are a
            </p>
            <h2
              className="mb-2 text-3xl font-bold"
              style={{ fontFamily: "var(--font-playfair), serif", color: topResult.color }}
            >
              {topResult.name}
            </h2>
            <p className="mb-3 text-lg italic opacity-70">
              &ldquo;{topResult.tagline}&rdquo;
            </p>
            <div
              className="mx-auto inline-block rounded-full px-5 py-2 text-sm font-semibold text-white"
              style={{ background: topResult.color }}
            >
              {"\u2615"} Your brew: {topResult.coffee}
            </div>
            <div
              className="mx-auto mt-4 text-4xl font-bold"
              style={{ color: topResult.color }}
            >
              {results[0].percentage}%
            </div>
          </div>

          {/* Full breakdown */}
          <p
            className="mb-4 mt-8 text-center text-sm font-semibold uppercase tracking-widest opacity-40"
          >
            Full Breakdown
          </p>
          <div className="flex flex-col gap-3">
            {results.map((result, i) => {
              const info = personalityInfo[result.personality];
              return (
                <div
                  key={result.personality}
                  className="result-card result-stagger"
                  style={{
                    borderLeftColor: info.color,
                    background: info.bg,
                    animationDelay: `${i * 150}ms`,
                  }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">{personalityIllustrations[result.personality](48)}</div>
                      <h3
                        className="flex items-center gap-2 text-lg font-semibold"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {info.name}
                        {i === 0 && <span className="ml-1 text-xs">&#127942;</span>}
                      </h3>
                    </div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: info.color }}
                    >
                      {result.percentage}%
                    </span>
                  </div>
                  <div className="pct-bar-bg mb-3">
                    <div
                      className="pct-bar-fill"
                      style={{
                        width: `${result.percentage}%`,
                        background: `linear-gradient(90deg, ${info.color}, ${info.color}cc)`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium opacity-80">
                      {"\u2615"} {info.coffee}
                    </span>
                    <span className="italic opacity-60">
                      &ldquo;{info.tagline}&rdquo;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button className="restart-btn" onClick={handleRestart}>
              Take Quiz Again
            </button>
            <button
              className="restart-btn"
              style={{ background: topResult.color }}
              onClick={() => {
                const text = `I'm a ${topResult.name}! ☕ My coffee personality is ${topResult.coffee}. "${topResult.tagline}" — Take the quiz and find out yours!`;
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({ title: "My Coffee Personality", text, url }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                    setShareText("Copied!");
                    setTimeout(() => setShareText(""), 2000);
                  });
                }
              }}
            >
              {shareText || "Share Result"}
            </button>
          </div>
        </div>
        );
      })()}
    </div>
  );
}

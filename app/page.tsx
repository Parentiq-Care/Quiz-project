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
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Saucer */}
      <ellipse cx="60" cy="100" rx="40" ry="8" fill="#e8d5a3" />
      <ellipse cx="60" cy="98" rx="38" ry="7" fill="#f5e6c0" />
      {/* Cup body */}
      <path d="M30 50 L35 90 C36 95 44 100 60 100 C76 100 84 95 85 90 L90 50 Z" fill="#c8a455" />
      <path d="M30 50 L35 90 C36 95 44 100 60 100 C76 100 84 95 85 90 L90 50 Z" fill="url(#boldGrad)" />
      {/* Cup rim */}
      <ellipse cx="60" cy="50" rx="30" ry="8" fill="#dbb863" />
      <ellipse cx="60" cy="49" rx="27" ry="6" fill="#3b2514" />
      {/* Handle */}
      <path d="M90 55 Q105 55 105 70 Q105 85 90 85" stroke="#c8a455" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Lightning bolt left */}
      <polygon points="38,15 32,32 40,30 35,44 50,24 42,26 47,15" fill="#FFD700" stroke="#e6b800" strokeWidth="1" />
      {/* Lightning bolt right */}
      <polygon points="82,10 76,27 84,25 79,39 94,19 86,21 91,10" fill="#FFD700" stroke="#e6b800" strokeWidth="1" />
      {/* Steam/energy lines */}
      <path d="M50 38 Q48 28 52 20" stroke="#c8a455" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M60 35 Q58 25 62 15" stroke="#c8a455" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M70 38 Q68 28 72 20" stroke="#c8a455" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="boldGrad" x1="30" y1="50" x2="90" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dbb863" />
          <stop offset="100%" stopColor="#a88930" />
        </linearGradient>
      </defs>
    </svg>
  ),
  sweet: (size) => (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Saucer */}
      <ellipse cx="60" cy="105" rx="38" ry="7" fill="#f0d6d9" />
      <ellipse cx="60" cy="103" rx="36" ry="6" fill="#f8e4e7" />
      {/* Cup body (tall latte glass) */}
      <path d="M35 45 L38 95 C39 100 48 105 60 105 C72 105 81 100 82 95 L85 45 Z" fill="#f2c4ca" />
      <path d="M35 45 L38 95 C39 100 48 105 60 105 C72 105 81 100 82 95 L85 45 Z" fill="url(#sweetGrad)" />
      {/* Latte liquid */}
      <path d="M38 60 L40 93 C41 97 49 102 60 102 C71 102 79 97 80 93 L82 60 Z" fill="#e8a5ad" opacity="0.4" />
      {/* Cup rim */}
      <ellipse cx="60" cy="45" rx="25" ry="7" fill="#f5d0d5" />
      {/* Whipped cream swirl */}
      <ellipse cx="60" cy="42" rx="22" ry="8" fill="white" />
      <path d="M48 40 Q52 32 60 34 Q68 32 72 40" fill="white" />
      <path d="M52 36 Q56 28 60 30 Q64 28 68 36" fill="#fff5f5" />
      <ellipse cx="60" cy="32" rx="8" ry="5" fill="white" />
      <circle cx="60" cy="28" r="3" fill="#fff0f0" />
      {/* Heart */}
      <path d="M54 16 C54 12 48 10 48 15 C48 20 54 24 54 24 C54 24 60 20 60 15 C60 10 54 12 54 16 Z" fill="#d4848c" opacity="0.9" />
      <path d="M66 12 C66 8 60 6 60 11 C60 16 66 20 66 20 C66 20 72 16 72 11 C72 6 66 8 66 12 Z" fill="#e8a0a8" opacity="0.9" />
      {/* Sprinkles */}
      <rect x="50" y="38" width="4" height="1.5" rx="0.75" fill="#FFB6C1" transform="rotate(-30 52 39)" />
      <rect x="64" y="36" width="4" height="1.5" rx="0.75" fill="#FFD700" transform="rotate(20 66 37)" />
      <rect x="56" y="34" width="4" height="1.5" rx="0.75" fill="#87CEEB" transform="rotate(-15 58 35)" />
      <defs>
        <linearGradient id="sweetGrad" x1="35" y1="45" x2="85" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5d5da" />
          <stop offset="100%" stopColor="#d4848c" />
        </linearGradient>
      </defs>
    </svg>
  ),
  social: (size) => (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left saucer */}
      <ellipse cx="40" cy="105" rx="28" ry="5" fill="#d8c8e0" />
      {/* Right saucer */}
      <ellipse cx="80" cy="105" rx="28" ry="5" fill="#d8c8e0" />
      {/* Left cup */}
      <path d="M18 55 L22 95 C23 100 30 105 40 105 C50 105 57 100 58 95 L62 55 Z" fill="#c4a8d4" />
      <path d="M18 55 L22 95 C23 100 30 105 40 105 C50 105 57 100 58 95 L62 55 Z" fill="url(#socialGrad1)" />
      <ellipse cx="40" cy="55" rx="22" ry="6" fill="#d4b8e4" />
      <ellipse cx="40" cy="54" rx="19" ry="4.5" fill="#6b4a3a" />
      {/* Left handle */}
      <path d="M18 60 Q6 60 6 72 Q6 84 18 84" stroke="#c4a8d4" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Right cup */}
      <path d="M58 55 L62 95 C63 100 70 105 80 105 C90 105 97 100 98 95 L102 55 Z" fill="#b898c8" />
      <path d="M58 55 L62 95 C63 100 70 105 80 105 C90 105 97 100 98 95 L102 55 Z" fill="url(#socialGrad2)" />
      <ellipse cx="80" cy="55" rx="22" ry="6" fill="#c8a8d8" />
      <ellipse cx="80" cy="54" rx="19" ry="4.5" fill="#6b4a3a" />
      {/* Right handle */}
      <path d="M102 60 Q114 60 114 72 Q114 84 102 84" stroke="#b898c8" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Clink sparkles */}
      <circle cx="60" cy="45" r="3" fill="#FFD700" opacity="0.9" />
      <circle cx="55" cy="38" r="2" fill="#FFD700" opacity="0.7" />
      <circle cx="65" cy="38" r="2" fill="#FFD700" opacity="0.7" />
      <line x1="60" y1="30" x2="60" y2="35" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
      <line x1="52" y1="33" x2="55" y2="37" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
      <line x1="68" y1="33" x2="65" y2="37" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
      {/* Steam from left cup */}
      <path d="M35 46 Q33 38 37 30" stroke="#a888b5" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M43 44 Q41 36 45 28" stroke="#a888b5" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* Steam from right cup */}
      <path d="M75 46 Q73 38 77 30" stroke="#a888b5" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M83 44 Q81 36 85 28" stroke="#a888b5" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="socialGrad1" x1="18" y1="55" x2="62" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4b8e4" />
          <stop offset="100%" stopColor="#a080b8" />
        </linearGradient>
        <linearGradient id="socialGrad2" x1="58" y1="55" x2="102" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c8a8d8" />
          <stop offset="100%" stopColor="#9070a8" />
        </linearGradient>
      </defs>
    </svg>
  ),
  artisan: (size) => (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stand / base */}
      <rect x="45" y="108" width="30" height="4" rx="2" fill="#8faa80" />
      <rect x="58" y="55" width="4" height="55" fill="#a3bd94" />
      {/* Dripper cone */}
      <path d="M35 20 L45 52 C46 55 54 58 60 58 C66 58 74 55 75 52 L85 20 Z" fill="#c5d9b8" />
      <path d="M35 20 L45 52 C46 55 54 58 60 58 C66 58 74 55 75 52 L85 20 Z" fill="url(#artisanGrad)" />
      {/* Dripper rim */}
      <ellipse cx="60" cy="20" rx="25" ry="7" fill="#d4e5c8" />
      <ellipse cx="60" cy="19" rx="22" ry="5.5" fill="#f5f0e6" />
      {/* Filter / grounds inside */}
      <ellipse cx="60" cy="22" rx="18" ry="4" fill="#6b4a3a" opacity="0.7" />
      {/* Coffee drip drops */}
      <ellipse cx="60" cy="65" rx="2" ry="3" fill="#6b4a3a" opacity="0.8" />
      <ellipse cx="60" cy="75" rx="1.5" ry="2.5" fill="#6b4a3a" opacity="0.5" />
      <ellipse cx="60" cy="83" rx="1" ry="2" fill="#6b4a3a" opacity="0.3" />
      {/* Server / carafe below */}
      <path d="M42 85 L45 103 C46 107 52 110 60 110 C68 110 74 107 75 103 L78 85 Z" fill="#d4e5c8" opacity="0.5" />
      <path d="M42 85 L45 103 C46 107 52 110 60 110 C68 110 74 107 75 103 L78 85 Z" stroke="#8faa80" strokeWidth="1.5" fill="none" />
      <ellipse cx="60" cy="85" rx="18" ry="5" fill="none" stroke="#8faa80" strokeWidth="1.5" />
      {/* Coffee in carafe */}
      <path d="M46 95 L47 102 C48 105 53 108 60 108 C67 108 72 105 73 102 L74 95 Z" fill="#6b4a3a" opacity="0.3" />
      {/* Steam wisps from grounds */}
      <path d="M52 14 Q50 8 54 3" stroke="#8faa80" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M60 12 Q58 6 62 1" stroke="#8faa80" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M68 14 Q66 8 70 3" stroke="#8faa80" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="artisanGrad" x1="35" y1="20" x2="85" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4e5c8" />
          <stop offset="100%" stopColor="#8faa80" />
        </linearGradient>
      </defs>
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

          <div className="mt-8 text-center">
            <button className="restart-btn" onClick={handleRestart}>
              Take Quiz Again
            </button>
          </div>
        </div>
        );
      })()}
    </div>
  );
}

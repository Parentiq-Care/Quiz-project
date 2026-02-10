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
            <div className="mb-1 text-6xl result-bounce">{topResult.emoji}</div>
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
                    <h3
                      className="flex items-center gap-2 text-lg font-semibold"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      <span className="text-xl">{info.emoji}</span>
                      {info.name}
                      {i === 0 && <span className="ml-1 text-xs">&#127942;</span>}
                    </h3>
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

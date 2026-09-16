import { useEffect, useState } from "react";
import Intro from "./components/AdventureQuiz/Intro.jsx";
import Quiz from "./components/AdventureQuiz/Quiz.jsx";
import LoadingScreen from "./components/AdventureQuiz/LoadingScreen.jsx";
import Result from "./components/AdventureQuiz/Result.jsx";
import operators from "./data/operators.json";
import matchingRules from "./data/matching_rules.json";
import { getRecommendation } from "./matching/matcher.js";
import OperatorAI from "./components/RAG/OperatorAI.jsx";

const STAGES = {
  INTRO: "intro",
  QUIZ: "quiz",
  LOADING: "loading",
  RESULT: "result",
};

const LOADING_DURATION_MS = 900;

export default function App() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  function handleStart() {
    setStage(STAGES.QUIZ);
  }

  function handleQuizComplete(finalAnswers) {
    setStage(STAGES.LOADING);
    const rec = getRecommendation(finalAnswers, operators, matchingRules);
    setRecommendation(rec);
  }

  useEffect(() => {
    if (stage !== STAGES.LOADING) return;
    const timer = setTimeout(() => setStage(STAGES.RESULT), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [stage]);

  function handleRestart() {
    setAnswers({});
    setRecommendation(null);
    setStage(STAGES.INTRO);
  }

  return (
    <div className="min-h-screen w-full min-w-0 bg-cream flex justify-center py-4 px-3 sm:py-8 sm:px-4 lg:py-10">
      <main className="w-full min-w-0 max-w-6xl">
        {stage === STAGES.INTRO && <><Intro onStart={handleStart} /><OperatorAI /></>}

        {stage === STAGES.QUIZ && (
          <Quiz
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleQuizComplete}
          />
        )}

        {stage === STAGES.LOADING && <LoadingScreen />}

        {stage === STAGES.RESULT && recommendation && (
          <Result recommendation={recommendation} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}

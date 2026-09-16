import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { questions } from "../../data/questions.js";
import ProgressBar from "./ProgressBar.jsx";
import QuestionCard from "./QuestionCard.jsx";

const ADVANCE_DELAY_MS = 380;

export default function Quiz({ answers, setAnswers, onComplete }) {
  const [index, setIndex] = useState(0);
  const [justSelected, setJustSelected] = useState(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  function handleSelect(key) {
    setJustSelected(key);
    const nextAnswers = { ...answers, [question.id]: key };
    setAnswers(nextAnswers);

    setTimeout(() => {
      if (isLast) {
        onComplete(nextAnswers);
      } else {
        setIndex((i) => i + 1);
        setJustSelected(null);
      }
    }, ADVANCE_DELAY_MS);
  }

  function handleBack() {
    if (index === 0) return;
    setJustSelected(null);
    setIndex((i) => i - 1);
  }

  return (
    <div
      key={question.id}
      className="w-full min-w-0 max-w-full bg-white rounded-toeddro border-3 border-ink shadow-hard-lg p-6 sm:p-8 rise-in"
    >
      <div className="flex items-center justify-between mb-8">
        {index > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back to the previous question"
            className="press-hard inline-flex items-center gap-1 bg-cream border-3 border-ink rounded-pill px-3 py-2 font-display text-xs uppercase"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back
          </button>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col items-center mb-8">
        <ProgressBar current={index + 1} total={questions.length} />
      </div>

      <h2 className="font-display text-3xl sm:text-4xl text-center uppercase leading-tight mb-8 whitespace-pre-line">
        {question.prompt}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="group" aria-label={question.prompt}>
        {question.options.map((option, i) => (
          <QuestionCard
            key={option.key}
            option={option}
            index={i}
            selected={
              justSelected === option.key || answers[question.id] === option.key
            }
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

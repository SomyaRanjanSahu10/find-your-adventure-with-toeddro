export default function QuestionCard({ option, selected, onSelect, index }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.key)}
      aria-pressed={selected}
      className={`press-hard w-full min-w-0 max-w-full text-left rounded-toeddro border-3 border-ink p-5 flex items-center gap-4
        focus-visible:outline focus-visible:outline-4 focus-visible:outline-violet
        ${
          selected
            ? "bg-lime shadow-hard"
            : "bg-white shadow-hard hover:-translate-y-0.5 hover:shadow-hard-lg"
        }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="text-3xl shrink-0" aria-hidden="true">
        {option.emoji}
      </span>
      <span className="font-display text-lg leading-tight min-w-0 break-words">
        {option.label.toUpperCase()}
      </span>
    </button>
  );
}

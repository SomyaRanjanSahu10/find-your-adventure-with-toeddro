export default function ProgressBar({ current, total }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="font-display text-xs bg-ink text-cream px-4 py-2 rounded-pill uppercase tracking-wide"
        aria-hidden="true"
      >
        Question {current} of {total}
      </span>
      <div
        className="flex items-center gap-2"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-ink ${
              i < current ? "bg-lime" : "bg-cream"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

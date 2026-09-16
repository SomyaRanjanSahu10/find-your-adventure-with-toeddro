import { MapPin, RotateCcw } from "lucide-react";
import OperatorCard from "./OperatorCard.jsx";

export default function Result({ recommendation, onRestart }) {
  const { activity, region, description, operators } = recommendation;

  return (
    <div className="w-full min-w-0 max-w-full rise-in flex flex-col gap-6">
      <div
        className="w-full min-w-0 rounded-toeddro border-3 border-ink shadow-hard-lg p-6 sm:p-8"
        style={{
          background:
            "linear-gradient(135deg, #B6FF3C 0%, #9FF0CF 45%, #3FE0D0 100%)",
        }}
      >
        <span className="inline-block bg-ink text-cream font-display text-xs uppercase tracking-wide px-4 py-2 rounded-pill">
          Your Adventure
        </span>

        <h2 className="font-display text-4xl sm:text-5xl uppercase mt-5 leading-[0.95] break-words">
          {activity}
        </h2>

        <p className="font-display text-sm uppercase mt-3 flex items-center gap-1.5 text-ink/80">
          <MapPin size={16} aria-hidden="true" />
          {region}
        </p>

        <p className="font-body text-ink/80 mt-4 max-w-md">{description}</p>
      </div>

      <div>
        <h3 className="font-display text-lg uppercase mb-4">
          {operators.length > 0
            ? `${operators.length} operator${
                operators.length > 1 ? "s" : ""
              } to check out`
            : "Operators"}
        </h3>

        {operators.length > 0 ? (
          <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {operators.map((op) => (
              <OperatorCard key={op.id} operator={op} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-toeddro border-3 border-ink shadow-hard p-6 text-center">
            <p className="font-body text-ink/80">
              We found your adventure, but there aren&apos;t enough matching
              operators available yet.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="press-hard self-start inline-flex items-center gap-2 bg-white text-ink font-display text-sm uppercase px-6 py-4 rounded-pill border-3 border-ink shadow-hard"
      >
        <RotateCcw size={16} aria-hidden="true" />
        Take the quiz again
      </button>
    </div>
  );
}

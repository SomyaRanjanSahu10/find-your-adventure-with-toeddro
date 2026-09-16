import { ArrowRight, Sparkles } from "lucide-react";

export default function Intro({ onStart }) {
  return (
    <div
      className="min-h-full w-full min-w-0 max-w-full rounded-toeddro border-3 border-ink shadow-hard-lg p-6 sm:p-10 rise-in"
      style={{
        background:
          "linear-gradient(135deg, #B6FF3C 0%, #9FF0CF 45%, #3FE0D0 100%)",
      }}
    >
      <span className="inline-flex items-center gap-2 bg-ink text-cream font-display text-xs uppercase tracking-wide px-4 py-2 rounded-pill">
        <Sparkles size={14} className="text-lime" aria-hidden="true" />
        Toeddro &middot; Find Your Adventure
      </span>

      <h1 className="font-display text-ink text-5xl sm:text-6xl leading-[0.95] mt-6 uppercase min-w-0 max-w-full">
        Find your
        <br />
        <span className="bg-coral text-white px-2 inline-block max-w-full -rotate-1 shadow-hard-sm break-words">
          adventure.
        </span>
      </h1>

      <p className="font-body text-ink/80 text-base sm:text-lg mt-6 max-w-sm">
        Not sure what you want to do? Five quick choices. One adventure
        waiting for you.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="press-hard mt-10 w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-ink text-cream font-display text-base sm:text-lg uppercase px-8 py-5 rounded-pill border-3 border-ink shadow-hard"
      >
        Start the adventure
        <ArrowRight size={20} aria-hidden="true" />
      </button>

      <p className="font-body text-ink/70 text-xs mt-8">
        5 questions &middot; takes about 30 seconds
      </p>
    </div>
  );
}

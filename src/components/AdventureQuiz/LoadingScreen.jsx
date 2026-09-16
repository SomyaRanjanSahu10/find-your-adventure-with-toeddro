export default function LoadingScreen() {
  return (
    <div
      className="min-h-full w-full min-w-0 max-w-full rounded-toeddro border-3 border-ink shadow-hard-lg p-10 flex flex-col items-center justify-center text-center gap-6 rise-in"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-lime border-2 border-ink pulse-dot" />
        <span
          className="w-4 h-4 rounded-full bg-coral border-2 border-ink pulse-dot"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-4 h-4 rounded-full bg-violet border-2 border-ink pulse-dot"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="font-display text-2xl uppercase text-ink break-words">
        Finding your adventure&hellip;
      </p>
    </div>
  );
}

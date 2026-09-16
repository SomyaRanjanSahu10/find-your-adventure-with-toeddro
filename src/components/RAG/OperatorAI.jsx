import { useMemo, useState } from "react";
import { Sparkles, Send, LoaderCircle } from "lucide-react";
import OperatorCard from "../AdventureQuiz/OperatorCard.jsx";
import { askOperatorAI } from "../../services/ragApi.js";

export default function OperatorAI() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const context = useMemo(() => ({
    operatorIds: result?.operators?.map((op) => op.id) ?? [],
    previousQuestion: result?.intent?.originalQuery ?? "",
  }), [result]);

  async function submit(event) {
    event.preventDefault();
    if (!question.trim() || loading) return;
    setLoading(true);
    setError("");
    try {
      const data = await askOperatorAI(question.trim(), context);
      setResult(data);
      setQuestion("");
    } catch (err) {
      setError(err.message || "We couldn't complete the AI recommendation right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-5 sm:mt-6 w-full min-w-0 max-w-full bg-white rounded-toeddro border-3 border-ink shadow-hard p-5 sm:p-6 rise-in">
      <div className="flex items-center gap-2">
        <Sparkles size={18} aria-hidden="true" />
        <h2 className="font-display text-lg uppercase">Ask about operators</h2>
      </div>
      <p className="font-body text-sm text-ink/70 mt-2">
        Ask a natural-language question and I&apos;ll find matches from the adventure operator data.
      </p>
      <form onSubmit={submit} className="mt-4 flex flex-col sm:flex-row gap-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={1000}
          disabled={loading}
          placeholder="e.g. Which operators provide trekking in Uttarakhand?"
          className="min-w-0 flex-1 bg-cream border-3 border-ink rounded-pill px-5 py-4 font-body outline-none focus:ring-2 focus:ring-ink/20"
          aria-label="Ask about adventure operators"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="press-hard inline-flex items-center justify-center gap-2 bg-ink text-cream font-display text-sm uppercase px-6 py-4 rounded-pill border-3 border-ink shadow-hard disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}
          {loading ? "Finding..." : "Ask AI"}
        </button>
      </form>

      {loading && (
        <p className="font-body text-sm text-ink/70 mt-4" aria-live="polite">
          Finding relevant operators and generating a grounded recommendation...
        </p>
      )}

      {error && !loading && (
        <p className="font-body text-sm mt-4 text-ink/80" role="alert">{error}</p>
      )}

      {result && !loading && (
        <div className="mt-6">
          <p className="font-body text-ink/80">{result.answer}</p>
          {result.operators?.length > 0 && (
            <>
              <h3 className="font-display text-base uppercase mt-5 mb-4">
                {result.operators.length} operator{result.operators.length > 1 ? "s" : ""} found
              </h3>
              <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {result.operators.map((operator) => (
                  <div key={operator.id} className="flex flex-col gap-3">
                    <OperatorCard operator={operator} />
                    <p className="font-body text-sm text-ink/70 px-1">
                      <span className="font-display uppercase text-xs">Why it matches:</span>{" "}
                      {operator.reason}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

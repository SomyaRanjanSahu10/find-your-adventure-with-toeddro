import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function OperatorCard({ operator }) {
  const activity = operator.activity ?? operator.tag ?? "Adventure";
  const region =
    operator.region ??
    [operator.location, operator.state].filter(Boolean).join(", ") ??
    "";
  const listingUrl = operator.listingUrl ?? "#";
  const verified = operator.verified ?? false;

  return (
    <div className="bg-white min-w-0 w-full rounded-toeddro border-3 border-ink shadow-hard p-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-lime text-ink font-display text-xs uppercase px-3 py-1.5 rounded-pill border-2 border-ink">
          {activity}
        </span>
        {verified && (
          <span className="inline-flex items-center gap-1 bg-ink text-cream font-display text-xs uppercase px-3 py-1.5 rounded-pill">
            <CheckCircle2 size={13} aria-hidden="true" />
            Verified
          </span>
        )}
      </div>

      <h3 className="font-display text-xl uppercase leading-tight break-words">
        {operator.name}
      </h3>

      <p className="font-body text-sm text-ink/70 flex items-center gap-1.5 min-w-0 break-words">
        <MapPin size={15} aria-hidden="true" />
        {region || "India"}
      </p>

      <hr className="border-t-2 border-ink/10" />

      <a
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="press-hard inline-flex items-center justify-center gap-2 bg-lime text-ink font-display text-sm uppercase px-5 py-4 rounded-pill border-3 border-ink shadow-hard-sm"
      >
        Explore
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

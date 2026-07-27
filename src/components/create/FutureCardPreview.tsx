import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import type { CardHand } from "@/lib/journey/types";
import type { FutureQuadrant } from "@/types/future";

export function FutureCardPreview({
  draft,
  id,
  compact = false,
}: {
  draft: JourneyDraft;
  id?: string;
  compact?: boolean;
}) {
  const quadrant: FutureQuadrant = quadrantFromPosition(
    draft.position.x,
    draft.position.y,
  );
  const title =
    draft.title ||
    (draft.artifactName
      ? draft.artifactName
      : draft.characterName
        ? `A future for ${draft.characterName}`
        : "Your future");

  return (
    <div
      id={id}
      className={`rounded-2xl border border-ffie-line bg-ffie-surface shadow-[0_4px_16px_rgba(35,19,82,0.08)] ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <QuadrantPill quadrant={quadrant} />
        {draft.location && (
          <span className="text-xs text-ffie-muted">{draft.location} · 2036</span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ffie-ink">
        {title}
      </h3>

      {(draft.characterName || draft.role) && (
        <p className="mt-1 text-sm text-ffie-muted">
          {[draft.characterName, draft.role].filter(Boolean).join(" · ")}
        </p>
      )}

      {draft.narrative && (
        <p className="mt-4 text-sm leading-relaxed text-ffie-ink">
          {draft.narrative}
        </p>
      )}

      {draft.combinedTension && (
        <p className="mt-3 text-sm font-medium italic text-ffie-accent">
          {draft.combinedTension}
        </p>
      )}

      {(draft.publicPromise || draft.hiddenFunction) && (
        <div className={`mt-4 grid gap-3 text-sm ${compact ? "" : "md:grid-cols-2"}`}>
          <div className="rounded-lg bg-[#f6f4ff] p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-accent">
              Public promise
            </p>
            <p className="mt-1 text-ffie-ink">
              {draft.publicPromise || "—"}
            </p>
          </div>
          <div className="rounded-lg bg-[#fdf1ee] p-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#c8472a]">
              Hidden function
            </p>
            <p className="mt-1 text-ffie-ink">
              {draft.hiddenFunction || "—"}
            </p>
          </div>
        </div>
      )}

      {draft.imageDataUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={draft.imageDataUrl}
          alt="Uploaded artifact"
          className="mt-4 max-h-48 w-full rounded-lg object-cover"
        />
      )}

      {draft.cardHand && !compact && <CardProvenance hand={draft.cardHand} />}
    </div>
  );
}

function CardProvenance({ hand }: { hand: CardHand }) {
  const cards = [hand.risk, hand.benefit, hand.trust, hand.barrier, hand.transversal];
  return (
    <div className="mt-4 border-t border-ffie-line pt-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
        Card provenance
      </p>
      <ul className="mt-2 space-y-1 text-xs text-ffie-muted">
        {cards.map((card) => (
          <li key={card.id}>
            {card.name} — <span className="italic">{card.tension}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

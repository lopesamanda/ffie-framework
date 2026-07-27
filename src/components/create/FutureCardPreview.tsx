import {
  QUADRANT_LABELS,
  type FutureQuadrant,
} from "@/types/future";
import type { JourneyDraft } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";
import type { CardHand } from "@/lib/journey/types";

export function FutureCardPreview({
  draft,
  id,
}: {
  draft: JourneyDraft;
  id?: string;
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
      className="rounded-2xl border border-ffie-line bg-ffie-surface p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-ffie-accent-soft px-2.5 py-1 text-xs font-medium text-ffie-accent">
          {QUADRANT_LABELS[quadrant]}
        </span>
        {draft.location && (
          <span className="text-xs text-ffie-muted">{draft.location}</span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>

      {(draft.characterName || draft.role) && (
        <p className="mt-1 text-sm text-ffie-muted">
          {[draft.characterName, draft.role].filter(Boolean).join(" · ")} · 2036
        </p>
      )}

      {draft.narrative && (
        <p className="mt-4 text-sm leading-relaxed text-ffie-ink">
          {draft.narrative}
        </p>
      )}

      {draft.combinedTension && (
        <p className="mt-3 text-sm font-medium text-ffie-accent">
          {draft.combinedTension}
        </p>
      )}

      {(draft.publicPromise || draft.hiddenFunction) && (
        <div className="mt-4 grid gap-3 rounded-lg bg-ffie-bg/80 p-4 text-sm md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-ffie-muted">
              Public promise
            </p>
            <p className="mt-1 text-ffie-ink">
              {draft.publicPromise || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ffie-muted">
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

      {draft.cardHand && (
        <CardProvenance hand={draft.cardHand} />
      )}
    </div>
  );
}

function CardProvenance({ hand }: { hand: CardHand }) {
  const cards = [hand.risk, hand.benefit, hand.trust, hand.barrier, hand.transversal];
  return (
    <div className="mt-4 border-t border-ffie-line pt-4">
      <p className="text-xs uppercase tracking-wide text-ffie-muted">
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

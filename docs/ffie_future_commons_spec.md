# FFIE — Future Commons: Feature Design
No code. Extends the MVP journey and the earlier structural decisions (Research Findings / Future Commons split, no gamification, situated knowledge disclosed always).

---

## Ten questions, answered

**1. How should futures be represented visually?**
Not photo-first. A future's primary visual identity is its **position and tension**, not an image — a quadrant color tag and the tension statement carry more weight in the card than any artifact photo. Artifact images, when present, are secondary and small. This is the direct mechanism for avoiding the Pinterest trap (Q8): a photo grid makes the artifact the point; FFIE's point is the contradiction the artifact holds.

**2. Should the primary unit be the future, character, artifact, or ecosystem?**
**The Future** — the bound unit of character + artifact + tension together, matching the thesis's own definition of a diegetic prototype as an inseparable pair. Character, artifact, ecosystem role, and theme should exist only as **facets for browsing and filtering into the same set of Futures**, not as separate content types with their own detail pages. Splitting them into independent browsable entities (a "characters" section, an "artifacts" section) would fragment exactly the thing the method insists stays together — a persona is not legible without knowing what it made, and vice versa.

**3. How does a user discover another future?**
Three deliberately non-algorithmic paths, appropriate to a small, slow-growing collection: the **Matrix** (spatial — where does this future sit), the **Grid** (categorical — scan by quadrant/theme), and **Related Futures** links surfaced from whatever future someone is already looking at (relational — see §"Relationship between futures"). No free-text search and no personalized recommendation engine in MVP — at seed-dataset scale that's premature complexity solving a discovery problem the product doesn't have yet.

**4. How can users move between related futures?**
Four relationship types, all computed from fields that already exist in the data — no new taxonomy required:
- **Same tension** — futures seeded by overlapping Narrative Cards
- **Structural opposite** — a deliberately named link between futures at extreme, contrasting matrix positions (for the 8 seed entries, the thesis itself already reads OPEN HUMAN and A-EYE, or INSIDER and BOB, as diagonal opposites — this can be curated directly from Chapter 5's own analysis rather than invented)
- **Same theme**
- **Same power position** — e.g. "other futures built from a hegemonic position"

**5. How can different perspectives be compared?**
A dedicated **Compare** view: select 2–3 futures, see them side by side with the same field structure aligned (character, artifact, tension, quadrant), plotted together on a small shared matrix. This is a direct digital translation of the workshop's own Phase 5 (Share and Reflection), where groups read all outputs together as a "collective speculative landscape" — not a new interaction invented for the web, a faithful port of one that already existed.

**6. How can the interface surface contradictions and tensions?**
Structurally, not only in copy. An artifact's public promise and hidden function are always shown paired, in a visually split layout — never one without the other, and the data model should make it impossible to submit one without the other. The new **reflection question** field is the sharpest tool here: instead of the interface delivering a verdict on a future, it hands an open question back to whoever's looking, keeping the "provocation device" register (per the foundations doc) alive at the point of consumption, not just at the point of creation.

**7. How can feminist principles be reflected in interaction, not just explained in text?**
No like/star/upvote count anywhere — a vote count is an approval mechanic, and approval-seeking is exactly what flattens critical content into content-mill engagement. Location/position is a required, always-visible field on every character, never optional metadata — situatedness is enforced structurally, not just claimed in the About page. The Reposition mechanic (already speced for Research Findings) makes situated knowledge *felt*, not read — disagreement with the original placement is the actual lesson. Sort order is restricted to neutral options (recent, quadrant, alphabetical) — no "trending," since a trending sort would re-introduce a popularity hierarchy that contradicts the matrix's whole premise (there's no better or worse future).

**8. How can the system avoid becoming a generic Pinterest-style gallery?**
Matrix as the default view, not an infinite photo grid. No masonry layout. No algorithmic "for you" sorting. Every card, even in compact/grid form, keeps its tension statement and quadrant tag visible — never strips down to image-plus-title the way a Pinterest pin does. Discovery is reached only after the guided journey (Entry→Discovery, per the MVP journey doc) for first-time visitors, which paces entry deliberately rather than offering an open feed anyone can doomscroll from a cold start.

**9. What should be public?**
Once published: title, narrative, full character block (name, role, location, ecosystem context, desire, fear, values), full artifact block (name, promise, hidden function), tension, theme, time horizon, matrix position and the creator's placement justification, and card provenance.

**10. What should remain private?**
The submitter's real identity — publication is anonymous/pseudonymous by default, which matters given how personally people may project onto sensitive material (gender, race, migration status, disability). The Reflection-stage free text ("where do you feel this tension in your own life") is categorically different from the Future's public narrative — it's the visitor's own self-disclosure, not the fictional persona's story, and it is never published, only used privately to help seed the Creation stage. Also private: contact info, session/IP data, moderation notes and rejection reasons, unpublished drafts, and individual (non-aggregated) Reposition guesses from other visitors.

---

## Information architecture

```
Explore Futures
└── Future Commons
    ├── Matrix (default)
    ├── Grid (toggle)
    ├── Future detail (overlay over Matrix/Grid, also independently linkable/shareable)
    └── Compare (select 2–3 → side-by-side) — v2
```

## Navigation model

Matrix and Grid are two views of one dataset (a toggle, not two destinations). Opening a future keeps spatial context — it opens as an overlay/panel over whatever view the person was already in, not a full page navigation that loses their place — but every future also resolves to its own permalink so it can be shared or linked to directly from outside the product. Filters live in a persistent panel, not a separate page: Quadrant, Theme, Power Position, Time Horizon (architected now even though MVP only has one horizon, 2036 — the thesis's own roadmap toward a Three Horizons structure means this field will matter later).

## Future card structure (compact/grid representation)

- Quadrant color tag
- Title (the narrative headline — e.g. *"The Algorithmic Care Collective"*, not just the artifact's product name)
- Character name + one-line role
- Tension, as a short stated line
- Small provenance marks — which card category(ies) seeded it
- Theme tag(s)
- Artifact image, if present — small, secondary, never the dominant visual element

## Future detail page

- Title + full short narrative
- Character block: name, role, location/context, ecosystem role, desire, fear, values
- Artifact block: name, public promise / hidden function — always shown paired, split layout
- Tension statement, prominent
- Provenance: the specific Narrative Cards that seeded this future
- Matrix mini-map with this future's position, quadrant name, and the creator's own placement justification
- Theme, time horizon, location metadata
- **Reflection question**, posed to the viewer — the emotional close of the page, not a footnote
- Related Futures (same tension / structural opposite / same power position)
- Compare and Share/Download actions

## Filtering and discovery model

Filters: Quadrant, Theme, Power Position, Location (open text for Future Commons; fixed Brazil/Portugal for Research Findings only). Sort: Recent, Quadrant, Alphabetical — deliberately no popularity-based sort. No search in MVP. Curated **Trails** (a handful of hand-picked futures under an editorial framing, e.g. *"Futures where care becomes infrastructure"*) are a strong v2 addition once there's enough volume to make curation meaningful — with only 8 seed entries at launch, a trail would just be "half the dataset."

## Relationship between futures

All four relationship types (same tension, structural opposite, same theme, same power position) are computed from fields the data model already has, except "structural opposite" for the 8 seed entries, which should be hand-curated directly from Chapter 5's own comparative reading rather than computed — the thesis already did this analytical work.

## MVP version

Matrix + Grid toggle (already underway). Future detail overlay with the full field structure above. Filters: Quadrant, Theme, Power Position. Related Futures limited to "same quadrant" and a hand-curated "structural opposite" pairing for the 8 seed entries. No Compare, no Trails, no search.

## Advanced version (v2+)

Compare view. Curated Trails. Computed structural-opposite pairing once Future Commons has enough submissions for matrix-distance to be meaningful. Search. Aggregate (never individually-attributed) Reposition data surfaced on the detail page. An optional private "save your own answer" box for the reflection question, visible only to the visitor who wrote it.

---

## Data model implication — flagged, not yet actioned

The field list in this spec (title, narrative, ecosystem context, theme, time horizon, reflection question) is richer than the current `FutureCommonsEntry` shape in `docs/ffie_atlas_seed.md`. That file needs a follow-up revision to add these fields for all 8 seed entries before this can be built — a real writing task (a title and reflection question need to be authored per entry, not just extracted), not just a schema change. Flagging this now rather than doing it silently, since it's a meaningful piece of work on its own.

# FFIE — MVP Scope (MoSCoW)

| Feature | User value | Research value | Complexity | Priority |
|---|---|---|---|---|
| Framework explanation | Medium — context, not the hook | High — the thesis contribution, surfaced | Low — static content | **MUST** |
| Narrative Cards (full 19-card deck) | High — the central mechanic | High — the actual empirical instrument | Medium — deck extraction + draw/combine UI | **MUST** |
| Guided future creation | Very high — this is the product | High — demonstrates the method live | Medium-high — multi-step flow, state | **MUST** |
| Character creation | High — part of Creation, not standalone | High — the Embody phase | Low-medium — short guided fields | **MUST** |
| Artifact creation (external AI prompt + upload) | High | High — the Materialize phase | Medium — prompt generation + upload flow | **MUST** |
| AI-generated narratives (auto-draft the prose vignette) | Medium-high — lowers the writing barrier | Low-medium — polish, not rigor | Medium — LLM integration, tone risk | SHOULD |
| AI-generated images (in-platform generation) | High if built, but adds real cost | Low — aesthetic, not empirical | High — API cost, moderation of generated images | COULD |
| Future Gallery (grid view) | High — core discovery | Medium | Low-medium | **MUST** |
| Future Commons (moderated, growing collection) | High — the "see others" hook this whole project started from | Medium | Medium — moderation queue, Supabase | **MUST** |
| Future comparison | Medium | High — faithful port of the workshop's own Phase 5 | Medium | COULD |
| Filters (Quadrant/Theme/Power Position/Country) | High — makes Explore usable even at 8 entries | Medium | Low | **MUST** |
| Search | Low at MVP scale | Low | Medium | NOT NOW |
| Timeline (Three Horizons-style) | Low-medium | Medium-high — ties to your own stated next research step | High — no groundwork laid yet | NOT NOW |
| Ecosystem map | Low-medium | Medium | High — a second visualization competing with the matrix | NOT NOW |
| Sharing (download/share Future Output) | High — the payoff moment | Low-medium | Low-medium | **MUST** |
| User accounts | Low — pure friction here | Low | Medium-high | NOT NOW |
| Anonymous participation | High — protects submitters on sensitive content | Medium | Low — it's the absence of accounts | **MUST** |
| Save progress | Medium | Low | Medium — cheap, builds on the session id already planned | SHOULD |
| Export future as PDF | Low-medium — image export already covers sharing | Low | Medium | COULD |
| Research documentation (methodology, citations, publications) | Medium — matters to a specific audience | Very high — core to the portfolio/credibility function | Low | **MUST** |

## Recommended MVP — realistically buildable in Cursor

**Must have (ship this):** lean framework explanation inside About · full 19-card Narrative Card deck (Tension Cards + Potential Cards) · the guided Create journey (character + artifact creation as its sub-steps, not separate features) · Future Gallery (grid) + Future Commons (matrix, already scaffolded) with moderation · filters · sharing/download · anonymous participation (no accounts) · research documentation in About.

**Should have, right after:** AI-drafted narrative assist for people who don't want to write prose themselves · save/resume progress (cheap, since the anonymous session id is already part of the Create journey design).

**Explicitly deferred, not because they're bad ideas:** in-platform AI image generation, future comparison, search, PDF export — all real features, none of them block demonstrating the framework's value.

**Explicitly out of scope for now, not just "later":** user accounts (conflicts with the low-friction, anonymous model the whole product is built around), a Timeline view (no groundwork exists yet — this is closer to your next *research* step than a product feature), and an ecosystem map (a second major visualization would compete with the matrix rather than support it).

The real blocker to start building the MUST list isn't scope, it's content: ensure `docs/ffie_narrative_cards.md` stays aligned with the full 19-card deck used in the Create journey.

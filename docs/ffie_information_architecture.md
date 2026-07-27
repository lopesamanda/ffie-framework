# FFIE — Information Architecture
No code. Structure only — content/feature detail lives in the other docs already in `docs/`.

## One change to your proposed structure, explained

You proposed HOME / EXPLORE / CREATE / ABOUT. I'd keep three nav items, not four: **EXPLORE / CREATE / ABOUT**, with the "FFIE" wordmark itself as the home link (standard product pattern — Linear, Figma, Notion all do this; an explicit "Home" label reads more like a documentation site, which is the exact feel you said to avoid). Home still exists as a page, it's just not a menu item competing for attention with the three things a visitor actually comes to do.

## Why only three sections for five product goals

Your five goals don't map one-to-one to five destinations:

1. **Understand FFIE** → Home (glimpse) + About (depth)
2. **Explore futures** → Explore
3. **Create a future** → Create
4. **Reflect on alternative possibilities** → deliberately **not a destination**. Reflection happens inside Explore (the reflection question on every future, the Reposition mechanic) and inside Create (the Reflection stage of the journey). Giving it its own nav item would pull it out of the moments where it actually does its work.
5. **Understand the research** → About

## Global navigation

`FFIE` (wordmark, → Home) — `EXPLORE` — `CREATE` — `ABOUT`

## Sitemap

```
/                          Home
/explore                   Research Findings ⇄ Future Commons (matrix default, grid toggle)
/explore/[futureId]        Future detail (also a shareable permalink)
/explore/compare           v2
/create                    the single continuous journey (Entry→Discovery, one flow)
/create/[id]/output         a finished Future Output, shareable permalink
/about                     one scrollable page, anchored sections (not sub-pages)
/admin                     moderation only, not in nav
```

## Page hierarchy

**Primary nav** (always visible): Explore, Create, About.

**Secondary nav** (contextual, appears only within a section, never competing with primary nav):
- Inside Explore: collection switch (Research Findings / Future Commons), Map/Grid toggle, filters (Quadrant, Theme, Power Position, Country)
- Inside About: an in-page sticky sub-nav for its anchored sections (The Framework, The Research, Glossary) — one page, not three, matching the "digital product not documentation site" instruction. A tabbed or sidebar-tree About page is the single easiest way to accidentally rebuild a documentation site.

## Entry points

- Direct visit → Home
- Shared Future Output link → opens straight to `/create/[id]/output` or the published `/explore/[futureId]`, with a light banner for people arriving with zero context ("This future was made with FFIE — explore more or create your own")
- Academic/citation link → often lands directly on `/about`
- Recruiter/portfolio context (LinkedIn, CV) → most likely `/` or `/about`

## User flows

**First-time, curious visitor:** Home → Explore (browses Research Findings) → Create → Discovery (which *is* Explore, entered from inside the Create flow, not a separate destination) → leaves or loops back into Explore.

**Motivated visitor, wants to create immediately:** Home → Create straight through → Future Output → Discovery.

**Academic/recruiter visitor:** Home → About (credentials, methodology, thesis link) → possibly skims Explore for evidence → leaves.

**Returning visitor, checking a submission:** direct link, or Explore → finds their entry (published or still pending).

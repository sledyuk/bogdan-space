# bogdan.space: delivery redesign

**Date:** 2026-11-25
**Status:** Approved by Bogdan from a series of reviewed HTML mocks; replaces the
2026-07-07 design.

## Intent

Present Bogdan as someone who takes a product from an idea to a live release, with AI
agents writing most of the code and Bogdan owning decisions, tests and releases. The two
own products (DaySync, Kachkachi) are the evidence; AI Whisper is shown as freelance work.

## Decisions (from the review)

| Topic | Decision |
|---|---|
| Voice | Delivery: idea to result, the real techniques used, how the AI agents fit in |
| Hero | "Spec sheet": headline left, a card of rows right (role, delivers, AI workflow, own products, stack, location) |
| Fonts | Standard faces only: Geist Sans, Geist Mono for digits |
| Hero length | Short headline, one sentence, three buttons |
| Own products | DaySync and Kachkachi only in the hero; no start dates or origin lines |
| AI Whisper | "Product engineer, freelance"; described, not shown (client product) |
| Navigation | Floating dock (Projects menu, How I ship, Experience, contact button) |
| Experience | One list of companies and clients; each project tagged by domain and platform; filter by own / freelance / company |
| Finish | Component system: canvas, card and tile surfaces, one radius per role, chips, stat tiles, brand-coloured product sheets |

## Approaches considered for the hero

Project-first (two tiles, split stage, switcher, type-first) and person-first (portrait,
bento, name statement, spec sheet). Bogdan picked the spec sheet.

## Page order

Header, hero, "From idea to release" (six steps and four results), DaySync, Kachkachi,
AI Whisper, Experience with About, Contact, footer, dock.

## Facts and sources

Numbers come from the résumé, the DaySync and Kachkachi repositories and their docs.
Internal traction figures and AI Whisper internals (client names, costs, quality metrics)
are deliberately left out.

## Left open

- Whether to add an "open to roles" line.
- Which résumé PDF to serve (currently the Senior Software Engineer one).
- Whether KloutAgent gets a freelance row.

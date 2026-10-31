# VM Fantasy Battle – Přebíjená

Buildless Czech browser game. `dist/` is the deployable site; no server, accounts, API keys or paid AI calls are required for gameplay. Gamemaster is an automatic opponent with a pre-shuffled deck. 1v1 uses one shared device.

## Rules and assets

Based on `VM_Fantasy_Battle_Navod_CS_v4.pdf` and the user's published original cards at https://vinmat.eu/edugames/cs/hry/fantasy-battle/ (verified 2026-10-30). Each army has 3×1, 3×2, 3×3, 2×4, 2×5, one each 6–10, and a patron. Captured cards are set aside, not recycled. Ties carry a pot into another reveal. Exhausted final ties discard that pot. Final scores count captured plus remaining deck cards. Art was rendered from the original PDF cards, not regenerated. Patron's +5 label is covered by the UI's crown/PATRON badge because +5 is specific to the other game variant.

## Validation

`node tests/engine.test.mjs` checks patron priority, repeated ties, exhaustion, discarded pots, duplicate-action guards, save round trips and 1,000 complete randomized games with card conservation checks. Browser QA covers solo, incorrect-answer retry, 1v1, resume and responsive layout. Match progress stays in browser localStorage with no network sync. Storage failure does not block play. Sound is off by default.

Deployment is configured by `.openai/hosting.json`. There is no build step.

## Version 2 interaction

Each side has its own visible army preview, native selection and a nine-army visual picker, including the Gamemaster. Setup leads to a shuffle screen. Each click runs an animated shuffle AND permutes that player's real deck with Fisher–Yates. Human players can repeat indefinitely, but each must shuffle once; GM shuffles automatically. The shuffle count is saved, and launching keeps the last shuffled order.

Players reveal only by clicking their own deck. Solo always draws the human first; GM draws automatically 700 ms later. The human must choose Mám víc / Máš víc / Remíza before scores change. Duo has a selectable fixed starting player; the engine rejects out-of-turn reveals and preserves the selected order in every round and tiebreak. Wrong comparison answers still allow retries without penalty. Resume works in preparation and in gameplay, including a pending GM reveal.

## GitHub Pages and iPad

The deployable game is `public/fantasy-battle/`; Next static export copies it to `/edugames/fantasy-battle/`. Test the engine with `node tests/fantasy-battle.test.mjs`. CSS includes iPad landscape compaction, minimum 44px touch controls, safe-area padding and 16px touch input fonts. The Web App Manifest and Apple metadata support adding the game to the Home Screen. No service worker is installed; offline play is not promised.

## Bilingual edition and interaction update (2026-10-31)

English is the default at `/edugames/fantasy-battle/`; Czech lives at `/edugames/fantasy-battle/cs/`. Both entrypoints share game code, audio and card art. Per-language canonical/hreflang metadata, manifests and parent-page links keep addresses consistent. Saves and sound preference are shared on the same origin; names remain user data when changing language.

The game view now keeps each face-up card DOM node in its own persistent slot. Opponent reveals, errors and scoring do not replace that node or restart its reveal animation. Wrong comparisons show a blue-and-gold sword swoosh with localized feedback; points stay unchanged. Correct comparisons queue the next round after 950 ms (1,100 ms for a tiebreak), without a Next button. Every new card still requires its player's deck click; Gamemaster follows automatically. Saved resolved rounds schedule their own continuation on resume.

`audio.mjs` provides quiet procedural card rustle and nine army voices (metal, wood, bone, harp, bells, drums and airy low textures); no external audio service is used. Sound is opt-in and persisted. All iPad layout/touch rules remain in place.

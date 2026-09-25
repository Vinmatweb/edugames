# VinMat School Games

Bilingual website for free printable educational games, prepared for the final
address `https://vinmat.eu/edugames/`.

## Included in v0.1

- English home page and full Czech version under `/cs/`
- VM Fantasy Battle game page, rules and Czech printable downloads
- Racing Math game page, rules and Czech playtest download
- print-and-play guide
- project, privacy and terms pages
- responsive layout, keyboard focus states, sitemap and robots metadata
- inactive ad placements kept away from download controls

## Local development

```bash
pnpm install
pnpm dev
```

The application uses the base path `/edugames`, so the local page is
available at `/edugames/` rather than at the domain root.

## Production build

```bash
pnpm build
```

The production command creates a static export in `out/`. Upload the contents
of that directory to the `/edugames/` folder of the VinMat web hosting. The
same export is published automatically as the GitHub Pages preview.

## GitHub Pages preview

After the repository is pushed, open **Settings → Pages** and select
**GitHub Actions** as the publishing source. Every push to `main` will then
publish the preview at `https://vinmatweb.github.io/edugames/`.

Do not set `vinmat.eu` as the GitHub Pages custom domain. The production domain
continues to be served by FORPSI.

## Before enabling advertising

Advertising is intentionally disabled. The `AdSlot` component only marks safe
future positions after substantial content and away from download buttons.
Before adding AdSense:

1. obtain approval and the real publisher/slot IDs;
2. add a Google-certified consent management platform for the EEA, UK and
   Switzerland when required;
3. configure child/age-restricted treatment and use non-personalised or
   contextual advertising appropriate for this audience;
4. update both privacy pages before any advertising or analytics cookies load;
5. add a valid `ads.txt` entry only after the publisher ID exists;
6. test mobile layouts so ads cannot be mistaken for game or download controls.

Do not commit account IDs or consent configuration copied from another site.

## Content notes

- English is the canonical default language.
- Existing downloadable PDFs are currently Czech and are labelled as such.
- Racing Math is clearly marked as a playtest edition.
- Review the terms text before public launch if a different distribution licence
  is preferred.

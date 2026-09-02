# Google Sites migration audit

Source inspected: `https://www.robichip.com/` and the signed-in Google Sites editor.

Destination: `Robichip/robichip-website`.

## Migrated public routes

| Google Sites route | Static route | Status |
| --- | --- | --- |
| `/首頁` | `/` and `/首頁` | Migrated |
| `/robisoc` | `/robisoc` | Migrated |
| `/robidev` | `/robidev` | Migrated |
| `/robithrust` | `/robithrust` | Migrated |
| `/robitorque` | `/robitorque` | Migrated |
| `/technology-insights` | `/technology-insights` | Migrated |
| `/technology-insights/robithrust-ecx32-test-observation` | Same | Migrated; plots pending |
| `/technology-insights/why-power-density-matters` | Same | Migrated |
| `/technology-insights/robidev-to-design-in` | Same | Migrated |
| `/technology-insights/propulsion-validation` | Same | Migrated |
| `/robiagent` | `/robiagent` | Migrated |
| `/robilab` | `/robilab` | Migrated |
| `/news-events` | `/news-events` | Migrated |
| `/news-events/2026-TAIROS` | Same | Migrated; image pending |
| hidden SEMICON Taiwan detail | `/news-events/semicon-taiwan-2026` | Migrated; image pending |
| `/news-events/news-events-best-AI-Awards` | Same | Migrated; image pending |
| hidden Swancor MOU detail | `/news-events/swancor-tech-mou` | Migrated; original YouTube video retained |
| hidden COMPUTEX InnoVEX detail | `/news-events/2026-computex-innovex` | Migrated; image pending |
| hidden Taichung forum detail | `/news-events/taichung-unmanned-vehicle-forum` | Migrated; image pending |
| `/partnership` | `/partnership` | Migrated |
| `/join-us` | `/join-us` | Migrated |
| hidden privacy page | `/privacy-policy` | Structure migrated; legal review required |

The hidden working routes `/work`, `/v1`, `/v2`, `/v3`, `/temp`, and the empty `/robigrip` page are retained as no-index archive placeholders and are not linked from public navigation. The source page named `Private Policy` is additionally preserved at `/private-policy` as a no-index alias of the existing migration-ready privacy-policy location.

## Reused repository assets

- `assets/images/robichip-logo.png`
- `assets/images/robidev-platform.png`
- `assets/images/robithrust-platform.png`
- `assets/images/robilab-validation.png`

## Placeholders to complete

Search for `data-migration-placeholder="true"` in the rendered site or `mediaPlaceholder(` in `assets/site.js`.

Current placeholders cover original Google Sites media that could not be reliably exported during the first pass:

- RobiThrust bench video.
- RobiTorque actuator fixture image.
- ECX-32 charts and plots.
- TAIROS, SEMICON Taiwan, Best AI Awards, COMPUTEX InnoVEX, and Taichung forum photos.

## Cutover checklist

- Review every route on desktop and mobile.
- Replace or approve all media placeholders.
- Approve final product wording and numerical claims.
- Obtain legal approval for Privacy Policy and third-party widget disclosures.
- Confirm Elfsight widget behavior and plan limits on all routes.
- Confirm Google Analytics consent requirements and data collection.
- Enable GitHub Pages from `master` / root if not already enabled.
- Verify the GitHub Pages preview domain before changing DNS.
- Move `www.robichip.com` DNS only after approval.
- Re-run link, metadata, accessibility, and performance checks after DNS cutover.

No changes were made to or published from the source Google Site during this migration pass.

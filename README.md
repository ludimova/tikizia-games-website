# Tikizia Games website

Static, bilingual website for Tikizia Games and Conoche?. Spanish lives at
the root; corresponding English pages live under `/en/`. Public help and
policies render without JavaScript or authentication.

## Build and validate

Use Node.js 22 or later, with no package installation:

```
node scripts/build-site.mjs
node --test scripts/test-site.mjs
node scripts/preview.mjs
node scripts/verify-deployment.mjs https://tikiziagames.com
```

The preview listens only on `127.0.0.1:4173`. Cloudflare Pages serves `public/`.
The generated HTML is committed, so the existing static deployment does not
need a new build service or framework.

## Content source

`content/conoche-app.json` contains 51 bilingual FAQs and the app's three legal
documents. Export it from the current app checkout with:

```
dart run tools/export_help_legal_web.dart PATH_TO_TIKIZIA_GAMES_WEBSITE --json
```

Then build and test this repository. Edit landing, support, deletion and
child-safety copy in `scripts/build-site.mjs`; edit styles in
`public/assets/css/site.css`. Do not hand-edit generated HTML. Changes to
legal obligations/data practices need operator review and must also remain
consistent with the app and Play Console disclosures.

The mascot is the approved app asset, copied without modification. Fonts are
self-hosted and their OFL licenses are included in `public/assets/fonts/`.
No visitor analytics or marketing SDK has been added. Search runs locally.
Public business contact addresses are deliberately readable without JavaScript,
using Cloudflare's documented HTML `email_off` comments; zone-wide security,
DNS and account settings are unchanged.

## Protected routes

Never replace `/auth/action/`, `/abrir-conoche/` or
`/.well-known/assetlinks.json` with a homepage redirect. They are not generated.
See `CONOCHE_AUTH_ACTION_ROUTE.md`. Do not include action codes in logs or tests.

## Delivery and rollback

Use the existing Cloudflare/GitHub integration; verify the configured branch
before production publication. Validate a branch preview and live URLs.
The pre-refresh baseline is commit `f1c6f18`. Revert the refresh commit to roll
back; never force-push or reset unrelated changes. Existing untracked review
drafts are not deployment inputs and must not be committed by accident.

The old one-time legal-hardening workflow has been replaced with a read-only
validation workflow. It must no longer commit replacement legal text to main.

## Scope

The app is in invited Android testing. Do not advertise unrestricted public
availability, an iPhone release, invented ratings/prices or guaranteed Play
approval. See `docs/WEBSITE_RELEASE_2026-09-24.md` for the requirement mapping.

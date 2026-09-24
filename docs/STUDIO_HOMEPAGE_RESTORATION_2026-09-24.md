# Tikizia Games: restore the studio homepage · 24 September 2026

## User correction and scope

Tikizia Games is the company for multiple games. The previous refresh incorrectly
made Conoche the homepage identity. Restore the original dark/orange studio
homepage and keep the Conoche presentation behind its game card.

This follow-up supersedes the homepage identity in `WEBSITE_RELEASE_2026-09-24.md`;
that report's existing app/help/legal route mapping remains valid.

## Resulting structure

- `/` and `/en/`: Tikizia Games studio, original dark/orange stylesheet and
  Permanent Marker/Inter typography, Costa Rica stripe, studio description,
  Conoche/Vinazo/future-game lineup, company FAQ and business contacts.
- Conoche's entire card is a keyboard-accessible link to `/conoche/` or
  `/en/conoche/`, with the approved app mascot instead of the old generic cover.
- The Conoche landing pages retain the app presentation and links to 51 FAQs,
  support, current privacy/terms/community/child-safety documents, deletion and
  invited tester installation. No game content or legal text was rolled back.
- Studio links label the current game policies as Conoche policies. There is
  no claim of a shared cross-game account, public release or Vinazo download.
- Existing policy URLs and external app links remain stable. Account action,
  password recovery, return-to-app, Android verification, DNS, mail and paid
  service configuration are unchanged.

## Implementation and checks

- `studio-home.mjs` is separate from the app landing generator; it cannot be
  overwritten by the app FAQ/legal export.
- Original `styles.css` is unchanged. `studio.css` adds local fonts, focus
  indicators, reduced-motion handling, linked-card and mobile refinements.
- Fonts are the original families from the official Google Fonts repository,
  served locally with their respective Apache/OFL licenses.
- New regression test failed on the Conoche-as-homepage version, then passed
  after separating the studio and product entry points.
- 55 static tests passed: all local links/assets/anchors, metadata, bilingual
  help, complete current app policies, protected-route hashes, and explicit
  studio-vs-game identity/navigation coverage.
- Post-deploy verifier extended to include the restored studio styles/fonts,
  studio metadata art and original non-Conoche game covers.

## Browser and publication

Local browser preview was blocked by the browser client; use the existing
Cloudflare Git preview instead, without weakening any browser protection.

- Preview `311904e7.tikizia-games-website.pages.dev`: restored orange wordmark,
  dark studio homepage and three game cards visually inspected on desktop.
- Homepage checked at 320, 390, 768 and 1366 px: document width does not exceed
  the available viewport. The mobile language selector was then moved beside
  the studio name so it does not add an unnecessary navigation row.
- Actual Spanish and English Conoche card navigation passed; each opens the
  matching app landing page. The app header returns to the studio homepage.
- Keyboard activation opens both a studio FAQ and the Conoche card. Conoche
  FAQ navigation and language switching work; searching “doodle” yields two
  answers in English and switching language restores the full Spanish FAQ.
- GitHub validation and Cloudflare preview deployment both passed.
- Production promotion and final deployed-file comparison: pending.

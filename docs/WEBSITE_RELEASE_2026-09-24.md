# Tikizia Games / Conoche? website refresh · 24 September 2026

## Public resources

| Need | Public URL | Scope |
| --- | --- | --- |
| Developer / app identity | https://tikiziagames.com/ | Tikizia Games, Luis Diego Mora, Costa Rica; official Conoche mascot |
| App description | https://tikiziagames.com/conoche/ | Current questions, games, creative activities, care and plans |
| FAQs | https://tikiziagames.com/faq/ | All 51 current app FAQs, 10 topics, accent-insensitive local search |
| Support | https://tikiziagames.com/support/ | support@tikiziagames.com, ticket vs email distinction, troubleshooting |
| Business contact | https://tikiziagames.com/contact/ | hello@tikiziagames.com |
| Privacy | https://tikiziagames.com/privacy/ | Current account, UGC, photos, calendar, purchase, notification, Resend and retention disclosures |
| Terms | https://tikiziagames.com/terms/ | Current activities, optional purchases, age/Spicy, account and UGC rules |
| Community | https://tikiziagames.com/community-guidelines/ | Blocks, connection vs content reports, moderation and prohibited conduct |
| Child safety | https://tikiziagames.com/child-safety/ | Public CSAE/CSAM standards and report/contact path |
| Account/data deletion | https://tikiziagames.com/delete-account/ | In-app path plus an external email request without sign-in or reinstall |
| Test access | https://tikiziagames.com/download/ | Existing internal Play test, invited-account restriction, store/update link |

Every page has an English equivalent under `/en/`, language links, canonical
metadata and footer links to the relevant policies. The legal pages are HTML,
not a downloadable PDF or sign-in-only document. The page date is written out
in each language rather than using an ambiguous numeric format.

## Content consistency

- App FAQ/legal text is exported mechanically, not manually paraphrased into
  conflicting policies. The generator adds website-only context and explicit
  child-safety standards to the existing prohibitions on child exploitation.
- Hidden connections are not described as deleted. Completed 9-question round
  deletion is not advertised as full account/chat/game-history deletion.
- Google Play subscriptions require separate cancellation. No price is invented.
- Spicy requires adults, a compatible connection and both people's opt-in.
- Account mail retained by Resend for 30 days is distinct from mailbox copies
  and the approximately one-year minimal server audit. No audit contains the
  action link or message body.
- The existing email-deletion target of 30 days after verification is retained
  as a target, not an instant-deletion or general 72-hour support promise.
- No new email delivery, analytics, payment, signup or form backend is introduced.

## Google Play scope and current official references

Reviewed on 24 September 2026:

- Account deletion: https://support.google.com/googleplay/android-developer/answer/13327111?hl=en
- User data/privacy: https://support.google.com/googleplay/android-developer/answer/10144311?hl=en
- UGC: https://support.google.com/googleplay/android-developer/answer/9876937?hl=en
- UGC moderation: https://support.google.com/googleplay/android-developer/answer/12923286?hl=en
- Child safety: https://support.google.com/googleplay/android-developer/answer/14747720?hl=en
- Resend retention: https://resend.com/pricing
- Existing deployment model: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/

The website supplies the public resources; this is **not a Google approval or
legal-compliance certification**. Play Console still needs accurate Data
safety answers, target audience/content rating, app access for reviewers and
any applicable child-safety declaration/designated individual. Public standards
do not replace actual report handling or required reports to authorities.
Do not self-certify these on behalf of the operator merely because this site
exists. Do not change store declarations, paid plans or app rollout in this task.

## Regression protections and QA

- 53 Node tests cover 23 HTML documents, internal links/anchors/assets, 51 FAQ
  answers in each language, all in-app legal sections, metadata, deletion CTA,
  store/test links, sitemap and three protected account/App Link files.
- Protected route contents match the pre-refresh baseline (normalizing only
  platform line endings): `/auth/action/`, `/abrir-conoche/`, assetlinks.json.
- Security headers add no-store/no-referrer for account actions without
  changing the sender or Firebase code.
- Existing untracked drafts are preserved and excluded from publication.
- The old self-writing legal workflow becomes read-only validation, preventing
  it from overwriting the refreshed policies on a later run.

## Browser and deployment verification

- Existing Cloudflare Pages project confirmed: `tikizia-games-website`,
  production `main`, existing domain `tikiziagames.com`. No new paid resources.
- Preview deployed through the existing Git integration. Checked layout at
  widths 320, 390, 768 and 1366 px; no horizontal overflow in tested routes.
- Browser checks: 51 answers per language; Garabato expansion; `conexion`
  matches accented text (11 results); no-results state; topic navigation resets
  search; keyboard expansion; corresponding English FAQ; legal/deletion pages.
- Spanish and English invalid-link states and the return-to-app fallback work.
  No real account token was used, no password changed and no test email sent.
- Main text contrast: navy 10.74:1, secondary text 5.50:1, buttons 4.99:1,
  small green labels 5.29:1; large gold brand lettering 3.14:1.
- Linux CI initially caught a Windows mixed-newline baseline in the protected
  route hash test. The baseline now hashes the actual original Git blobs after
  LF normalization. No protected route source was changed. CI subsequently passed.
- Production-only Cloudflare email obfuscation was detected by the live hash
  verifier. Public business contacts now use the documented `email_off` HTML
  markers, so they remain usable without JavaScript. This does not change any
  domain-wide security setting. Reference:
  https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
- Old homepage anchors for help/support/contact/deletion remain as visible
  links to the corresponding pages. `/games/conoche` and `/help/` redirect.
- `verify-deployment.mjs` checks all 22 pages, protected routes, sitemap,
  robots and current assets against local content, plus redirect/404 behavior
  and account-action privacy headers. Its output is the final deployment gate.

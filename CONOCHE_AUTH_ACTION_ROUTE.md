# Conoche? email-action route

The intended custom action URL is `https://tikiziagames.com/auth/action/`.
Keep this exact public HTTPS path when replacing or redeploying the Tikizia
Games site. A homepage fallback or a redirect that drops the query string
will break account recovery once the custom URL is enabled.

The production account-email flow now uses Firebase action codes delivered
through Resend to this custom route. The owner has confirmed receipt and
successful verification/password reset. The app retains its Firebase sender
fallback; old Firebase links must not be assumed to use this website.
Do not change sender credentials, DNS records or Firebase templates as part
of a visual website update. No credentials belong in this repository.
Do not reuse `auth.tikiziagames.com` for Resend: Cloudflare DNS already has
Firebase Mail DKIM and SPF records for that subdomain.

The page must accept Firebase's `mode`, `oobCode`, `apiKey`, and optional `lang`
and `continueUrl` query parameters. It must handle at least `verifyEmail`,
`resetPassword`, and `recoverEmail`. Treat `oobCode` as a one-time credential:
do not log it, add it to analytics, or include it in screenshots.

The successful action returns to `/abrir-conoche/`. Its Android association
depends on `/.well-known/assetlinks.json`, including the Google Play signing
certificate. Preserve both paths as well as the action route. The website
generator deliberately does not write any of these three files, and the
test suite verifies their contents against the pre-refresh baseline.

Before publishing, verify HTTP 200, the invalid-link state without a real
token, the no-referrer/no-store headers, and the association JSON. A full
email/reset test needs a disposable account and must not reset the owner's
Gmail or consume tokens from screenshots. This site refresh does not change
the Firebase/Resend sender or send new test messages.

# Conoche? email-action route

The intended custom action URL is `https://tikiziagames.com/auth/action/`.
Keep this exact public HTTPS path when replacing or redeploying the Tikizia
Games site. A homepage fallback or a redirect that drops the query string
will break account recovery once the custom URL is enabled.

As of 2026-09-23, Firebase Authentication still sends verification and
password-reset links to its default `firebaseapp.com/__/auth/action` page.
The domain `tikiziagames.com` is authorized, but changing the action URL in
Authentication > Templates fails with `EMAIL_TEMPLATE_UPDATE_NOT_ALLOWED`
(also reproduced through the documented Identity Toolkit config API). Do not
assume the custom route is live or remove the default flow. Recheck the
effective callback URI and a newly generated test email after this Firebase
restriction is resolved.

The Conoche? app now has an undeployed optional sender that can generate
Firebase action codes on the server and email links to this route through
Resend. It requires a verified `correo.tikiziagames.com` sender domain, a
`RESEND_API_KEY` Firebase Functions secret, and end-to-end tests before
deployment. Until those are ready, the app must retain the Firebase sender
fallback. Do not deploy the sender or claim that this route is active merely
because the page exists in the website repository.
Do not reuse `auth.tikiziagames.com` for Resend: Cloudflare DNS already has
Firebase Mail DKIM and SPF records for that subdomain.

The page must accept Firebase's `mode`, `oobCode`, `apiKey`, and optional `lang`
and `continueUrl` query parameters. It must handle at least `verifyEmail`,
`resetPassword`, and `recoverEmail`. Treat `oobCode` as a one-time credential:
do not log it, add it to analytics, or include it in screenshots.

Before switching the site, verify that the route returns HTTP 200 over HTTPS.
After either email delivery path points to the custom URL, complete email
verification and password recovery using a disposable Conoche? account, in
Spanish and English. If the new site cannot preserve this route after
activation, stop sending custom links and return to the Firebase sender.

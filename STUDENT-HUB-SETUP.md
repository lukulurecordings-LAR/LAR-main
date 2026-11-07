# Academy website and protected student hub

Public website: `/`. Student login: `/student/login`. Private hub: `/student`.

The consolidated Academy design is now the public homepage. The portal uses Supabase email sign-in. Only existing student accounts can request links; signing in alone does not grant enrolment.

The server verifies the Supabase user and an active, dated entitlement (`academy`, `plan_basic`, `plan_pro`, or `plan_vip`). It issues a random 15-minute lab session in a Secure, HttpOnly, SameSite cookie. Only its SHA-256 hash is stored. Every lab asset request checks both expiry and current entitlement. Direct asset access without enrolment is denied. Sign-out revokes the current lab session and Supabase session; other previously issued lab cookies expire within 15 minutes.

## Activation
1. In Vercel configure PUBLIC_SITE_URL and VITE_PUBLIC_SITE_URL as the deployed Academy origin. Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY for the browser. Configure SUPABASE_URL and SUPABASE_SECRET_KEY privately for the server. Never expose a service-role/secret key under a VITE name.
2. Apply the existing commerce foundation migration, then `supabase/migrations/20261107000100_student_lab_sessions.sql` to the correct Supabase project.
3. Add the production origin and `/student` to Supabase Auth's redirect allowlist; configure production email delivery. Preview deployments need their own explicit allowed origin. The PKCE sign-in link should be opened in the same browser/device that requested it.
4. Provision an approved student through Supabase Auth, add the matching `student_profiles` row and an active `academy` entitlement with appropriate start/end dates. Use administrative tools only. Students must not edit their own enrolments. Paid memberships remain managed by the existing billing webhook.
5. Deploy on Vercel with the included configuration. Generic static hosting/GitHub Pages cannot run these API routes or protect the lab assets.
6. Verify a real enrolled account, an account without enrolment, an expired entitlement, sign-out, direct lab URLs, and billing. No real student login/email or payment has been tested in this build.

## Simulator bundle
`api/_lab-assets/` contains a production build from `DjNastor/lukulu-daw-simulator` commit `d6ab3583036495b599bb9c5b8ebe3cdbb5f814c7`, built with `npm run build -- --base=/student-lab/`. These assets are bundled with the lab server function, never placed under public/ or dist/. Preserve that separation.

The simulator currently declares its audio engine disabled in appConfig. This integration provides the current learning workspace, not an assertion that every DAW control produces audio. Simulator progress remains browser-local. The hub lists subjects and practice prompts; full instructor lesson/video/assignment content has not been populated. No fake course completion or fake successful payments are shown.

## Checks
Node 24; `npm ci`; `npm run check`; `node scripts/test-student-access.mjs`.
Use `npx vercel dev` for backend testing. Plain Vite serves frontend previews only.

## Production status at inspection
The Vercel project had no configured environment variables and its latest deployment attempt was canceled. This update is prepared for review; activation needs the settings and migration above. Do not treat the HTML preview as a secure student portal.

## Operations
Periodically delete expired student_lab_sessions through a trusted database maintenance job. The lab-cookie permission window is 15 minutes; entitlement revocation is checked on every asset request. Already-loaded client code and downloaded resources cannot be recalled. Simulator assets contain no secrets or student records.

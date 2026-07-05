# Before 911

A bystander-facing crisis access landing page. A QR code on a flyer, memo, or poster opens this page, which helps someone quickly choose the right next step in a crisis: **911** for immediate danger, **988** for a mental health crisis, or **211** and local mobile crisis teams for everything else.

> **⚠️ This is a policy prototype, not an emergency service.**
> It exists to support policy discussion and pilot evaluation. It is not an official government site, and it must not be presented to the public as an emergency resource until every listed number has been verified and the deployment has been approved by the relevant local authorities and providers.

## Why this exists

Many 911 calls are not police emergencies — they're mental health crises, housing emergencies, or "something's wrong and I don't know who to call." Bystanders default to 911 because it's the only number everyone knows. This page tests a simple idea: **route by situation, in plain language, not by service acronym.** Most people don't know what 211 is; everyone understands "something's wrong, but it's not an emergency."

The reference deployment is a pilot proposal for Hillsborough County, Florida, where 211 is answered 24/7 by the Crisis Center of Tampa Bay.

## Adopting this for your county

The page is config-driven. To adapt it, you edit **one file**:

1. Fork this repo.
2. Copy `src/counties/hillsborough-fl.js` to `src/counties/your-county-st.js`.
3. Replace the county name, pilot name, local 211 note, and resource cards with your local, **provider-verified** services (mobile crisis teams, warmlines, county crisis centers, etc.).
4. Update the import at the top of `src/App.jsx` to point at your new file.
5. Work through the "Verify before launch" checklist below.
6. Deploy (instructions below) and generate a QR code from your live URL.

That's it — no other code changes required. Pull requests adding county configs are welcome, but note that this repo's maintainers cannot verify your local numbers; that responsibility stays with each deploying county.

## Verify before launch (checklist)

- [ ] Called every phone number listed on the page and confirmed it reaches the intended service
- [ ] Confirmed hours of operation and service area with each provider
- [ ] Confirmed with your local 211 operator that they're prepared for referral traffic
- [ ] Obtained approval from the relevant county/provider stakeholders to present this publicly
- [ ] Replaced the placeholder feedback logging with a real, privacy-preserving endpoint (see `track()` in `src/App.jsx`) — or removed the feedback section
- [ ] Reviewed all page copy with a crisis services practitioner
- [ ] Updated `repoUrl` in your county config
- [ ] QR captions on printed materials say "Scan to view the crisis access pilot" — **not** "Scan for emergency help" — until officially approved as a crisis pathway

## Local development

```bash
npm install
npm run dev
```

## Deployment

Any static host works. With [Vercel](https://vercel.com):

```bash
npm run build
npm i -g vercel
vercel --prod
```

Then generate a QR code from the live URL. For pilot measurement, tag each placement with a campaign parameter, e.g. `https://your-url.example/?src=library-flyer` — the page reads `?src=` and includes it in interaction logging.

## Measurement

The page logs pathway clicks, resource clicks, and anonymous feedback (`Yes / Somewhat / No`) to the browser console with the `?src=` placement tag and a timestamp. Before a live pilot, wire `track()` in `src/App.jsx` to a privacy-preserving analytics endpoint. **Never collect personal data — this page serves people in crisis.**

Suggested pilot metrics:

- QR scans by placement location (via `?src=` tags)
- Click-through rates on the 911 / 988 / 211 / mobile crisis pathways
- Anonymous usefulness feedback
- Time-of-day patterns

**QR generation:** create a distinct QR code for every physical placement, each encoding the live URL with its own `?src=` tag (e.g. `?src=hart-bus`, `?src=library-main`, `?src=memo`). This makes placement-level comparison possible with zero extra infrastructure — the page already reads the tag. Use high error correction (level H) so codes survive small print sizes and wear.

## Design principles

- **Route by situation, not service name.** Plain-language cards ("Someone is in danger right now") instead of acronyms.
- **The 211 pathway is the most prominent.** 911 and 988 already have public awareness; the underused middle path is what the pilot tests.
- **Calm and civic, not startup-y.** Public Sans + Source Serif 4, muted institutional palette, WCAG AA contrast, 44px tap targets, keyboard focus states, reduced-motion support.
- **Honest framing.** A visible banner and footer state that this is a prototype, not an emergency service.

## License

MIT — see [LICENSE](LICENSE). Fork it, adapt it, deploy it in your county.

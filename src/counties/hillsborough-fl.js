/**
 * COUNTY CONFIGURATION — Hillsborough County, Florida
 * ====================================================
 * This file is the ONLY file another county needs to edit to adopt
 * this page. Copy it (e.g. to `your-county-st.js`), replace the values,
 * and point the import in `src/App.jsx` at your new file.
 *
 * ⚠ EVERY phone number and URL below must be verified directly with the
 *   provider before any public launch. People in crisis will rely on it.
 */

export const county = {
  // Displayed in the header eyebrow and page copy
  name: "Hillsborough County",
  state: "Florida",
  pilotName: "Hillsborough Crisis Access Pilot",

  // Who answers 211 locally — shown under the 211 pathway card.
  // Leave as "" if you don't want this line.
  local211Note:
    "In Hillsborough County, 211 is answered 24/7 by the Crisis Center of Tampa Bay and can connect you to more than 3,000 local services.",

  // Optional link for browsing 211 resources online
  browse211Url: "https://www.211atyourfingertips.org/",

  // Local resource cards shown below the three pathways.
  // VERIFY EACH ONE WITH THE PROVIDER BEFORE PUBLIC LAUNCH.
  resources: [
    {
      name: "Crisis Center of Tampa Bay — 211",
      description:
        "24/7 emotional support and connection to 3,000+ local services. Answers 211 for Hillsborough County.",
      actionLabel: "Call 211",
      actionHref: "tel:211",
    },
    {
      name: "988 Suicide & Crisis Lifeline",
      description:
        "24/7 support by call, text, or chat for suicidal thoughts, mental health, and substance use crises.",
      actionLabel: "Call or text 988",
      actionHref: "tel:988",
    },
    {
      name: "Gracepoint Mobile Crisis Response Team",
      description:
        "24/7 in-person crisis response for children and adults anywhere in Hillsborough County. Free.",
      // VERIFY: 813-272-2958 confirmed via gracepointwellness.org, July 2026.
      // Re-verify by phone before printing any QR code.
      actionLabel: "Call 813-272-2958",
      actionHref: "tel:8132722958",
    },
    {
      name: "Florida Veterans Support Line",
      description:
        "Support for veterans and their families, operated locally by the Crisis Center of Tampa Bay.",
      actionLabel: "Call 1-844-693-5838",
      actionHref: "tel:18446935838",
    },
  ],

  // Shown in the collapsible "For pilot evaluators" section.
  evaluatorNote:
    "Proposed pilot measurements: QR scan counts by placement location (campaign-tagged URLs, e.g. ?src=library-flyer), click-through rates on the 911, 988, 211, and mobile-crisis pathways, anonymous usefulness feedback, and time-of-day patterns. The goal is a low-cost evidence base for whether bystander-facing triage shifts non-emergency contacts away from 911 toward existing behavioral health infrastructure.",

  // Repo link shown in the footer — update after you fork.
  repoUrl: "https://github.com/YOUR-USERNAME/before-911",
};

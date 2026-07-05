import { useState } from "react";
import "./App.css";

// To adopt this page for your county: copy src/counties/hillsborough-fl.js,
// fill in your local resources, and change this import.
import { county } from "./counties/hillsborough-fl.js";

/** Campaign tag from the QR code URL, e.g. ?src=library-flyer */
function getSrcTag() {
  try {
    return new URLSearchParams(window.location.search).get("src") || "untagged";
  } catch {
    return "untagged";
  }
}

/**
 * Pilot measurement hook. Currently logs to the console only.
 * TODO before live pilot: send to a privacy-preserving endpoint.
 * Never collect personal data — this page serves people in crisis.
 */
function track(event, detail = {}) {
  console.log("[before-911]", {
    event,
    ...detail,
    src: getSrcTag(),
    timestamp: new Date().toISOString(),
  });
}

function PathwayCard({ variant, eyebrow, situation, detail, actions, note, primary }) {
  return (
    <section className={`pathway pathway--${variant} ${primary ? "pathway--primary" : ""}`}>
      <div className="pathway__eyebrow">{eyebrow}</div>
      <h2 className="pathway__situation">{situation}</h2>
      <p className="pathway__detail">{detail}</p>
      <div className="pathway__actions">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            className={`btn ${a.solid ? "btn--solid" : "btn--outline"}`}
            onClick={() => track("pathway_click", { pathway: variant, action: a.label })}
            {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {a.label}
          </a>
        ))}
      </div>
      {note && <p className="pathway__note">{note}</p>}
    </section>
  );
}

export default function App() {
  const [feedback, setFeedback] = useState(null);
  const [evalOpen, setEvalOpen] = useState(false);

  const giveFeedback = (answer) => {
    setFeedback(answer);
    track("feedback", { answer });
  };

  return (
    <div className="page">
      <div className="proto-banner" role="note">
        Prototype for policy discussion — not an official emergency service.
      </div>

      <main className="container">
        <header className="header">
          <div className="header__eyebrow">{county.pilotName}</div>
          <h1 className="header__title">Before 911</h1>
          <p className="header__subtitle">
            Not every crisis starts as a police emergency. Pick the situation below that best
            matches what you're seeing — this page will point you to the right help.
          </p>
        </header>

        <div className="safety-notice">
          <strong>If someone is in immediate danger, call 911 now.</strong> Everything else on
          this page is for situations where you have a moment to choose.
        </div>

        <div className="pathways">
          <PathwayCard
            variant="emergency"
            eyebrow="Emergency"
            situation="Someone is in danger right now"
            detail="Violence in progress · Serious injury · Medical emergency · Threat to life"
            actions={[{ label: "Call 911", href: "tel:911", solid: true }]}
          />

          <PathwayCard
            variant="lifeline"
            eyebrow="Mental health crisis"
            situation="Someone is struggling emotionally"
            detail="Suicidal thoughts · Mental health or substance use crisis · Severe emotional distress — counselors answer 24/7"
            actions={[
              { label: "Call 988", href: "tel:988", solid: true },
              { label: "Text 988", href: "sms:988" },
            ]}
          />

          <PathwayCard
            primary
            variant="guide"
            eyebrow="Not sure — start here"
            situation="Something's wrong, but it's not an emergency"
            detail="Housing · Food · Counseling · Financial help · 3,000+ local services — when police aren't the right fit"
            actions={[
              { label: "Call 211", href: "tel:211", solid: true },
              ...(county.browse211Url
                ? [{ label: "Browse 211 online", href: county.browse211Url, external: true }]
                : []),
            ]}
            note={county.local211Note}
          />
        </div>

        <section className="resources">
          <h2 className="section-title">
            {county.name} resources
          </h2>
          <p className="section-caption">
            Numbers below are drafts for the pilot and must be re-verified with each provider
            before any public posting.
          </p>
          <div className="resources__list">
            {county.resources.map((r) => (
              <div className="resource" key={r.name}>
                <div className="resource__name">{r.name}</div>
                <div className="resource__desc">{r.description}</div>
                <a
                  className="resource__action"
                  href={r.actionHref}
                  onClick={() => track("resource_click", { resource: r.name })}
                >
                  {r.actionLabel} →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="feedback">
          <h2 className="section-title section-title--small">
            Did this page help you find the right next step?
          </h2>
          {feedback ? (
            <p className="feedback__thanks">Thank you — your answer helps evaluate this pilot.</p>
          ) : (
            <div className="feedback__options">
              {["Yes", "Somewhat", "No"].map((opt) => (
                <button key={opt} className="feedback__btn" onClick={() => giveFeedback(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          )}
          <p className="feedback__fineprint">
            Anonymous. Demo only — in a live pilot, responses would flow to the pilot's operating organization.
          </p>
        </section>

        <section className="evaluators">
          <button className="evaluators__toggle" onClick={() => setEvalOpen(!evalOpen)}>
            {evalOpen ? "▾" : "▸"} For pilot evaluators
          </button>
          {evalOpen && <div className="evaluators__body">{county.evaluatorNote}</div>}
        </section>

        <footer className="footer">
         Prototype for policy discussion — not an official government site or emergency service.
         For immediate danger, call 911. This page uses no cookies and collects no personal
         information — anonymous, aggregate counts only (page visits and button choices) are
         used to evaluate the pilot. Resource listings are drafts and must be verified with
         each provider before public use. Open source:{" "}
          <a href={county.repoUrl} target="_blank" rel="noopener noreferrer">
            {county.repoUrl.replace("https://", "")}
          </a>
        </footer>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";

type Intent = "evaluation" | "quotation" | "meeting" | "partnership";

const intents: Array<{ value: Intent; label: string; detail: string }> = [
  { value: "evaluation", label: "Request Evaluation", detail: "Platform or validation fit" },
  { value: "quotation", label: "Request Quotation", detail: "Scope, quantity, and timing" },
  { value: "meeting", label: "Book a Meeting", detail: "Schedule a BD conversation" },
  { value: "partnership", label: "Discuss Partnership", detail: "Technology or market collaboration" },
];

export default function ContactForm({ initialIntent }: { initialIntent: Intent }) {
  const [intent, setIntent] = useState<Intent>(initialIntent);

  return (
    <form className="inquiry-form" action="https://formsubmit.co/bd@robichip.com" method="POST">
      <input type="hidden" name="_subject" value={`[RobiChip Web] ${intent}`} />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://robichip-homepage.robichip-ai-8830.chatgpt.site/contact/thanks" />
      <input type="hidden" name="_url" value="https://robichip-homepage.robichip-ai-8830.chatgpt.site/contact" />
      <fieldset className="intent-fieldset">
        <legend>How can we help? <b>*</b></legend>
        <div className="intent-grid">
          {intents.map((item) => (
            <label className={intent === item.value ? "intent-option active" : "intent-option"} key={item.value}>
              <input
                type="radio"
                name="intent"
                value={item.value}
                checked={intent === item.value}
                onChange={() => setIntent(item.value)}
              />
              <strong>{item.label}</strong>
              <small>{item.detail}</small>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-section-title"><span>01</span><h2>Your details</h2></div>
      <div className="form-grid">
        <label>Full name <b>*</b><input name="fullName" type="text" autoComplete="name" maxLength={100} required /></label>
        <label>Work email <b>*</b><input name="email" type="email" autoComplete="email" maxLength={160} required /></label>
        <label>Company / organization <b>*</b><input name="company" type="text" autoComplete="organization" maxLength={160} required /></label>
        <label>Job title<input name="jobTitle" type="text" autoComplete="organization-title" maxLength={120} /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" maxLength={60} /></label>
        <label>Country / region<input name="region" type="text" autoComplete="country-name" maxLength={100} /></label>
      </div>

      <div className="form-section-title"><span>02</span><h2>Project context</h2></div>
      <div className="form-grid">
        <label>Application <b>*</b>
          <select name="application" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option>UAV / Drone propulsion</option>
            <option>Robotics actuator / joint</option>
            <option>Motor drive</option>
            <option>Power module / Power SoC</option>
            <option>Thermal or validation service</option>
            <option>Technology / channel partnership</option>
            <option>Other</option>
          </select>
        </label>
        <label>Project stage
          <select name="projectStage" defaultValue="">
            <option value="">Select one</option>
            <option>Concept / architecture</option>
            <option>Prototype / EVT</option>
            <option>Validation / DVT</option>
            <option>Pilot / design-in</option>
            <option>Production</option>
          </select>
        </label>

        {intent === "meeting" && (
          <>
            <label>Preferred meeting window <b>*</b><input name="preferredWindow" type="text" placeholder="e.g. Aug 20–22, afternoons" maxLength={160} required /></label>
            <label>Time zone <b>*</b><input name="timeZone" type="text" defaultValue="GMT+8 / Taipei" maxLength={80} required /></label>
          </>
        )}

        {intent === "quotation" && (
          <>
            <label>Estimated quantity<input name="quantity" type="text" placeholder="Prototype and/or annual quantity" maxLength={120} /></label>
            <label>Target timing<input name="targetTiming" type="text" placeholder="e.g. EVT in Q4 2026" maxLength={120} /></label>
          </>
        )}

        <label className="full-width">Requirements / questions <b>*</b>
          <textarea name="details" rows={7} maxLength={4000} placeholder="Tell us the application, key specifications, constraints, and what you would like to evaluate." required />
        </label>
      </div>

      <label className="consent-row">
        <input name="consent" type="checkbox" value="yes" required />
        <span>I agree that RobiChip may use this information to respond to my inquiry and that FormSubmit will process the submission for email delivery. <b>*</b></span>
      </label>
      <label className="honeypot" aria-hidden="true">Website<input name="_honey" type="text" tabIndex={-1} autoComplete="off" /></label>

      <button className="submit-button" type="submit">
        Send to RobiChip BD<span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">Required fields are marked with *. Please do not include confidential design files or trade secrets in this form.</p>
    </form>
  );
}

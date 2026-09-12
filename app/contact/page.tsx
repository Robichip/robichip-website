import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./contact-form";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact RobiChip | Meeting, Evaluation & Quotation",
  description:
    "Tell RobiChip about your robotics, UAV, motor-drive, power-module, or validation project.",
};

const allowedIntents = ["evaluation", "quotation", "meeting", "partnership"] as const;
type Intent = (typeof allowedIntents)[number];

function normalizeIntent(value: string | string[] | undefined): Intent {
  const candidate = Array.isArray(value) ? value[0] : value;
  return allowedIntents.includes(candidate as Intent) ? (candidate as Intent) : "evaluation";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string | string[] }>;
}) {
  const params = await searchParams;
  const intent = normalizeIntent(params.intent);

  return (
    <main className="contact-page">
      <header className="contact-header">
        <Link href="/" className="contact-brand" aria-label="RobiChip home">
          <img
            src="/brand/robichip-logo-transparent.png"
            alt="RobiChip"
            width="2048"
            height="380"
          />
        </Link>
        <Link href="/" className="contact-home-link">
          Back to Home <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section className="contact-hero">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-shell contact-hero-grid">
          <div>
            <p className="contact-eyebrow">Start a design-in conversation</p>
            <h1>Tell Us What You Are Building</h1>
            <p className="contact-lead">
              Share the application, constraints, and timeline. Our team will review your request and identify the most useful next step.
            </p>
          </div>
          <div className="contact-route" aria-label="What happens next">
            <span>01</span><p><strong>Send your project context</strong><small>About 3–5 minutes</small></p>
            <span>02</span><p><strong>RobiChip reviews the fit</strong><small>Platform, validation, or partnership</small></p>
            <span>03</span><p><strong>BD follows up directly</strong><small>Using the work email you provide</small></p>
          </div>
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-shell contact-body-grid">
          <aside className="contact-aside">
            <p className="contact-eyebrow dark">Useful context</p>
            <h2>Help us route your request.</h2>
            <p>Technical details do not need to be final. Early specifications, operating constraints, and validation questions are welcome.</p>
            <ul>
              <li><span>01</span> Application and operating scenario</li>
              <li><span>02</span> Voltage, power, torque, thrust, or thermal targets</li>
              <li><span>03</span> Prototype, validation, or production timing</li>
            </ul>
            <div className="contact-direct">
              <span>Direct contact</span>
              <a href="mailto:bd@robichip.com">bd@robichip.com</a>
              <a href="tel:+886277015728">+886-2-7701-5728</a>
            </div>
          </aside>
          <ContactForm initialIntent={intent} />
        </div>
      </section>

      <footer className="contact-footer">
        <div className="contact-shell contact-footer-grid">
          <Link href="/" className="contact-brand" aria-label="RobiChip home">
            <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
          </Link>
          <div>
            <span>Connect</span>
            <a href="https://www.linkedin.com/company/robichip/?viewAsMember=true" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://www.facebook.com/robichipTW" target="_blank" rel="noreferrer">Facebook ↗</a>
            <a href="https://www.youtube.com/channel/UCqp-CDSVPCX8TfYT_aVScpg" target="_blank" rel="noreferrer">YouTube ↗</a>
          </div>
          <p>© 2026 RobiChip Technology Co., Ltd.</p>
        </div>
      </footer>
    </main>
  );
}

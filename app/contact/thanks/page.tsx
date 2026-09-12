import type { Metadata } from "next";
import Link from "next/link";
import "../contact.css";

export const metadata: Metadata = {
  title: "Request Received | RobiChip",
  description: "Your inquiry has been sent to RobiChip Business Development.",
};

export default function ContactThanksPage() {
  return (
    <main className="contact-page thanks-page">
      <header className="contact-header">
        <Link href="/" className="contact-brand" aria-label="RobiChip home">
          <img src="/brand/robichip-logo-transparent.png" alt="RobiChip" width="2048" height="380" />
        </Link>
        <Link href="/" className="contact-home-link">Back to Home <span aria-hidden="true">↗</span></Link>
      </header>
      <section className="thanks-section">
        <div className="contact-success" role="status">
          <span aria-hidden="true">✓</span>
          <p className="contact-eyebrow dark">Request received</p>
          <h1>Thank you for contacting RobiChip.</h1>
          <p>Our Business Development team will review your information and reply using the work email you provided.</p>
          <div className="thanks-actions">
            <Link href="/">Return to Homepage</Link>
            <Link href="/contact?intent=meeting">Send Another Request</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

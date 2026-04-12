"use client";

import { useState, FormEvent } from "react";

interface ContactFormProps {
  /** Show inquiry type dropdown */
  showInquiryType?: boolean;
  /** Show country field */
  showCountry?: boolean;
  /** Button text */
  buttonText?: string;
}

const inquiryTypes = [
  "Product Enquiry",
  "Request for Quotation",
  "OEM / Private Label",
  "Sample Request",
  "Technical Support",
  "Distributor Partnership",
  "Other",
];

export default function ContactForm({
  showInquiryType = false,
  showCountry = false,
  buttonText = "Send Enquiry",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string" && value.trim()) {
        body[key] = value.trim();
      }
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Message Sent!</h3>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your enquiry. We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label">Full Name *</label>
          <input id="cf-name" name="name" type="text" required className="input" placeholder="John Smith" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="label">Phone / WhatsApp</label>
          <input id="cf-phone" name="phone" type="tel" className="input" placeholder="+1 555 0100" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className="label">Email Address *</label>
        <input id="cf-email" name="email" type="email" required className="input" placeholder="john@company.com" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-company" className="label">Company</label>
          <input id="cf-company" name="company" type="text" className="input" placeholder="Company name" />
        </div>
        {showCountry ? (
          <div>
            <label htmlFor="cf-country" className="label">Your Country</label>
            <input id="cf-country" name="country" type="text" className="input" placeholder="e.g. United States" />
          </div>
        ) : (
          <div>
            <label htmlFor="cf-phone2" className="label">Phone / WhatsApp</label>
            <input id="cf-phone2" name="phone" type="tel" className="input" placeholder="+1 555 0100" />
          </div>
        )}
      </div>

      {showInquiryType && (
        <div>
          <label htmlFor="cf-inquiry" className="label">Inquiry Type *</label>
          <select id="cf-inquiry" name="inquiry_type" required className="input" defaultValue="">
            <option value="" disabled>Select inquiry type...</option>
            {inquiryTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="cf-message" className="label">Message *</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          className="textarea"
          placeholder="Please describe your requirements, including product names, quantities, and any special specifications..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full justify-center py-3.5"
      >
        {status === "loading" ? "Sending..." : buttonText}
      </button>
    </form>
  );
}

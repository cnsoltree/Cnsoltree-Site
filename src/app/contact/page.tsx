import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Cnsoltree for product enquiries, OEM pricing, samples, or technical support. Our sales team responds within 24 hours.",
};

const contactInfo = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Address",
    value: "Fenghuang Industrial Zone, Baishi Town, Yueqing Zhejiang P. R. China",
    href: null,
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "Jacky@cnsoltree.com",
    href: "mailto:Jacky@cnsoltree.com",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Phone",
    value: "+86-13693313816",
    href: "tel:+8613693313816",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.965.985-3.595A9.816 9.816 0 012.12 12c0-5.453 4.436-9.88 9.909-9.88S21.938 6.547 21.938 12c0 5.454-4.437 9.88-9.909 9.88z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+86-13693313816",
    href: "https://wa.me/8613693313816",
  },
];



export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-gray-100 bg-gray-50 py-12">
        <div className="container">
          <nav className="mb-4 flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Contact Us</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-3 max-w-2xl text-base text-gray-500">
            Send us an enquiry and our sales team will respond within 24 hours.
            Samples, technical datasheets, and OEM pricing available on request.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Contact Info */}
            <div className="space-y-5 lg:col-span-1">
              <h2 className="text-lg font-bold text-gray-900">Get in Touch</h2>

              {contactInfo.map((info) => (
                <div key={info.label} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="mt-0.5 text-sm text-gray-800 hover:text-green-700 transition-colors"
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-gray-700">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Working hours */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Business Hours</h3>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Monday – Friday</dt>
                    <dd className="font-medium text-gray-800">09:00 – 22:00 CST</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Saturday</dt>
                    <dd className="font-medium text-gray-800">09:00 – 22:00 CST</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Sunday</dt>
                    <dd className="font-medium text-gray-800">09:00 – 22:00 CST</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-gray-400">
                  Emails are monitored outside hours. We aim to respond within 24 hours on business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-flat">
                <h2 className="text-lg font-bold text-gray-900">Send an Enquiry</h2>
                <p className="mt-1 mb-6 text-xs text-gray-500">
                  All fields marked * are required.
                </p>
                <ContactForm showInquiryType buttonText="Send Enquiry" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
            {[
              { icon: "⚡", title: "Fast Response", desc: "Sales team replies within 24 business hours." },
              { icon: "📦", title: "Samples Available", desc: "Request product samples before placing bulk orders." },
              { icon: "🔧", title: "Technical Support", desc: "Engineers available for application consultation." },
            ].map((item) => (
              <div key={item.title} className="card-flat">
                <p className="text-3xl">{item.icon}</p>
                <h3 className="mt-3 text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

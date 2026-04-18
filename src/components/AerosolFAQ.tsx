"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is a DIN Rail Aerosol Fire Extinguisher and where is it used?",
    a: "A DIN Rail Aerosol Fire Extinguisher is a compact fire suppression device designed specifically to snap onto standard 35mm DIN rails found in electrical cabinets. It is used to protect enclosed spaces like meter boxes, server racks, and low-voltage switchgear by extinguishing fires at the source before they spread.",
  },
  {
    q: "Is the aerosol residue harmful to electronics?",
    a: "No. Soltree aerosol produces a micron-sized particulate that is non-corrosive and non-conductive. After a discharge, the fine dust can be blown out or wiped away. It does not damage circuit boards like water or foam would.",
  },
  {
    q: "How do I install the extinguisher on a DIN rail?",
    a: 'Installation is "plug-and-play." The QRR series features a specialized mounting clip that attaches directly to the 35mm guide rail. For cabinets without rails, the device also supports magnetic suction or screw fixation, allowing flexible placement near potential fire sources.',
  },
  {
    q: "Does the device require electricity to activate?",
    a: "No, it can operate passively. The primary activation method is a Thermal Sensing Cord that snakes through the cabinet. If the temperature hits 170°C, it triggers mechanically. However, for Smart models, electrical activation via smoke sensors or remote control is also supported.",
  },
  {
    q: "Do I need to check the pressure gauge annually?",
    a: "No. Unlike traditional gas cylinders, Soltree aerosol extinguishers are non-pressurized solid-state devices. They are maintenance-free for their entire 10-year service life. You do not need to perform annual weighing or pressure checks.",
  },
  {
    q: "What is the safety distance for the discharge nozzle?",
    a: "Keep the nozzle at least 0.3m away from the protected object (like wires or breakers) and 1.5m away from personnel. Ensure there are no obstacles within 500mm directly in front of the nozzle.",
  },
  {
    q: "Can I connect the extinguisher to a fire alarm control panel?",
    a: 'Yes. The device includes "Fire Feedback" and "Switch Output" terminals. When activated, it sends a passive contact signal to your main fire alarm system or BMS to indicate a discharge event.',
  },
  {
    q: "Is the aerosol residue conductive or corrosive to circuit boards?",
    a: "The Heat Aerosol Fire Extinguishing Device uses a new-generation formula that is non-corrosive and safe for electronics. While a fine particulate settles after discharge, it is non-conductive and can be cleaned. It is designed specifically for electrical environments.",
  },
  {
    q: "What happens if the main AC power is cut during a fire?",
    a: "For the Smart Series (connected to AC220V), the device has a built-in Power-off Continuous Work feature. It can continue to detect and operate for at least 10 seconds after a total power loss, ensuring protection during electrical faults.",
  },
  {
    q: "Does the DIN Rail series support RS485 or 4G monitoring?",
    a: "Yes. We offer specific models (RS485 Type and 4G Type) that integrate Modbus protocol. This allows real-time monitoring of temperature, smoke density, and device status via a PC or Mobile App.",
  },
  {
    q: "Can this be used in outdoor solar combiner boxes?",
    a: "Yes. The device is built for harsh environments. The integrated type works from -40°C to +70°C, and the standard type operates from -50°C to +90°C, making it ideal for outdoor PV inverters and battery storage systems.",
  },
];

export default function AerosolFAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center">
          <p className="section-eyebrow">FAQ</p>
          <h2 className="section-heading">Knowledge About DIN Rail Aerosol Fire Extinguishers</h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded bg-green-600" />
        </div>

        <div className="mx-auto mt-10 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50"
              >
                <span className={`text-sm font-semibold leading-snug ${open === i ? "text-green-700" : "text-gray-900"}`}>
                  {faq.q}
                </span>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${open === i ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96" : "max-h-0"}`}>
                <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cards = [
  {
    title: "Product support.",
    subtitle: "Get help from an expert.",
    cta: "Start Chat",
    icon: <SupportIcon />,
  },
  {
    title: "Billing support",
    subtitle: "Fix account or billing issues.",
    cta: "Start Chat",
    icon: <BillingIcon />,
  },
  {
    title: "Emergency support",
    subtitle: "Urgent help when your site's down.",
    cta: "Start Chat",
    icon: <EmergencyIcon />,
  },
  {
    title: "Talk to sales.",
    subtitle: "Work with us on enterprise solutions.",
    cta: "Talk To Sales",
    icon: <SalesIcon />,
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="px-[70px] py-[120px]">
        <div className="mx-auto max-w-[1300px] flex flex-col gap-8">

          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-[42px] leading-none tracking-[-0.25px] text-black">
              Contact
            </h1>
            <p className="font-serif text-[20px] leading-[1.2] tracking-[-0.25px] text-black">
              Get help from support, sales, or experts.
            </p>
          </div>

          {/* 2×2 card grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {cards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-8 rounded-[12px] border border-[#dadada] bg-[#fdfdfd] p-8"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-10">
                  <div className="font-serif text-[24px] leading-[1.4] tracking-[-0.25px] text-black">
                    <p>{card.title}</p>
                    <p>{card.subtitle}</p>
                  </div>
                  <div className="shrink-0">{card.icon}</div>
                </div>

                {/* CTA button */}
                <div>
                  <button className="inline-flex items-center gap-2 rounded-[31px] bg-[#2952e1] px-8 py-4 font-inter font-medium text-[16px] leading-[1.5] tracking-[-0.25px] text-white transition-colors hover:bg-[#1e42c7]">
                    {card.cta}
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Icons ── */
function SupportIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 4C11.163 4 4 11.163 4 20v4a4 4 0 0 0 4 4h2V20h-2c0-6.627 5.373-12 12-12s12 5.373 12 12h-2v8h2a4 4 0 0 0 4-4v-4c0-8.837-7.163-16-16-16z" stroke="black" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 28c0 2.761 2.239 5 5 5" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="22" r="2" fill="black" />
      <circle cx="32" cy="22" r="2" fill="black" />
    </svg>
  );
}

function BillingIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="14" r="7" stroke="black" strokeWidth="1.8" />
      <path d="M7 34c0-7.18 5.82-13 13-13s13 5.82 13 13" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M26 20h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6" stroke="black" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M29 24h2M29 28h2" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EmergencyIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="15" stroke="black" strokeWidth="1.8" />
      <path d="M20 8v24M8 20h24M11.5 11.5l17 17M28.5 11.5l-17 17" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SalesIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M6 8h28a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H22l-6 6v-6H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" stroke="black" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13 18h14M13 13h8" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

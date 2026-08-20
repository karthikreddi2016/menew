"use client";

import { useState } from "react";
import { Container } from "@/components/ui";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-[#EAEAEA]">
      <button
        className="flex w-full items-center justify-between py-5 sm:py-6 text-left transition-colors hover:text-[#2952E1] group"
        onClick={onToggle}
      >
        <span className="pr-4 font-serif text-[17px] sm:text-[18px] font-normal leading-[27px] text-[#000000] group-hover:text-[#2952E1] transition-colors tracking-[-0.25px]">
          {question}
        </span>
        <span className="shrink-0 text-xl font-light text-[#737373] group-hover:text-[#2952E1]">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 pt-1 text-[#545454] font-inter text-[14px] leading-[21px] font-medium tracking-[-0.25px]">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    question: "What exactly is Menew?",
    answer:
      "Menew delivers professional creative, fast without hiring, managing, or chasing anyone. Built for founders, creators, senior leaders, and lean teams who need content live, now. Menew is Powered by a vetted team of 75+ designers and editors and growing. Every task goes to professionals with 3+ years of real brand-building experience so speed never breaks quality.",
  },
  {
    question: "Who actually works on my creative order?",
    answer:
      "Every task is overseen by a dedicated content strategy lead. This person first understands your requirement, then assigns the work to the most suitable designer/editor from our experienced creative team based on skill, format, and urgency. Before the work begins, we confirm the turnaround time upfront, so you know exactly when to expect delivery. You don’t coordinate with multiple people the strategy lead manages the process end-to-end and ensures quality and speed.",
  },
  {
    question: "What if I don’t know how to write a brief?",
    answer:
      "We got you on this as you don’t need to know everything about the content. Instead of writing a detailed brief, you’ll answer a few simple questions that guide you step by step. You just share what you know - purpose, message, and any basic preference. If you have references, past work, or examples you like, you can share those too — even screenshots or links work. A content lead then takes those inputs, fills in the gaps, and converts them into a clear, production-ready brief for the creative team. The goal is simple: you explain the idea in your own words, we handle the structure and execution.",
  },
  {
    question: "Can I order multiple things at once?",
    answer:
      "Yes, depending on your plan. Pay-per-request: Orders queue one after another. Subscription / credits: Multiple requests can run in parallel (To be launched soon). This ensures fairness and predictable delivery while still allowing power users to scale output — a standard practice in on-demand creative operations.",
  },
  {
    question: "How is pricing predictable?",
    answer:
      "We didn’t guess our pricing we validated it from both sides. We spoke with business owners, creators, and senior level executives to understand what they expect to pay for different creative tasks. At the same time, we also consulted experienced designers and editors to understand the real effort, skill, and time required to deliver high-quality work. By aligning both perspectives, we’ve defined fair, fixed pricing for every request.",
  },
  {
    question: "Is this like Fiverr, Upwork, or an agency?",
    answer:
      "Neither, Menew saves you time and lot of manual hustle. Freelance marketplaces (like Fiverr, Upwork etc.,): You choose individual freelancers (Time taking), Quality and timelines can vary (lot of manual work), You manage communication, follow-ups, and coordination (Bit frustrating). Traditional agencies: Long onboarding and discovery phases, Expensive retainers or long-term contracts, Slower turnaround for everyday creative needs. Menew Studio: You order a result, not a person. Price and delivery time are known upfront. No hiring, no negotiations, no dependency on individuals. Menew operates as an On Demand Creative Delivery Platform a model designed specifically for speed, predictability, and ease, sitting clearly apart from both freelancers and agencies.",
  },
  {
    question: "What makes this reliable for urgent work?",
    answer:
      "We work with guaranteed SLAs (Service Level Agreement) and a vetted team of 75+ designers and editors. Every task is assigned to experienced creatives who’ve spent 3+ years building real brands — so deadlines don’t slip.",
  },
  {
    question: "What happens if I’m not happy with the output?",
    answer:
      "Your Feedback matters. You don’t settle. We revise. Every task includes 3 built-in revision rounds. Ask for changes, redirect the work, or tighten the output. Fixed scope keeps revisions fast and decisive, not dragged out like freelancers or agencies.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-16 sm:py-20 border-t border-[#F0F0F0]">
      <Container className="max-w-[890px] mx-auto">
        <h2 className="mb-8 sm:mb-10 font-serif text-[28px] sm:text-[32px] font-normal text-[#191919] leading-[40px] sm:leading-[48px] text-center tracking-[-0.25px]">
          Frequently asked questions
        </h2>

        <div className="divide-y divide-[#EAEAEA]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

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
    <div className="border-b border-black/10">
      <button
        className="flex w-full items-center justify-between px-3 py-6 text-left transition-colors hover:bg-black/2"
        onClick={onToggle}
      >
        <span className="pr-4 font-serif text-lg leading-snug text-(--foreground) tracking-[-0.01em]">
          {question}
        </span>
        <span className="shrink-0 text-xl text-black/45">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-3 pb-6">
          <p className="font-sans text-base leading-7 text-black/65">{answer}</p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    question: "What exactly is Menew?",
    answer:
      "Menew is a creative production service that connects you with experienced designers who deliver polished work on demand. No bidding, no back-and-forth — just brief in, design out.",
  },
  {
    question: "Who actually works on my creative order?",
    answer:
      "Your projects are handled by vetted professional designers and motion artists who specialize in the exact type of work you need — from graphic design and branding to video editing and 3D.",
  },
  {
    question: "What if I don't know how to write a brief?",
    answer:
      "That's completely fine. Share whatever you have — rough notes, a voice memo, or a mood board all work. Our team will help shape the brief into a clear direction before production starts.",
  },
  {
    question: "Can I order multiple things at once?",
    answer:
      "Yes. You can submit multiple requests and we'll handle them in parallel or in priority order based on your timeline and urgency.",
  },
  {
    question: "How is pricing predictable?",
    answer:
      "Each service type has a clear, flat rate. No hourly billing surprises, no scope creep charges — you know the cost before work begins.",
  },
  {
    question: "Is this like Fiverr, Upwork, or an agency?",
    answer:
      "Neither. Menew isn't a marketplace where you hunt for freelancers, and it's not a slow agency with long discovery phases. It's a managed creative production layer — fast, accountable, and brand-aligned.",
  },
  {
    question: "What makes this reliable for urgent work?",
    answer:
      "We keep active creative capacity ready at all times. Most requests start within hours of submission, and same-day turnaround is available for standard deliverables like graphics and social posts.",
  },
  {
    question: "What happens if I'm not happy with the output?",
    answer:
      "Revisions are included with every order. If the direction is off, we revisit the brief and redo the work until it's right — no additional charge.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-shell">
      <Container className="max-w-3xl">
        <h2 className="mb-8 font-serif text-[2.5rem] font-medium leading-tight text-(--foreground)">
          Frequently asked questions
        </h2>

        <div>
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

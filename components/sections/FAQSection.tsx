"use client";

import { useState } from "react";
import { Container, SectionTitle } from "@/components/ui";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-border">
      <button
        className="w-full flex items-center justify-between py-6 px-3 text-left hover:bg-gray-bg/50 transition-colors"
        onClick={onToggle}
      >
        <span className="font-ibm-plex font-medium text-base text-text-dark pr-4">
          {question}
        </span>
        <span className="flex-shrink-0 text-xl text-text-primary/60">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-3 pb-6">
          <p className="font-sans text-base text-text-primary/70 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

const faqs = [
  {
    question: "Why haven't I received job suggestions yet?",
    answer:
      "Our system matches designers based on your specific needs and style preferences. If you haven't received suggestions yet, try updating your project details or adjusting your timeline for faster matching.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing varies based on the type of design work you need. We offer flexible packages starting from $49 for simple designs to custom enterprise solutions. Contact us for a personalized quote.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Absolutely! All our packages include revision rounds. Standard packages include 2 revision rounds, and premium packages offer unlimited revisions until you're 100% satisfied.",
  },
  {
    question: "What's the delivery time?",
    answer:
      "Delivery times vary by project type. Simple graphics can be delivered same-day, while complex branding projects may take 5-7 business days. Rush delivery is available for urgent requests.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply click 'Get Started', describe your project, upload any references you have, and our team will match you with the perfect designer within hours.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <SectionTitle className="text-center mb-12">
          Frequently asked questions
        </SectionTitle>

        {/* FAQ List */}
        <div className="divide-y divide-gray-border border-t border-gray-border">
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

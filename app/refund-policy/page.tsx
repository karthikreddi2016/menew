import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Menew | Transparent Creative Production",
  description:
    "Learn about Menew's refund policy, including cancellation before work begins, revision rounds, and our 50% satisfaction refund guarantee.",
};

const SECTIONS = [
  {
    num: "1",
    title: "Cancellation Before Work Begins",
    content: (
      <div className="space-y-3">
        <p>
          If you request cancellation at least 1 hour before work is scheduled to begin on your order, you may be eligible for a full refund.
        </p>
        <p>
          If work has already started, any refund will be handled according to the provisions below.
        </p>
      </div>
    ),
  },
  {
    num: "2",
    title: "Revisions",
    content: (
      <div className="space-y-3">
        <p>
          If you are not satisfied with the initial delivery, you can request 3 revisions.
        </p>
        <p>
          Our team will make reasonable changes to bring the deliverable in line with the original brief and agreed scope.
        </p>
        <p>
          Revisions are intended to refine the original work. A completely new concept, changed requirements or additional deliverables may be treated as a new request.
        </p>
      </div>
    ),
  },
  {
    num: "3",
    title: "50% Satisfaction Refund",
    highlight: true,
    content: (
      <div className="space-y-4">
        <p>We want you to be satisfied with the work delivered by Menew.</p>
        <p className="font-medium text-[#191919]">
          If, after all applicable revision rounds have been completed, you are still not satisfied with the final output, you can request a refund of 50% of the amount paid for that order.
        </p>
        <div className="rounded-[16px] bg-[#F0F5FF] border border-[#BFDBFE] p-5 sm:p-6 text-[#1E3A8A]">
          <p className="font-semibold mb-2.5 text-[15px]">To qualify for the 50% Satisfaction Refund:</p>
          <ul className="space-y-2 list-disc list-inside text-[14.5px] text-[#1E40AF]">
            <li>The request must relate to the original brief and agreed scope.</li>
            <li>All applicable revision rounds must have been completed.</li>
            <li>The customer must remain dissatisfied with the final output.</li>
            <li>The refund request must be submitted before the order is approved or closed.</li>
          </ul>
          <p className="mt-3 text-xs text-[#3B82F6] font-medium">
            * The 50% satisfaction refund applies to the affected order only.
          </p>
        </div>
      </div>
    ),
  },
  {
    num: "4",
    title: "Requests Outside the Original Brief",
    content: (
      <div className="space-y-3">
        <p>
          A refund will not normally apply where dissatisfaction results from requirements that were not included in the original brief.
        </p>
        <p>
          For example, if a customer changes the creative direction, requests a completely different concept, adds new deliverables or changes the purpose of the project after production has started, the request may be treated as additional work.
        </p>
      </div>
    ),
  },
  {
    num: "5",
    title: "Customer Delays",
    content: (
      <div className="space-y-3">
        <p>
          Delivery timelines may change when Menew is waiting for information, feedback, approvals, files or other materials from the customer.
        </p>
        <p className="text-[#64748B]">
          Such delays do not automatically qualify for a refund.
        </p>
      </div>
    ),
  },
  {
    num: "6",
    title: "Duplicate Payments",
    content: (
      <div className="space-y-3">
        <p>
          If you are accidentally charged more than once for the same order, please contact Menew support with the relevant payment and order details.
        </p>
        <p>
          Once the duplicate payment is verified, the duplicate amount will be refunded.
        </p>
      </div>
    ),
  },
  {
    num: "7",
    title: "Subscription Plans",
    content: (
      <div className="space-y-3">
        <p>
          Subscription payments and credits are subject to the terms of the specific subscription plan.
        </p>
        <p>
          Cancellation of a subscription does not automatically result in a refund for services or credits that have already been used.
        </p>
      </div>
    ),
  },
  {
    num: "8",
    title: "How to Request a Refund",
    content: (
      <div className="space-y-4">
        <p>To request a refund, contact Menew Support and provide:</p>
        <ul className="space-y-2 list-disc list-inside text-[#334155]">
          <li><strong>Order ID</strong></li>
          <li><strong>Registered email address</strong></li>
          <li><strong>Reason for the refund request</strong></li>
          <li><strong>Relevant details about the order</strong></li>
        </ul>
        <p>
          Menew will review the request and communicate the applicable resolution.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-6 py-2.5 font-inter font-medium text-[14px] shadow-sm transition-all"
          >
            Contact Support
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    ),
  },
  {
    num: "9",
    title: "Refund Processing",
    content: (
      <div className="space-y-3">
        <p>
          Where a refund is approved, it will generally be processed through the original payment method, subject to payment-provider processing timelines.
        </p>
      </div>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── Top Navbar with Announcement Strip ── */}
      <Navbar />

      {/* ── Main Refund Policy Content ── */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        {/* Header Title */}
        <div className="border-b border-[#E5E7EB] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAEFFF] text-[#2952E1] font-inter text-[13px] font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2952E1]" />
            Legal & Policies
          </div>
          <h1 className="font-serif text-[38px] sm:text-[48px] font-normal text-[#191919] leading-tight tracking-[-0.02em]">
            Menew Refund Policy
          </h1>
          <p className="font-inter text-[14px] text-[#64748B] mt-2">
            Last Updated: 19/09/2026
          </p>

          {/* Introductory Note */}
          <div className="mt-6 space-y-3 text-[#334155] font-inter text-[16px] sm:text-[17px] leading-[28px]">
            <p>
              At <strong>Menew</strong>, we create custom digital creative work based on the brief, requirements and references provided by the customer.
            </p>
            <p>
              Because every order involves dedicated creative resources, refunds are subject to the terms below.
            </p>
          </div>
        </div>

        {/* Numbered Sections */}
        <div className="space-y-10 sm:space-y-12">
          {SECTIONS.map((section) => (
            <section
              key={section.num}
              className={`rounded-[20px] p-6 sm:p-8 transition-colors ${
                section.highlight
                  ? "bg-[#FAF5FF]/60 border border-[#E9D5FF]"
                  : "bg-white border border-[#E5E7EB]"
              }`}
            >
              <h2 className="font-serif text-[22px] sm:text-[26px] font-normal text-[#191919] tracking-[-0.02em] mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2952E1] text-white font-inter text-[14px] font-semibold">
                  {section.num}
                </span>
                <span>{section.title}</span>
              </h2>

              <div className="font-inter text-[15px] sm:text-[16px] text-[#475569] leading-[26px] pl-0 sm:pl-11">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Customer-Facing Summary Callout */}
        <div className="mt-14 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#EAEFFF] text-[#2952E1] flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#191919] mb-2">
            Not happy with the final output?
          </h3>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#475569] max-w-[620px] leading-relaxed">
            We’ll give you the applicable revision rounds to get it right. If you&apos;re still not satisfied after all revisions, Menew will refund 50% of your order amount.
          </p>
          <p className="font-inter text-[13px] text-[#64748B] mt-3">
            The refund applies when the request is within the original brief and scope and is made before the order is approved or closed.
          </p>
          <div className="mt-6">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-8 py-3 font-inter font-medium text-[15px] shadow-sm transition-all"
            >
              Start an Order
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

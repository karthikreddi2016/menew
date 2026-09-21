import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Menew | Protecting Your Data & Creative Assets",
  description:
    "Learn about how Menew collects, uses, protects, and handles your information, creative files, and data privacy across our on-demand creative production platform.",
};

const SECTIONS = [
  {
    num: "1",
    title: "Information We Collect",
    content: (
      <div className="space-y-6">
        <p>
          Depending on how you use Menew, we may collect the following information.
        </p>

        {/* Account Information */}
        <div className="rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-5 space-y-2.5">
          <h3 className="font-inter font-semibold text-[#191919] text-[15px]">
            Account Information
          </h3>
          <p className="text-[14px] text-[#475569]">
            When you create an account, we may collect:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[14px] text-[#334155]">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company or business name</li>
            <li>Login information</li>
            <li>Other information you choose to provide</li>
          </ul>
        </div>

        {/* Order and Project Information */}
        <div className="rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-5 space-y-2.5">
          <h3 className="font-inter font-semibold text-[#191919] text-[15px]">
            Order and Project Information
          </h3>
          <p className="text-[14px] text-[#475569]">
            When you place a creative order, you may provide information such as:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[14px] text-[#334155]">
            <li>Creative brief and requirements</li>
            <li>Text and copy</li>
            <li>Images and videos</li>
            <li>Logos and brand assets</li>
            <li>Brand guidelines</li>
            <li>Reference designs</li>
            <li>Creative preferences</li>
            <li>Other files required to complete your order</li>
          </ul>
          <p className="text-[13.5px] text-[#64748B] pt-1">
            Menew uses this information to understand your requirements and fulfil your creative order. Our platform is designed around structured creative requests, saved brand assets and defined delivery requirements.
          </p>
        </div>

        {/* Payment Information */}
        <div className="rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-5 space-y-2.5">
          <h3 className="font-inter font-semibold text-[#191919] text-[15px]">
            Payment Information
          </h3>
          <p className="text-[14px] text-[#475569]">
            When you make a payment, your payment is processed by a third-party payment provider.
          </p>
          <p className="text-[14px] text-[#475569]">
            Menew may receive information such as the transaction amount, payment status, transaction ID and other information required to manage your order.
          </p>
          <p className="text-[13.5px] text-[#64748B]">
            Your complete card or banking information may be handled directly by the relevant payment provider rather than stored by Menew.
          </p>
        </div>

        {/* Technical Information */}
        <div className="rounded-[14px] bg-[#F8FAFC] border border-[#E2E8F0] p-5 space-y-2.5">
          <h3 className="font-inter font-semibold text-[#191919] text-[15px]">
            Technical Information
          </h3>
          <p className="text-[14px] text-[#475569]">
            When you use our website or platform, we may automatically collect information such as:
          </p>
          <ul className="list-disc list-inside space-y-1 text-[14px] text-[#334155]">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages or features accessed</li>
            <li>Date and time of access</li>
            <li>General usage information</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: "2",
    title: "How We Use Your Information",
    content: (
      <div className="space-y-3">
        <p>Menew may use your information to:</p>
        <ul className="list-disc list-inside space-y-1.5 text-[#334155]">
          <li>Create and manage your account</li>
          <li>Process and fulfil creative orders</li>
          <li>Understand your creative requirements</li>
          <li>Communicate with you about your orders</li>
          <li>Deliver files and creative work</li>
          <li>Manage revisions and approvals</li>
          <li>Process payments</li>
          <li>Provide customer support</li>
          <li>Improve our website and services</li>
          <li>Maintain platform security</li>
          <li>Prevent fraud, misuse or unauthorized activity</li>
          <li>Send important service-related communications</li>
          <li>Send promotional communications where permitted</li>
        </ul>
      </div>
    ),
  },
  {
    num: "3",
    title: "Your Creative Files",
    content: (
      <div className="space-y-3">
        <p>
          Files you upload to Menew may contain business, brand or other confidential information.
        </p>
        <p>
          We use these files primarily to fulfil the creative services you request.
        </p>
        <p>
          Your files may be accessed by the Menew team or creative professionals assigned to your order when necessary to complete the work.
        </p>
        <p>
          Menew&apos;s operating model may involve a combination of internal creative leads and vetted external creatives for production and capacity.
        </p>
        <p className="font-medium text-[#191919]">
          You should only upload information and materials that you are authorized to share with Menew.
        </p>
      </div>
    ),
  },
  {
    num: "4",
    title: "How We Share Your Information",
    content: (
      <div className="space-y-3">
        <p>
          Menew may share information with third-party service providers that help us operate our business, such as providers for:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14.5px] text-[#334155] py-1">
          <div className="flex items-center gap-2"><span>•</span><span>Payment processing</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Cloud storage</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Website hosting</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Analytics</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Customer communication</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Email and notifications</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Security</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Creative production</span></div>
          <div className="flex items-center gap-2"><span>•</span><span>Customer support</span></div>
        </div>
        <p>
          We only share information that is reasonably necessary for the relevant purpose.
        </p>
        <p>
          We may also disclose information when required to do so by applicable law, legal process or a valid governmental request.
        </p>
      </div>
    ),
  },
  {
    num: "5",
    title: "Information Shared With Creative Professionals",
    content: (
      <div className="space-y-3">
        <p>
          When you place an order, Menew may share relevant project information and files with the creative professional or production team assigned to your order.
        </p>
        <p>
          We aim to limit access to information to what is reasonably required to complete the specific project.
        </p>
      </div>
    ),
  },
  {
    num: "6",
    title: "How We Protect Your Information",
    content: (
      <div className="space-y-3">
        <p>
          Menew takes reasonable measures to protect your information against unauthorized access, loss, misuse, alteration or disclosure.
        </p>
        <p className="text-[#64748B]">
          However, no website, platform or online transmission can be guaranteed to be completely secure.
        </p>
      </div>
    ),
  },
  {
    num: "7",
    title: "How Long We Keep Your Information",
    content: (
      <div className="space-y-3">
        <p>We may retain your information for as long as reasonably necessary to:</p>
        <ul className="list-disc list-inside space-y-1 text-[#334155]">
          <li>Provide our services</li>
          <li>Maintain your account</li>
          <li>Keep order and payment records</li>
          <li>Handle customer support</li>
          <li>Resolve disputes</li>
          <li>Prevent fraud and misuse</li>
          <li>Meet legal, tax or regulatory requirements</li>
        </ul>
        <p>
          When information is no longer reasonably required, we may delete or anonymize it, subject to applicable legal and operational requirements.
        </p>
      </div>
    ),
  },
  {
    num: "8",
    title: "Cookies and Similar Technologies",
    content: (
      <div className="space-y-3">
        <p>Menew may use cookies and similar technologies to:</p>
        <ul className="list-disc list-inside space-y-1 text-[#334155]">
          <li>Keep you signed in</li>
          <li>Remember preferences</li>
          <li>Understand how visitors use our website</li>
          <li>Improve website performance</li>
          <li>Measure marketing and website activity</li>
        </ul>
        <p className="text-[#64748B]">
          You can manage cookies through your browser settings. Some website features may not work properly if certain cookies are disabled.
        </p>
      </div>
    ),
  },
  {
    num: "9",
    title: "Marketing Communications",
    content: (
      <div className="space-y-3">
        <p>
          Menew may occasionally send information about new services, offers, updates or other promotional content where permitted by applicable law.
        </p>
        <p>
          You can unsubscribe from promotional emails using the unsubscribe option included in those communications.
        </p>
        <p className="text-[#64748B]">
          We may continue to send essential service communications, such as order updates, payment confirmations and account-related messages.
        </p>
      </div>
    ),
  },
  {
    num: "10",
    title: "Third-Party Services and Links",
    content: (
      <div className="space-y-3">
        <p>
          Menew may use third-party tools and services to operate the platform, including payment, storage, communication, analytics and creative-production tools.
        </p>
        <p>
          The Menew website may also contain links to third-party websites.
        </p>
        <p>
          Menew is not responsible for the privacy practices, security or content of third-party websites or services. We recommend reviewing their respective privacy policies before providing information to them.
        </p>
      </div>
    ),
  },
  {
    num: "11",
    title: "AI-Assisted Tools",
    content: (
      <div className="space-y-3">
        <p>
          Menew may use AI-assisted tools as part of its creative and operational workflows.
        </p>
        <p>These may include tools used for:</p>
        <ul className="list-disc list-inside space-y-1 text-[#334155]">
          <li>Brief clarification</li>
          <li>Creative suggestions</li>
          <li>Auto-tagging</li>
          <li>Brand-compliance checks</li>
          <li>Other production or workflow automation</li>
        </ul>
        <p className="text-[14px] text-[#64748B]">
          Our product blueprint includes AI-assisted briefing, template suggestions, brand-compliance checks and request tagging as potential platform workflows.
        </p>
        <p>
          Where third-party AI tools are used, information may be processed according to the applicable provider&apos;s terms and privacy practices.
        </p>
      </div>
    ),
  },
  {
    num: "12",
    title: "Your Responsibilities",
    content: (
      <div className="space-y-3">
        <p>
          When using Menew, you are responsible for ensuring that you have the right to provide any information, images, videos, logos, documents or other materials that you upload.
        </p>
        <p className="font-medium text-[#191919]">
          Please do not upload sensitive personal information that is not necessary for completing your creative project.
        </p>
      </div>
    ),
  },
  {
    num: "13",
    title: "Your Privacy Rights",
    content: (
      <div className="space-y-3">
        <p>
          Depending on applicable law, you may have rights relating to your personal information, including the right to request:
        </p>
        <ul className="list-disc list-inside space-y-1 text-[#334155]">
          <li>Access to certain information we hold about you</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of certain information</li>
          <li>Information about how your information is being used</li>
        </ul>
        <p>
          To make a privacy-related request, contact Menew through the contact details provided on our website.
        </p>
        <p className="text-[#64748B]">
          We may need to verify your identity before processing certain requests.
        </p>
      </div>
    ),
  },
  {
    num: "14",
    title: "Children's Privacy",
    content: (
      <div className="space-y-3">
        <p>
          Menew is intended for businesses, professionals, creators and other users who are legally permitted to use our services.
        </p>
        <p>
          We do not knowingly collect personal information from children where such collection is prohibited by applicable law.
        </p>
      </div>
    ),
  },
  {
    num: "15",
    title: "Changes to This Privacy Policy",
    content: (
      <div className="space-y-3">
        <p>
          Menew may update this Privacy Policy from time to time.
        </p>
        <p>
          When we make changes, we will publish the updated policy on this page and update the Last Updated date.
        </p>
        <p>
          Your continued use of Menew after an updated Privacy Policy is published will be subject to the updated policy.
        </p>
      </div>
    ),
  },
  {
    num: "16",
    title: "Contact Us",
    content: (
      <div className="space-y-4">
        <p>
          If you have questions about this Privacy Policy, your personal information or how Menew handles your data, please contact us through the contact information provided on the Menew website.
        </p>
        <div className="rounded-[16px] bg-[#F0F5FF] border border-[#BFDBFE] p-5 space-y-2 text-[#1E3A8A]">
          <p className="font-semibold text-[15px] text-[#1E3A8A]">Menew</p>
          <p className="text-[14px]">
            Email:{" "}
            <a
              href="mailto:founder@menew.studio"
              className="font-medium underline hover:text-[#1D4ED8]"
            >
              founder@menew.studio
            </a>
          </p>
          <p className="text-[14px]">
            Website:{" "}
            <Link href="/" className="font-medium underline hover:text-[#1D4ED8]">
              menew.studio
            </Link>
          </p>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* ── Top Navbar with Announcement Strip ── */}
      <Navbar />

      {/* ── Main Privacy Policy Content ── */}
      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        {/* Header Title */}
        <div className="border-b border-[#E5E7EB] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAEFFF] text-[#2952E1] font-inter text-[13px] font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2952E1]" />
            Legal & Policies
          </div>
          <h1 className="font-serif text-[38px] sm:text-[48px] font-normal text-[#191919] leading-tight tracking-[-0.02em]">
            Menew Privacy Policy
          </h1>
          <p className="font-inter text-[14px] text-[#64748B] mt-2">
            Last Updated: 19/09/2026
          </p>

          {/* Introductory Note */}
          <div className="mt-6 space-y-3 text-[#334155] font-inter text-[16px] sm:text-[17px] leading-[28px]">
            <p>
              At <strong>Menew</strong>, we respect your privacy and are committed to protecting the information you share with us.
            </p>
            <p>
              This Privacy Policy explains what information Menew may collect when you use our website, create an account, place an order or use our creative services, and how we use that information.
            </p>
            <p className="font-medium text-[#191919]">
              By using Menew, you agree to the practices described in this Privacy Policy.
            </p>
          </div>
        </div>

        {/* Numbered Sections */}
        <div className="space-y-8 sm:space-y-10">
          {SECTIONS.map((section) => (
            <section
              key={section.num}
              className="rounded-[20px] p-6 sm:p-8 bg-white border border-[#E5E7EB] transition-colors hover:border-[#2952E1]/30"
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

        {/* Questions Callout */}
        <div className="mt-14 rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] p-8 sm:p-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#EAEFFF] text-[#2952E1] flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#191919] mb-2">
            Have questions about your privacy?
          </h3>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#475569] max-w-[620px] leading-relaxed">
            Reach out directly to our team at{" "}
            <a
              href="mailto:founder@menew.studio"
              className="text-[#2952E1] font-medium underline"
            >
              founder@menew.studio
            </a>
            . We&apos;re here to help clarify how your files and data are handled.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#2952E1] hover:bg-[#1e42c7] text-white px-8 py-3 font-inter font-medium text-[15px] shadow-sm transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

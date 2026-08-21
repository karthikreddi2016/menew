import { Container } from "@/components/ui";

const features = [
  {
    title: "Experienced artists will be assigned to your need in no time.",
    description:
      "No bidding, no waiting, no confusion. Just tell us what you want and the right creative mind starts working for you.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-9.6 9.6c-.4.4-.6.9-.7 1.5l-.5 2.1a.5.5 0 0 0 .6.6l2.1-.5c.6-.1 1.1-.3 1.5-.7l9.6-9.6 1.6 1.6a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 0 0 0-1.4l-6.1-6.1a1 1 0 0 0-1.4 0l-1.4 1.4z" fill="#1E293B"/>
        <path d="M5.5 14.5l4 4" stroke="#1E293B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "No need to manage tasks, or designer back-and-forth.",
    description:
      "Share your idea in simple words, upload references if you have any, and leave everything to us.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <circle cx="19" cy="11" r="2" />
        <path d="M19 8v1" />
        <path d="M19 13v1" />
        <path d="M16.5 9.5l.9.5" />
        <path d="M20.6 12l.9.5" />
      </svg>
    ),
  },
  {
    title: "Clear and transparent process, flexible timelines.",
    description:
      "Every request follows a transparent workflow with visible progress and realistic timelines, so you stay confident from start to finish.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="15" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <path d="M6 9v3a3 3 0 0 0 3 3h6" />
      </svg>
    ),
  },
  {
    title: "Quality First, Zero Stress. Top quality design is our priority.",
    description:
      "Your satisfaction is the goal, thoughtful improvements, flexible revisions, and top-quality output without the usual design drama.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
        <path d="M2 9h20" />
        <path d="M10 3l-2 6 4 12 4-12-2-6" />
      </svg>
    ),
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 border-t border-[#F0F0F0]">
      <Container>
        {/* Section Heading matching Figma node 249:15576 */}
        <h2 className="font-serif text-[28px] sm:text-[32px] font-normal text-[#191919] leading-[40px] sm:leading-[48px] mb-8 sm:mb-10 tracking-[-0.25px]">
          Why Choose Menew
        </h2>

        {/* 2x2 Grid of Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-[16px] border border-[#E5E7EB] bg-[#FBFBFB] p-6 sm:p-8 flex flex-col justify-between hover:border-[#2952E1]/30 transition-all hover:shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3 sm:mb-4">
                  <h3 className="font-serif text-[18px] sm:text-[20px] font-normal text-[#191919] leading-[28px] sm:leading-[30px] tracking-[-0.25px]">
                    {feature.title}
                  </h3>
                  <div className="shrink-0 p-1 text-[#191919] opacity-90">
                    {feature.icon}
                  </div>
                </div>
                <p className="font-inter text-[14px] leading-[21px] text-[#545454] tracking-[-0.2px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

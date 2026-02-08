import { Container, SectionTitle } from "@/components/ui";

const serviceIcons = [
  { id: 1, name: "Graphic Design", emoji: "🎨" },
  { id: 2, name: "Video Editing", emoji: "🎬" },
  { id: 3, name: "Presentations", emoji: "📊" },
  { id: 4, name: "Social Media", emoji: "📱" },
  { id: 5, name: "Branding", emoji: "✨" },
  { id: 6, name: "UI/UX Design", emoji: "💻" },
  { id: 7, name: "Illustrations", emoji: "🖌️" },
  { id: 8, name: "Motion Graphics", emoji: "🎥" },
  { id: 9, name: "Print Design", emoji: "🖨️" },
];

export function CreateTodaySection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        {/* Title with Divider Lines */}
        <SectionTitle withDivider className="mb-12">
          What would you like to create today
        </SectionTitle>

        {/* Service Icons Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {serviceIcons.map((service) => (
            <button
              key={service.id}
              className="group flex flex-col items-center gap-2 p-4 rounded-card hover:bg-gray-bg transition-colors"
            >
              <div className="w-20 h-20 md:w-[120px] md:h-[120px] bg-white border border-gray-border rounded-card flex items-center justify-center text-4xl md:text-5xl group-hover:border-primary group-hover:shadow-md transition-all">
                {service.emoji}
              </div>
              <span className="font-sans text-sm text-text-primary/70 text-center">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

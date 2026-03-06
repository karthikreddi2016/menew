import Image from "next/image";

export function AuthLeftPanel() {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-[#050505] px-8 py-16">
      {/* Heading */}
      <div className="mb-[60px] flex flex-col items-center gap-[13px] text-center text-white">
        <h1 className="font-serif text-[36px] font-normal leading-[1.2] tracking-[-0.25px]">
          Welcome to Menew
        </h1>
        <p className="font-serif text-[24px] font-normal leading-[1.4] tracking-[-0.25px] whitespace-nowrap">
          Get started with our design on demand platform
        </p>
      </div>

      {/* Illustration stack */}
      <div className="relative h-[420px] w-[500px]">
        {/* 3D illustration card */}
        <div className="absolute right-0 top-0 h-[320px] w-[320px] overflow-hidden rounded-[14px]">
          <Image
            src="/images/signup-hero.png"
            alt="Design illustration"
            fill
            className="object-cover"
          />
        </div>

        {/* Dialog card */}
        <div className="absolute left-[80px] top-[30px] w-[220px] rounded-[12px] bg-white p-2 shadow-[4px_7px_19.4px_0px_rgba(0,0,0,0.11)] flex flex-col gap-2">
          <div className="flex h-[72px] items-start rounded-[8px] border border-[#2952e1] p-3">
            <p className="font-inter text-[14px] leading-snug text-[#2c2c2c]">
              Create a branding kit for my business
            </p>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button className="rounded-[8px] border border-[#f5f5f5] bg-[#f5f5f5] px-[18px] py-[10px] font-inter text-[14px] font-semibold text-[#6f6f6f]">
              Cancel
            </button>
            <button className="rounded-[8px] bg-[#2952e1] px-[18px] py-[10px] font-inter text-[16px] font-medium text-white">
              Create
            </button>
          </div>
        </div>

        {/* Blue notification */}
        <div className="absolute left-0 top-[230px] w-[240px] rounded-[8px] bg-[#2952e1] p-3">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-[28px]">🎉</span>
            <p className="font-inter text-[14px] leading-snug text-white">
              Your Requirements has been assigned to the designer succesfully
            </p>
          </div>
        </div>

        {/* Green notification */}
        <div className="absolute left-[110px] top-[326px] w-[230px] rounded-[8px] bg-[#63e129] p-3">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-[28px]">✅</span>
            <p className="font-inter text-[14px] leading-snug text-[#005a00]">
              Design Sent on your mail, Confirm if no changes required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

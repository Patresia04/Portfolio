"use client";

import { socialLinks } from "@/data/socialLinks";
import SocialButton from "./SocialButton";

export default function SocialSidebar() {
  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[99] flex flex-col gap-3 pointer-events-none"
      style={{
        transformStyle: "flat",
      }}
    >
      {socialLinks.map((link) => (
        <SocialButton key={link.id} link={link} />
      ))}
    </div>
  );
}

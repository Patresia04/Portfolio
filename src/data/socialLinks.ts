import { FaLinkedinIn, FaGithub, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: IconType;
  bg: string;
  glow: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/patresia-siregar",
    icon: FaLinkedinIn,
    bg: "linear-gradient(135deg, #0A66C2 0%, #0077b5 100%)",
    glow: "rgba(10, 102, 194, 0.4)",
  },
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/Patresia04",
    icon: FaGithub,
    bg: "linear-gradient(135deg, #181717 0%, #2f2f2f 100%)",
    glow: "rgba(24, 23, 23, 0.4)",
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/patresiaa._",
    icon: FaInstagram,
    bg: "linear-gradient(45deg, #e1306c 0%, #833ab4 50%, #405de6 100%)",
    glow: "rgba(193, 53, 132, 0.45)",
  },
  {
    id: "email",
    name: "Email",
    href: "mailto:ciaasiregar0427@gmail.com",
    icon: FaEnvelope,
    bg: "linear-gradient(135deg, #EA4335 0%, #c5221f 100%)",
    glow: "rgba(234, 67, 53, 0.4)",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    href: "https://wa.me/6281375804767",
    icon: FaWhatsapp,
    bg: "linear-gradient(135deg, #25D366 0%, #1cbd55 100%)",
    glow: "rgba(37, 211, 102, 0.4)",
  },
];

import {
  SiHtml5,
  SiCss,
  SiReact,
  SiGit,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiGithub,
  SiPhp,
  SiNextdotjs,
  SiDocker,
  SiAstro,
  SiLaravel,
  SiFigma,
  SiPostman,
  SiMysql,
  SiPostgresql,
} from "react-icons/si";
import type { IconType } from "react-icons";

export interface SkillData {
  id: string;
  label: string;
  icon: IconType;
  color: string;
  sideColor: string;
  glowColor: string;
  iconColor?: string;
}

export const skills: SkillData[] = [
  /* ── Row 1 ── */
  { id: "html", label: "HTML", icon: SiHtml5, color: "#E34F26", sideColor: "#a63a1c", glowColor: "rgba(227,79,38,0.4)", iconColor: "#ffffff" },
  { id: "css", label: "CSS", icon: SiCss, color: "#1572B6", sideColor: "#0e5182", glowColor: "rgba(21,114,182,0.4)", iconColor: "#ffffff" },
  { id: "react", label: "React", icon: SiReact, color: "#61DAFB", sideColor: "#1ba5c9", glowColor: "rgba(97,218,251,0.4)", iconColor: "#0f3742" },
  { id: "git", label: "Git", icon: SiGit, color: "#F05032", sideColor: "#b53821", glowColor: "rgba(240,80,50,0.4)", iconColor: "#ffffff" },

  /* ── Row 2 ── */
  { id: "javascript", label: "JavaScript", icon: SiJavascript, color: "#F7DF1E", sideColor: "#baab12", glowColor: "rgba(247,223,30,0.4)", iconColor: "#323330" },
  { id: "typescript", label: "TypeScript", icon: SiTypescript, color: "#3178C6", sideColor: "#205187", glowColor: "rgba(49,120,198,0.4)", iconColor: "#ffffff" },
  { id: "tailwind", label: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", sideColor: "#04879d", glowColor: "rgba(6,182,212,0.4)", iconColor: "#ffffff" },
  { id: "nodejs", label: "Node.js", icon: SiNodedotjs, color: "#339933", sideColor: "#226b22", glowColor: "rgba(51,153,51,0.4)", iconColor: "#ffffff" },
  { id: "github", label: "GitHub", icon: SiGithub, color: "#24292e", sideColor: "#121417", glowColor: "rgba(255,255,255,0.2)", iconColor: "#ffffff" },
  { id: "php", label: "PHP", icon: SiPhp, color: "#777BB4", sideColor: "#55598f", glowColor: "rgba(119,123,180,0.4)", iconColor: "#ffffff" },

  /* ── Row 3 ── */
  { id: "nextjs", label: "Next.js", icon: SiNextdotjs, color: "#000000", sideColor: "#111111", glowColor: "rgba(255,255,255,0.25)", iconColor: "#ffffff" },
  { id: "docker", label: "Docker", icon: SiDocker, color: "#2496ED", sideColor: "#1463a1", glowColor: "rgba(36,150,237,0.4)", iconColor: "#ffffff" },
  { id: "astro", label: "Astro", icon: SiAstro, color: "#FF5D01", sideColor: "#bd4500", glowColor: "rgba(255,93,1,0.4)", iconColor: "#ffffff" },
  { id: "laravel", label: "Laravel", icon: SiLaravel, color: "#FF2D20", sideColor: "#bf1e15", glowColor: "rgba(255,45,32,0.4)", iconColor: "#ffffff" },
  { id: "figma", label: "Figma", icon: SiFigma, color: "#F24E1E", sideColor: "#b33511", glowColor: "rgba(242,78,30,0.4)", iconColor: "#ffffff" },
  { id: "postman", label: "Postman", icon: SiPostman, color: "#FF6C37", sideColor: "#b84921", glowColor: "rgba(255,108,55,0.4)", iconColor: "#ffffff" },

  /* ── Row 4 ── */
  { id: "mysql", label: "MySQL", icon: SiMysql, color: "#4479A1", sideColor: "#2e5370", glowColor: "rgba(68,121,161,0.4)", iconColor: "#ffffff" },
  { id: "postgresql", label: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", sideColor: "#2947a1", glowColor: "rgba(65,105,225,0.4)", iconColor: "#ffffff" },
];

export const keyboardLayout: number[][] = [
  [0, 1, 2, 3],
  [4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15],
  [16, 17],
];

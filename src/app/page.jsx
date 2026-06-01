import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsSection from "@/components/FeaturedProjects";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition navbar={<Navbar />}>
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ExperienceTimeline />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactForm />
      </main>
      <Footer />
    </PageTransition>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import PortfolioSection from "@/components/portfolio/PortfolioSection";
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
        <PortfolioSection />
        <ContactForm />
      </main>
      <Footer />
    </PageTransition>
  );
}

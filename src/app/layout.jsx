import { Inter, Poppins, Sora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Patresia — IT Programmer Portfolio",
  description:
    "Professional portfolio of Patresia, showcasing IT Programmer expertise, projects, certifications, and experience.",
  keywords: [
    "IT Programmer",
    "Portfolio",
    "Patresia",
  ],
  openGraph: {
    title: "Patresia — IT Programmer Portfolio",
    description:
      "Professional portfolio showcasing IT Programmer expertise, projects, and certifications.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased relative">
        <ThemeProvider>
          {/* Animated mesh gradient background */}
          <div className="mesh-gradient" aria-hidden="true" />
          {/* Grain texture overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Main content */}
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
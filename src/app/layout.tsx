import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { I18nProvider } from "./providers/i18n-provider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "/"),
  title: {
    default:"Mahefa | Developer",
    template: "%s | Mahefa Nantenaina"
  },
  description: "Professional portfolio of Mahefa Nantenaina",
  keywords: ["Mahefa","MahefaNant","Développeur Fullstack", "React", "Next.js", "Portfolio", "Back-end","Front-end"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: [{
      url: "/statis/images/portfolio-screen.png",
      width: 1200,
      height: 630,
      alt: "Mahefa Nantenaina - Expert Développeur Fullstack",
    }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
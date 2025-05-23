import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { I18nProvider } from "./providers/i18n-provider";
import { Head } from "@/components/Head";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "/"),
  title: {
    default:"Mahefa | Developer",
    template: "%s | Mahefa Nantenaina"
  },
  description: "Professional portfolio of Mahefa Nantenaina",
  keywords: ["Mahefa","MahefaNant","Developer","FullStack", "Web", "React", "Next", "Java", "Madagascar"],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    images: [{
      url: "/static/images/portfolio-screen.png",
      width: 1200,
      height: 630,
      alt: "Mahefa Nantenaina - Expert Développeur",
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
      <head>
        <Head />
      </head>
      <body className={`bg-background antialiased`}>
        <link rel="icon" type="image/png" href="/static/images/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/static/images/favicon.svg" />
        <link rel="shortcut icon" href="/static/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/images/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/static/images/site.webmanifest" />
        <link rel="alternate" href="https://mahefa.vercel.app/en" hrefLang="en" />
        <link rel="alternate" href="https://mahefa.vercel.app/fr" hrefLang="fr" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
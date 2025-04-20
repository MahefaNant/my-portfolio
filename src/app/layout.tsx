import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { I18nProvider } from "./providers/i18n-provider";

export const metadata: Metadata = {
  title: "Mahefa | Developer",
  description: "Portfolio professionnel de Mahefa Nantenaina",
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
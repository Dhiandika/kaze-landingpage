import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Preloader from "@/components/ui/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kaze Kreativ | Digital Marketing Agency Bali",
    template: "%s | Kaze Kreativ",
  },
  description: "Strategic growth for your brands. Ads, Social Media, and Branding agency based in Bali, working globally.",
  keywords: ["Digital Marketing", "Bali Agency", "Social Media Management", "Web Development", "Branding"],
  authors: [{ name: "Kaze Kreativ Team" }],
  creator: "Kaze Kreativ",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kazekreativ.my.id",
    title: "Kaze Kreativ | Digital Marketing Agency Bali",
    description: "Strategic growth for your brands. Ads, Social Media, and Branding agency based in Bali.",
    siteName: "Kaze Kreativ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaze Kreativ | Digital Marketing Agency Bali",
    description: "Strategic growth for your brands. Ads, Social Media, and Branding agency based in Bali.",
    creator: "@kazekreativ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

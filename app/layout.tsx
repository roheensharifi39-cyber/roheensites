import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sitesbyroheen.vercel.app"),
  title: "Sites by Roheen | Student Portfolio Websites",
  description:
    "Affordable portfolio websites for students starting at $5/month or $40 one-time.",
  keywords: [
    "Sites by Roheen",
    "student portfolio website",
    "portfolio website for students",
    "student web design",
    "internship portfolio",
    "college portfolio website",
    "resume website",
    "Virginia Tech portfolio",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Sites by Roheen | Student Portfolio Websites",
    description:
      "Clean, mobile-friendly portfolio websites for students applying to internships, research, jobs, and scholarships.",
    url: "https://sitesbyroheen.vercel.app",
    siteName: "Sites by Roheen",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1024,
        height: 1024,
        alt: "Sites by Roheen logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sites by Roheen | Student Portfolio Websites",
    description:
      "Affordable student portfolio websites starting at $5/month or $40 one-time.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#020812] text-white">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
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
  title: "Sites by Roheen | Affordable Websites for Students and Businesses",
  description:
    "Clean, affordable websites for students, local businesses, creators, and brands. Student sites start as low as $5/month.",
  keywords: [
    "Sites by Roheen",
    "affordable website builder",
    "local business website",
    "small business website",
    "student portfolio website",
    "portfolio website for students",
    "student web design",
    "restaurant menu website",
    "personal brand website",
    "landing page website",
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
    title: "Sites by Roheen | Affordable Websites for Students and Businesses",
    description:
      "Clean, mobile-friendly websites for student portfolios, local businesses, personal brands, service pages, and menus.",
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
    title: "Sites by Roheen | Affordable Websites for Students and Businesses",
    description:
      "Student websites starting as low as $5/month. Business website pricing is affordable and negotiable.",
    images: ["/icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#070a11",
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

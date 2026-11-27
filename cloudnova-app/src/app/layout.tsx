import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudnova.id"),
  title: "CloudNova Hosting — Solusi Web Hosting Cepat & Andal",
  description: "CloudNova Hosting menyediakan layanan shared hosting cepat, aman, dan terjangkau untuk website pribadi, blog, dan bisnis Anda.",
  keywords: ["CloudNova Hosting", "shared hosting", "web hosting murah", "hosting indonesia", "cpanel"],
  authors: [{ name: "CloudNova Hosting" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "CloudNova Hosting — Premium Web Hosting",
    description: "Solusi web hosting untuk membantu website Anda berjalan optimal.",
    url: "https://cloudnova.id",
    siteName: "CloudNova Hosting",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-[#F6F7F9] text-[#1F2937] font-sans antialiased selection:bg-[#F58220] selection:text-white">
        {children}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "SB-Mid-client-mock"}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
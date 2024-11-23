import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ArbiWinz | Decentralized Lottery Powered by Arbitrum",
  description:
    "ArbiWinz is the ultimate decentralized lottery platform on the Arbitrum network. Experience transparent, provably fair games powered by Chainlink VRF, with rewards in crypto. Designed for secure, fun, and fair gameplay.",
  keywords: [
    "Arbitrum",
    "Decentralized lottery",
    "Crypto lottery",
    "Crypto",
    "Ethereum",
    "Eth",
    "Chainlink VRF",
    "Chainlink",
    "Fair gameplay",
    "Smart money",
    "Crypto gaming",
    "Blockchain lottery",
    "ArbiWinz",
    "Arbitrum lottery",
  ].join(", "),
  openGraph: {
    title: "ArbiWinz | Decentralized Lottery on Arbitrum",
    description:
      "Join ArbiWinz, the decentralized lottery platform built on Arbitrum. Provably fair gameplay, Chainlink VRF integration, and big crypto rewards await!",
    url: "https://arbiwinz.vercel.app",
    siteName: "ArbiWinz",
    images: [
      {
        url: "/banner.jpg", // Ensure this image is optimized (1200x630px recommended).
        width: 1200,
        height: 630,
        alt: "ArbiWinz Decentralized Lottery Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArbiWinz | Decentralized Lottery on Arbitrum",
    description:
      "ArbiWinz is a blockchain-based lottery platform with fair games and big crypto prizes. Built on Arbitrum and powered by Chainlink VRF.",
    images: ["/banner.jpg"],

  },
  alternates: {
    canonical: "https://arbiwinz.vercel.app",
  },
  applicationName: "ArbiWinz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <meta name="google-site-verification" content="w-mSlFhyTpSDEPekUyqsbPukCs-lCclx8FrypO2bUjc" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Arbitrum, Decentralized lottery, Crypto lottery, Chainlink VRF, Fair gameplay, Smart money, Crypto gaming, Blockchain lottery, ArbiWinz, Arbitrum lottery" />
        <link rel="canonical" href="https://arbiwinz.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* OpenGraph Metadata */}
        <meta property="og:title" content="ArbiWinz | Decentralized Lottery on Arbitrum" />
        <meta property="og:description" content="Join ArbiWinz, the decentralized lottery platform built on Arbitrum. Provably fair gameplay, Chainlink VRF integration, and big crypto rewards await!" />
        <meta property="og:url" content="https://arbiwinz.vercel.app" />
        <meta property="og:site_name" content="ArbiWinz" />
        <meta property="og:image" content="/banner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

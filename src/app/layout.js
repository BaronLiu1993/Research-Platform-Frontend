import {
  Geist,
  Geist_Mono,
  Inter,
  Noto_Sans,
  Playfair_Display,
  VT323,
  Fraunces,
} from "next/font/google";
import { Toaster } from "@/shadcomponents/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const vt = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunce",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "palette",
  description: "Research Internship Outreach App for University Students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${fraunces.variable} ${vt.variable} ${geistMono.variable} ${inter.variable} ${noto.variable} ${playfair.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

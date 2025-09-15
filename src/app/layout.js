import { Geist, Geist_Mono, Inter, Noto_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "@/shadcomponents/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
  variable: "--font-noto"
})

const inter = Inter({
   subsets: ["latin"], 
   variable: "--font-inter" 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${noto.variable} ${playfair.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

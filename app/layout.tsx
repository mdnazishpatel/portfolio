import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
    Big_Shoulders,
  Barlow,
  JetBrains_Mono,
  Playfair_Display,
  Bangers,
} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

const display =   Big_Shoulders({ subsets: ["latin"], weight: ["800", "900"], variable: "--f-display" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });
const serif = Playfair_Display({ subsets: ["latin"], weight: ["900"], variable: "--f-serif" });
const comic = Bangers({ subsets: ["latin"], weight: ["400"], variable: "--f-comic" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nazish portfolio",
  description: "Created by nazish",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable} ${comic.variable} ${geistSans.variable} ${geistMono.variable} font-body`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
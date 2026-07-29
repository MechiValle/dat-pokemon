import type { Metadata } from "next";
import { Manrope, Press_Start_2P } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/i18n/I18nProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Who's that Pokémon?",
  description: "Guess the Pokémon from its silhouette.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${pressStart2P.variable} font-sans`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
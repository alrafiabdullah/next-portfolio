import "./globals.css";

import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
});


export const metadata: Metadata = {
  title: "Blogs | Abdullah Al Rafi",
  description: "A collection of blogs and articles written by Abdullah Al Rafi, covering various topics in technology, programming, and software development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body
        className={` ${inter.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

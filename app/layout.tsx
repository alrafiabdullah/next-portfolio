import "./globals.css";

import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from 'next/font/google';
import ThemeProvider from "./components/Theme/ThemeProvider";
import { Navbar } from "./components/Home/Navbar";

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
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={` ${inter.variable} ${sourceSerif.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

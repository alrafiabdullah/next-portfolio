import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter, Source_Serif_4 } from 'next/font/google';

import Footer from "./components/Home/Footer";
import { Navbar } from "./components/Home/Navbar";
import ThemeProvider from "./components/Theme/ThemeProvider";

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
  openGraph: {
    title: "Blogs | Abdullah Al Rafi",
    description: "A collection of blogs and articles written by Abdullah Al Rafi, covering various topics in technology, programming, and software development.",
    url: "https://abdullahalrafi.com",
    siteName: "Abdullah Al Rafi's Blog",
  },
  keywords: ["blog", "technology", "programming", "software development", "articles", "Abdullah Al Rafi"],
  authors: [{ name: "Abdullah Al Rafi", url: "https://abdullahalrafi.com" }],
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
        className={` ${inter.variable} ${sourceSerif.variable} antialiased flex min-h-screen flex-col`}
      >
        <ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
                border: "1px solid var(--color-border-muted)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.875rem",
              },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

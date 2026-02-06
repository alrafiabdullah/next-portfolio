"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Category, getCategories } from "@/app/services/categoryService";
import ThemeToggle from "@/app/components/Theme/ThemeToggle";

const fallbackCategories: Category[] = [
  { name: "Technology", href: "/category/technology" },
  { name: "Programming", href: "/category/programming" },
  { name: "Design", href: "/category/design" },
  { name: "Tutorials", href: "/category/tutorials" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories(fallbackCategories));
  }, []);

  return (
    <nav
      className="sticky top-0 z-40 w-full backdrop-blur-md border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-bg-main) 85%, transparent)",
        borderColor: "var(--color-border-muted)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-tight no-underline"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-text-primary)",
          }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white"
            style={{ backgroundColor: "var(--color-accent-primary)" }}
          >
            AR
          </span>
          <span className="hidden sm:inline">Abdullah&apos;s Blog</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-colors duration-200"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-secondary)";
              }}
            >
              {cat.name}
            </Link>
          ))}

          <span
            className="mx-2 h-5 w-px"
            style={{ backgroundColor: "var(--color-border-muted)" }}
          />

          <Link
            href="/about"
            className="rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-colors duration-200"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-md px-3 py-1.5 text-sm font-medium no-underline transition-colors duration-200"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-bg-secondary)";
              e.currentTarget.style.color = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--color-text-secondary)";
            }}
          >
            Contact
          </Link>

          <span
            className="mx-2 h-5 w-px"
            style={{ backgroundColor: "var(--color-border-muted)" }}
          />

          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md border cursor-pointer"
            style={{
              borderColor: "var(--color-border-muted)",
              color: "var(--color-text-primary)",
              backgroundColor: "transparent",
            }}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{
          maxHeight: mobileOpen ? "400px" : "0",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div
          className="flex flex-col gap-1 border-t px-5 py-3"
          style={{ borderColor: "var(--color-border-muted)" }}
        >
          <p
            className="px-3 pt-1 pb-2 text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--color-ui-muted)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Categories
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors duration-200"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {cat.name}
            </Link>
          ))}

          <span
            className="my-1 h-px w-full"
            style={{ backgroundColor: "var(--color-border-muted)" }}
          />

          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 text-sm font-medium no-underline"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 text-sm font-medium no-underline"
            style={{
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

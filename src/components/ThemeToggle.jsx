"use client";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white dark:bg-slate-900 text-slate-700 shadow-sm transition hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-95 dark:border-slate-700 dark:text-slate-200 dark:hover:border-[#D4AF37]"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white dark:bg-slate-900 text-slate-700 shadow-sm transition hover:border-[#D4AF37] hover:text-[#D4AF37] active:scale-95 dark:border-slate-700 dark:text-slate-200 dark:hover:border-[#D4AF37]"
    >
      {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
    </button>
  );
}

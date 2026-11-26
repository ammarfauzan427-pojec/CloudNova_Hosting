"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("cloudnova-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("cloudnova-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#1E293B]" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="w-9 h-9 flex items-center justify-center rounded-md border border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#4B5563] dark:text-[#E2E8F0] hover:text-[#F58220] dark:hover:text-[#F58220] hover:border-[#F58220] transition-colors"
      title={theme === "light" ? "Aktifkan Dark Mode" : "Aktifkan Light Mode"}
    >
      <i className={`bi ${theme === "light" ? "bi-moon-stars-fill" : "bi-sun-fill text-amber-400"} text-base`}></i>
    </button>
  );
}

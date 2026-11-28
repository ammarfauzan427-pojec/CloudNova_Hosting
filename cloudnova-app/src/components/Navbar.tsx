"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cloudnova_user_email");
    if (saved) setUserEmail(saved);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cloudnova_user_email");
    setUserEmail(null);
    window.location.reload();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#334155] transition-all duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[#1F2937] dark:text-white font-extrabold text-2xl tracking-tight"
            >
              <span className="w-10 h-10 rounded-lg bg-[#F58220] flex items-center justify-center text-white shadow-xs">
                <i className="bi bi-cloud-fill text-xl"></i>
              </span>
              CloudNova<span className="text-[#F58220]">.</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1.5">
              <Link
                href="/#home"
                className="text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3.5 py-2 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#features"
                className="text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3.5 py-2 rounded-md transition-colors"
              >
                Fitur
              </Link>
              <Link
                href="/#pricing"
                className="text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3.5 py-2 rounded-md transition-colors"
              >
                Harga
              </Link>
              <Link
                href="/#infrastructure"
                className="text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3.5 py-2 rounded-md transition-colors"
              >
                Infrastruktur
              </Link>
              <Link
                href="/status"
                className="text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Status Server
              </Link>
              <Link
                href="/#faq"
                className="text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3.5 py-2 rounded-md transition-colors"
              >
                FAQ
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />

              {/* Client Area / Auth Button */}
              {userEmail ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/cpanel"
                    className="text-xs font-semibold px-3.5 py-2 rounded-md bg-[#FDEEE2] dark:bg-[#332014] text-[#C25E08] dark:text-[#F58220] border border-[#F58220]/30 hover:bg-[#F58220] hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <i className="bi bi-speedometer2"></i> cPanel Area
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 hover:text-rose-600 px-2 py-1 cursor-pointer"
                    title="Keluar Akun"
                  >
                    <i className="bi bi-box-arrow-right text-sm"></i>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-xs font-semibold px-4 py-2.5 rounded-md bg-white dark:bg-[#1E293B] border border-[#D1D5DB] dark:border-[#334155] text-[#1F2937] dark:text-[#E2E8F0] hover:border-[#F58220] hover:text-[#F58220] hover:bg-[#FDEEE2]/50 dark:hover:bg-[#332014] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="bi bi-person-circle"></i> Login Klien
                </button>
              )}

              <Link
                href="/#pricing"
                className="text-xs font-semibold px-4 py-2.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white shadow-xs transition-all flex items-center gap-1.5"
              >
                Mulai Sekarang <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>

            {/* Mobile hamburger & ThemeToggle */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#1F2937] dark:text-white bg-white dark:bg-[#1E293B] p-2 rounded-md border border-[#E5E7EB] dark:border-[#334155] hover:bg-[#F6F7F9] dark:hover:bg-[#0F172A]"
                aria-label="Toggle Menu"
              >
                <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#1E293B] rounded-lg p-4 mt-2 mb-4 space-y-1.5 shadow-sm">
              <Link
                href="/#home"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3 py-2 rounded-md"
              >
                Fitur
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#374151] dark:text-[#CBD5E1] hover:text-[#1F2937] dark:hover:text-white hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3 py-2 rounded-md"
              >
                Harga
              </Link>
              <Link
                href="/cpanel"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-[#F58220] hover:bg-[#FDEEE2] dark:hover:bg-[#332014] px-3 py-2 rounded-md"
              >
                <i className="bi bi-speedometer2 me-1"></i> Area cPanel Klien
              </Link>
              <Link
                href="/status"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 px-3 py-2 rounded-md"
              >
                Status Server
              </Link>
              <div className="pt-3 mt-2 border-t border-[#EBECEF] dark:border-[#334155] flex flex-col gap-2">
                {userEmail ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-center text-xs font-semibold py-2.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200"
                  >
                    Keluar ({userEmail})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full text-center text-xs font-semibold py-2.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white"
                  >
                    Login Klien
                  </button>
                )}
                <Link
                  href="/cart?plan=business"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-xs font-semibold py-2.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white"
                >
                  Pesan Hosting Sekarang
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal Global */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(email) => {
          setUserEmail(email);
          window.location.reload();
        }}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#1F2937] font-extrabold text-2xl tracking-tight"
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
              className="text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3.5 py-2 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#features"
              className="text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3.5 py-2 rounded-md transition-colors"
            >
              Fitur
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3.5 py-2 rounded-md transition-colors"
            >
              Harga
            </Link>
            <Link
              href="/#testimonials"
              className="text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3.5 py-2 rounded-md transition-colors"
            >
              Testimoni
            </Link>
            <Link
              href="/#infrastructure"
              className="text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3.5 py-2 rounded-md transition-colors"
            >
              Infrastruktur
            </Link>
            <Link
              href="/status"
              className="text-sm font-medium text-emerald-700 hover:bg-emerald-50 px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Status Server
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3.5 py-2 rounded-md transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/628996217895"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold px-4 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-[#1F2937] hover:border-[#F58220] hover:text-[#F58220] hover:bg-[#FDEEE2]/50 transition-all"
            >
              Hubungi Kami
            </a>
            <Link
              href="/#pricing"
              className="text-xs font-semibold px-4 py-2.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white shadow-xs transition-all flex items-center gap-1.5"
            >
              Mulai Sekarang <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1F2937] bg-white p-2 rounded-md border border-[#E5E7EB] hover:bg-[#F6F7F9]"
              aria-label="Toggle Menu"
            >
              <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border border-[#E5E7EB] bg-white rounded-lg p-4 mt-2 mb-4 space-y-1.5 shadow-sm">
            <Link
              href="/#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3 py-2 rounded-md"
            >
              Fitur
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3 py-2 rounded-md"
            >
              Harga
            </Link>
            <Link
              href="/#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3 py-2 rounded-md"
            >
              Testimoni
            </Link>
            <Link
              href="/#infrastructure"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3 py-2 rounded-md"
            >
              Infrastruktur
            </Link>
            <Link
              href="/status"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-md"
            >
              Status Server
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#374151] hover:text-[#1F2937] hover:bg-[#FDEEE2] px-3 py-2 rounded-md"
            >
              FAQ
            </Link>
            <div className="pt-3 mt-2 border-t border-[#EBECEF] flex flex-col gap-2">
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
  );
}
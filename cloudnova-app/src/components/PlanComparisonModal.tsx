"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlanComparisonModal() {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    { name: "Kapasitas NVMe SSD", starter: "10 GB", business: "50 GB", pro: "100 GB" },
    { name: "Alokasi Domain", starter: "1 Domain", business: "10 Domain", pro: "Unlimited" },
    { name: "Gratis Domain (.com/.id)", starter: "❌", business: "✅ (1 Tahun)", pro: "✅ (1 Tahun)" },
    { name: "Bandwidth Bulanan", starter: "Unlimited", business: "Unlimited", pro: "Unlimited" },
    { name: "RAM Server Dedikasi", starter: "1 GB RAM", business: "2 GB RAM", pro: "4 GB RAM" },
    { name: "CPU Core", starter: "1 Core", business: "2 Core", pro: "4 Core" },
    { name: "Inodes (File Limit)", starter: "250.000", business: "450.000", pro: "600.000" },
    { name: "LiteSpeed Web Server", starter: "✅", business: "✅ + LSCache", pro: "✅ + LSCache Turbo" },
    { name: "Auto Backup Harian", starter: "Mingguan", business: "Harian (Offsite)", pro: "Realtime Snapshot" },
    { name: "SSL Certificate (AutoSSL)", starter: "✅ Gratis", business: "✅ Gratis", pro: "✅ Gratis Wildcard" },
    { name: "Email Akun Bisnis", starter: "5 Akun", business: "Unlimited", pro: "Unlimited" },
    { name: "cPanel & Softaculous", starter: "✅", business: "✅", pro: "✅" },
    { name: "Dukungan Prioritas 24/7", starter: "Standar", business: "Prioritas", pro: "VIP 24/7 Response" },
  ];

  return (
    <div className="text-center mt-10">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#D1D5DB] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[#1F2937] dark:text-[#F8FAFC] font-semibold text-sm hover:border-[#F58220] dark:hover:border-[#F58220] hover:text-[#F58220] dark:hover:text-[#F58220] transition-all shadow-xs cursor-pointer"
      >
        <i className="bi bi-layout-three-columns text-base text-[#F58220]"></i>
        Bandingkan Spesifikasi Lengkap Semua Paket
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#334155] shadow-2xl p-6 sm:p-8 text-left">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB] dark:border-[#334155]">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2937] dark:text-white">
                  Tabel Komparasi Spesifikasi CloudNova
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] mt-1">
                  Pilih resource yang paling sesuai dengan kebutuhan performa dan skala website Anda.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                <i className="bi bi-x-lg text-lg"></i>
              </button>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] dark:border-[#334155] text-xs font-bold text-[#6B7280] dark:text-[#94A3B8] uppercase">
                    <th className="py-4 px-4">Fitur / Resource</th>
                    <th className="py-4 px-4 text-center">Starter</th>
                    <th className="py-4 px-4 text-center bg-[#FDEEE2]/40 dark:bg-[#332014]/40 text-[#F58220] rounded-t-lg">
                      Business (Populer)
                    </th>
                    <th className="py-4 px-4 text-center">Professional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#334155]">
                  {features.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/70 dark:hover:bg-[#0F172A]/50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#1F2937] dark:text-[#E2E8F0]">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-4 text-center text-[#4B5563] dark:text-[#94A3B8]">
                        {item.starter}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-[#1F2937] dark:text-white bg-[#FDEEE2]/20 dark:bg-[#332014]/20">
                        {item.business}
                      </td>
                      <td className="py-3.5 px-4 text-center text-[#4B5563] dark:text-[#94A3B8]">
                        {item.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[#E5E7EB] dark:border-[#334155]">
                    <td className="py-5 px-4 font-semibold text-[#1F2937] dark:text-white">Aksi Pemesanan</td>
                    <td className="py-5 px-4 text-center">
                      <Link
                        href="/cart?plan=starter"
                        onClick={() => setIsOpen(false)}
                        className="inline-block px-3.5 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-200"
                      >
                        Pilih Starter
                      </Link>
                    </td>
                    <td className="py-5 px-4 text-center bg-[#FDEEE2]/20 dark:bg-[#332014]/20">
                      <Link
                        href="/cart?plan=business"
                        onClick={() => setIsOpen(false)}
                        className="inline-block px-4 py-2 rounded-md bg-[#F58220] text-xs font-bold text-white hover:bg-[#E06D0B] shadow-xs"
                      >
                        Pilih Business
                      </Link>
                    </td>
                    <td className="py-5 px-4 text-center">
                      <Link
                        href="/cart?plan=pro"
                        onClick={() => setIsOpen(false)}
                        className="inline-block px-3.5 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-200"
                      >
                        Pilih Pro
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

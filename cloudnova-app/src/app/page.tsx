"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQS = [
  {
    q: "Apakah saya bisa upgrade paket hosting kapan saja tanpa downtime?",
    a: "Bisa. Anda dapat melakukan upgrade dari paket Starter ke Business atau Professional kapan saja melalui area klien. Proses migrasi resource berjalan otomatis tanpa menghapus file website maupun memutus layanan aktif.",
  },
  {
    q: "Bagaimana cara klaim domain gratis pada paket Business dan Professional?",
    a: "Pilih durasi berlangganan minimal 12 bulan (1 tahun) pada halaman checkout, lalu masukkan nama domain (.com, .id, atau .net) yang diinginkan. Biaya registrasi tahun pertama otomatis terpotong menjadi Rp0.",
  },
  {
    q: "Apakah CloudNova mendukung instalasi WordPress dan aplikasi PHP/MySQL?",
    a: "Ya. Seluruh paket dilengkapi cPanel dengan Softaculous Auto Installer sehingga Anda bisa memasang WordPress, Laravel, atau CMS lainnya hanya dalam sekali klik, lengkap dengan versi PHP selector dan MariaDB/MySQL.",
  },
  {
    q: "Seberapa sering backup otomatis dilakukan pada server?",
    a: "Sistem kami menjalankan snapshot backup harian dan mingguan secara otomatis ke server penyimpanan terpisah (off-site) untuk menjaga keamanan data Anda dari kesalahan konfigurasi atau serangan malware.",
  },
  {
    q: "Berapa lama akun hosting aktif setelah pembayaran dikonfirmasi?",
    a: "Setelah konfirmasi pembayaran melalui QRIS, Virtual Account, atau tim support WhatsApp kami selesai, detail akses cPanel dan nameserver akan langsung dikirimkan ke email Anda dalam hitungan menit.",
  },
];

export default function HomePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [domainSearch, setDomainSearch] = useState("");
  const [domainResult, setDomainResult] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Advisor State
  const [advisorVisitors, setAdvisorVisitors] = useState<"starter" | "business" | "pro">("business");
  const [advisorType, setAdvisorType] = useState<"starter" | "business" | "pro">("business");

  const checkDomain = () => {
    let clean = domainSearch.trim().toLowerCase();
    if (!clean) return;
    if (!clean.includes(".")) clean += ".com";
    setDomainResult(clean);
  };

  const getRecommendedPlan = () => {
    if (advisorVisitors === "pro" || advisorType === "pro") {
      return {
        title: "Paket Professional Hosting",
        price: "Rp89.000/bln",
        reason: "Resource tinggi, 50 GB NVMe SSD & database unlimited untuk traffic padat.",
        href: "/cart?plan=professional",
      };
    } else if (advisorVisitors === "starter" && advisorType === "starter") {
      return {
        title: "Paket Starter Hosting",
        price: "Rp25.000/bln",
        reason: "Pilihan sangat hemat & pas untuk blog pribadi atau web profil dasar.",
        href: "/cart?plan=starter",
      };
    } else {
      return {
        title: "Paket Business Hosting",
        price: "Rp49.000/bln",
        reason: "Kapasitas 30 GB SSD, backup rutin, dan email profesional cocok untuk UMKM.",
        href: "/cart?plan=business",
      };
    }
  };

  const recommended = getRecommendedPlan();

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#1F2937]">
      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden border-b border-[#E5E7EB]">
        {/* Subtle Warm Glow */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[350px] bg-[#F58220]/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 -left-20 w-[350px] h-[350px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDEEE2] border border-[#F58220]/25 text-[#C25E08] text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Next.js Powered Hosting &bull; High Reliability
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] tracking-tight leading-[1.15] mb-6">
                Hosting Super Cepat.{" "}
                <span className="text-[#F58220] block mt-1">
                  Website Tanpa Hambatan.
                </span>
              </h1>

              <p className="text-[#6B7280] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Bangun website impianmu bersama CloudNova Hosting. Hadir dengan Pure NVMe/SSD, proteksi SSL gratis, cPanel ready, dan target uptime 99.9%.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-10">
                <Link
                  href="/#pricing"
                  className="px-6 py-3.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white font-semibold text-sm shadow-xs transition-all flex items-center gap-2"
                >
                  Lihat Paket Hosting <i className="bi bi-arrow-right"></i>
                </Link>
                <Link
                  href="/#features"
                  className="px-6 py-3.5 rounded-md bg-white border border-[#D1D5DB] text-[#1F2937] font-semibold text-sm hover:border-[#F58220] hover:text-[#F58220] transition-all"
                >
                  Pelajari Fitur
                </Link>
              </div>

              {/* Domain Checker Box */}
              <div className="max-w-lg mx-auto lg:mx-0 bg-white border border-[#EBECEF] p-2 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] mb-4">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative flex-1 w-full flex items-center">
                    <i className="bi bi-search absolute left-3.5 text-[#6B7280] text-sm"></i>
                    <input
                      type="text"
                      value={domainSearch}
                      onChange={(e) => setDomainSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && checkDomain()}
                      placeholder="Cari domain impian Anda (contoh: bisnis.id)..."
                      className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-[#1F2937] placeholder-[#6B7280] focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={checkDomain}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Cek Domain
                  </button>
                </div>
                {domainResult && (
                  <div className="mt-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-md text-xs text-emerald-800 flex items-center justify-between">
                    <span>
                      ✓ Domain <strong>{domainResult}</strong> tersedia!
                    </span>
                    <Link
                      href={`/cart?plan=business&domain=${encodeURIComponent(domainResult)}`}
                      className="underline font-bold text-emerald-900 hover:text-[#F58220]"
                    >
                      Klaim di Checkout &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-[#6B7280]">
                <span>Ekstensi Populer:</span>
                <span className="font-semibold text-[#374151]">.com</span>
                <span className="font-semibold text-[#374151]">.id</span>
                <span className="font-semibold text-[#374151]">.co.id</span>
                <span className="font-semibold text-[#374151]">.net</span>
              </div>
            </div>

            {/* Right Visual Server Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="p-6 rounded-lg bg-white border border-[#EBECEF] shadow-[0_10px_30px_rgba(31,41,55,0.06)] animate-floating">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#F58220] font-bold">
                        CloudNova Control Node
                      </span>
                      <h4 className="text-[#1F2937] font-bold text-base mt-0.5">Live Server Overview</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Operational
                    </span>
                  </div>

                  <div className="my-6 flex justify-center">
                    <div className="w-24 h-24 rounded-2xl bg-[#FDEEE2] border border-[#F58220]/20 flex items-center justify-center">
                      <i className="bi bi-cloud-check-fill text-5xl text-[#F58220]"></i>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-xs text-[#374151] font-medium">
                      <span>Server Performance</span>
                      <span className="text-emerald-600 font-semibold">99.98% Optimal</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
                      <div className="h-full bg-[#F58220] rounded-full w-[88%]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-md bg-[#F9FAFB] border border-[#EBECEF]">
                      <span className="text-[#6B7280] block mb-1">CPU Load</span>
                      <strong className="text-[#1F2937] text-base font-bold">14% Avg</strong>
                    </div>
                    <div className="p-3 rounded-md bg-[#F9FAFB] border border-[#EBECEF]">
                      <span className="text-[#6B7280] block mb-1">NVMe Storage</span>
                      <strong className="text-[#1F2937] text-base font-bold">Ultra Fast</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#F58220] tracking-wider uppercase">Mengapa CloudNova?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-2 mb-4 tracking-tight">
              Infrastruktur Modern untuk Semua Kebutuhan.
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Semua paket shared hosting telah dilengkapi dengan optimasi stack terbaik untuk menunjang kecepatan website Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#FFA000]/15 text-[#FFA000] flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
              <h3 className="text-[#1F2937] font-bold text-base mb-2">NVMe SSD Storage</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed">
                Penyimpanan solid-state tercepat untuk memastikan load time website dan query database berlangsung instan.
              </p>
            </div>

            <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <h3 className="text-[#1F2937] font-bold text-base mb-2">AutoSSL Gratis</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed">
                Keamanan enkripsi HTTPS dipasang otomatis untuk seluruh domain dan subdomain Anda tanpa biaya tambahan.
              </p>
            </div>

            <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-hdd-stack-fill"></i>
              </div>
              <h3 className="text-[#1F2937] font-bold text-base mb-2">cPanel Control Panel</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed">
                Kelola file website, database MySQL, domain, dan email bisnis dengan tampilan dasbor cPanel yang mudah.
              </p>
            </div>

            <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-[#14B8A6]/15 text-[#14B8A6] flex items-center justify-center text-2xl mb-5">
                <i className="bi bi-headset"></i>
              </div>
              <h3 className="text-[#1F2937] font-bold text-base mb-2">Support WhatsApp</h3>
              <p className="text-[#6B7280] text-xs leading-relaxed">
                Dapatkan respon bantuan cepat langsung dari teknisi kami via WhatsApp saat menghadapi kendala website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 relative overflow-hidden bg-[#F6F7F9] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#F58220] tracking-wider uppercase">Harga Transparan &amp; Bersahabat</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-2 mb-4 tracking-tight">
              Pilih Paket Hosting Sesuai Kebutuhan Anda.
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Mulai langkah digital Anda hari ini. Nikmati potongan ekstra untuk langganan tahunan!
            </p>

            {/* Toggle Billing */}
            <div className="mt-8 inline-flex items-center gap-2 p-1 rounded-full bg-white border border-[#E5E7EB] shadow-2xs">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === "monthly" ? "bg-[#F58220] text-white" : "text-[#6B7280] hover:text-[#1F2937]"
                }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === "yearly" ? "bg-[#F58220] text-white" : "text-[#6B7280] hover:text-[#1F2937]"
                }`}
              >
                Tahunan{" "}
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    billingCycle === "yearly" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  Hemat 20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
            {/* 1. Starter */}
            <div className="p-8 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-[#F58220] transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/12 text-[#3B82F6] flex items-center justify-center text-xl mb-4">
                  <i className="bi bi-rocket-takeoff"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-1">Starter</h3>
                <p className="text-[#6B7280] text-xs mb-6">Pilihan ekonomis untuk blog pribadi atau portfolio.</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1F2937]">
                    {billingCycle === "yearly" ? "Rp20.000" : "Rp25.000"}
                  </span>
                  <span className="text-[#6B7280] text-xs">/bulan</span>
                </div>

                <div className="w-full h-px bg-[#E5E7EB] mb-6"></div>

                <ul className="space-y-3.5 text-xs text-[#374151] mb-8">
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 1 Website
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 10 GB NVMe SSD Storage
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Gratis SSL Unlimited
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 1 Database MySQL
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 2 Akun Email Bisnis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> cPanel Control Panel
                  </li>
                </ul>
              </div>

              <Link
                href="/cart?plan=starter"
                className="w-full py-3 rounded-md bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] font-bold text-xs text-center hover:bg-[#FDEEE2] hover:border-[#F58220] hover:text-[#F58220] transition-all"
              >
                Pilih Starter &rarr;
              </Link>
            </div>

            {/* 2. Business (Featured) */}
            <div className="p-8 rounded-md bg-white border-2 border-[#F58220] shadow-[0_12px_30px_rgba(245,130,32,0.1)] flex flex-col justify-between relative transform md:-translate-y-2">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F58220] text-white font-bold text-[10px] tracking-wider uppercase shadow-xs">
                Paling Populer
              </span>

              <div>
                <div className="w-12 h-12 rounded-lg bg-[#FDEEE2] text-[#F58220] flex items-center justify-center text-xl mb-4">
                  <i className="bi bi-building"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-1">Business</h3>
                <p className="text-[#6B7280] text-xs mb-6">Performa optimal untuk toko online dan bisnis UMKM.</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1F2937]">
                    {billingCycle === "yearly" ? "Rp39.200" : "Rp49.000"}
                  </span>
                  <span className="text-[#6B7280] text-xs">/bulan</span>
                </div>

                <div className="w-full h-px bg-[#E5E7EB] mb-6"></div>

                <ul className="space-y-3.5 text-xs text-[#374151] mb-8">
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 5 Website
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 30 GB NVMe SSD Storage
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Gratis Domain (.com/.id)*
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Gratis SSL Unlimited
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 5 Database MySQL
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 10 Akun Email Bisnis
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Backup Berkala Otomatis
                  </li>
                </ul>
              </div>

              <Link
                href="/cart?plan=business"
                className="w-full py-3.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white font-bold text-xs text-center shadow-xs transition-all"
              >
                Pilih Paket Business &rarr;
              </Link>
            </div>

            {/* 3. Professional */}
            <div className="p-8 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-[#F58220] transition-all">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#14B8A6]/12 text-[#14B8A6] flex items-center justify-center text-xl mb-4">
                  <i className="bi bi-gem"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-1">Professional</h3>
                <p className="text-[#6B7280] text-xs mb-6">Kapasitas maksimal untuk agensi, developer &amp; multi-web.</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-[#1F2937]">
                    {billingCycle === "yearly" ? "Rp71.200" : "Rp89.000"}
                  </span>
                  <span className="text-[#6B7280] text-xs">/bulan</span>
                </div>

                <div className="w-full h-px bg-[#E5E7EB] mb-6"></div>

                <ul className="space-y-3.5 text-xs text-[#374151] mb-8">
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 10 Website
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> 50 GB NVMe SSD Storage
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Gratis Domain (.com/.id)*
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Unlimited Database MySQL
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Unlimited Akun Email
                  </li>
                  <li className="flex items-center gap-2.5">
                    <i className="bi bi-check-circle-fill text-[#F58220]"></i> Prioritas VIP Support
                  </li>
                </ul>
              </div>

              <Link
                href="/cart?plan=professional"
                className="w-full py-3 rounded-md bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] font-bold text-xs text-center hover:bg-[#FDEEE2] hover:border-[#F58220] hover:text-[#F58220] transition-all"
              >
                Pilih Professional &rarr;
              </Link>
            </div>
          </div>

          {/* ADVISOR CALCULATOR BOX */}
          <div className="p-8 rounded-lg bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="px-3 py-1 rounded-full bg-[#FDEEE2] text-[#C25E08] text-[10px] font-bold uppercase tracking-wider">
                  Hosting Advisor
                </span>
                <h3 className="text-2xl font-bold text-[#1F2937] mt-2 mb-2">Bingung Memilih Paket?</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">
                  Gunakan kalkulator rekomendasi kami. Pilih perkiraan traffic dan jenis website untuk mendapatkan paket yang efisien tanpa membayar berlebihan.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Traffic Pengunjung Bulanan:</label>
                    <select
                      value={advisorVisitors}
                      onChange={(e) => setAdvisorVisitors(e.target.value as "starter" | "business" | "pro")}
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#F58220]"
                    >
                      <option value="starter">&lt; 10.000 Pengunjung</option>
                      <option value="business">10.000 - 50.000 Pengunjung</option>
                      <option value="pro">&gt; 50.000 Pengunjung</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">Jenis Kebutuhan Website:</label>
                    <select
                      value={advisorType}
                      onChange={(e) => setAdvisorType(e.target.value as "starter" | "business" | "pro")}
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-xs text-[#1F2937] focus:outline-none focus:border-[#F58220]"
                    >
                      <option value="starter">Blog Pribadi / Portfolio</option>
                      <option value="business">Toko Online / Web UMKM</option>
                      <option value="pro">Portal Berita / Agensi Web</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-[#FDEEE2]/60 border border-[#F58220]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#C25E08] font-semibold block">Rekomendasi Paket Pas:</span>
                    <strong className="text-[#1F2937] text-base block font-bold">
                      {recommended.title} ({recommended.price})
                    </strong>
                    <span className="text-xs text-[#374151]">{recommended.reason}</span>
                  </div>
                  <Link
                    href={recommended.href}
                    className="px-5 py-2.5 rounded-md bg-[#F58220] hover:bg-[#E06D0B] text-white font-bold text-xs shrink-0 transition-all"
                  >
                    Ambil Paket Ini &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#F58220] tracking-wider uppercase">Testimoni Klien</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-2 mb-4 tracking-tight">
              Dipercaya Developer, UMKM &amp; Kreator Digital.
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Pengalaman nyata pengguna yang memindahkan website dan toko online mereka ke infrastruktur CloudNova Hosting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rizky Pratama",
                role: "Founder Toko Kopi Nusantara",
                plan: "Paket Business",
                quote:
                  "Pindah dari hosting lama ke CloudNova langsung terasa bedanya. Halaman checkout WooCommerce jadi jauh lebih ringan dan respon CS WhatsApp cepat banget pas setting DNS.",
              },
              {
                name: "Nadia Putri Maharani",
                role: "Freelance Web Developer",
                plan: "Paket Professional",
                quote:
                  "Kelola 8 website klien dalam satu cPanel berjalan mulus tanpa lemot. NVMe SSD-nya kencang dan AutoSSL langsung aktif otomatis setiap kali tambah subdomain baru.",
              },
              {
                name: "Dimas Saputra",
                role: "Mahasiswa & Tech Blogger",
                plan: "Paket Starter",
                quote:
                  "Harganya ramah di kantong mahasiswa tapi performanya tidak murahan. Dipakai untuk blog teknis dan proyek portofolio kuliah selalu stabil dengan uptime tinggi.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-md bg-[#F9FAFB] border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:border-[#F58220] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#FFA000] text-xs">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FDEEE2] text-[#C25E08] text-[10px] font-bold">
                      {item.plan}
                    </span>
                  </div>
                  <p className="text-[#374151] text-xs leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F58220] text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2937]">{item.name}</h4>
                    <span className="text-[11px] text-[#6B7280] block">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE SECTION */}
      <section id="infrastructure" className="py-24 bg-[#F6F7F9] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold text-[#F58220] tracking-wider uppercase">Arsitektur &amp; Jaringan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-2 mb-4 tracking-tight">
                Infrastruktur Server Kelas Enterprise.
              </h2>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                Ditempatkan di datacenter Tier-3 dengan koneksi langsung ke Indonesia Internet Exchange (IIX) dan peering internasional untuk akses rendah latensi dari seluruh Asia Tenggara.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#FDEEE2] text-[#F58220] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="bi bi-cpu-fill"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2937]">AMD EPYC &amp; Intel Xeon Scalable</h4>
                    <p className="text-xs text-[#6B7280]">Pemrosesan multi-core berkecepatan tinggi dengan isolasi resource CloudLinux OS.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1F2937]">Imunify360 &amp; Anti-DDoS Protection</h4>
                    <p className="text-xs text-[#6B7280]">Pemindaian malware real-time, Web Application Firewall (WAF), dan mitigasi serangan L3/L4/L7.</p>
                  </div>
                </div>
              </div>

              <Link
                href="/status"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white border border-[#D1D5DB] text-xs font-bold text-[#1F2937] hover:border-[#F58220] hover:text-[#F58220] transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Cek Live Status Datacenter &rarr;
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#1F2937]">🇮🇩 Cyber 2 Jakarta (ID-01)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    4 ms IIX
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  Lokasi utama untuk target pengunjung Indonesia dengan jalur peering langsung ke ISP lokal.
                </p>
                <div className="text-[11px] font-semibold text-[#374151] flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <span>Web Stack: LiteSpeed Enterprise</span>
                  <span className="text-emerald-600">99.99% Uptime</span>
                </div>
              </div>

              <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#1F2937]">🇸🇬 Equinix Singapore (SG-01)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    18 ms Regional
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  Hub konektivitas global Asia-Pasifik untuk aplikasi SaaS, API, dan bisnis lintas negara.
                </p>
                <div className="text-[11px] font-semibold text-[#374151] flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <span>Storage: Enterprise RAID-10 NVMe</span>
                  <span className="text-emerald-600">99.98% Uptime</span>
                </div>
              </div>

              <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#1F2937]">⚡ LiteSpeed + LSCache</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FDEEE2] text-[#C25E08] text-[10px] font-bold">
                    HTTP/3 Ready
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Akselerasi server-level hingga 5x lebih cepat dibanding Apache standar untuk WordPress dan PHP.
                </p>
              </div>

              <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#1F2937]">🛡️ Off-Site Daily Backup</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#3B82F6]/12 text-[#3B82F6] text-[10px] font-bold">
                    3x Replikasi
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Pemulihan file, database, dan akun email mandiri kapan saja langsung dari dasbor cPanel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#F58220] tracking-wider uppercase">Pertanyaan Umum (FAQ)</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-2 mb-4 tracking-tight">
              Jawaban untuk Pertanyaan Anda.
            </h2>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Masih ragu sebelum memesan? Simak beberapa hal yang paling sering ditanyakan pelanggan kami.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-md border transition-colors ${
                    isOpen ? "bg-[#F9FAFB] border-[#F58220]" : "bg-white border-[#EBECEF] hover:border-[#D1D5DB]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-[#1F2937]">{item.q}</span>
                    <i
                      className={`bi ${
                        isOpen ? "bi-dash-lg text-[#F58220]" : "bi-plus-lg text-[#6B7280]"
                      } text-base shrink-0`}
                    ></i>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs text-[#374151] leading-relaxed border-t border-[#E5E7EB] pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
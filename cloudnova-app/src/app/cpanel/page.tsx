"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, Service } from "@/lib/supabase";

export default function CpanelPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "filemanager" | "mysql" | "email" | "ssl" | "wordpress">("overview");

  // Interactive Tools State
  const [dbName, setDbName] = useState("");
  const [dbList, setDbList] = useState<string[]>(["wp_blogdb", "app_store"]);
  const [emailAccount, setEmailAccount] = useState("");
  const [emailList, setEmailList] = useState<string[]>(["admin@cloudnova.id", "support@cloudnova.id"]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-id.supabase.co") {
        const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
        if (data && data.length > 0) {
          setServices(data);
          setSelectedService(data[0]);
          return;
        }
      }
    } catch (e) {
      console.warn("Supabase load fallback:", e);
    }

    // Fallback: LocalStorage / Default Demo Data
    const local = JSON.parse(localStorage.getItem("cloudnova_services") || "[]");
    if (local.length > 0) {
      setServices(local);
      setSelectedService(local[0]);
    } else {
      const defaultDemo: Service = {
        id: "demo-1",
        domain: "cloudnova.id",
        plan: "Paket Professional",
        username: "cloudnova",
        status: "active",
        disk_limit_gb: 50,
        disk_used_mb: 4200,
        bandwidth_limit_gb: 250,
        bandwidth_used_mb: 18500,
      };
      setServices([defaultDemo]);
      setSelectedService(defaultDemo);
    }
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateDB = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbName.trim()) return;
    const newDb = `${selectedService?.username || "user"}_${dbName.trim().toLowerCase()}`;
    setDbList([...dbList, newDb]);
    setDbName("");
    notify(`✅ Database MySQL '${newDb}' berhasil dibuat!`);
  };

  const handleCreateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAccount.trim()) return;
    const newEmail = `${emailAccount.trim().toLowerCase()}@${selectedService?.domain || "cloudnova.id"}`;
    setEmailList([...emailList, newEmail]);
    setEmailAccount("");
    notify(`✅ Akun Email Bisnis '${newEmail}' berhasil diaktifkan!`);
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F8FAFC]">
      <Navbar />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#F58220] flex items-center justify-center text-white text-base">
                <i className="bi bi-speedometer2"></i>
              </span>
              <h1 className="text-2xl font-extrabold text-[#1F2937] dark:text-white">CloudNova cPanel Console</h1>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Pusat kontrol manajemen server, database, email, dan file website Anda.
            </p>
          </div>

          {/* Service Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-semibold">Pilih Layanan:</span>
            <select
              value={selectedService?.domain || ""}
              onChange={(e) => {
                const s = services.find((srv) => srv.domain === e.target.value);
                if (s) setSelectedService(s);
              }}
              className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] rounded-lg px-3 py-2 text-xs font-bold text-[#F58220] focus:outline-none"
            >
              {services.map((srv, idx) => (
                <option key={idx} value={srv.domain}>
                  {srv.domain} ({srv.plan})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <i className="bi bi-check-circle-fill text-base"></i> {notification}
          </div>
        )}

        {/* Quick Resource Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Domain Utama</span>
            <p className="text-lg font-black text-[#1F2937] dark:text-white mt-1">{selectedService?.domain || "cloudnova.id"}</p>
            <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
              ● Active (cPanel Ready)
            </span>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Kapasitas NVMe SSD</span>
            <p className="text-lg font-black text-[#1F2937] dark:text-white mt-1">
              {(selectedService?.disk_used_mb || 4200) / 1000} GB / {selectedService?.disk_limit_gb || 50} GB
            </p>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-[#F58220] rounded-full" style={{ width: "12%" }}></div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Pemakaian Bandwidth</span>
            <p className="text-lg font-black text-[#1F2937] dark:text-white mt-1">
              {((selectedService?.bandwidth_used_mb || 18500) / 1000).toFixed(1)} GB / Unlimited
            </p>
            <span className="text-[10px] text-gray-400 mt-2 block">Reset tiap awal bulan</span>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Username &amp; Server IP</span>
            <p className="text-lg font-black text-[#F58220] mt-1">{selectedService?.username || "cloudnova"}</p>
            <span className="text-[10px] text-gray-400 mt-2 block">IP Node: 103.187.147.25 (Cyber 2)</span>
          </div>
        </div>

        {/* cPanel Main Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs (Sidebar style) */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: "overview", label: "Ringkasan & Aksi Cepat", icon: "bi-grid-fill" },
              { id: "filemanager", label: "File Manager (public_html)", icon: "bi-folder2-open" },
              { id: "mysql", label: "MySQL Databases", icon: "bi-database-fill" },
              { id: "email", label: "Akun Email Bisnis", icon: "bi-envelope-at-fill" },
              { id: "ssl", label: "SSL / TLS Certificate", icon: "bi-shield-lock-fill" },
              { id: "wordpress", label: "1-Click WordPress Installer", icon: "bi-wordpress" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#F58220] text-white shadow-xs"
                    : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-[#E5E7EB] dark:border-[#334155]"
                }`}
              >
                <i className={`bi ${tab.icon} text-base`}></i>
                {tab.label}
              </button>
            ))}

            <div className="pt-4">
              <Link
                href="/admin"
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 bg-gray-900 text-white hover:bg-black transition-all cursor-pointer"
              >
                <i className="bi bi-gear-wide-connected text-base text-[#F58220]"></i>
                Buka Admin Panel (Superadmin)
              </Link>
            </div>
          </div>

          {/* Active Tab Content Panel */}
          <div className="lg:col-span-9 bg-white dark:bg-[#1E293B] rounded-2xl border border-[#EBECEF] dark:border-[#334155] p-6 sm:p-8 shadow-xs">
            {/* 1. OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-[#1F2937] dark:text-white">Pintasan Layanan cPanel</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Akses instan modul server Anda dengan sekali klik.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => setActiveTab("filemanager")}
                    className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:border-[#F58220] hover:shadow-xs transition-all cursor-pointer text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-folder-fill"></i>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">File Manager</h4>
                    <p className="text-[10px] text-gray-400">Upload kode web &amp; aset</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("mysql")}
                    className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:border-[#F58220] hover:shadow-xs transition-all cursor-pointer text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-database-fill-gear"></i>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">phpMyAdmin &amp; MySQL</h4>
                    <p className="text-[10px] text-gray-400">Kelola database aplikasi</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("email")}
                    className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:border-[#F58220] hover:shadow-xs transition-all cursor-pointer text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-envelope-check-fill"></i>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Webmail &amp; Inbox</h4>
                    <p className="text-[10px] text-gray-400">Email kustom bisnis</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("ssl")}
                    className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:border-[#F58220] hover:shadow-xs transition-all cursor-pointer text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-shield-fill-check"></i>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">SSL / TLS AutoSSL</h4>
                    <p className="text-[10px] text-gray-400">Enkripsi gembok HTTPS</p>
                  </div>

                  <div
                    onClick={() => setActiveTab("wordpress")}
                    className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:border-[#F58220] hover:shadow-xs transition-all cursor-pointer text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-wordpress"></i>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Softaculous</h4>
                    <p className="text-[10px] text-gray-400">Pasang WordPress 1-klik</p>
                  </div>

                  <div
                    onClick={() => notify("✅ PHP Version diubah ke PHP 8.3 (LiteSpeed LSAPI)")}
                    className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#334155] hover:border-[#F58220] hover:shadow-xs transition-all cursor-pointer text-center space-y-2 group"
                  >
                    <div className="w-12 h-12 mx-auto rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      <i className="bi bi-code-slash"></i>
                    </div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">PHP Version Selector</h4>
                    <p className="text-[10px] text-gray-400">PHP 8.2 / 8.3 Ready</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. FILE MANAGER */}
            {activeTab === "filemanager" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                  <div>
                    <h3 className="font-extrabold text-base text-[#1F2937] dark:text-white flex items-center gap-2">
                      <i className="bi bi-folder2-open text-[#F58220]"></i> File Manager (/public_html)
                    </h3>
                    <p className="text-xs text-gray-500">Struktur file root website Anda.</p>
                  </div>
                  <button
                    onClick={() => notify("📁 Simulasi: File baru 'index.php' berhasil di-upload ke server!")}
                    className="px-3.5 py-1.5 bg-[#F58220] hover:bg-[#E06D0B] text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    <i className="bi bi-upload"></i> Upload File
                  </button>
                </div>

                <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 font-semibold text-gray-500 border-b border-gray-200 dark:border-gray-800 grid grid-cols-12">
                    <span className="col-span-6">Nama File / Direktori</span>
                    <span className="col-span-3 text-center">Ukuran</span>
                    <span className="col-span-3 text-right">Izin (Perms)</span>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      { name: ".htaccess", size: "1.2 KB", perm: "0644", icon: "bi-file-earmark-code" },
                      { name: "wp-config.php", size: "3.4 KB", perm: "0600", icon: "bi-file-earmark-lock" },
                      { name: "index.php", size: "0.8 KB", perm: "0644", icon: "bi-file-earmark-text" },
                      { name: "wp-content/", size: "24.5 MB", perm: "0755", icon: "bi-folder-fill text-amber-500" },
                      { name: "wp-includes/", size: "18.2 MB", perm: "0755", icon: "bi-folder-fill text-amber-500" },
                    ].map((f, i) => (
                      <div key={i} className="px-4 py-3 grid grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <span className="col-span-6 font-medium flex items-center gap-2">
                          <i className={`bi ${f.icon} text-base`}></i> {f.name}
                        </span>
                        <span className="col-span-3 text-center text-gray-500">{f.size}</span>
                        <span className="col-span-3 text-right font-mono text-gray-500">{f.perm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. MYSQL DATABASE */}
            {activeTab === "mysql" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-base text-[#1F2937] dark:text-white flex items-center gap-2">
                    <i className="bi bi-database-fill text-[#F58220]"></i> MySQL Databases &amp; Users
                  </h3>
                  <p className="text-xs text-gray-500">Buat dan kelola basis data MariaDB/MySQL website Anda.</p>
                </div>

                <form onSubmit={handleCreateDB} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex gap-3">
                  <div className="flex-1 flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                    <span className="text-xs text-gray-400 font-mono me-1">{selectedService?.username || "user"}_</span>
                    <input
                      type="text"
                      placeholder="nama_database"
                      value={dbName}
                      onChange={(e) => setDbName(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none"
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#F58220] hover:bg-[#E06D0B] text-white text-xs font-bold rounded-lg cursor-pointer">
                    + Buat Database
                  </button>
                </form>

                <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 font-semibold text-gray-500 border-b border-gray-200 dark:border-gray-800 flex justify-between">
                    <span>Database Aktif</span>
                    <span>Aksi</span>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {dbList.map((db, idx) => (
                      <div key={idx} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <span className="font-mono font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                          <i className="bi bi-database text-[#F58220]"></i> {db}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => notify(`Membuka phpMyAdmin untuk database '${db}'...`)}
                            className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 rounded-md text-[11px] font-semibold"
                          >
                            phpMyAdmin
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. EMAIL ACCOUNTS */}
            {activeTab === "email" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-base text-[#1F2937] dark:text-white flex items-center gap-2">
                    <i className="bi bi-envelope-at-fill text-[#F58220]"></i> Kelola Akun Email Bisnis
                  </h3>
                  <p className="text-xs text-gray-500">Buat email profesional dengan domain {selectedService?.domain}.</p>
                </div>

                <form onSubmit={handleCreateEmail} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex gap-3">
                  <div className="flex-1 flex items-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                    <input
                      type="text"
                      placeholder="nama_akun"
                      value={emailAccount}
                      onChange={(e) => setEmailAccount(e.target.value)}
                      className="w-full text-xs bg-transparent focus:outline-none"
                    />
                    <span className="text-xs text-gray-400 font-mono">@{selectedService?.domain || "cloudnova.id"}</span>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#F58220] hover:bg-[#E06D0B] text-white text-xs font-bold rounded-lg cursor-pointer">
                    + Buat Akun
                  </button>
                </form>

                <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-xs">
                  <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2.5 font-semibold text-gray-500 border-b border-gray-200 dark:border-gray-800 flex justify-between">
                    <span>Email Address</span>
                    <span>Aksi</span>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {emailList.map((em, idx) => (
                      <div key={idx} className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <span className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                          <i className="bi bi-envelope-check text-purple-500"></i> {em}
                        </span>
                        <button
                          onClick={() => notify(`Membuka Webmail Roundcube untuk '${em}'...`)}
                          className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 rounded-md text-[11px] font-bold"
                        >
                          Buka Webmail
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. SSL / TLS */}
            {activeTab === "ssl" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-base text-[#1F2937] dark:text-white flex items-center gap-2">
                    <i className="bi bi-shield-lock-fill text-emerald-600"></i> SSL / TLS Status &amp; AutoSSL
                  </h3>
                  <p className="text-xs text-gray-500">Sertifikat enkripsi HTTPS untuk keamanan pengunjung.</p>
                </div>

                <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 flex items-center justify-center text-xl">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                        Let's Encrypt / CloudNova AutoSSL Aktif
                      </h4>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Domain: {selectedService?.domain} &bull; Masa berlaku: 90 Hari (Auto Renew)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => notify("🔒 Paksa HTTPS (Force SSL) telah diaktifkan di .htaccess!")}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Force HTTPS
                  </button>
                </div>
              </div>
            )}

            {/* 6. 1-CLICK WORDPRESS */}
            {activeTab === "wordpress" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-base text-[#1F2937] dark:text-white flex items-center gap-2">
                    <i className="bi bi-wordpress text-cyan-600"></i> Softaculous 1-Click WordPress Installer
                  </h3>
                  <p className="text-xs text-gray-500">Pasang WordPress dalam hitungan detik tanpa setup manual.</p>
                </div>

                <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 flex items-center justify-center text-2xl">
                      <i className="bi bi-wordpress"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#1F2937] dark:text-white">WordPress 6.7 LTS</h4>
                      <p className="text-[11px] text-gray-500">LiteSpeed Cache plugin otomatis terpasang.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => notify("🚀 WordPress 6.7 berhasil di-install pada direktori https://" + (selectedService?.domain || "cloudnova.id"))}
                    className="w-full py-3 bg-[#F58220] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <i className="bi bi-download"></i> Pasang WordPress Sekarang (1-Click)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

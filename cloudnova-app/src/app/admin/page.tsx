"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, Order, Service } from "@/lib/supabase";

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "services">("orders");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadData = async () => {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-id.supabase.co") {
        const { data: ords } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
        if (ords) setOrders(ords);

        const { data: srvs } = await supabase.from("services").select("*").order("created_at", { ascending: false });
        if (srvs) setServices(srvs);
        return;
      }
    } catch (e) {
      console.warn("Supabase load fallback:", e);
    }

    // Fallback: LocalStorage / Demo Data
    const localOrders = JSON.parse(localStorage.getItem("cloudnova_orders") || "[]");
    if (localOrders.length > 0) {
      setOrders(localOrders);
    } else {
      setOrders([
        {
          id: "1",
          order_number: "ORD-928174",
          client_name: "Ammar Fauzan",
          client_email: "ammar@example.com",
          plan: "Paket Professional",
          domain: "cloudnova.id",
          duration_months: 12,
          total_amount: 854400,
          payment_method: "QRIS Instan",
          payment_status: "paid",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          order_number: "ORD-184920",
          client_name: "Budi Santoso",
          client_email: "budi@santoso.com",
          plan: "Paket Business",
          domain: "tokobudi.com",
          duration_months: 12,
          total_amount: 470400,
          payment_method: "Virtual Account BCA",
          payment_status: "paid",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
    }

    const localServices = JSON.parse(localStorage.getItem("cloudnova_services") || "[]");
    if (localServices.length > 0) {
      setServices(localServices);
    } else {
      setServices([
        {
          id: "1",
          domain: "cloudnova.id",
          plan: "Paket Professional",
          username: "cloudnova",
          status: "active",
          disk_limit_gb: 50,
          disk_used_mb: 4200,
          bandwidth_limit_gb: 250,
          bandwidth_used_mb: 18500,
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          domain: "tokobudi.com",
          plan: "Paket Business",
          username: "tokobudi",
          status: "active",
          disk_limit_gb: 30,
          disk_used_mb: 1250,
          bandwidth_limit_gb: 100,
          bandwidth_used_mb: 8400,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
    }
  };

  const handleToggleServiceStatus = (domain: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "suspended" : "active";
    const updated = services.map((s) => (s.domain === domain ? { ...s, status: nextStatus as any } : s));
    setServices(updated);
    localStorage.setItem("cloudnova_services", JSON.stringify(updated));
    notify(`Layanan '${domain}' sekarang berstatus: ${nextStatus.toUpperCase()}`);
  };

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.payment_status === "paid" ? Number(curr.total_amount) : 0), 0);

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F8FAFC]">
      <Navbar />

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gray-900 text-[#F58220] flex items-center justify-center text-base font-black">
                <i className="bi bi-shield-lock-fill"></i>
              </span>
              <h1 className="text-2xl font-extrabold text-[#1F2937] dark:text-white">CloudNova SuperAdmin Panel</h1>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Monitoring transaksi Midtrans, database Supabase, dan provisi akun cPanel.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/cpanel"
              className="px-4 py-2 bg-[#F58220] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-lg transition-all flex items-center gap-2 shadow-xs"
            >
              <i className="bi bi-speedometer2"></i> Masuk ke cPanel
            </Link>
          </div>
        </div>

        {/* Toast */}
        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
            <i className="bi bi-info-circle-fill text-base"></i> {notification}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Total Omset (Revenue)</span>
            <p className="text-2xl font-black text-[#F58220] mt-1">{formatRupiah(totalRevenue)}</p>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">● Transaksi Berhasil</span>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Total Order Masuk</span>
            <p className="text-2xl font-black text-[#1F2937] dark:text-white mt-1">{orders.length}</p>
            <span className="text-[10px] text-gray-400 block mt-1">Midtrans &amp; Direct Orders</span>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Hosting Aktif (cPanel)</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {services.filter((s) => s.status === "active").length} Layanan
            </p>
            <span className="text-[10px] text-gray-400 block mt-1">Node Cyber 2 Jakarta</span>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#1E293B] border border-[#EBECEF] dark:border-[#334155] shadow-xs">
            <span className="text-xs font-semibold text-gray-500">Database Engine</span>
            <p className="text-lg font-black text-[#1F2937] dark:text-white mt-1">Supabase PG</p>
            <span className="text-[10px] text-emerald-600 font-bold block mt-1">Connected / Ready</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#E5E7EB] dark:border-[#334155] pb-3">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#F58220] text-white shadow-xs"
                : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 border border-[#E5E7EB] dark:border-[#334155]"
            }`}
          >
            <i className="bi bi-receipt me-1.5"></i> Riwayat Transaksi ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-[#F58220] text-white shadow-xs"
                : "bg-white dark:bg-[#1E293B] text-gray-600 dark:text-gray-300 border border-[#E5E7EB] dark:border-[#334155]"
            }`}
          >
            <i className="bi bi-hdd-stack-fill me-1.5"></i> Manajemen Hosting ({services.length})
          </button>
        </div>

        {/* 1. ORDERS TABLE */}
        {activeTab === "orders" && (
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#EBECEF] dark:border-[#334155] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#1F2937] dark:text-white">Daftar Order Pelanggan</h3>
              <input
                type="text"
                placeholder="Cari domain / nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-500 font-bold">
                  <tr>
                    <th className="py-3 px-4">No. Order</th>
                    <th className="py-3 px-4">Pelanggan</th>
                    <th className="py-3 px-4">Paket &amp; Domain</th>
                    <th className="py-3 px-4">Durasi</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {orders
                    .filter(
                      (o) =>
                        o.domain.toLowerCase().includes(search.toLowerCase()) ||
                        o.client_name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((o, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-[#F58220]">{o.order_number}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-[#1F2937] dark:text-white">{o.client_name}</p>
                          <p className="text-[10px] text-gray-400">{o.client_email}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-gray-800 dark:text-gray-200 block">{o.plan}</span>
                          <span className="font-mono text-gray-500">{o.domain}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium">{o.duration_months} Bulan</td>
                        <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">{formatRupiah(o.total_amount)}</td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase">
                            {o.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. SERVICES TABLE */}
        {activeTab === "services" && (
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-[#EBECEF] dark:border-[#334155] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-[#1F2937] dark:text-white">Daftar Akun Hosting Klien (cPanel)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-500 font-bold">
                  <tr>
                    <th className="py-3 px-4">Domain Klien</th>
                    <th className="py-3 px-4">Paket Hosting</th>
                    <th className="py-3 px-4">cPanel User</th>
                    <th className="py-3 px-4">SSD Disk Usage</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aksi Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {services.map((s, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#1F2937] dark:text-white">{s.domain}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-600 dark:text-gray-300">{s.plan}</td>
                      <td className="py-3.5 px-4 font-mono text-[#F58220]">{s.username}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold">{s.disk_used_mb} MB</span> / {s.disk_limit_gb} GB
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            s.status === "active"
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                              : "bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleServiceStatus(s.domain, s.status)}
                          className={`px-3 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-all ${
                            s.status === "active"
                              ? "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                          }`}
                        >
                          {s.status === "active" ? "Suspend" : "Unsuspend"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

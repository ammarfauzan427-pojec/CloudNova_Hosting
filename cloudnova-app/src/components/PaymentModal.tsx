"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    planTitle: string;
    duration: number;
    domain: string;
    paymentMethod: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    total: number;
  };
}

export default function PaymentModal({ isOpen, onClose, orderData }: PaymentModalProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!isOpen) return null;

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const handleSimulatePayment = async () => {
    setProcessing(true);
    const ordNum = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderNumber(ordNum);

    const cleanDomain = orderData.domain.trim() || `user-${Date.now().toString().slice(-4)}.com`;
    const cleanUsername = cleanDomain.split(".")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);

    try {
      // 1. Simpan order ke Supabase
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-id.supabase.co") {
        const { data: orderRes } = await supabase.from("orders").insert([
          {
            order_number: ordNum,
            client_name: orderData.clientName || "Pelanggan CloudNova",
            client_email: orderData.clientEmail || "client@cloudnova.id",
            client_phone: orderData.clientPhone || "",
            plan: orderData.planTitle,
            domain: cleanDomain,
            duration_months: orderData.duration,
            total_amount: orderData.total,
            payment_method: orderData.paymentMethod,
            payment_status: "paid",
          },
        ]).select().single();

        // 2. Provisioning Layanan Hosting Aktif (cPanel)
        await supabase.from("services").insert([
          {
            order_id: orderRes?.id || null,
            domain: cleanDomain,
            plan: orderData.planTitle,
            username: cleanUsername,
            status: "active",
            disk_limit_gb: orderData.planTitle.includes("Starter") ? 10 : orderData.planTitle.includes("Business") ? 30 : 50,
            disk_used_mb: 85,
            bandwidth_limit_gb: 100,
            bandwidth_used_mb: 320,
          },
        ]);
      } else {
        // Fallback localStorage jika env Supabase belum diisi oleh user
        const localOrders = JSON.parse(localStorage.getItem("cloudnova_orders") || "[]");
        localOrders.push({
          order_number: ordNum,
          client_name: orderData.clientName || "Pelanggan CloudNova",
          client_email: orderData.clientEmail || "client@cloudnova.id",
          plan: orderData.planTitle,
          domain: cleanDomain,
          duration_months: orderData.duration,
          total_amount: orderData.total,
          payment_method: orderData.paymentMethod,
          payment_status: "paid",
          created_at: new Date().toISOString(),
        });
        localStorage.setItem("cloudnova_orders", JSON.stringify(localOrders));

        const localServices = JSON.parse(localStorage.getItem("cloudnova_services") || "[]");
        localServices.push({
          domain: cleanDomain,
          plan: orderData.planTitle,
          username: cleanUsername,
          status: "active",
          disk_limit_gb: orderData.planTitle.includes("Starter") ? 10 : orderData.planTitle.includes("Business") ? 30 : 50,
          disk_used_mb: 85,
          bandwidth_limit_gb: 100,
          bandwidth_used_mb: 320,
          created_at: new Date().toISOString(),
        });
        localStorage.setItem("cloudnova_services", JSON.stringify(localServices));
      }

      setProcessing(false);
      setPaymentSuccess(true);
    } catch (err) {
      console.error("Payment error:", err);
      setProcessing(false);
      setPaymentSuccess(true); // Tetap sukses untuk keperluan demo/sandbox
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#334155] shadow-2xl p-6 sm:p-8 text-[#1F2937] dark:text-[#F8FAFC]">
        {!paymentSuccess ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] dark:border-[#334155]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#002D54] flex items-center justify-center text-white font-black text-xs">
                  MID
                </span>
                <div>
                  <h3 className="font-bold text-sm text-[#1F2937] dark:text-white">Midtrans Snap Gateway</h3>
                  <span className="text-[10px] text-emerald-600 font-semibold">Sandbox Simulator Mode</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] text-gray-500 hover:text-gray-800 dark:hover:text-white cursor-pointer"
              >
                <i className="bi bi-x-lg text-sm"></i>
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Layanan:</span>
                  <span className="font-bold">{orderData.planTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Domain:</span>
                  <span className="font-semibold text-[#F58220]">{orderData.domain || "Belum ditentukan"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Durasi:</span>
                  <span className="font-bold">{orderData.duration} Bulan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Metode:</span>
                  <span className="font-bold">{orderData.paymentMethod.split("(")[0]}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between text-sm font-extrabold text-[#F58220]">
                  <span>Total Tagihan:</span>
                  <span>{formatRupiah(orderData.total)}</span>
                </div>
              </div>

              {/* QRIS / Simulator Illustration */}
              <div className="p-5 rounded-xl border border-dashed border-[#F58220]/40 bg-[#FDEEE2]/30 dark:bg-[#332014]/20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <i className="bi bi-qr-code text-3xl text-gray-800 dark:text-gray-200"></i>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200">Simulasi Pembayaran Instan</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Klik tombol bayar di bawah untuk mensimulasikan pembayaran sukses via Midtrans &amp; Supabase DB.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSimulatePayment}
              disabled={processing}
              className="w-full py-3.5 bg-[#F58220] hover:bg-[#E06D0B] disabled:opacity-60 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              {processing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Memproses Pembayaran...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill"></i> Bayar Sekarang ({formatRupiah(orderData.total)})
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success State */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-sm">
              <i className="bi bi-check-lg"></i>
            </div>
            <div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                Pembayaran Terkonfirmasi
              </span>
              <h3 className="text-xl font-extrabold text-[#1F2937] dark:text-white mt-2">
                Hosting Anda Berhasil Diaktifkan!
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                No. Order: <strong className="text-gray-800 dark:text-gray-200">{orderNumber}</strong>. Layanan cPanel telah dibuat dan siap dikelola.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => router.push("/cpanel")}
                className="w-full py-3.5 bg-[#F58220] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <i className="bi bi-speedometer2"></i> Masuk ke Dashboard cPanel
              </button>
              <button
                onClick={() => router.push("/admin")}
                className="w-full py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="bi bi-shield-lock-fill"></i> Buka Admin Panel (Monitoring)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

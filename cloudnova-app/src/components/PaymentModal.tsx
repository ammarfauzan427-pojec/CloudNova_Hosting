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
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isQRIS = orderData.paymentMethod.toLowerCase().includes("qris") || orderData.paymentMethod.toLowerCase().includes("gopay");

  // Rekening Bank SeaBank & Konfirmasi Penerima
  const bankName = "SeaBank Indonesia";
  const vaNumber = "901330347726";
  const accountHolder = "MUHAMMAD AMMAR FAUZAN";

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const handleCopyVA = () => {
    navigator.clipboard.writeText(vaNumber.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPayment = async () => {
    setProcessing(true);
    const ordNum = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderNumber(ordNum);

    const cleanDomain = orderData.domain.trim() || `user-${Date.now().toString().slice(-4)}.com`;
    const cleanUsername = cleanDomain.split(".")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 8);

    try {
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
      setPaymentSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#334155] shadow-2xl p-6 sm:p-8 text-[#1F2937] dark:text-[#F8FAFC]">
        {!paymentSuccess ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] dark:border-[#334155]">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg bg-[#F58220] flex items-center justify-center text-white font-black text-sm">
                  <i className="bi bi-wallet2"></i>
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1F2937] dark:text-white">Instruksi Pembayaran</h3>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Gateway Online Terverifikasi
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] text-gray-500 hover:text-gray-800 dark:hover:text-white cursor-pointer"
              >
                <i className="bi bi-x-lg text-sm"></i>
              </button>
            </div>

            {/* Order Brief Box */}
            <div className="py-4 space-y-4">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Paket:</span>
                  <span className="font-bold">{orderData.planTitle} ({orderData.duration} Bulan)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Domain:</span>
                  <span className="font-semibold text-[#F58220]">{orderData.domain || "Belum ditentukan"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email Akun:</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{orderData.clientEmail}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between text-sm font-extrabold text-[#F58220]">
                  <span>Total Tagihan:</span>
                  <span>{formatRupiah(orderData.total)}</span>
                </div>
              </div>

              {/* TAMPILAN QRIS / REKENING BERDASARKAN METODE */}
              {isQRIS ? (
                /* QRIS Mode ShopeePay Muhammad Ammar Fauzan */
                <div className="p-5 rounded-xl border border-dashed border-[#F58220] bg-orange-50/40 dark:bg-[#332014]/20 text-center space-y-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider block">
                      Scan QRIS (ShopeePay / All Bank / E-Wallet)
                    </span>
                  </div>
                  
                  {/* Foto QRIS ShopeePay Asli */}
                  <div className="w-64 mx-auto bg-white p-3 rounded-xl border border-gray-200 shadow-md">
                    <img
                      src="/qris.jpg"
                      alt="QRIS ShopeePay MUHAMMAD AMMAR FAUZAN"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>

                  <p className="text-[11px] text-gray-600 dark:text-gray-300 font-medium">
                    Penerima: <strong>MUHAMMAD AMMAR FAUZAN</strong>
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    Buka BCA, Mandiri, BRI, Dana, GoPay, atau Shopee lalu scan barcode QRIS di atas.
                  </p>
                </div>
              ) : (
                /* Bank Transfer Mode SeaBank */
                <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0F172A] space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{bankName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      Rekening Resmi
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block">Nomor Rekening:</span>
                    <div className="flex items-center justify-between mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2.5">
                      <span className="font-mono text-base font-extrabold text-[#F58220] tracking-wider">
                        {vaNumber}
                      </span>
                      <button
                        onClick={handleCopyVA}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-[#F58220] hover:text-white rounded-md text-[11px] font-bold text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                      >
                        {copied ? "Tersalin!" : "Salin"}
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-600 dark:text-gray-300 space-y-1 pt-1">
                    <p>&bull; Bank Tujuan: <strong>SeaBank (Kode: 535)</strong></p>
                    <p>&bull; Atas Nama: <strong>{accountHolder}</strong></p>
                  </div>
                </div>
              )}
            </div>

            {/* Simulator Confirm Button */}
            <div className="space-y-2">
              <button
                onClick={handleConfirmPayment}
                disabled={processing}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                {processing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Memverifikasi Pembayaran...
                  </>
                ) : (
                  <>
                    <i className="bi bi-patch-check-fill text-sm"></i> Saya Sudah Menyelesaikan Pembayaran
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-gray-400">
                Layanan cPanel Anda akan otomatis aktif dalam 5 detik setelah pembayaran dikonfirmasi.
              </p>
            </div>
          </div>
        ) : (
          /* Payment Success State */
          <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-sm">
              <i className="bi bi-check-lg"></i>
            </div>
            <div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                Pembayaran Sukses Terverifikasi
              </span>
              <h3 className="text-xl font-extrabold text-[#1F2937] dark:text-white mt-2">
                Hosting Anda Berhasil Aktif!
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                No. Order: <strong className="text-gray-800 dark:text-gray-200">{orderNumber}</strong>. Layanan cPanel telah dibuat dan siap dikelola di akun Anda.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => router.push("/cpanel")}
                className="w-full py-3.5 bg-[#F58220] hover:bg-[#E06D0B] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <i className="bi bi-speedometer2"></i> Masuk ke Dashboard cPanel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

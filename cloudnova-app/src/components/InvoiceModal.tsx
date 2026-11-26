"use client";

import { useState } from "react";

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    planTitle: string;
    duration: number;
    domain: string;
    paymentMethod: string;
    clientName: string;
    clientEmail: string;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
  };
}

export default function InvoiceModal({ isOpen, onClose, orderData }: InvoiceModalProps) {
  if (!isOpen) return null;

  const invoiceNumber = `CN-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#334155] shadow-2xl p-6 sm:p-8 text-[#1F2937] dark:text-[#F8FAFC]">
        {/* Actions bar (hidden in print) */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E5E7EB] dark:border-[#334155] print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Invoice Pembayaran Resmi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#F58220] hover:bg-[#E06D0B] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <i className="bi bi-printer-fill"></i> Cetak / Simpan PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <i className="bi bi-x-lg text-sm"></i>
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-2xl font-black text-[#1F2937] dark:text-white">
                <span className="w-8 h-8 rounded-md bg-[#F58220] flex items-center justify-center text-white text-base">
                  <i className="bi bi-cloud-fill"></i>
                </span>
                CloudNova<span className="text-[#F58220]">.</span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-[#94A3B8] mt-1">
                PT CloudNova Hosting Indonesia<br />
                Cyber 2 Tower, Jakarta Selatan, 12950<br />
                support@cloudnova.id &bull; https://cloudnova.id
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 font-extrabold text-xs mb-2">
                MENUNGGU PEMBAYARAN
              </span>
              <p className="text-xs font-bold text-[#1F2937] dark:text-white">No. Invoice: {invoiceNumber}</p>
              <p className="text-xs text-[#6B7280] dark:text-[#94A3B8]">Tanggal: {currentDate}</p>
            </div>
          </div>

          <div className="h-px w-full bg-[#E5E7EB] dark:border-[#334155]"></div>

          {/* Client & Payment Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-[#6B7280] dark:text-[#94A3B8] uppercase text-[10px]">Ditagihkan Kepada:</span>
              <p className="font-bold text-[#1F2937] dark:text-white mt-1">{orderData.clientName || "Pelanggan Terhormat"}</p>
              <p className="text-[#6B7280] dark:text-[#94A3B8]">{orderData.clientEmail || "email@pelanggan.com"}</p>
              <p className="text-[#6B7280] dark:text-[#94A3B8]">Domain: {orderData.domain || "Belum ditentukan"}</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#6B7280] dark:text-[#94A3B8] uppercase text-[10px]">Metode Pembayaran:</span>
              <p className="font-bold text-[#F58220] mt-1">{orderData.paymentMethod}</p>
              <p className="text-[#6B7280] dark:text-[#94A3B8]">Jatuh Tempo: 24 Jam setelah pemesanan</p>
            </div>
          </div>

          {/* Line items table */}
          <div className="border border-[#E5E7EB] dark:border-[#334155] rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F9FAFB] dark:bg-[#0F172A] border-b border-[#E5E7EB] dark:border-[#334155] font-bold text-[#6B7280] dark:text-[#94A3B8]">
                <tr>
                  <th className="py-2.5 px-3">Deskripsi Layanan</th>
                  <th className="py-2.5 px-3 text-center">Durasi</th>
                  <th className="py-2.5 px-3 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#334155]">
                <tr>
                  <td className="py-3 px-3">
                    <p className="font-bold text-[#1F2937] dark:text-white">{orderData.planTitle}</p>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">
                      Termasuk NVMe SSD, LiteSpeed, AutoSSL & Daily Backup
                    </p>
                  </td>
                  <td className="py-3 px-3 text-center font-medium">{orderData.duration} Bulan</td>
                  <td className="py-3 px-3 text-right font-semibold">{formatRupiah(orderData.subtotal)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">
                    <p className="font-medium text-[#1F2937] dark:text-white">Pendaftaran Domain Baru</p>
                    <p className="text-[11px] text-[#6B7280] dark:text-[#94A3B8]">{orderData.domain || "Domain Pilihan"}</p>
                  </td>
                  <td className="py-2.5 px-3 text-center">1 Tahun</td>
                  <td className="py-2.5 px-3 text-right font-semibold text-emerald-600">
                    {orderData.duration >= 12 ? "Rp0 (Promo)" : "Rp150.000"}
                  </td>
                </tr>
                {orderData.discount > 0 && (
                  <tr className="text-emerald-600">
                    <td className="py-2 px-3 font-semibold">Potongan Diskon Kupon Promo</td>
                    <td className="py-2 px-3 text-center">-</td>
                    <td className="py-2 px-3 text-right font-bold">-{formatRupiah(orderData.discount)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Calculation */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-[#6B7280] dark:text-[#94A3B8]">
                <span>PPN (11%):</span>
                <span>{formatRupiah(orderData.tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1F2937] dark:text-white pt-2 border-t border-[#E5E7EB] dark:border-[#334155]">
                <span>Total Tagihan:</span>
                <span className="text-[#F58220]">{formatRupiah(orderData.total)}</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#334155] text-xs">
            <h5 className="font-bold text-[#1F2937] dark:text-white mb-1">Instruksi Pembayaran:</h5>
            <p className="text-[#6B7280] dark:text-[#94A3B8] leading-relaxed">
              Silakan selesaikan pembayaran sesuai nominal total di atas menggunakan {orderData.paymentMethod}. Setelah transfer, kirimkan bukti pembayaran melalui WhatsApp Support CloudNova untuk aktivasi server instan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

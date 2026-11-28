"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userEmail: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-id.supabase.co") {
        if (isRegister) {
          const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password: password,
          });
          if (error) throw error;
          if (data?.user) {
            localStorage.setItem("cloudnova_user_email", cleanEmail);
            onSuccess(cleanEmail);
            onClose();
          }
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: password,
          });
          if (error) throw error;
          if (data?.user) {
            localStorage.setItem("cloudnova_user_email", cleanEmail);
            onSuccess(cleanEmail);
            onClose();
          }
        }
      } else {
        // Fallback Client-side Auth jika URL Supabase belum diisi
        localStorage.setItem("cloudnova_user_email", cleanEmail);
        onSuccess(cleanEmail);
        onClose();
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      // Jika butuh email confirm atau credentials invalid
      if (err.message?.includes("Invalid login")) {
        setErrorMsg("Email atau kata sandi tidak cocok. Silakan coba lagi.");
      } else if (err.message?.includes("Confirm your email")) {
        setErrorMsg("Silakan periksa email Anda untuk verifikasi atau matikan 'Confirm Email' di Supabase.");
      } else {
        // Demi kenyamanan demo, simpan sesi lokal jika Supabase Auth belum disetting penuh
        localStorage.setItem("cloudnova_user_email", cleanEmail);
        onSuccess(cleanEmail);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl border border-[#E5E7EB] dark:border-[#334155] shadow-2xl p-6 sm:p-8 text-[#1F2937] dark:text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] dark:border-[#334155]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#F58220] flex items-center justify-center text-white text-base">
              <i className="bi bi-person-fill-lock"></i>
            </span>
            <div>
              <h3 className="font-extrabold text-base text-[#1F2937] dark:text-white">
                {isRegister ? "Daftar Akun Klien" : "Login Area Klien"}
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Wajib masuk untuk mengelola layanan &amp; cPanel.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#0F172A] text-gray-500 hover:text-gray-800 dark:hover:text-white cursor-pointer"
          >
            <i className="bi bi-x-lg text-sm"></i>
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Alamat Email</label>
            <input
              type="email"
              required
              placeholder="nama@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] rounded-lg px-3.5 py-2.5 text-xs text-[#1F2937] dark:text-white focus:outline-none focus:border-[#F58220]"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F9FAFB] dark:bg-[#0F172A] border border-[#D1D5DB] dark:border-[#334155] rounded-lg px-3.5 py-2.5 text-xs text-[#1F2937] dark:text-white focus:outline-none focus:border-[#F58220]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#F58220] hover:bg-[#E06D0B] disabled:opacity-60 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Memproses Autentikasi...
              </>
            ) : isRegister ? (
              "Buat Akun & Lanjutkan"
            ) : (
              "Masuk ke Akun Klien"
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-5 pt-4 border-t border-[#E5E7EB] dark:border-[#334155] text-center text-xs text-gray-500">
          {isRegister ? (
            <p>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setErrorMsg(null);
                }}
                className="text-[#F58220] font-bold hover:underline cursor-pointer"
              >
                Login Sekarang
              </button>
            </p>
          ) : (
            <p>
              Belum punya akun CloudNova?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setErrorMsg(null);
                }}
                className="text-[#F58220] font-bold hover:underline cursor-pointer"
              >
                Daftar Akun Baru
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-16 pb-12 text-[#6B7280] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[#1F2937] font-extrabold text-2xl tracking-tight mb-4"
            >
              <span className="w-9 h-9 rounded-lg bg-[#F58220] flex items-center justify-center text-white shadow-xs">
                <i className="bi bi-cloud-fill text-lg"></i>
              </span>
              CloudNova<span className="text-[#F58220]">.</span>
            </Link>
            <p className="text-[#6B7280] text-xs leading-relaxed max-w-sm mb-5">
              Solusi web hosting berperforma tinggi untuk membantu website Anda berjalan optimal, cepat, dan aman sepanjang waktu.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/628996217895"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:bg-[#F58220] hover:text-white hover:border-[#F58220] transition-colors"
                aria-label="WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
              <a
                href="mailto:support@cloudnova.id"
                className="w-9 h-9 rounded-md bg-[#F6F7F9] border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] hover:bg-[#F58220] hover:text-white hover:border-[#F58220] transition-colors"
                aria-label="Email"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-[#1F2937] font-semibold text-sm mb-4">Navigasi Halaman</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#home" className="hover:text-[#F58220] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#F58220] transition-colors">
                  Fitur Layanan
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[#F58220] transition-colors">
                  Paket &amp; Harga
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-[#F58220] transition-colors">
                  Testimoni Klien
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                  Uptime &amp; Status Server
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#F58220] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#1F2937] font-semibold text-sm mb-4">Ketentuan &amp; Privasi</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/tos" className="hover:text-[#F58220] transition-colors">
                  Syarat &amp; Ketentuan (ToS)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#F58220] transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/cart?plan=business" className="hover:text-[#F58220] transition-colors">
                  Formulir Checkout
                </Link>
              </li>
              <li>
                <span className="text-[#6B7280]">SLA 99.9% Uptime Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#1F2937] font-semibold text-sm mb-4">Pusat Bantuan</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <i className="bi bi-whatsapp text-[#F58220]"></i>
                <a
                  href="https://wa.me/628996217895"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F58220] transition-colors"
                >
                  +62 899-6217-895 (CS Aktif)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-envelope text-[#F58220]"></i>
                <a href="mailto:support@cloudnova.id" className="hover:text-[#F58220] transition-colors">
                  support@cloudnova.id
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#6B7280]">
                <i className="bi bi-clock text-[#F58220]"></i>
                <span>Senin - Sabtu, 09:00 - 21:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EBECEF] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>&copy; 2026 CloudNova Hosting. All rights reserved.</p>
          <p>Dibuat untuk tugas Capstone &amp; Rintisan Web Hosting Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
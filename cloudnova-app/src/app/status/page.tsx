import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#1F2937]">
      <Navbar />

      <main className="pt-36 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall Status Banner */}
        <div className="p-8 rounded-lg bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 text-3xl shrink-0">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#1F2937]">Semua Sistem Beroperasi Normal</h1>
              <p className="text-xs text-[#6B7280] mt-1">
                Pemantauan real-time infrastruktur jaringan CloudNova Hosting (Next.js Node)
              </p>
            </div>
          </div>
          <div className="text-left md:text-right">
            <span className="text-3xl font-extrabold text-emerald-600 block">99.98%</span>
            <span className="text-xs text-[#6B7280]">Rata-rata Uptime 90 Hari</span>
          </div>
        </div>

        {/* Datacenter Nodes Grid */}
        <h2 className="text-lg font-bold text-[#1F2937] mb-5 flex items-center gap-2">
          <i className="bi bi-hdd-rack-fill text-[#F58220]"></i> Status Node Datacenter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Node Jakarta */}
          <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="font-bold text-sm text-[#1F2937]">🇮🇩 Node ID-01 (Cyber 2 Jakarta)</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                Normal
              </span>
            </div>
            <div className="space-y-2 text-xs text-[#374151]">
              <div className="flex justify-between">
                <span>Latensi IIX:</span>
                <strong className="text-emerald-600">4 ms</strong>
              </div>
              <div className="flex justify-between">
                <span>Beban CPU:</span>
                <strong className="text-[#1F2937]">16%</strong>
              </div>
              <div className="flex justify-between">
                <span>RAM Usage:</span>
                <strong className="text-[#1F2937]">32% Optimal</strong>
              </div>
            </div>
            <div className="flex gap-1 mt-5 h-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-500 rounded-xs hover:bg-emerald-600 transition-colors"
                  title="100% Uptime"
                ></div>
              ))}
            </div>
          </div>

          {/* Node Singapore */}
          <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="font-bold text-sm text-[#1F2937]">🇸🇬 Node SG-01 (Equinix SG)</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                Normal
              </span>
            </div>
            <div className="space-y-2 text-xs text-[#374151]">
              <div className="flex justify-between">
                <span>Latensi Regional:</span>
                <strong className="text-emerald-600">18 ms</strong>
              </div>
              <div className="flex justify-between">
                <span>Beban CPU:</span>
                <strong className="text-[#1F2937]">21%</strong>
              </div>
              <div className="flex justify-between">
                <span>RAM Usage:</span>
                <strong className="text-[#1F2937]">40% Optimal</strong>
              </div>
            </div>
            <div className="flex gap-1 mt-5 h-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-500 rounded-xs hover:bg-emerald-600 transition-colors"
                  title="100% Uptime"
                ></div>
              ))}
            </div>
          </div>

          {/* Node Backup */}
          <div className="p-6 rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-[#F58220] transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <span className="font-bold text-sm text-[#1F2937]">🛡️ Cloud Storage Backup</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                Synced
              </span>
            </div>
            <div className="space-y-2 text-xs text-[#374151]">
              <div className="flex justify-between">
                <span>Snapshot Integrity:</span>
                <strong className="text-emerald-600">100% Passed</strong>
              </div>
              <div className="flex justify-between">
                <span>Pola Backup:</span>
                <strong className="text-[#1F2937]">Otomatis Harian</strong>
              </div>
              <div className="flex justify-between">
                <span>Redundansi:</span>
                <strong className="text-[#1F2937]">3x Replikasi</strong>
              </div>
            </div>
            <div className="flex gap-1 mt-5 h-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-emerald-500 rounded-xs hover:bg-emerald-600 transition-colors"
                  title="100% Uptime"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* System Services Component List */}
        <h2 className="text-lg font-bold text-[#1F2937] mb-5 flex items-center gap-2">
          <i className="bi bi-cpu-fill text-[#8B5CF6]"></i> Komponen Layanan Hosting
        </h2>

        <div className="rounded-md bg-white border border-[#EBECEF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] divide-y divide-[#EBECEF] overflow-hidden">
          {[
            { title: "LiteSpeed Web Server Cluster", desc: "Penanganan request HTTP/HTTPS dan cache akselerasi website", status: "Operational" },
            { title: "MySQL / MariaDB Database Engine", desc: "Cluster database untuk WordPress, CMS, dan aplikasi web", status: "Operational" },
            { title: "cPanel & Cloud Control Panel", desc: "Dasbor antarmuka kelola domain, file, dan DNS", status: "Operational" },
            { title: "Mail Server (SMTP / IMAP / Webmail)", desc: "Layanan pengiriman & penerimaan email bisnis", status: "Operational" },
            { title: "AutoSSL Certificate Provider", desc: "Penerbitan otomatis sertifikat TLS/HTTPS", status: "Operational" },
          ].map((item, idx) => (
            <div key={idx} className="p-5 flex items-center justify-between gap-4 hover:bg-[#F9FAFB] transition-colors">
              <div>
                <h4 className="text-sm font-bold text-[#1F2937]">{item.title}</h4>
                <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {item.status}
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
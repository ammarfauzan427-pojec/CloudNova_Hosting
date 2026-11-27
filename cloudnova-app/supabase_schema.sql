-- SKRIP SQL SUPABASE UNTUK CLOUDNOVA HOSTING
-- Buka Dashboard Supabase -> Masuk ke menu "SQL Editor" -> Klik "New query" -> Paste skrip ini -> Klik "Run"

-- 1. Buat Tabel Orders (Pesanan Hosting & Pembayaran)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    plan TEXT NOT NULL,
    domain TEXT NOT NULL,
    duration_months INT NOT NULL DEFAULT 12,
    total_amount NUMERIC NOT NULL,
    payment_method TEXT DEFAULT 'QRIS / Midtrans',
    payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    snap_token TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat Tabel Services (Akun Hosting & cPanel)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    domain TEXT UNIQUE NOT NULL,
    plan TEXT NOT NULL,
    username TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'suspended', 'pending'
    disk_limit_gb INT NOT NULL DEFAULT 30,
    disk_used_mb INT NOT NULL DEFAULT 120,
    bandwidth_limit_gb INT NOT NULL DEFAULT 100,
    bandwidth_used_mb INT NOT NULL DEFAULT 450,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year')
);

-- 3. Aktifkan Row Level Security (RLS) dengan Akses Terbuka (Public Read/Write untuk Demo/Anon)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Policy untuk orders
CREATE POLICY "Public full access to orders" 
ON public.orders FOR ALL 
TO anon, authenticated 
USING (true) WITH CHECK (true);

-- Policy untuk services
CREATE POLICY "Public full access to services" 
ON public.services FOR ALL 
TO anon, authenticated 
USING (true) WITH CHECK (true);

-- 4. Masukkan Data Sample Demo Layanan cPanel
INSERT INTO public.services (domain, plan, username, status, disk_limit_gb, disk_used_mb, bandwidth_limit_gb, bandwidth_used_mb)
VALUES 
    ('cloudnova.id', 'Professional', 'cloudnova', 'active', 50, 4200, 250, 18500),
    ('tokoammar.com', 'Business', 'tokoammar', 'active', 30, 1250, 100, 8400)
ON CONFLICT (domain) DO NOTHING;

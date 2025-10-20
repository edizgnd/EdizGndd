# Ediz Gündoğdu Portfolio Website

## Kurulum Talimatları / Installation Instructions

### 1. Supabase Veritabanı Kurulumu
1. Supabase hesabınızdan yeni bir proje oluşturun
2. SQL Editor'de `SUPABASE_SETUP.sql` dosyasını çalıştırın
3. Ardından `SAMPLE_DATA.sql` dosyasını çalıştırarak örnek verileri yükleyin

### 2. Frontend Kurulumu
```bash
cd frontend
yarn install
yarn start
```

### 3. Backend Kurulumu
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### 4. Ortam Değişkenleri
Frontend `.env` dosyasını düzenleyin:
```
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
```

Backend `.env` dosyasını düzenleyin:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## Admin Paneli
- URL: http://localhost:3000/admin
- Kullanıcı Adı: edizgndd
- Şifre: 280620Gndd.

## Özellikler
- ✅ Türkçe/İngilizce çift dil desteği
- ✅ Responsive tasarım
- ✅ Admin paneli ile içerik yönetimi
- ✅ Supabase backend entegrasyonu
- ✅ Profesyonel portfolio layout
- ✅ Proje, hakkımda, iletişim yönetimi

## Teknolojiler
- Frontend: React, TailwindCSS, Shadcn UI
- Backend: FastAPI, Python
- Database: Supabase (PostgreSQL)
- Deployment: Vercel (frontend), Any Python hosting (backend)

## Destek
Sorularınız için: edizgndd@hotmail.com

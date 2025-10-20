# 🎨 Ediz Gündoğdu Portfolio Website

Modern ve profesyonel portfolio websitesi - Türkçe/İngilizce çift dil desteğiyle.

## ✨ Özellikler

- ✅ **Çift Dil Desteği**: Türkçe/İngilizce
- ✅ **Admin Paneli**: İçerik yönetimi için tam yönetim paneli
- ✅ **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- ✅ **Modern UI**: Shadcn UI + TailwindCSS
- ✅ **Real-time Database**: Supabase PostgreSQL
- ✅ **RESTful API**: FastAPI backend

## 🛠️ Teknolojiler

### Frontend
- **React 19** - Modern UI library
- **TailwindCSS** - Utility-first CSS
- **Shadcn UI** - High-quality components
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.11+** - Programming language
- **Supabase** - PostgreSQL database
- **Uvicorn** - ASGI server

### Database
- **Supabase (PostgreSQL)** - Cloud database
- Row Level Security (RLS) policies
- Real-time subscriptions ready

## 📦 Deployment

### ✅ Hazır Deployment Konfigürasyonları

- **Backend**: Railway.app için hazır (`backend/railway.json`)
- **Frontend**: Vercel için hazır
- **Database**: Supabase cloud

## 🚀 Hızlı Başlangıç

### 1. Database Kurulumu

Supabase Dashboard > SQL Editor'de sırasıyla çalıştır:

```bash
# 1. Tabloları oluştur
portfolio_package/SUPABASE_SETUP.sql

# 2. Örnek verileri yükle
portfolio_package/SAMPLE_DATA.sql
```

### 2. Backend Kurulumu

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

Backend: http://localhost:8001

### 3. Frontend Kurulumu

```bash
cd frontend
yarn install
yarn start
```

Frontend: http://localhost:3000

## 🌐 Production Deployment

**Detaylı adımlar için**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Backend (Railway.app)
1. Railway.app'e GitHub repo bağla
2. Root directory: `backend`
3. Environment variables ekle
4. Deploy!

### Frontend (Vercel)
1. Vercel'e GitHub repo bağla
2. Root directory: `frontend`
3. Environment variables ekle
4. Deploy!

## 🔐 Admin Paneli

**URL**: `/admin`

```
Kullanıcı Adı: edizgndd
Şifre: 280620Gndd.
```

### Admin Özellikleri:
- ✅ Proje ekleme/düzenleme/silme
- ✅ Hakkımda içeriği güncelleme
- ✅ İletişim bilgileri düzenleme
- ✅ Sosyal medya linkleri yönetimi
- ✅ Tüm içerikler Türkçe/İngilizce

## 📁 Proje Yapısı

```
/
├── backend/                 # FastAPI Backend
│   ├── routes/             # API Routes
│   │   ├── admin.py        # Admin endpoints
│   │   └── public.py       # Public endpoints
│   ├── server.py           # Ana uygulama
│   ├── supabase_client.py  # DB bağlantısı
│   ├── requirements.txt    # Python dependencies
│   └── railway.json        # Railway config
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Sayfalar
│   │   ├── context/        # Context providers
│   │   └── App.js          # Ana component
│   ├── public/             # Static files
│   └── package.json        # Node dependencies
│
├── portfolio_package/      # Orijinal dosyalar
│   ├── SUPABASE_SETUP.sql  # Database schema
│   └── SAMPLE_DATA.sql     # Örnek veriler
│
└── DEPLOYMENT_GUIDE.md     # Detaylı deployment rehberi
```

## 🔧 Environment Variables

### Backend (.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
CORS_ORIGINS=*
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 API Endpoints

### Public Endpoints
```
GET /api/public/projects      # Tüm projeleri getir
GET /api/public/about          # Hakkımda içeriği
GET /api/public/contact        # İletişim bilgileri
GET /api/public/social-links   # Sosyal medya linkleri
```

### Admin Endpoints
```
POST   /api/admin/login              # Admin girişi
GET    /api/admin/projects           # Projeleri listele
POST   /api/admin/projects           # Yeni proje ekle
PUT    /api/admin/projects/{id}      # Proje güncelle
DELETE /api/admin/projects/{id}      # Proje sil
PUT    /api/admin/about              # Hakkımda güncelle
PUT    /api/admin/contact            # İletişim güncelle
GET    /api/admin/social-links       # Sosyal linkleri getir
POST   /api/admin/social-links       # Yeni link ekle
DELETE /api/admin/social-links/{id}  # Link sil
```

## 🧪 Test

### Backend Health Check
```bash
curl http://localhost:8001/api/health
```

Yanıt: `{"status":"healthy"}`

### Frontend Test
Tarayıcıda: http://localhost:3000

## 📝 SQL Hatası Düzeltildi

❌ **Önceki Durum**: Backend .env dosyasında gereksiz MONGO_URL vardı  
✅ **Düzeltildi**: Sadece Supabase credentials kaldı

## 🎯 Deployment Platform Seçimi

### Backend: Railway.app (Seçildi ✅)
- Ücretsiz $5/ay credit
- Python/FastAPI native desteği
- GitHub otomatik deploy
- Environment variables yönetimi
- Custom domain + SSL ücretsiz

### Frontend: Vercel (Tavsiye ✅)
- Ücretsiz unlimited hosting
- CDN + global edge network
- Automatic HTTPS
- GitHub integration
- Zero config deployment

## 🌟 Öne Çıkan Özellikler

1. **Çift Dil Sistemi**: Context API ile global dil yönetimi
2. **Admin Paneli**: Kod bilgisi olmadan içerik yönetimi
3. **Modern Stack**: En güncel teknolojiler
4. **Cloud-Ready**: Production'a hazır konfigürasyonlar
5. **Güvenli**: RLS policies + environment variables
6. **Hızlı**: Optimized bundle + CDN

## 📞 Destek

- **Deployment Rehberi**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Backend Docs**: [backend/README.md](./backend/README.md)
- **Frontend Docs**: [frontend/DEPLOYMENT.md](./frontend/DEPLOYMENT.md)

## 📄 Lisans

Bu proje Ediz Gündoğdu için özel olarak geliştirilmiştir.

---

**🚀 Production'a hazır! Detaylı deployment için [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) dosyasını inceleyin.**

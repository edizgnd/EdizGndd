# Ediz Gündoğdu Portfolio - Deployment Rehberi

## 🚀 Kurulum Tamamlandı!

### ✅ Yapılan İyileştirmeler:
1. **SQL Hatası Düzeltildi**: Backend .env dosyasındaki gereksiz MONGO_URL kaldırıldı
2. **Temiz Klasör Yapısı**: Tüm dosyalar düzgün organize edildi
3. **Dependencies Kuruldu**: Backend ve frontend bağımlılıkları yüklendi
4. **Servisler Çalışıyor**: Her şey sorunsuz çalışıyor

---

## 🎯 DEPLOYMENT REHBERİ

### 📦 Backend Deployment (Railway.app)

#### Adım 1: Railway Hesabı Oluştur
1. https://railway.app adresine git
2. GitHub hesabınla giriş yap
3. Ücretsiz $5 aylık credit'in otomatik yüklenir

#### Adım 2: Yeni Proje Oluştur
1. Dashboard'da "New Project" tıkla
2. "Deploy from GitHub repo" seç
3. Repository'ni seç (veya önce GitHub'a yükle)

#### Adım 3: Backend Servisini Ayarla
1. "Add Service" > "GitHub Repo" seç
2. Root directory'yi **backend** olarak ayarla
3. Environment Variables ekle:
   ```
   SUPABASE_URL=https://qtjgrdplujxmltkjdljj.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0amdyZHBsdWp4bWx0a2pkbGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDUzMzEsImV4cCI6MjA3NjE4MTMzMX0.QuQn60NPGj4eeF1tABnp_exFNTD4YSUcxwmQkq-19ng
   CORS_ORIGINS=*
   PORT=8001
   ```

4. Deploy'a bas!

#### Adım 4: Backend URL'ini Al
Deploy tamamlandıktan sonra Railway size bir URL verecek:
```
https://your-backend.railway.app
```
Bu URL'i kopyala!

---

### 🎨 Frontend Deployment (Vercel)

#### Adım 1: Vercel'e Git
1. https://vercel.com adresine git
2. GitHub hesabınla giriş yap

#### Adım 2: Yeni Proje Oluştur
1. "Add New" > "Project" tıkla
2. Repository'ni seç
3. Framework Preset: **Create React App** seç
4. Root Directory: **frontend** olarak ayarla

#### Adım 3: Environment Variables Ekle
```
REACT_APP_BACKEND_URL=https://your-backend.railway.app
REACT_APP_SUPABASE_URL=https://qtjgrdplujxmltkjdljj.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0amdyZHBsdWp4bWx0a2pkbGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDUzMzEsImV4cCI6MjA3NjE4MTMzMX0.QuQn60NPGj4eeF1tABnp_exFNTD4YSUcxwmQkq-19ng
```

⚠️ **ÖNEMLİ**: `REACT_APP_BACKEND_URL`'e Railway'den aldığın backend URL'ini yaz!

#### Adım 4: Deploy!
"Deploy" butonuna bas ve bekle.

---

## 📊 Supabase Database Kurulumu

### Adım 1: SQL Komutlarını Çalıştır
1. Supabase Dashboard > SQL Editor'e git
2. `/app/portfolio_package/SUPABASE_SETUP.sql` dosyasını aç ve çalıştır
3. Ardından `/app/portfolio_package/SAMPLE_DATA.sql` dosyasını çalıştır

### Adım 2: RLS Politikalarını Kontrol Et
Row Level Security (RLS) politikaları otomatik kuruldu:
- ✅ Herkes okuyabilir (public read)
- ✅ Sadece admin yazabilir (authenticated write)

---

## 🔐 Admin Panel Erişimi

Deployment sonrası admin paneline erişim:
```
URL: https://your-frontend.vercel.app/admin
Kullanıcı Adı: edizgndd
Şifre: 280620Gndd.
```

---

## 📝 Lokal Geliştirme

### Backend Çalıştır:
```bash
cd /app/backend
source /root/.venv/bin/activate
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Frontend Çalıştır:
```bash
cd /app/frontend
yarn start
```

Backend: http://localhost:8001
Frontend: http://localhost:3000

---

## 🎯 Railway vs Diğer Platformlar

### Railway.app Avantajları:
✅ Ücretsiz $5/ay credit (hobby projeler için yeterli)
✅ GitHub otomatik deploy
✅ Environment variables kolay yönetim
✅ Python/FastAPI native desteği
✅ Logs ve monitoring dahili
✅ Custom domain ücretsiz
✅ SSL sertifikası otomatik

### Railway Kullanım Limitleri:
- $5 = ~500 saat/ay çalışma süresi
- CPU: 0.5 vCPU
- RAM: 512 MB
- Network: 100 GB/ay

**💡 İpucu**: Eğer $5'ı aşarsan, kredi kartı ekleyerek kullanmaya devam edebilirsin (sadece kullandığın kadar ödersin).

---

## 🛠️ Alternatif Backend Platformları

Eğer Railway yerine başka platform denemek istersen:

### 1. **Render.com**
- Ücretsiz tier: 750 saat/ay
- Otomatik SSL
- Custom domains
- Deployment: GitHub connect

### 2. **Fly.io**
- Ücretsiz: 3 VM'e kadar
- Küresel edge network
- Dockerfile tabanlı

### 3. **PythonAnywhere**
- Python'a özel
- Ücretsiz basic tier
- Web console dahili

---

## 🚨 Önemli Notlar

### CORS Ayarları
Backend'de CORS tüm origin'lere açık (`*`). Production'da bunu frontend URL'inle sınırla:
```python
allow_origins=["https://your-frontend.vercel.app"]
```

### Environment Variables
Production'da hassas bilgileri (API keys) asla kod içine yazmayın, her zaman environment variables kullanın.

### Güvenlik
Admin authentication şu anda basit (username/password). Production'da JWT token kullanımı önerilir (kod zaten hazır).

---

## 📞 Yardım & Destek

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

## ✅ Deployment Checklist

- [ ] GitHub'a kod yükle
- [ ] Railway'de backend deploy et
- [ ] Railway URL'ini kopyala
- [ ] Vercel'de frontend deploy et
- [ ] Frontend .env'e Railway URL'ini ekle
- [ ] Supabase SQL'lerini çalıştır
- [ ] Admin panel test et
- [ ] Website test et

**Başarılar! 🎉**

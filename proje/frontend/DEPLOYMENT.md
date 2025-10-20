# Vercel Frontend Deployment

## 🚀 Vercel'e Deploy

### Adımlar:

1. **Vercel.com'a git** ve GitHub ile giriş yap
2. **"Add New" > "Project"** tıkla
3. Repository'ni seç
4. **Framework Preset**: Create React App seç
5. **Root Directory**: `frontend` olarak ayarla
6. **Environment Variables** ekle (aşağıda)

### Environment Variables:
```env
REACT_APP_BACKEND_URL=https://your-backend.railway.app
REACT_APP_SUPABASE_URL=https://qtjgrdplujxmltkjdljj.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0amdyZHBsdWp4bWx0a2pkbGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDUzMzEsImV4cCI6MjA3NjE4MTMzMX0.QuQn60NPGj4eeF1tABnp_exFNTD4YSUcxwmQkq-19ng
```

⚠️ **ÖNEMLİ**: Railway backend deploy ettikten sonra URL'i buraya ekle!

### Build Settings:
- **Build Command**: `yarn build`
- **Output Directory**: `build`
- **Install Command**: `yarn install`

---

## 💻 Lokal Geliştirme:

```bash
yarn install
yarn start
```

Tarayıcıda: http://localhost:3000

---

## 🔐 Admin Panel:

**URL**: `/admin`
- Username: `edizgndd`
- Password: `280620Gndd.`

---

## 📦 Production Build:

```bash
yarn build
```

Build dosyaları `build/` klasöründe oluşur.

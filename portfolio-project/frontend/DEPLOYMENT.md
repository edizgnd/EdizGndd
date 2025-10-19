# Vercel Deployment Rehberi

Bu rehber, portfolio projenizin frontend kısmını Vercel'e nasıl deploy edeceğinizi adım adım açıklar.

## Ön Hazırlık

### 1. Backend'i Hazırlayın

Backend'inizi herhangi bir platforma (Render, Railway, DigitalOcean, AWS, vb.) deploy edin ve API URL'sini not edin.

Örnek: `https://your-backend.herokuapp.com`

### 2. GitHub'a Yükleme

```bash
cd frontend-clean
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/kullaniciadi/repo-adi.git
git push -u origin main
```

## Vercel'e Deployment

### Yöntem 1: Vercel Dashboard (Önerilen)

1. **Vercel'e Giriş Yapın**
   - https://vercel.com adresine gidin
   - GitHub hesabınızla giriş yapın

2. **Yeni Proje Oluşturun**
   - "New Project" butonuna tıklayın
   - GitHub repository'nizi seçin

3. **Proje Ayarlarını Yapın**
   - **Framework Preset:** Create React App
   - **Root Directory:** `./` (veya frontend klasörünüzün yolu)
   - **Build Command:** `yarn build`
   - **Output Directory:** `build`

4. **Environment Variables Ekleyin**
   
   `REACT_APP_BACKEND_URL` değişkenini ekleyin:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

5. **Deploy Butonuna Basın**
   - Birkaç dakika içinde siteniz yayında olacak!
   - Vercel otomatik olarak bir URL verecek: `https://your-project.vercel.app`

### Yöntem 2: Vercel CLI

1. **Vercel CLI'yi Yükleyin**
   ```bash
   npm i -g vercel
   ```

2. **Login Olun**
   ```bash
   vercel login
   ```

3. **Deploy Edin**
   ```bash
   cd frontend-clean
   vercel
   ```

4. **Environment Variables Ekleyin**
   ```bash
   vercel env add REACT_APP_BACKEND_URL
   ```
   Ardından backend URL'nizi girin.

5. **Production Deploy**
   ```bash
   vercel --prod
   ```

## Custom Domain Ekleme

1. Vercel Dashboard'da projenize gidin
2. "Settings" > "Domains" bölümüne gidin
3. Domain adınızı ekleyin (örn: `portfolio.com`)
4. DNS ayarlarınızı Vercel'in verdiği şekilde yapılandırın

## Otomatik Deployment

Vercel, GitHub'a her push yaptığınızda otomatik olarak deploy eder:

- `main` branch → Production deployment
- Diğer branch'ler → Preview deployment

## Önemli Notlar

### CORS Ayarları

Backend'inizde CORS'u şu şekilde ayarlayın:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-url.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Environment Variables

Production ve development için farklı backend URL'leri kullanabilirsiniz:

**.env.local** (development)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**Vercel Dashboard** (production)
```
REACT_APP_BACKEND_URL=https://your-backend.com
```

## Sorun Giderme

### Build Hatası

1. Local'de build'i test edin:
   ```bash
   yarn build
   ```

2. Hataları düzeltin ve tekrar push edin

### API Bağlantı Hatası

1. Backend URL'sinin doğru olduğunu kontrol edin
2. Backend'in CORS ayarlarını kontrol edin
3. Browser console'da network hatalarını inceleyin

### 404 Hatası

1. `vercel.json` dosyasının doğru yapılandırıldığından emin olun
2. React Router için rewrite kurallarının olduğunu kontrol edin

## Performance Optimizasyonu

### 1. Image Optimization

Vercel otomatik olarak görselleri optimize eder. Ancak daha iyi performance için:

```javascript
// Next.js Image component kullanın veya
// lazy loading ekleyin
import { lazy, Suspense } from 'react';
```

### 2. Code Splitting

```javascript
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

<Suspense fallback={<Loading />}>
  <AdminPanel />
</Suspense>
```

### 3. Caching

`vercel.json` dosyasına caching headers eklenmiştir:

```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Analytics ve Monitoring

Vercel Dashboard'da şunları görebilirsiniz:

- 📊 Deployment history
- 🔍 Build logs
- 📈 Analytics (ziyaretçi istatistikleri)
- ⚡ Performance metrics
- 🐛 Error tracking

## Güvenlik

1. **Environment Variables:** Hassas bilgileri asla kodda saklamayın
2. **API Keys:** Tüm API anahtarlarını environment variables'da tutun
3. **HTTPS:** Vercel otomatik olarak SSL sertifikası sağlar

## Yardım ve Destek

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Discord: https://vercel.com/discord

---

## Hızlı Başlangıç Checklist

- [ ] Backend'i deploy et ve URL'i al
- [ ] GitHub'a kod yükle
- [ ] Vercel'e login ol
- [ ] Yeni proje oluştur
- [ ] Environment variables ekle
- [ ] Deploy et
- [ ] Domain ekle (opsiyonel)
- [ ] Test et

**Başarılar! 🚀**

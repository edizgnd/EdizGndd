# Railway Backend Deployment

Bu klasör Railway.app'e deploy edilmek üzere hazırlanmıştır.

## Deployment Adımları:

1. Railway.app'e giriş yap
2. "New Project" > "Deploy from GitHub repo"
3. Bu repository'yi seç
4. **Root Directory**: `backend` olarak ayarla
5. Environment Variables ekle:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `CORS_ORIGINS`

## Dosya Yapısı:
- `server.py` - Ana FastAPI uygulaması
- `requirements.txt` - Python bağımlılıkları
- `railway.json` - Railway konfigürasyonu
- `runtime.txt` - Python versiyonu
- `routes/` - API endpoint'leri
  - `public.py` - Public API routes
  - `admin.py` - Admin API routes
- `supabase_client.py` - Supabase bağlantısı

## Environment Variables:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
CORS_ORIGINS=*
PORT=8001
```

## Test:
```bash
curl https://your-backend.railway.app/api/health
```

Başarılı yanıt: `{"status":"healthy"}`

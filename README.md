# Portfolio Website - Ediz Gündoğdu

Modern, responsive portfolio website with admin panel. Built with Next.js, Tailwind CSS, and Supabase.

## 🚀 Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Supabase backend entegrasyonu
- ✅ Admin paneli ile içerik yönetimi
- ✅ Projeler, yetenekler, deneyim, referanslar yönetimi
- ✅ İletişim formu
- ✅ SEO optimize
- ✅ Vercel'e deploy edilebilir
- ✅ Türkçe dil desteği

## 📋 Gereksinimler

- Node.js 18+
- Yarn
- Supabase hesabı

## 🛠️ Kurulum Adımları

### 1. Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. **Settings → API** bölümünden şu bilgileri kopyalayın:
   - Project URL: `https://your-project.supabase.co`
   - Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2. Veritabanı Kurulumu

1. Supabase dashboard'da **SQL Editor** sekmesine gidin
2. `SUPABASE_SETUP.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'a yapıştırın ve çalıştırın
4. **Table Editor**'da tabloların oluştuğunu kontrol edin

### 3. Proje Kurulumu

```bash
# Bağımlılıkları yükleyin
yarn install

# .env dosyası oluşturun
cp .env.example .env
```

### 4. Environment Variables (.env)

`.env` dosyasını açın ve Supabase bilgilerinizi girin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Yerel Çalıştırma

```bash
yarn dev
```

Tarayıcınızda açın: http://localhost:3000

## 🌐 Vercel'e Deploy Etme

### Yöntem 1: Vercel Dashboard

1. [Vercel](https://vercel.com) hesabı oluşturun
2. "New Project" butonuna tıklayın
3. GitHub repository'nizi import edin (veya bu klasörü sürükleyin)
4. Environment Variables ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. "Deploy" butonuna tıklayın

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI yükleyin
npm i -g vercel

# Deploy edin
vercel

# Environment variables ekleyin
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Production deploy
vercel --prod
```

## 📱 Kullanım

### Ana Sayfa
- Portfolyo içeriğini görüntüleyin
- İletişim formunu kullanın
- Responsive tasarım (mobil uyumlu)

### Admin Panel
- `/admin` adresine gidin
- **Projeler**: Yeni proje ekleyin, düzenleyin, silin
- **Yetenekler**: Yetenek ve yüzdelerini yönetin
- **Deneyim**: İş deneyimi ve eğitim bilgilerini ekleyin
- **Referanslar**: Müşteri referanslarını yönetin
- **Mesajlar**: İletişim formundan gelen mesajları görüntüleyin

## 📁 Dosya Yapısı

```
/
├── app/
│   ├── page.js                # Ana sayfa
│   ├── admin/
│   │   └── page.js           # Admin panel
│   ├── api/
│   │   └── [[...path]]/
│   │       └── route.js      # API routes
│   ├── layout.js             # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── ui/                   # Shadcn UI bileşenleri
├── lib/
│   ├── supabase.js          # Supabase client
│   └── utils.js             # Utility functions
├── public/                  # Static files
├── .env.example            # Environment variables örneği
├── SUPABASE_SETUP.sql     # Veritabanı kurulum scripti
├── package.json
├── tailwind.config.js
└── README.md
```

## 🗄️ Veritabanı Yapısı

### Tables

1. **projects**: Portfolio projeleri
2. **skills**: Teknik yetenekler ve yüzdeler
3. **experience**: İş deneyimi ve eğitim
4. **testimonials**: Müşteri referansları
5. **contact_messages**: İletişim formu mesajları
6. **about_info**: Hakkımda bilgileri

## 🎨 Özelleştirme

### Renkler ve Temalar

`tailwind.config.js` dosyasından renk paletini değiştirebilirsiniz.

### İçerik

1. Admin panel üzerinden tüm içeriği yönetebilirsiniz
2. Görselleri değiştirmek için Supabase Storage kullanabilirsiniz
3. Kişisel bilgileri `app/page.js` dosyasından düzenleyebilirsiniz

## 🔒 Güvenlik

⚠️ **ÖNEMLİ**: 
- `.env` dosyasını asla Git'e eklemeyin
- Supabase Service Role Key'i kodda kullanmayın
- Production'da admin paneline authentication ekleyin

## 🐛 Sorun Giderme

### Supabase bağlantı hatası
- `.env` dosyasındaki URL ve Key'leri kontrol edin
- Supabase projesinin aktif olduğundan emin olun
- SQL scriptini doğru çalıştırdığınızdan emin olun

### Vercel deploy hatası
- Environment variables'ı Vercel'de ayarladığınızdan emin olun
- Build loglarını kontrol edin
- `yarn build` komutunu yerel olarak test edin

## 📞 Destek

Sorularınız için:
- GitHub Issues
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 📄 Lisans

MIT License

---

**Not**: Bu proje Ediz Gündoğdu'nun portfolio sitesi referans alınarak oluşturulmuştur.

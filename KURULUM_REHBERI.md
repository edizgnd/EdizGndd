# Portfolio Website Kurulum Rehberi (Türkçe)

## 🎯 Hızlı Başlangıç (5 Dakika)

Bu rehber size portfolyo sitenizi Vercel ve Supabase ile nasıl yayınlayacağınızı adım adım gösterecek.

---

## 📦 1. ADIM: Dosyaları Hazırlama

✅ Bu klasördeki tüm dosyalar hazır
✅ ZIP dosyasını çıkarttıysanız devam edebilirsiniz

---

## 🗄️ 2. ADIM: Supabase Kurulumu (2 dakika)

### 2.1. Hesap Oluşturma

1. [https://supabase.com](https://supabase.com) adresine gidin
2. "Start your project" butonuna tıklayın
3. GitHub veya Google ile giriş yapın

### 2.2. Proje Oluşturma

1. "New Project" butonuna tıklayın
2. Proje bilgilerini doldurun:
   - **Name**: `portfolio` (veya istediğiniz isim)
   - **Database Password**: Güçlü bir şifre girin (KAYDEDIN!)
   - **Region**: En yakın bölge seçin (Europe/West Europe önerili)
3. "Create new project" butonuna tıklayın
4. ⏰ 2-3 dakika bekleyin (proje hazırlanıyor)

### 2.3. API Bilgilerini Alma

1. Sol menüden **Settings** (Ayarlar) → **API** tıklayın
2. Şu bilgileri kopyalayın ve bir yere kaydedin:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc...
```

### 2.4. Veritabanı Tablolarını Oluşturma

1. Sol menüden **SQL Editor** tıklayın
2. "New Query" butonuna tıklayın
3. `SUPABASE_SETUP.sql` dosyasını açın (bu klasörde)
4. İçeriğin tamamını kopyalayın
5. SQL Editor'a yapıştırın
6. Sağ alttaki **RUN** butonuna tıklayın
7. ✅ "Success. No rows returned" mesajını görmelisiniz

### 2.5. Kontrol

1. Sol menüden **Table Editor** tıklayın
2. Şu tabloları görmelisiniz:
   - projects
   - skills
   - experience
   - testimonials
   - contact_messages
   - about_info

✅ Supabase kurulumu tamamlandı!

---

## 🌐 3. ADIM: Vercel'e Deploy (2 dakika)

### 3.1. Hesap Oluşturma

1. [https://vercel.com](https://vercel.com) adresine gidin
2. "Sign Up" butonuna tıklayın
3. GitHub hesabınızla giriş yapın (önerilen)

### 3.2. Projeyi Yükleme

**Yöntem A: GitHub üzerinden (önerilen)**

1. Bu projeyi GitHub'a yükleyin:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/kullaniciadi/portfolio.git
   git push -u origin main
   ```

2. Vercel dashboard'da "Add New" → "Project"
3. GitHub repository'nizi seçin
4. "Import" butonuna tıklayın

**Yöntem B: Sürükle-Bırak**

1. Proje klasörünü ZIP olarak sıkıştırın (node_modules hariç)
2. Vercel'de "Add New" → "Project"
3. "Deploy from .zip" seçeneğini kullanın

### 3.3. Environment Variables Ekleme

1. Deploy ekranında "Environment Variables" bölümüne gidin
2. Şu değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

(Supabase'den aldığınız değerleri yapıştırın)

3. "Deploy" butonuna tıklayın
4. ⏰ 2-3 dakika bekleyin

### 3.4. Siteniz Yayında! 🎉

1. Deploy tamamlandığında bir URL göreceksiniz:
   ```
   https://portfolio-xxxxxxx.vercel.app
   ```

2. Bu URL'i açın ve sitenizi görün!

---

## ✏️ 4. ADIM: İçerik Ekleme

### 4.1. Admin Paneline Giriş

1. Sitenize gidin: `https://portfolio-xxxxxxx.vercel.app`
2. URL'ye `/admin` ekleyin: `https://portfolio-xxxxxxx.vercel.app/admin`

### 4.2. Proje Ekleme

1. "Projeler" sekmesine tıklayın
2. "Yeni Proje" butonuna tıklayın
3. Formu doldurun:
   - **Başlık**: Proje adı
   - **Kategori**: "Konveyör Sistemleri", "Ürün Tasarımı", vs.
   - **Yıl**: 2024
   - **Açıklama**: Proje hakkında kısa açıklama
   - **Görsel URL**: `https://images.unsplash.com/photo-xxx` (Unsplash'tan)
   - **Etiketler**: CAD Tasarım, Üretim, Otomasyon (virgülle ayırın)
4. "Kaydet" butonuna tıklayın

### 4.3. Yetenek Ekleme

1. "Yetenekler" sekmesine tıklayın
2. "Yeni Yetenek" butonuna tıklayın
3. Formu doldurun:
   - **İsim**: SolidWorks
   - **Kategori**: CAD/CAM Yazılımları
   - **Yüzde**: 95
4. "Kaydet" butonuna tıklayın

### 4.4. Diğer İçerikler

Aynı şekilde:
- Deneyim/Eğitim ekleyin
- Referanslar ekleyin
- Ana sayfaya dönün ve değişiklikleri görün!

---

## 🎨 5. ADIM: Kişiselleştirme

### İsim ve İletişim Bilgilerini Değiştirme

1. Projeyi bilgisayarınızda açın
2. `app/page.js` dosyasını düzenleyin
3. Şu satırları bulup değiştirin:
   ```javascript
   <h2>Ediz Gündoğdu</h2>  // Kendi adınız
   <a href="mailto:edizgndd@hotmail.com">  // Kendi emailiniz
   <a href="tel:+905363912806">  // Kendi telefonunuz
   ```
4. Değişiklikleri kaydedin
5. Git'e push yapın (Vercel otomatik deploy eder)

---

## 🆘 Sorun Giderme

### Sık Karşılaşılan Hatalar

**1. "Error fetching projects"**
- ✅ Supabase URL ve Key'i doğru mu kontrol edin
- ✅ SQL scriptini çalıştırdınız mı?
- ✅ Tablolar oluştu mu? (Table Editor'da bakın)

**2. "500 Internal Server Error"**
- ✅ Vercel'de Environment Variables eklediniz mi?
- ✅ Environment Variables'ı doğru yazdınız mı? (başında/sonunda boşluk olmamalı)

**3. Versel'de deploy başarısız**
- ✅ `node_modules` klasörünü ZIP'e koymadınız mı?
- ✅ `.env` dosyasını sildiniz mi? (Environment Variables kullanın)
- ✅ Build loglarını okuyun

### Test Etme

**Yerel olarak test:**
```bash
cd portfolio-klasoru
yarn install
cp .env.example .env
# .env dosyasını düzenleyin
yarn dev
# http://localhost:3000 açın
```

---

## 📚 Ek Kaynaklar

- [Supabase Dökümanı](https://supabase.com/docs)
- [Vercel Dökümanı](https://vercel.com/docs)
- [Next.js Öğren](https://nextjs.org/learn)

---

## ✅ Checklist

- [ ] Supabase hesabı oluşturdum
- [ ] Supabase projesi oluşturdum
- [ ] SQL scriptini çalıştırdım
- [ ] API bilgilerini kopyaladım
- [ ] Vercel hesabı oluşturdum
- [ ] Projeyi Vercel'e yükledim
- [ ] Environment Variables ekledim
- [ ] Site başarıyla deploy oldu
- [ ] Admin paneline erişebildim
- [ ] İlk projemi ekledim
- [ ] İsim ve iletişim bilgilerini değiştirdim

---

## 🎉 Tebrikler!

Portfolio siteniz artık yayında! 

Sorularınız için:
- Supabase Community: https://supabase.com/community
- Vercel Discord: https://vercel.com/discord

**Başarılar! 🚀**

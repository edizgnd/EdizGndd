-- Sample Data for Ediz Gündoğdu Portfolio
-- Run this AFTER running SUPABASE_SETUP.sql

-- Insert Initial Contact Information
INSERT INTO contact (email, phone, location) VALUES
('edizgndd@hotmail.com', '+90 536 391 28 06', 'Bursa, Türkiye')
ON CONFLICT DO NOTHING;

-- Insert Initial About Content
INSERT INTO about (content_tr, content_en, image_url) VALUES
('Bursa doğumlu bir makine mühendisiyim. Balıkesir Üniversitesi Makine Mühendisliği bölümünden mezun olduktan sonra kariyerime endüstriyel tasarım, üretim ve proje yönetimi alanlarında başladım. Proje mühendisi ve proje yöneticisi olarak görev yaptığım dönemde, üretim hattı verimliliğini artıran sistemler geliştirdim.', 
'I am a mechanical engineer born in Bursa. After graduating from Balıkesir University Department of Mechanical Engineering, I started my career in industrial design, production and project management. As a project engineer and project manager, I developed systems that increased production line efficiency.',
'https://images.unsplash.com/photo-1581092333203-42374bcf7d89?w=800')
ON CONFLICT DO NOTHING;

-- Insert Social Links
INSERT INTO social_links (platform, url, icon) VALUES
('LinkedIn', 'https://linkedin.com', 'Linkedin'),
('GitHub', 'https://github.com', 'Github'),
('Email', 'mailto:edizgndd@hotmail.com', 'Mail')
ON CONFLICT DO NOTHING;

-- Insert Sample Projects
INSERT INTO projects (title_tr, title_en, description_tr, description_en, category_tr, category_en, year, tags, image_url) VALUES
('Zincir Tahrikli Lineer Hareket Sistemi', 'Chain Driven Linear Motion System', 
'Endüstriyel üretim hatları için yüksek hassasiyetli zincir tahrikli lineer hareket sistemi.', 
'High precision chain driven linear motion system for industrial production lines.',
'Konveyör Sistemleri', 'Conveyor Systems', '2024', 
ARRAY['CAD Tasarım', 'Üretim', 'Otomasyon'], 
'https://images.unsplash.com/photo-1651615832931-1f0540d43ef0?w=800'),

('Dikey Helezon Konveyör Sistemi', 'Vertical Screw Conveyor System',
'Dikey malzeme taşıma için optimize edilmiş helezon konveyör mekanizması.',
'Optimized screw conveyor mechanism for vertical material handling.',
'Konveyör Sistemleri', 'Conveyor Systems', '2024',
ARRAY['Mekanik Tasarım', 'FEA Analiz'],
'https://images.pexels.com/photos/5532664/pexels-photo-5532664.jpeg?w=800'),

('Ultra Hafif Metal Valiz Tekerleği', 'Ultra Light Metal Suitcase Wheel',
'Dayanıklı ve hafif metal valiz tekerleği tasarımı.',
'Durable and lightweight metal suitcase wheel design.',
'Ürün Tasarımı', 'Product Design', '2024',
ARRAY['Ürün Tasarımı', '3D Modelleme'],
'https://images.unsplash.com/photo-1567093322102-6bdd32fba67d?w=800'),

('Otomatik Tartım Konveyör Sistemleri', 'Automatic Weighing Conveyor Systems',
'Üretim hattı entegre otomatik tartım ve paketleme konveyör sistemi.',
'Production line integrated automatic weighing and packaging conveyor system.',
'Otomasyon', 'Automation', '2023',
ARRAY['Otomasyon', 'Sistem Entegrasyonu'],
'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800'),

('Katodik Kaplama Besleme Hatları', 'Cathodic Coating Feed Lines',
'Otomotiv sektörü için katodik kaplama üretim hattı tasarımı.',
'Cathodic coating production line design for automotive sector.',
'Endüstriyel Sistemler', 'Industrial Systems', '2023',
ARRAY['Otomotiv', 'Üretim Hattı'],
'https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?w=800'),

('Troleyli Konveyör Ünitesi', 'Trolley Conveyor Unit',
'Tekstil ve boya endüstrisi için troleyli konveyör taşıma sistemi.',
'Trolley conveyor transport system for textile and dyeing industry.',
'Konveyör Sistemleri', 'Conveyor Systems', '2023',
ARRAY['Tekstil', 'Konveyör'],
'https://images.pexels.com/photos/5532668/pexels-photo-5532668.jpeg?w=800'),

('Asansör Mekanizmaları', 'Elevator Mechanisms',
'Endüstriyel asansör ve yükleme mekanizmaları tasarımı.',
'Industrial elevator and loading mechanisms design.',
'Mekanik Sistemler', 'Mechanical Systems', '2023',
ARRAY['Mekanik', 'Güvenlik'],
'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=800'),

('Endüstriyel Makine Parçaları', 'Industrial Machine Parts',
'Çeşitli endüstriyel uygulamalar için özel makine parçası tasarımları.',
'Custom machine part designs for various industrial applications.',
'Üretim', 'Manufacturing', '2023',
ARRAY['CNC', 'Üretim'],
'https://images.pexels.com/photos/34353354/pexels-photo-34353354.jpeg?w=800')
ON CONFLICT DO NOTHING;
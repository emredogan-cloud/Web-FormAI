export const faqGroups = [
  {
    id: 'sss',
    title: 'Genel sorular',
    items: [
      {
        q: 'FormAI ne yapar?',
        a: 'FormAI; kameranla formunu izleyen, beslenmeni dengeleyen ve 30 günlük programını seninle birlikte hesaplayan bir yapay zekâ fitness koçudur. Salonsuz, eğitmensiz, fakat ölçümlü çalışırsın.',
      },
      {
        q: 'Salon ekipmanına ihtiyacım var mı?',
        a: '30 günlük varsayılan plan ekipmansızdır. 138 egzersizin tamamı evde uygulanabilir. Plan üretici, barbell veya makine içeren bir slug sızdırırsa runtime invariant tetiklenir.',
      },
      {
        q: 'Hangi cihazlarda çalışıyor?',
        a: 'iOS 15+ ve Android 10+ cihazlarda Flutter tek kod tabanı üzerinden çalışır. Yakında ulaşılabilir bir web kontrol paneli planlanıyor; şu anda mobil odaklıyız.',
      },
      {
        q: 'İlk antrenmana ne kadar sürede başlarım?',
        a: 'Kuruluş bir kez yapılır: kamera izni, vücut kalibrasyonu, hedef ve damak zevki anketi. Toplam 90 saniye. Hemen ardından 12 dakikalık ilk antrenmana başlarsın.',
      },
    ],
  },
  {
    id: 'antrenman',
    title: 'Antrenman ve pose detection',
    items: [
      {
        q: 'Kameram nereye gönderiliyor?',
        a: 'Hiçbir yere. Pose tahmini Google ML Kit BlazePose ile cihazda çalışır. Video kareleri RAM\'de işlenir, asla kaydedilmez veya yüklenmez. Sadece form skoru ve tekrar sayısı senin Supabase satırına yazılır.',
      },
      {
        q: 'Eğer hareket FormAI\'nin tanımadığı bir şeyse?',
        a: 'Anlamlı form kontrolü olmayan hareketler (jump rope, mobility, glute bridge) sessiz analizöre düşer. Koçun bu durumda seni asla yalandan uyarmaz; süreyi sayar, doğru zamanda durdurur.',
      },
      {
        q: 'Düşük ışıkta veya dar alanda çalışır mı?',
        a: 'BlazePose, vücudun en az %70\'ini görüyorsa çalışır. Düşük ışıkta confidence skoru düştüğünde koçun seni daha açık bir alana çağırır.',
      },
    ],
  },
  {
    id: 'beslenme',
    title: 'Beslenme ve makrolar',
    items: [
      {
        q: 'Hangi diyet profilleri destekleniyor?',
        a: 'Standart, Vegan, Vejetaryen ve Keto. Onboarding sırasında alerji, damak zevki (tatlı/tuzlu/dengeli) ve hazırlık tempo (hızlı/yavaş) seçimleri profilini belirler.',
      },
      {
        q: 'Türk mutfağı destekleniyor mu?',
        a: 'Beslenme kütüphanesi tarhana çorbası, bulgur pilavı, etli yemekler ve geleneksel ara öğünler için özel olarak eğitildi. Sentetik veya İngilizce çevirilerinden tarif üretilmiyor.',
      },
      {
        q: 'Bir öğünü kaçırırsam ne olur?',
        a: 'Günün geri kalanı yeniden hesaplanır. Eksik makroları diğer öğünlere paylaştırılır. Protein hedefini kaçırıyorsan yapay zekâ önerisi akşam ana öğününü değiştirir.',
      },
    ],
  },
  {
    id: 'gelisim',
    title: 'Gelişim, streak ve rozetler',
    items: [
      {
        q: 'Streak bir gün kaçırırsam sıfırlanır mı?',
        a: 'Ayda bir gün otomatik telafi hakkı tanınır. Bunun dışında, gün sonu yaklaştığında zekân seni uyarır ve 12 dakikalık alternatif önerir — disiplinin ölmeden korunur.',
      },
      {
        q: 'Haftalık retrospektif nedir?',
        a: 'Her hafta sonu yapay zekân son 7 gününü okur: form skorlarındaki gelişim, eksik kaldığın hareket grupları, makro sapmaları ve streak durumun bir paragrafta özetlenir.',
      },
    ],
  },
  {
    id: 'guvenlik',
    title: 'Güvenlik ve veri',
    items: [
      {
        q: 'Verilerim güvende mi?',
        a: 'Tüm kullanıcı tabloları Supabase RLS ile uçtan uca korunur. Pose detection on-device çalıştığı için kamera verisi asla sunucuya gitmez. Sentry ve PostHog yalnızca açık rıza sonrası etkinleşir.',
      },
      {
        q: 'KVKK ve GDPR uyumlu musunuz?',
        a: 'Evet. Kayıt esnasında yaş gateway\'i, gizlilik politikası ve KVKK aydınlatma metni onayı zorunludur. Sentry beforeSend, onay alınmadan tek bir event yollamaz; alındıktan sonra user.email ve user.ipAddress alanlarını siler.',
      },
      {
        q: 'Hesabımı nasıl silerim?',
        a: 'Profil > Hesap > Hesabı sil ile tetiklersin. RLS politikaları zincirleme tüm satırlarını siler. RevenueCat aboneliğin pasifleştirilir.',
      },
      {
        q: 'Abonelik ücreti ne kadar?',
        a: 'Yıllık 959,99₺ (popüler), 1 ay 179,99₺ ve 3 ay 359,99₺ planları var. İlk 7 gün ücretsiz; "şimdi ödeme yok" modeliyle başlar.',
      },
    ],
  },
] as const;

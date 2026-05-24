import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/metadata';
import {
  LegalPageLayout,
  LegalSectionHeader,
  LegalP,
  LegalUL,
  LegalLI,
  LegalCallout,
  LegalStrong,
} from '@/components/sections/LegalPageLayout';
import { site } from '@/lib/site';

const SUPPORT_EMAIL = site.team.contact.email;

export const metadata: Metadata = {
  title: 'KVKK aydınlatma metni',
  description:
    '6698 sayılı KVKK kapsamında veri sorumlusu sıfatıyla FormAI tarafından hazırlanan aydınlatma metni — toplanan kişisel veriler, işleme amaçları, aktarımlar ve KVKK madde 11 hakları.',
  alternates: alternatesFor('/kvkk'),
};

const sections = [
  { id: 'veri-sorumlusu', title: 'Veri sorumlusu' },
  { id: 'isleme-amaclari', title: 'İşleme amaçları' },
  { id: 'islenen-kategoriler', title: 'İşlenen veri kategorileri' },
  { id: 'hukuki-sebepler', title: 'Hukuki sebepler' },
  { id: 'aktarim', title: 'Aktarım — yurt içi ve yurt dışı' },
  { id: 'toplama-yontemi', title: 'Toplama yöntemi' },
  { id: 'haklariniz', title: 'KVKK madde 11 haklarınız' },
  { id: 'basvuru', title: 'Başvuru yöntemi' },
  { id: 'kurum', title: "Veri Koruma Kurumu'na şikâyet" },
];

export default function KvkkPage() {
  return (
    <LegalPageLayout
      eyebrow="Yasal · KVKK"
      title="KVKK aydınlatma metni"
      lastUpdated="4 Mayıs 2026"
      effective="4 Mayıs 2026"
      sections={sections}
      intro={
        <>
          Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) madde 10
          uyarınca; FormAI mobil uygulamasını kullandığınızda kişisel verilerinizin <LegalStrong>veri sorumlusu
          sıfatıyla FormAI ekibi</LegalStrong> tarafından hangi amaçlarla, hangi hukuki sebeplere
          dayanılarak işlendiğini, kimlere aktarıldığını ve KVKK madde 11 kapsamında sahip olduğunuz
          hakları açıklar. Ayrıntılı işleme dokümantasyonu için{' '}
          <a href="/gizlilik" className="text-violet-300 underline-offset-4 hover:underline">Gizlilik Politikası</a>&apos;na bakın.
        </>
      }
    >
      <LegalSectionHeader id="veri-sorumlusu" number={1}>Veri sorumlusu</LegalSectionHeader>
      <LegalP>
        <LegalStrong>Veri sorumlusu:</LegalStrong> FormAI ekibi (&quot;FormAI&quot;, &quot;biz&quot;).
      </LegalP>
      <LegalP>
        <LegalStrong>İletişim:</LegalStrong>{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-300 underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>
      </LegalP>

      <LegalSectionHeader id="isleme-amaclari" number={2}>İşleme amaçları</LegalSectionHeader>
      <LegalP>Kişisel verileriniz aşağıdaki amaçlarla işlenir:</LegalP>
      <LegalUL>
        <LegalLI><LegalStrong>Hizmetin sunulması:</LegalStrong> Kişiselleştirilmiş antrenman ve beslenme planlarının üretilmesi, ilerlemenizin takibi, cihazlar arası senkronizasyon.</LegalLI>
        <LegalLI><LegalStrong>Hesabınızın yönetimi:</LegalStrong> Kimlik doğrulama, oturum yönetimi, abonelik durumunun takibi.</LegalLI>
        <LegalLI><LegalStrong>Hizmetin iyileştirilmesi:</LegalStrong> Anonim ürün analitiği ve çökme raporlama yoluyla performans, güvenilirlik ve özellik değerinin değerlendirilmesi.</LegalLI>
        <LegalLI><LegalStrong>Sözleşme ve hukuki yükümlülükler:</LegalStrong> Faturalama, vergi kayıtları, yasal taleplere yanıt verme.</LegalLI>
        <LegalLI><LegalStrong>İletişim:</LegalStrong> Hizmete ilişkin temel bildirimler (abonelik makbuzları, güvenlik uyarıları). <LegalStrong>Açık rızanız olmadan pazarlama amaçlı iletişim kurulmaz.</LegalStrong></LegalLI>
      </LegalUL>

      <LegalSectionHeader id="islenen-kategoriler" number={3}>İşlenen veri kategorileri</LegalSectionHeader>
      <LegalUL>
        <LegalLI><LegalStrong>Kimlik:</LegalStrong> E-posta adresi, giriş sağlayıcı bilgisi (Google / Apple / e-posta), rastgele üretilmiş kullanıcı kimliği, varsa görünen ad ve avatar.</LegalLI>
        <LegalLI><LegalStrong>Sağlık ve fiziksel uygunluk:</LegalStrong> Boy, kilo, cinsiyet, yaş aralığı, fitness hedefi, aktivite seviyesi, antrenman geçmişi (set, tekrar, süre).</LegalLI>
        <LegalLI><LegalStrong>Görsel/kamera verisi:</LegalStrong> Yalnızca antrenman sırasında, yalnızca cihazda işlenir; pose-detection sonuçları (form skoru, tekrar sayısı) dışında <LegalStrong>hiçbir kare, görüntü veya pose-landmark koordinatı sunucularımıza iletilmez.</LegalStrong></LegalLI>
        <LegalLI><LegalStrong>İşlem ve abonelik:</LegalStrong> App Store/Google Play işlem kimliği, hak durumu (Pro/free). Tam ödeme bilgisini görmüyoruz.</LegalLI>
        <LegalLI><LegalStrong>Cihaz ve teknik:</LegalStrong> Cihaz modeli, OS sürümü, uygulama sürümü, dil, saat dilimi, çökme/hata raporları, anonim ürün analitiği olayları.</LegalLI>
      </LegalUL>

      <LegalSectionHeader id="hukuki-sebepler" number={4}>Hukuki sebepler</LegalSectionHeader>
      <LegalP>
        Kişisel verileriniz, KVKK madde 5 ve madde 6 kapsamındaki aşağıdaki hukuki sebeplere
        dayanılarak işlenir:
      </LegalP>
      <LegalUL>
        <LegalLI><LegalStrong>Sözleşmenin kurulması ve ifası</LegalStrong> (KVKK md. 5/2-c): Hizmetin size sağlanması, abonelik yönetimi.</LegalLI>
        <LegalLI><LegalStrong>Hukuki yükümlülük</LegalStrong> (KVKK md. 5/2-a): Vergi mevzuatı ve yasal taleplere uyum.</LegalLI>
        <LegalLI><LegalStrong>Meşru menfaat</LegalStrong> (KVKK md. 5/2-f): Çökme raporlama ve anonim ürün analitiği; menfaatleriniz dengelendiğinde uygulanır.</LegalLI>
        <LegalLI><LegalStrong>Açık rıza</LegalStrong> (KVKK md. 5/1, md. 6/2): Gelişim fotoğraflarının buluta yedeklenmesi gibi isteğe bağlı özellikler ile özel nitelikli kişisel verilerin (sağlık verisi) işlenmesi.</LegalLI>
      </LegalUL>

      <LegalCallout tone="violet">
        <LegalStrong>Özel nitelikli kişisel veri.</LegalStrong> Boy, kilo, fitness hedefi gibi
        fiziksel uygunluğa ilişkin veriler, KVKK md. 6 kapsamında özel nitelikli sağlık verisi
        olarak değerlendirilebilir. Bu veriler yalnızca <LegalStrong>açık rızanıza</LegalStrong>{' '}
        dayanılarak ve sıkı güvenlik tedbirleri altında işlenir.
      </LegalCallout>

      <LegalSectionHeader id="aktarim" number={5}>Aktarım — yurt içi ve yurt dışı</LegalSectionHeader>
      <LegalP>
        Kişisel verileriniz, hizmet sağlama ve teknik altyapı amaçlarıyla aşağıdaki üçüncü taraf
        veri işleyicilerle paylaşılır. Her biriyle KVKK ve GDPR uyumlu veri işleme sözleşmeleri
        imzalanmıştır:
      </LegalP>
      <LegalUL>
        <LegalLI><LegalStrong>Supabase</LegalStrong> (Frankfurt, AB) — Bulut veritabanı, kimlik doğrulama, dosya depolama.</LegalLI>
        <LegalLI><LegalStrong>PostHog</LegalStrong> (AB veya ABD, projeye göre) — Anonim ürün analitiği. Reklam tanımlayıcı kullanılmaz.</LegalLI>
        <LegalLI><LegalStrong>Sentry</LegalStrong> (Frankfurt, AB) — Çökme ve hata raporlama; kişisel tanımlayıcı alanlar temizlenir.</LegalLI>
        <LegalLI><LegalStrong>RevenueCat</LegalStrong> (ABD) — Abonelik durumu yönetimi; takma adlı kullanıcı kimliği ve işlem kimliği aktarılır.</LegalLI>
        <LegalLI><LegalStrong>Google ML Kit</LegalStrong> (cihaz içi) — Pose detection. <LegalStrong>Hiçbir veri cihazdan ayrılmaz.</LegalStrong></LegalLI>
        <LegalLI><LegalStrong>Apple App Store / Google Play</LegalStrong> — Uygulama dağıtımı ve faturalama; ödeme bilgileri platform şartlarına göre.</LegalLI>
      </LegalUL>
      <LegalP>
        Yurt dışına yapılan aktarımlarda KVKK md. 9 ve GDPR md. 46 uyarınca{' '}
        <LegalStrong>Standart Sözleşme Hükümleri (SCC)</LegalStrong> ve eşdeğer KVKK onaylı
        mekanizmalar uygulanır.
      </LegalP>

      <LegalSectionHeader id="toplama-yontemi" number={6}>Toplama yöntemi</LegalSectionHeader>
      <LegalP>
        Kişisel verileriniz; mobil uygulama içindeki form alanları, onboarding akışı, kamera erişimi
        (cihaz içi), uygulama mağazası satın alma işlemleri ve otomatik teknik telemetri (çökme,
        ürün analitiği) yoluyla otomatik ve kısmen otomatik yollarla toplanır.
      </LegalP>

      <LegalSectionHeader id="haklariniz" number={7}>KVKK madde 11 haklarınız</LegalSectionHeader>
      <LegalP>Kişisel veri sahibi olarak KVKK madde 11 kapsamında şu haklara sahipsiniz:</LegalP>
      <LegalUL>
        <LegalLI>Kişisel verilerinizin işlenip işlenmediğini <LegalStrong>öğrenme</LegalStrong>;</LegalLI>
        <LegalLI>İşlenmişse buna ilişkin <LegalStrong>bilgi talep etme</LegalStrong>;</LegalLI>
        <LegalLI>İşlenme <LegalStrong>amacını ve amacına uygun kullanılıp kullanılmadığını</LegalStrong> öğrenme;</LegalLI>
        <LegalLI>Yurt içinde veya yurt dışında <LegalStrong>aktarıldığı üçüncü kişileri bilme</LegalStrong>;</LegalLI>
        <LegalLI>Eksik veya yanlış işlenmiş verilerin <LegalStrong>düzeltilmesini isteme</LegalStrong>;</LegalLI>
        <LegalLI>KVKK ve ilgili diğer mevzuat hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin <LegalStrong>silinmesini veya yok edilmesini isteme</LegalStrong>;</LegalLI>
        <LegalLI>Düzeltme, silme ve yok etme taleplerinizin <LegalStrong>üçüncü kişilere bildirilmesini</LegalStrong> isteme;</LegalLI>
        <LegalLI>İşlenen verilerin <LegalStrong>münhasıran otomatik sistemler vasıtasıyla analiz edilmesi</LegalStrong> suretiyle aleyhinize bir sonuç ortaya çıkmasına itiraz etme;</LegalLI>
        <LegalLI>KVKK&apos;ya aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde <LegalStrong>zararın giderilmesini talep etme</LegalStrong>.</LegalLI>
      </LegalUL>

      <LegalSectionHeader id="basvuru" number={8}>Başvuru yöntemi</LegalSectionHeader>
      <LegalP>
        Yukarıdaki haklarınıza ilişkin taleplerinizi, hesabınızla ilişkili e-posta adresinden{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-300 underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>{' '}
        adresine ileterek bize iletebilirsiniz. Başvurunuzun KVKK md. 13 uyarınca{' '}
        <LegalStrong>en geç 30 gün</LegalStrong> içinde yanıtlanması esastır.
      </LegalP>
      <LegalP>
        Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ&apos;de belirtilen asgari bilgileri
        (ad-soyad, başvuruya konu hakkın ne olduğu, talebe ilişkin açık açıklama) başvurunuzda
        belirtmeniz, talebinizin hızlı sonuçlanmasına yardımcı olacaktır.
      </LegalP>

      <LegalSectionHeader id="kurum" number={9}>Veri Koruma Kurumu&apos;na şikâyet</LegalSectionHeader>
      <LegalP>
        Başvurunuza verilen yanıtı yetersiz bulmanız veya 30 gün içinde yanıt alamamanız durumunda,
        KVKK md. 14 uyarınca <LegalStrong>Kişisel Verileri Koruma Kurulu&apos;na</LegalStrong> şikâyette
        bulunma hakkına sahipsiniz:
      </LegalP>
      <LegalP>
        <a href="https://www.kvkk.gov.tr" target="_blank" rel="noopener noreferrer" className="text-violet-300 underline-offset-4 hover:underline">
          https://www.kvkk.gov.tr
        </a>
      </LegalP>

      <div className="mt-16 border-t border-white/[0.06] pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} FormAI. Tüm hakları saklıdır.
      </div>
    </LegalPageLayout>
  );
}

import type { Metadata } from 'next';
import {
  LegalPageLayout,
  LegalSectionHeader,
  LegalSubHeader,
  LegalP,
  LegalUL,
  LegalLI,
  LegalCallout,
  LegalStrong,
} from '@/components/sections/LegalPageLayout';
import { site } from '@/lib/site';

const SUPPORT_EMAIL = site.team.contact.email;

export const metadata: Metadata = {
  title: 'Gizlilik politikası',
  description:
    'FormAI gizlilik politikası — hangi verileri topladığımız, nasıl kullandığımız, üçüncü taraf işleyiciler, KVKK ve GDPR hakları, veri saklama ve iletişim.',
  alternates: { canonical: '/gizlilik' },
};

const sections = [
  { id: 'topladigimiz-veriler', title: 'Topladığımız veriler' },
  { id: 'kullanim-amaclari', title: 'Verileri nasıl kullanırız' },
  { id: 'hukuki-dayanak', title: 'Hukuki dayanak (GDPR · KVKK)' },
  { id: 'isleyiciler', title: 'Üçüncü taraf işleyiciler' },
  { id: 'saklama', title: 'Veri saklama' },
  { id: 'haklarin', title: 'Haklarınız' },
  { id: 'guvenlik', title: 'Güvenlik' },
  { id: 'cocuklar', title: 'Çocukların gizliliği' },
  { id: 'transferler', title: 'Uluslararası veri transferleri' },
  { id: 'degisiklikler', title: 'Politikadaki değişiklikler' },
  { id: 'iletisim', title: 'İletişim' },
];

export default function GizlilikPage() {
  return (
    <LegalPageLayout
      eyebrow="Yasal · Privacy"
      title="Gizlilik politikası"
      lastUpdated="4 Mayıs 2026"
      effective="4 Mayıs 2026"
      sections={sections}
      intro={
        <>
          Bu politika; FormAI ekibinin (&quot;biz&quot;, &quot;bize&quot;, &quot;bizim&quot;) FormAI mobil
          uygulamasını (&quot;Uygulama&quot;) kullandığınızda bilgilerinizi nasıl topladığını,
          kullandığını, paylaştığını ve koruduğunu açıklar. FormAI&apos;yi tasarlarken iki ilkeyi
          ön plana aldık: <LegalStrong>en az veriyi toplamak</LegalStrong> ve{' '}
          <LegalStrong>en hassas verinin — antrenman sırasındaki kamera görüntünün —
          cihazınızda kalmasını sağlamak</LegalStrong>.
        </>
      }
    >
      <LegalCallout tone="violet">
        <LegalStrong>Bilmeniz gereken en önemli şey:</LegalStrong> Pose detection için kamera
        kullanıldığında, görüntü akışı Google ML Kit aracılığıyla{' '}
        <LegalStrong>tamamen cihazınızda</LegalStrong> işlenir. Kamera karelerini, fotoğrafları
        veya videoyu sunucularımıza ya da herhangi bir üçüncü tarafa yüklemiyor, akıtmıyor,
        saklamıyor veya iletmiyoruz.
      </LegalCallout>

      <LegalSectionHeader id="topladigimiz-veriler" number={1}>Topladığımız veriler</LegalSectionHeader>

      <LegalSubHeader>1.1 Hesap bilgileri</LegalSubHeader>
      <LegalUL>
        <LegalLI><LegalStrong>Kimlik:</LegalStrong> E-posta adresiniz, giriş sağlayıcınız (Google, Apple veya e-posta) ve rastgele üretilen kullanıcı kimliği.</LegalLI>
        <LegalLI><LegalStrong>Profil:</LegalStrong> Görünen ad (sağladıysanız), avatar URL&apos;si (sağlayıcınız üzerinden gelirse).</LegalLI>
      </LegalUL>

      <LegalSubHeader>1.2 Fitness &amp; sağlık verileri (sizin sağladığınız)</LegalSubHeader>
      <LegalUL>
        <LegalLI><LegalStrong>Vücut ölçümleri:</LegalStrong> Boy, kilo, cinsiyet, yaş aralığı, fitness hedefi (örn. kilo verme, kas kazanma), aktivite seviyesi. Antrenman ve beslenme planlarını kişiselleştirmek için kullanılır.</LegalLI>
        <LegalLI><LegalStrong>Antrenman geçmişi:</LegalStrong> Tamamlanan antrenmanlar, setler, tekrarlar, süreler ve zaman damgaları.</LegalLI>
        <LegalLI><LegalStrong>İsteğe bağlı gelişim fotoğrafları:</LegalStrong> Gelişim fotoğraflarını çekmeyi ve kaydetmeyi seçerseniz, varsayılan olarak cihazınızda saklanır. Buluta yedeklemeyi tercih ederseniz veritabanımızda şifrelenmiş olarak saklanır.</LegalLI>
      </LegalUL>

      <LegalSubHeader>1.3 Kamera akışı (yalnızca cihaz içi)</LegalSubHeader>
      <LegalP>
        Pose-detection antrenmanları sırasında Uygulama, tekrarları saymak ve formu kontrol etmek için
        cihazınızın kamerasına erişir. Görüntü akışı, tamamen cihazınızın CPU/GPU&apos;sunda çalışan{' '}
        <LegalStrong>Google ML Kit Pose Detection</LegalStrong> tarafından işlenir.{' '}
        <LegalStrong>Hiçbir kare, görüntü, video veya pose-landmark koordinatı sunucularımıza
        yüklenmez, Google&apos;a gönderilmez veya herhangi bir üçüncü tarafla paylaşılmaz.</LegalStrong>{' '}
        Yalnızca elde edilen sayısal sonuçlar (örn. tekrar sayısı, egzersiz süresi) antrenman
        geçmişinize kaydedilir.
      </LegalP>

      <LegalSubHeader>1.4 Cihaz &amp; teknik veriler</LegalSubHeader>
      <LegalUL>
        <LegalLI>Cihaz modeli, işletim sistemi sürümü, uygulama sürümü, dil ve saat dilimi — uyumluluk ve analiz için kullanılır.</LegalLI>
        <LegalLI>Çökme ve hata raporları — yığın izlemeleri ve minimal cihaz bağlamı; tanılama amacıyla Sentry&apos;ye gönderilir (bkz. Bölüm 4).</LegalLI>
        <LegalLI>Anonim ürün analitiği olayları — özellik kullanımı, ekran görüntülemeleri, akış tamamlama (bkz. Bölüm 4).</LegalLI>
      </LegalUL>

      <LegalSubHeader>1.5 Abonelik &amp; ödeme</LegalSubHeader>
      <LegalP>
        FormAI Pro&apos;ya abone olduğunuzda satın almanız Apple App Store veya Google Play
        tarafından işlenir. <LegalStrong>Tam ödeme bilginizi görmüyoruz</LegalStrong> (kart numarası,
        fatura adresi). Abonelik altyapısı sağlayıcımız RevenueCat; Uygulamanın Pro aboneliğinizin
        aktif olup olmadığını bilmesi için bir işlem kimliği ve hak durumu alır.
      </LegalP>

      <LegalSectionHeader id="kullanim-amaclari" number={2}>Verileri nasıl kullanırız</LegalSectionHeader>
      <LegalUL>
        <LegalLI><LegalStrong>Hizmeti sağlamak:</LegalStrong> Kişiselleştirilmiş antrenman ve beslenme planları üretmek, ilerlemenizi takip etmek ve verilerinizi cihazlar arasında senkronize etmek.</LegalLI>
        <LegalLI><LegalStrong>Hizmeti iyileştirmek:</LegalStrong> Hangi özelliklerin değerli olduğunu anlamak ve sorunları gidermek için anonim kullanım örüntülerini analiz etmek.</LegalLI>
        <LegalLI><LegalStrong>Sizinle iletişim kurmak:</LegalStrong> Temel hizmet mesajları göndermek (örn. abonelik makbuzları, güvenlik uyarıları). Onayınız olmadan pazarlama e-postası göndermeyiz.</LegalLI>
        <LegalLI><LegalStrong>Hukuki uyum:</LegalStrong> Yetkililerin yasal taleplerine yanıt vermek ve Şartlarımızı uygulamak.</LegalLI>
      </LegalUL>

      <LegalSectionHeader id="hukuki-dayanak" number={3}>Hukuki dayanak (GDPR · KVKK)</LegalSectionHeader>
      <LegalP>
        Avrupa Ekonomik Alanı, Birleşik Krallık veya Türkiye&apos;de iseniz, işleme için hukuki
        dayanaklarımız:
      </LegalP>
      <LegalUL>
        <LegalLI><LegalStrong>Sözleşme</LegalStrong> (GDPR md. 6(1)(b) / KVKK md. 5(2)(c)): Kayıt olduğunuz Hizmeti sağlamak için.</LegalLI>
        <LegalLI><LegalStrong>Meşru menfaat</LegalStrong> (GDPR md. 6(1)(f) / KVKK md. 5(2)(f)): Çökme raporlama ve anonim ürün analitiği; gizlilik menfaatlerinizle dengelenmiştir.</LegalLI>
        <LegalLI><LegalStrong>Açık rıza</LegalStrong> (GDPR md. 6(1)(a) / KVKK md. 5(1)): Gelişim fotoğraflarının buluta yedeklenmesi gibi isteğe bağlı özellikler. Onayınızı Ayarlar&apos;dan istediğiniz zaman geri çekebilirsiniz.</LegalLI>
        <LegalLI><LegalStrong>Hukuki yükümlülük</LegalStrong> (GDPR md. 6(1)(c) / KVKK md. 5(2)(a)): Aboneliğinize ilişkin vergi kayıtları.</LegalLI>
      </LegalUL>

      <LegalSectionHeader id="isleyiciler" number={4}>Üçüncü taraf işleyiciler</LegalSectionHeader>
      <LegalP>
        Hizmeti işletmek için dikkatle seçilmiş küçük bir işleyici setine güveniyoruz. Her biriyle
        veri işleme sözleşmeleri imzaladık; verilerinizi yalnızca bizim talimatlarımızla işleyebilirler.
      </LegalP>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04]">
              <tr>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/55">İşleyici</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/55">Amaç</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/55">Paylaşılan veri</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/55">Bölge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {[
                ['Supabase', 'Bulut veritabanı, kimlik doğrulama, depolama', 'Hesap profili, vücut ölçümleri, antrenman geçmişi, isteğe bağlı gelişim fotoğrafları', 'AB (Frankfurt)'],
                ['PostHog', 'Anonim ürün analitiği', 'Takma adlı kullanıcı kimliği, ekran görüntülemeleri, özellik olayları. Kalıcı reklam tanımlayıcı yoktur.', 'ABD veya AB (proje oluşturulurken seçilen bölge)'],
                ['Sentry', 'Çökme ve hata raporlama', 'Yığın izlemeleri, uygulama sürümü, cihaz modeli, dil. Kişisel tanımlayıcı alanlar temizlenir.', 'AB (Frankfurt)'],
                ['RevenueCat', 'Abonelik durumu yönetimi', 'Takma adlı kullanıcı kimliği, mağaza işlem kimliği, hak durumu', 'ABD'],
                ['Google ML Kit', 'Cihaz içi pose detection', 'Hiçbiri. Tamamen cihazınızda çalışır. Hiçbir veri cihazdan ayrılmaz.', 'Cihaz içi'],
                ['Apple App Store / Google Play', 'Uygulama dağıtımı ve faturalama', 'Ödeme bilgileri (platform şartlarına göre)', 'Platforma bağlı'],
              ].map(([proc, purpose, data, region]) => (
                <tr key={proc} className="align-top">
                  <td className="px-4 py-3 font-display font-semibold text-white">{proc}</td>
                  <td className="px-4 py-3 text-white/70">{purpose}</td>
                  <td className="px-4 py-3 text-white/70">{data}</td>
                  <td className="px-4 py-3 text-white/70">{region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LegalSubHeader>4.1 Reklam yok; veri satışı yok</LegalSubHeader>
      <LegalP>
        Kişisel verilerinizi reklamverenlere, veri brokerlarına veya pazarlama ağlarına{' '}
        <LegalStrong>satmıyor, kiralamıyor veya paylaşmıyoruz</LegalStrong>. Uygulama, üçüncü taraf
        reklam SDK&apos;ları veya uygulamalar arası izleme içermez. iOS Privacy Manifest{' '}
        <code className="font-mono text-violet-300/90">NSPrivacyTracking = false</code> beyan eder;
        bu nedenle App Tracking Transparency istemi gösterilmez.
      </LegalP>

      <LegalSectionHeader id="saklama" number={5}>Veri saklama</LegalSectionHeader>
      <LegalUL>
        <LegalLI><LegalStrong>Hesap verileri:</LegalStrong> Hesabınız aktif olduğu sürece saklanır. Hesabınızı sildikten sonra 30 gün içinde silinir; hukuki kayıt tutma zorunlulukları (örn. vergi faturaları) için sınırlı istisnalar uygulanır.</LegalLI>
        <LegalLI><LegalStrong>Antrenman geçmişi &amp; vücut ölçümleri:</LegalStrong> Hesabınız aktif olduğu sürece saklanır; hesabınızla birlikte silinir.</LegalLI>
        <LegalLI><LegalStrong>Çökme raporları:</LegalStrong> 90 güne kadar saklanır, ardından otomatik olarak silinir.</LegalLI>
        <LegalLI><LegalStrong>Anonim analitik:</LegalStrong> Toplulaştırılmış olay verilerinin sabit bir son kullanma tarihi yoktur ve hesap silindikten sonra kimliksizleştirilmiş biçimde kalabilir.</LegalLI>
      </LegalUL>

      <LegalSectionHeader id="haklarin" number={6}>Haklarınız</LegalSectionHeader>
      <LegalP>
        Uygulanabilir hukuka tabi olarak (GDPR, UK GDPR ve KVKK dâhil) şu haklara sahipsiniz:
      </LegalP>
      <LegalUL>
        <LegalLI>Hakkınızda tuttuğumuz kişisel verilere <LegalStrong>erişim</LegalStrong>;</LegalLI>
        <LegalLI>Yanlış verileri <LegalStrong>düzeltme</LegalStrong>;</LegalLI>
        <LegalLI>Verilerinizi <LegalStrong>silme</LegalStrong> — Uygulama içinden doğrudan silebilirsiniz (Ayarlar → Hesap → Hesabı Sil). Uygulamayı kaldırdıysanız, hesabınızın ve ilişkili verilerin tam silinmesini {SUPPORT_EMAIL} adresinden talep edebilirsiniz;</LegalLI>
        <LegalLI>Verilerinizi makine tarafından okunabilir biçimde <LegalStrong>dışa aktarma</LegalStrong>;</LegalLI>
        <LegalLI>Belirli işlemeleri <LegalStrong>kısıtlama veya itiraz etme</LegalStrong>;</LegalLI>
        <LegalLI>İşleme açık rızaya dayandığında <LegalStrong>rızayı geri çekme</LegalStrong>;</LegalLI>
        <LegalLI>Yerel veri koruma otoritesine <LegalStrong>şikâyet</LegalStrong> (Türkiye&apos;de: Kişisel Verileri Koruma Kurumu — KVKK).</LegalLI>
      </LegalUL>
      <LegalP>
        Bu haklardan herhangi birini kullanmak için hesabınızla ilişkili adresten{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-300 underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>{' '}
        adresine e-posta gönderin. 30 gün içinde yanıtlıyoruz.
      </LegalP>

      <LegalSectionHeader id="guvenlik" number={7}>Güvenlik</LegalSectionHeader>
      <LegalP>Verilerinizi korumak için teknik ve organizasyonel önlemler kullanıyoruz:</LegalP>
      <LegalUL>
        <LegalLI><LegalStrong>Aktarımda şifreleme:</LegalStrong> Uygulama ile arka uç arasındaki tüm ağ istekleri HTTPS/TLS 1.2+ kullanır.</LegalLI>
        <LegalLI><LegalStrong>Bekleyen şifreleme:</LegalStrong> Veritabanı ve depolama şifrelemesi Supabase tarafından sağlanır.</LegalLI>
        <LegalLI><LegalStrong>Satır Seviyesi Güvenlik (RLS):</LegalStrong> Supabase RLS politikaları, her kullanıcının yalnızca kendi satırlarını okuyabilmesini ve yazabilmesini sağlar.</LegalLI>
        <LegalLI><LegalStrong>En az yetki ilkesi:</LegalStrong> Üretim verilerine dahili erişim, gerekli minimum personel ile sınırlıdır.</LegalLI>
      </LegalUL>
      <LegalP>
        Hiçbir sistem mükemmel derecede güvenli değildir. Verilerinizi etkileyen bir güvenlik
        olayından haberdar olursak, sizi ve ilgili yetkilileri yasaların gerektirdiği şekilde
        bilgilendireceğiz.
      </LegalP>

      <LegalSectionHeader id="cocuklar" number={8}>Çocukların gizliliği</LegalSectionHeader>
      <LegalP>
        FormAI <LegalStrong>16 yaş altı çocuklara yönelik değildir</LegalStrong>. 16 yaş altı
        çocuklardan bilerek kişisel veri toplamıyoruz. Bir çocuğun bize kişisel veri sağladığını
        düşünüyorsanız lütfen <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-300 underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>{' '}
        adresinden bizimle iletişime geçin; veriyi silelim.
      </LegalP>

      <LegalSectionHeader id="transferler" number={9}>Uluslararası veri transferleri</LegalSectionHeader>
      <LegalP>
        Bazı işleyicilerimiz Türkiye ve AEA dışında bulunur (örn. RevenueCat, ABD&apos;de).
        Verilerin uluslararası aktarıldığı durumlarda, verilerinizin yeterli seviyede korunmaya
        devam etmesini sağlamak için <LegalStrong>Standart Sözleşme Hükümleri (SCC)</LegalStrong>{' '}
        ve eşdeğer KVKK onaylı mekanizmalar gibi uygun güvenceleri uyguluyoruz.
      </LegalP>

      <LegalSectionHeader id="degisiklikler" number={10}>Politikadaki değişiklikler</LegalSectionHeader>
      <LegalP>
        Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler, yürürlüğe
        girmeden en az 14 gün önce Uygulama içinden ve uygunsa e-posta veya uygulama içi bildirim
        yoluyla iletilecektir. Bu sayfanın üst kısmındaki &quot;Son güncelleme&quot; tarihi en son revizyonu yansıtır.
      </LegalP>

      <LegalSectionHeader id="iletisim" number={11}>İletişim</LegalSectionHeader>
      <LegalP>
        Gizlilik soruları, veri sahibi talepleri veya endişeleri bildirmek için bize{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-300 underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>{' '}
        adresinden ulaşın.
      </LegalP>

      <div className="mt-16 border-t border-white/[0.06] pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} FormAI. Tüm hakları saklıdır.
      </div>
    </LegalPageLayout>
  );
}

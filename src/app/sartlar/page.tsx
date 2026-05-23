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
  title: 'Kullanım şartları',
  description:
    'FormAI kullanım şartları — uygunluk, hesap, abonelik ve otomatik yenileme, tıbbi sorumluluk reddi, kabul edilebilir kullanım, fikri mülkiyet, yetkili mahkeme.',
  alternates: { canonical: '/sartlar' },
};

const sections = [
  { id: 'uygunluk', title: 'Uygunluk & kullanıcı hesapları' },
  { id: 'abonelik', title: 'Abonelikler & otomatik yenileme' },
  { id: 'tibbi', title: 'Tıbbi sorumluluk reddi' },
  { id: 'kabul-edilebilir', title: 'Kabul edilebilir kullanım' },
  { id: 'kullanici-icerigi', title: 'Kullanıcı içeriği' },
  { id: 'fikri-mulkiyet', title: 'Fikri mülkiyet' },
  { id: 'ucuncu-taraf', title: 'Üçüncü taraf hizmetler' },
  { id: 'feragat', title: 'Feragatler' },
  { id: 'sorumluluk', title: 'Sorumluluğun sınırlandırılması' },
  { id: 'tazmin', title: 'Tazmin' },
  { id: 'fesih', title: 'Fesih' },
  { id: 'degisiklikler', title: 'Şartlardaki değişiklikler' },
  { id: 'mahkeme', title: 'Geçerli hukuk & uyuşmazlık çözümü' },
  { id: 'iletisim', title: 'İletişim' },
];

export default function SartlarPage() {
  return (
    <LegalPageLayout
      eyebrow="Yasal · Terms of Use"
      title="Kullanım şartları"
      lastUpdated="4 Mayıs 2026"
      effective="4 Mayıs 2026"
      sections={sections}
      intro={
        <>
          Bu Kullanım Şartları (&quot;Şartlar&quot;), FormAI ekibi (&quot;biz&quot;, &quot;bize&quot;, &quot;bizim&quot;)
          tarafından sağlanan FormAI mobil uygulamasına ve ilgili hizmetlere (topluca &quot;Hizmet&quot;)
          erişiminizi ve bunları kullanımınızı düzenler. Hesap oluşturarak, oturum açarak veya
          Hizmeti başka şekilde kullanarak bu Şartlara bağlı kalmayı kabul edersiniz. Kabul
          etmiyorsanız Hizmeti kullanmayın.
        </>
      }
    >
      <LegalCallout tone="ember">
        <LegalStrong>Sade dilde özet.</LegalStrong> FormAI yapay zekâ destekli bir fitness koçudur.
        Güvenli egzersiz yapmaktan siz sorumlusunuz. Abonelikler, mağazanız üzerinden iptal
        etmediğiniz sürece otomatik olarak yenilenir. Tıbbi bir sağlayıcı değiliz; FormAI
        profesyonel tıbbi tavsiyenin yerine geçmez.
      </LegalCallout>

      <LegalSectionHeader id="uygunluk" number={1}>Uygunluk &amp; kullanıcı hesapları</LegalSectionHeader>

      <LegalSubHeader>1.1 Yaş şartı</LegalSubHeader>
      <LegalP>
        Bir FormAI hesabı oluşturmak için en az <LegalStrong>16 yaşında</LegalStrong> olmalısınız.
        16 ile 18 yaş arasındaysanız, bir ebeveynin veya yasal vasinin bu Şartları incelediğini
        ve Hizmeti kullanmanıza onay verdiğini onaylarsınız.
      </LegalP>

      <LegalSubHeader>1.2 Hesap kaydı</LegalSubHeader>
      <LegalP>
        Hizmet tarafından desteklenen Google Sign-In, Apple Sign-In veya e-posta tabanlı bir
        kimlik sağlayıcısı kullanarak oturum açabilirsiniz. Doğru bilgi sağlamayı, oturum açma
        kimlik bilgilerinizi gizli tutmayı ve herhangi bir yetkisiz erişim durumunda bizi derhâl
        bilgilendirmeyi kabul edersiniz.
      </LegalP>

      <LegalSubHeader>1.3 Kişi başına bir hesap</LegalSubHeader>
      <LegalP>
        Hesaplar kişiseldir ve devredilemez. Hesabınızı paylaşamaz, satamaz veya alt lisanslayamazsınız.
        Bu Şartları ihlal ettiğine veya Hizmeti kötüye kullanmak için kullanıldığına makul olarak
        inandığımız hesapları askıya alabilir veya sonlandırabiliriz.
      </LegalP>

      <LegalSubHeader>1.4 Hesap silme</LegalSubHeader>
      <LegalP>
        Hesabınızı istediğiniz zaman Ayarlar → Hesap → Hesabı Sil bölümünden silebilirsiniz.
        Silme işlemi kalıcıdır; profilinizi, antrenman geçmişinizi, vücut ölçümlerinizi ve
        geri bildirimlerinizi kaldırır. Toplulaştırılmış, kimliksizleştirilmiş analitik veriler,
        ürün iyileştirme amacıyla saklanabilir.
      </LegalP>

      <LegalSectionHeader id="abonelik" number={2}>Abonelikler &amp; otomatik yenileme (RevenueCat)</LegalSectionHeader>

      <LegalSubHeader>2.1 FormAI Pro</LegalSubHeader>
      <LegalP>
        Hizmetin belirli özellikleri (&quot;FormAI Pro&quot;), aylık, üç aylık ve yıllık seçenekler dâhil
        ücretli abonelik planları aracılığıyla sunulur. Her planın fiyatı uygulama içi paywall&apos;da
        görüntülenir ve ilgili uygulama mağazasının desteklediği şekilde yerel para biriminizde
        belirtilir.
      </LegalP>

      <LegalSubHeader>2.2 Mağaza üzerinden faturalama</LegalSubHeader>
      <LegalP>
        Satın almalar Apple App Store (uygulama içi satın alma) veya Google Play Billing
        tarafından işlenir ve abonelik altyapı sağlayıcımız RevenueCat aracılığıyla bizim
        tarafımızdan yönetilir. Ödeme, faturalama ve iade ilişkiniz ilgili uygulama mağazasıyladır
        ve onların şartlarına tabidir.
      </LegalP>

      <LegalSubHeader>2.3 Otomatik yenileme</LegalSubHeader>
      <LegalP>
        Tüm abonelikler, mevcut dönemin bitiminden en az 24 saat önce iptal etmediğiniz sürece,
        her faturalama döneminin sonunda <LegalStrong>o zaman geçerli olan fiyat üzerinden otomatik
        olarak yenilenir</LegalStrong>. Hesabınız, mevcut dönemin bitiminden önceki 24 saat içinde
        yenileme için ücretlendirilir. Aboneliğinizi istediğiniz zaman yönetebilir ve iptal edebilirsiniz:
      </LegalP>
      <LegalUL>
        <LegalLI><LegalStrong>iOS:</LegalStrong> Ayarlar → [adınız] → Abonelikler → FormAI.</LegalLI>
        <LegalLI><LegalStrong>Android:</LegalStrong> Google Play uygulaması → Profil → Ödemeler ve abonelikler → Abonelikler → FormAI.</LegalLI>
      </LegalUL>

      <LegalSubHeader>2.4 Ücretsiz denemeler</LegalSubHeader>
      <LegalP>
        Sunulduğu durumlarda, ücretsiz denemeler, deneme süresinin bitiminden en az 24 saat önce
        iptal edilmedikçe deneme sonunda ücretli aboneliğe dönüşür. Deneme süresi boyunca iptal,
        ücretli plana dönüşümü engeller.
      </LegalP>

      <LegalSubHeader>2.5 İadeler</LegalSubHeader>
      <LegalP>
        İade uygunluğu, Apple veya Google tarafından yayımlanan politikalara göre belirlenir.
        Abonelikler için iadeleri doğrudan biz işlemiyoruz; lütfen ilgili uygulama mağazasıyla
        iletişime geçin. Uygulanabilir hukukun gerektirdiği durumlarda (AB tüketici koruma kuralları
        dâhil) yasal iade hakları geçerlidir.
      </LegalP>

      <LegalSubHeader>2.6 Fiyat değişiklikleri</LegalSubHeader>
      <LegalP>
        Abonelik fiyatlarını değiştirebiliriz. Önemli fiyat değişiklikleri uygulama içinden
        ve/veya e-posta yoluyla önceden iletilir; değişiklik yürürlüğe girmeden önce iptal ederek
        reddedebilirsiniz.
      </LegalP>

      <LegalSectionHeader id="tibbi" number={3}>Tıbbi sorumluluk reddi</LegalSectionHeader>

      <LegalCallout tone="ember">
        <LegalStrong>FormAI bir tıbbi cihaz, sağlık hizmeti sağlayıcısı veya profesyonel tıbbi
        tavsiye, tanı ya da tedavinin yerine geçmez.</LegalStrong> Herhangi bir egzersiz programına
        başlamadan önce, özellikle önceden var olan bir durumunuz varsa, hamileyseniz, yaralanmadan
        iyileşiyorsanız veya reçeteli ilaç kullanıyorsanız, daima nitelikli bir hekime danışın.
      </LegalCallout>

      <LegalSubHeader>3.1 Tıbbi ilişki yoktur</LegalSubHeader>
      <LegalP>
        Hizmet, yapay zekâ modelleri ve içerik kütüphaneleri tarafından üretilen genel fitness,
        beslenme ve sağlık bilgileri sağlar. Hekim-hasta, diyetisyen-danışan veya terapist-danışan
        ilişkisi kurmaz. FormAI aracılığıyla iletilen bilgiler, yalnızca eğitim ve bilgilendirme
        amaçlıdır.
      </LegalP>

      <LegalSubHeader>3.2 Risk üstlenme</LegalSubHeader>
      <LegalP>
        Fiziksel egzersiz; kas zorlanması, eklem yaralanması, kardiyovasküler olaylar ve düşmeler
        dâhil ancak bunlarla sınırlı olmamak üzere yaralanma riski taşır. FormAI&apos;yi kullanarak
        bu riskleri kabul ediyorsunuz ve herhangi bir egzersizin, yoğunluğun veya programın fitness
        seviyenize ve sağlık durumunuza uygun olup olmadığını değerlendirmekten yalnızca sizin
        sorumlu olduğunuzu kabul ediyorsunuz.
      </LegalP>

      <LegalSubHeader>3.3 Dur ve yardım iste</LegalSubHeader>
      <LegalP>
        Egzersiz sırasında herhangi bir zamanda ağrı, baş dönmesi, nefes darlığı, göğüs rahatsızlığı
        veya başka bir endişe verici belirti yaşarsanız, <LegalStrong>derhâl durun ve nitelikli
        tıbbi yardım alın.</LegalStrong>
      </LegalP>

      <LegalSubHeader>3.4 Yapay zekâ üretimi içerik</LegalSubHeader>
      <LegalP>
        Antrenman planları, beslenme önerileri ve pose-detection geri bildirimleri kısmen makine
        öğrenmesi modelleri tarafından üretilir. Bu çıktılar yanlış, eksik veya güncel olmayabilir.
        Onlara göre hareket etmeden önce kendi muhakemenizi uygulayın ve nitelikli bir profesyonele danışın.
      </LegalP>

      <LegalSectionHeader id="kabul-edilebilir" number={4}>Kabul edilebilir kullanım</LegalSectionHeader>
      <LegalP>Şunları yapmamayı kabul edersiniz:</LegalP>
      <LegalUL>
        <LegalLI>Hizmeti hukuka aykırı bir şekilde veya hukuka aykırı bir amaçla kullanmak;</LegalLI>
        <LegalLI>Kaynak kodu, model ağırlıkları veya diğer tescilli bileşenleri tersine mühendislik yapmak, derlemek veya çıkarmaya çalışmak;</LegalLI>
        <LegalLI>Hizmeti veya herhangi bir bölümünü yeniden satmak, kiralamak veya alt lisanslamak;</LegalLI>
        <LegalLI>Açıkça izin verilenler dışında, Hizmete erişmek için otomatik sistemler (botlar, kazıyıcılar) kullanmak;</LegalLI>
        <LegalLI>Hukuka aykırı, hakaret içeren, taciz edici, hak ihlal eden veya başka şekilde sakıncalı içerik yüklemek veya iletmek;</LegalLI>
        <LegalLI>Hizmetin işleyişine müdahale etmek, herhangi bir hesaba veya sisteme yetkisiz erişim sağlamaya çalışmak veya kötü amaçlı kod iletmek.</LegalLI>
      </LegalUL>

      <LegalSectionHeader id="kullanici-icerigi" number={5}>Kullanıcı içeriği</LegalSectionHeader>
      <LegalP>
        Hizmete vücut ölçümleri (kilo, boy, hedefler), antrenman geri bildirimi ve isteğe bağlı
        gelişim takip fotoğrafları gibi bilgileri (&quot;Kullanıcı İçeriği&quot;) gönderebilirsiniz.
        Kullanıcı İçeriğinizin sahibi sizsiniz. Bunu göndererek, yalnızca Hizmeti sizin için
        çalıştırmak, sürdürmek ve iyileştirmek amacıyla bize sınırlı, dünya çapında, telifsiz
        bir lisans verirsiniz.
      </LegalP>
      <LegalP>
        Herhangi bir Kullanıcı İçeriği göndermek için haklara sahip olduğunuzdan ve içeriğin
        herhangi bir üçüncü tarafın haklarını ihlal etmediğinden emin olmaktan sorumlusunuz.
      </LegalP>

      <LegalSectionHeader id="fikri-mulkiyet" number={6}>Fikri mülkiyet</LegalSectionHeader>
      <LegalP>
        Hizmet; yazılımı, tasarımı, yapay zekâ modelleri, metni ve marka varlıkları dâhil olmak
        üzere bize ve lisans verenlerimize aittir ve telif hakkı, ticari marka ve diğer fikri
        mülkiyet yasaları ile korunmaktadır. Hizmeti kişisel, ticari olmayan kullanımınız için,
        bu Şartlara tabi olarak, sınırlı, münhasır olmayan, devredilemeyen, geri alınabilir bir
        lisansla kullanmanız için size izin veriyoruz.
      </LegalP>
      <LegalP>
        &quot;FormAI&quot; ve FormAI logosu bizim ticari markalarımızdır. Önceden yazılı iznimiz
        olmadan kullanamazsınız.
      </LegalP>

      <LegalSectionHeader id="ucuncu-taraf" number={7}>Üçüncü taraf hizmetler</LegalSectionHeader>
      <LegalP>
        Hizmet, aşağıdakiler dâhil ancak bunlarla sınırlı olmamak üzere üçüncü taraf sağlayıcılara
        dayanır: Apple App Store ve Google Play (dağıtım ve faturalama), RevenueCat (abonelik
        yönetimi), Supabase (bulut veritabanı ve kimlik doğrulama), PostHog (anonim ürün analitiği),
        Sentry (çökme ve hata raporlama), Google ML Kit (cihaz içi pose detection). Kullanımınız
        bu hizmetlerin kendi şartlarına tabidir. İşleme ayrıntıları için Gizlilik Politikasına bakın.
      </LegalP>

      <LegalSectionHeader id="feragat" number={8}>Feragatler</LegalSectionHeader>
      <LegalP>
        HİZMET, AÇIK VEYA ZIMNİ HİÇBİR GARANTİ OLMAKSIZIN, SINIRLAMA OLMAKSIZIN TİCARİ ELVERİŞLİLİK,
        BELİRLİ BİR AMACA UYGUNLUK, İHLAL ETMEME, DOĞRULUK GARANTİLERİ VEYA HİZMETİN KESİNTİSİZ YA DA
        HATASIZ OLACAĞINA İLİŞKİN GARANTİLER DÂHİL OLMAK ÜZERE &quot;OLDUĞU GİBİ&quot; VE &quot;MEVCUT OLDUĞU
        ŞEKİLDE&quot; SAĞLANIR. HİZMETİN KULLANIMI YOLUYLA HERHANGİ BİR FİTNESS, BESLENME VEYA SAĞLIK
        SONUCU ELDE EDİLECEĞİNİ GARANTİ ETMİYORUZ.
      </LegalP>

      <LegalSectionHeader id="sorumluluk" number={9}>Sorumluluğun sınırlandırılması</LegalSectionHeader>
      <LegalP>
        UYGULANABİLİR HUKUKUN İZİN VERDİĞİ AZAMİ ÖLÇÜDE, HİÇBİR DURUMDA BİZ, BAĞLI KURULUŞLARIMIZ
        VEYA LİSANS VERENLERİMİZ; KÂR, GELİR, VERİ, İYİ NİYET VEYA DİĞER MADDİ OLMAYAN KAYIPLAR İÇİN
        TAZMİNAT DÂHİL OLMAK ÜZERE HİZMETİ KULLANMANIZDAN — VEYA KULLANAMAMAKTAN — KAYNAKLANAN
        HİZMETİN ÖNERDİĞİ EGZERSİZLERİ YAPARKEN VEYA SONRASINDA UĞRADIĞINIZ FİZİKSEL YARALANMALAR
        DÂHİL OLMAK ÜZERE HERHANGİ BİR DOLAYLI, ARIZİ, ÖZEL, SONUÇSAL VEYA CEZAİ ZARARDAN
        SORUMLU OLMAYACAĞIZ.
      </LegalP>
      <LegalP>
        BU ŞARTLAR VEYA HİZMETLE İLGİLİ HERHANGİ BİR TALEPTEN KAYNAKLANAN TOPLAM SORUMLULUĞUMUZ,
        (A) TALEBE NEDEN OLAN OLAYDAN ÖNCEKİ ON İKİ (12) AY İÇİNDE HİZMET İÇİN BİZE ÖDEDİĞİNİZ
        TUTARLARI VEYA (B) ELLİ EUROYU (€50) AŞMAYACAKTIR; HANGİSİ DAHA BÜYÜKSE.
      </LegalP>
      <LegalP>
        Bazı yargı bölgeleri belirli zararların hariç tutulmasına veya sınırlandırılmasına izin
        vermez; bu tür yargı bölgelerinde sorumluluğumuz, hukuk tarafından izin verilen en küçük
        ölçüye sınırlandırılmıştır. Bu Şartlardaki hiçbir şey, uygulanabilir hukuka göre hariç
        tutulamayan sorumluluğu (ağır ihmal, kasıt veya geçerli olduğunda ihmal sonucu ölüm ya da
        kişisel yaralanma sorumluluğu gibi) hariç tutmaz.
      </LegalP>

      <LegalSectionHeader id="tazmin" number={10}>Tazmin</LegalSectionHeader>
      <LegalP>
        (a) Hizmeti bu Şartları ihlal edecek şekilde kullanmanızdan, (b) Kullanıcı İçeriğinizden
        veya (c) herhangi bir hukuk ya da üçüncü taraf hakkı ihlalinizden kaynaklanan veya bunlarla
        ilgili her türlü talep, zarar, sorumluluk, maliyet ve gidere (makul avukat ücretleri dâhil)
        karşı bizi, bağlı kuruluşlarımızı ve personelimizi savunmayı, tazmin etmeyi ve zarardan
        masun tutmayı kabul edersiniz.
      </LegalP>

      <LegalSectionHeader id="fesih" number={11}>Fesih</LegalSectionHeader>
      <LegalP>
        Hizmeti istediğiniz zaman kullanmayı bırakabilirsiniz. Bu Şartları ihlal ederseniz, Hizmetin
        size sağlanmaya devam etmesi makul olarak ticari açıdan mümkün değilse veya hukuken
        gerekiyorsa, erişiminizi geçici veya kalıcı olarak askıya alabilir ya da sonlandırabiliriz.
        Doğası gereği fesihten sağ kalması gereken bölümler (5–9 ve 12–14 bölümleri dâhil) sağ kalır.
      </LegalP>

      <LegalSectionHeader id="degisiklikler" number={12}>Şartlardaki değişiklikler</LegalSectionHeader>
      <LegalP>
        Bu Şartları zaman zaman güncelleyebiliriz. Önemli değişiklikler, yürürlüğe girmeden en az
        14 gün önce Hizmet üzerinden ve uygunsa e-posta veya uygulama içi bildirim yoluyla
        iletilecektir. Değişiklikler yürürlüğe girdikten sonra Hizmeti kullanmaya devam etmeniz,
        revize edilmiş Şartları kabul ettiğiniz anlamına gelir.
      </LegalP>

      <LegalSectionHeader id="mahkeme" number={13}>Geçerli hukuk &amp; uyuşmazlık çözümü</LegalSectionHeader>
      <LegalP>
        Bu Şartlar, kanunlar ihtilafı kurallarına bakılmaksızın <LegalStrong>Türkiye Cumhuriyeti
        kanunlarına</LegalStrong> tabidir. Bu Şartlardan kaynaklanan veya bunlarla ilgili herhangi
        bir uyuşmazlık için <LegalStrong>İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri
        münhasır yetkilidir;</LegalStrong> ikamet ettiğiniz ülkenin zorunlu tüketici koruma
        yasaları aksini öngörmedikçe.
      </LegalP>

      <LegalSectionHeader id="iletisim" number={14}>İletişim</LegalSectionHeader>
      <LegalP>
        Bu Şartlarla ilgili sorularınız mı var? Bize{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-300 underline-offset-4 hover:underline">{SUPPORT_EMAIL}</a>{' '}
        adresinden ulaşın.
      </LegalP>

      <div className="mt-16 border-t border-white/[0.06] pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} FormAI. Tüm hakları saklıdır.
      </div>
    </LegalPageLayout>
  );
}

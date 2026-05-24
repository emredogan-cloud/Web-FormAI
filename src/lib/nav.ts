export const primaryNav = [
  { label: 'Antrenman', href: '/antrenman', mono: '01' },
  { label: 'Beslenme', href: '/beslenme', mono: '02' },
  { label: 'Gelişim', href: '/gelisim', mono: '03' },
  { label: 'Destek', href: '/destek', mono: '04' },
] as const;

export const footerNav = {
  Ürün: [
    { label: 'Antrenman', href: '/antrenman' },
    { label: 'Beslenme', href: '/beslenme' },
    { label: 'Gelişim', href: '/gelisim' },
    { label: 'Erken erişim', href: '/baslat#waitlist' },
  ],
  Şirket: [
    { label: 'Hakkımızda', href: '/#manifesto' },
    { label: 'Manifesto', href: '/#manifesto' },
    { label: 'Basın & Medya', href: '/press' },
    { label: 'İletişim', href: '/destek#iletisim' },
  ],
  Kaynaklar: [
    { label: 'Destek merkezi', href: '/destek' },
    { label: 'SSS', href: '/destek#sss' },
    { label: 'Güvenlik', href: '/destek#guvenlik' },
  ],
  Yasal: [
    { label: 'Gizlilik politikası', href: '/gizlilik' },
    { label: 'Kullanım şartları', href: '/sartlar' },
    { label: 'KVKK aydınlatma metni', href: '/kvkk' },
  ],
} as const;

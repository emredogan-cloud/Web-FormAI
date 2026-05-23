import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlowOrb } from '@/components/ui/GlowOrb';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <GlowOrb tone="violet" size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-30" />
      <Container className="relative text-center">
        <Eyebrow>404 · Sayfa bulunamadı</Eyebrow>
        <h1 className="mt-6 font-display text-display-xl text-gradient">
          Bu rotayı henüz programa eklemedik.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-white/60">
          Adres yanlış yazılmış olabilir ya da link eskimiş olabilir. Seni programın başına götürelim.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/" variant="primary" arrow>Ana sayfa</Button>
          <Button href="/destek" variant="secondary">Destek al</Button>
        </div>
      </Container>
    </section>
  );
}

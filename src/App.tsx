import React from 'react';
import { siteContent } from './content.ts';
import { MotionProvider } from './components/ui/MotionContext';
import { PosteScroll } from './components/ui/PosteScroll';
import { HeaderSection } from './sections/HeaderSection';
import { HeroSection } from './sections/HeroSection';
import { ServicosSection } from './sections/ServicosSection';
import { EquipeSection } from './sections/EquipeSection';
import { TrabalhosSection } from './sections/TrabalhosSection';
import { AgendarSection } from './sections/AgendarSection';
import { VisiteSection } from './sections/VisiteSection';
import { FaqSection } from './sections/FaqSection';
import { RodapeSection } from './sections/RodapeSection';

export default function App() {
  return (
    <MotionProvider>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 px-4 py-2 text-xs font-bold uppercase transition-all"
        style={{
          borderRadius: 'var(--tema-radius)',
          borderWidth: 'var(--tema-border-width)',
          borderStyle: 'solid',
          borderColor: 'var(--tema-color-accent)',
          backgroundColor: 'var(--tema-color-accent)',
          color: 'var(--tema-color-on-accent)',
          fontFamily: 'var(--tema-font-label)',
          outline: '2px solid var(--tema-color-accent-ink)',
        }}
      >
        Pular para o conteúdo
      </a>

      {/* Signature Barber Pole Strip (Moves with scroll, static when reduced motion) */}
      <PosteScroll />

      {/* Main layout container with offset for left barber pole on desktop */}
      <div className="min-h-screen flex flex-col md:pl-[7px]">
        {/* 1. Header */}
        <HeaderSection content={siteContent.header} />

        {/* Semantic Main Content Landmark */}
        <main id="conteudo-principal" className="flex-1 w-full">
          {/* 2. Hero */}
          <HeroSection content={siteContent.hero} />

          {/* 3. Serviços */}
          <ServicosSection content={siteContent.servicos} />

          {/* 4. Equipe */}
          <EquipeSection content={siteContent.equipe} />

          {/* 5. Trabalhos */}
          <TrabalhosSection content={siteContent.trabalhos} />

          {/* 6. Agendar */}
          <AgendarSection content={siteContent.agendar} />

          {/* 7. Visite */}
          <VisiteSection content={siteContent.visite} />

          {/* 8. FAQ */}
          <FaqSection content={siteContent.faq} />
        </main>

        {/* 9. Rodapé */}
        <RodapeSection content={siteContent.rodape} />
      </div>
    </MotionProvider>
  );
}

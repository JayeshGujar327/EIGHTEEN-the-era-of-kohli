import { useState, useEffect } from 'react';
import { ThemeMode, ColorMode } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './features/home/HeroSection';
import { ThematicVision } from './features/home/ThematicVision';
import { JourneyHubSection } from './features/journey/JourneyHubSection';
import { StatsLabSection } from './features/stats/StatsLabSection';
import { RecordsVaultSection } from './features/records/RecordsVaultSection';
import { MomentsSection } from './features/moments/MomentsSection';
import { PlayPavilionSection } from './features/play/PlayPavilionSection';
import { LegacySection } from './features/legacy/LegacySection';
import { DeveloperSection } from './features/developer/DeveloperSection';
import { soundFx } from './utils/audioEngine';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isKingMode, setIsKingMode] = useState<boolean>(false);
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kohli-color-mode');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Sync color mode class with HTML element and LocalStorage
  useEffect(() => {
    if (colorMode === 'light') {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('kohli-color-mode', colorMode);
  }, [colorMode]);

  const handleColorModeToggle = () => {
    soundFx.playClick();
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTriggerKingMode = () => {
    soundFx.playLegendary();
    setIsKingMode(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#E11D48', '#F59E0B', '#06B6D4', '#FFFFFF'],
    });
  };

  // Keyboard shortcut listener for easter egg: Type '18'
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input / textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      keyBuffer += e.key;
      if (keyBuffer.length > 2) {
        keyBuffer = keyBuffer.slice(-2);
      }
      if (keyBuffer === '18') {
        handleTriggerKingMode();
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll spy to update active section in navbar
  useEffect(() => {
    const sectionIds = [
      'hero',
      'journey',
      'stats',
      'records',
      'moments',
      'play',
      'legacy',
      'developer',
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: '-80px 0px -40% 0px',
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen selection:bg-[#E11D48] selection:text-white relative transition-colors duration-300 ${
        colorMode === 'light'
          ? 'bg-[#F8FAFC] text-[#0F172A] light-mode'
          : 'bg-[#08090C] text-[#F3F4F6]'
      } ${isKingMode ? 'ring-2 ring-amber-500/50' : ''}`}
    >
      {/* Global Navbar */}
      <Navbar
        activeTheme={activeTheme}
        onThemeChange={(t) => setActiveTheme(t)}
        activeSection={activeSection}
        colorMode={colorMode}
        onColorModeToggle={handleColorModeToggle}
        onTriggerKingMode={handleTriggerKingMode}
      />

      {/* Main Experience Flow */}
      <main>
        {/* 1. Documentary Opening Scene */}
        <HeroSection
          activeTheme={activeTheme}
          onThemeChange={(t) => setActiveTheme(t)}
        />

        {/* 2. Thematic Mode Selector (Aggression / Discipline / Legacy) */}
        <ThematicVision
          activeTheme={activeTheme}
          onThemeChange={(t) => setActiveTheme(t)}
        />

        {/* 3. The Journey & Evolution Hub */}
        <JourneyHubSection activeTheme={activeTheme} />

        {/* 4. The Stats Lab & Legend Comparison */}
        <StatsLabSection activeTheme={activeTheme} />

        {/* 5. The Records Vault & 85 Tons Hall */}
        <RecordsVaultSection activeTheme={activeTheme} />

        {/* 6. Cinematic Moments & Where Were You Archive */}
        <MomentsSection activeTheme={activeTheme} />

        {/* 7. The Play Pavilion & Interactive Games */}
        <PlayPavilionSection activeTheme={activeTheme} />

        {/* 8. The Legacy, Fan Card, AI Assistant & Cultural Impact */}
        <LegacySection
          activeTheme={activeTheme}
          isKingMode={isKingMode}
          onTriggerKingMode={handleTriggerKingMode}
        />

        {/* 9. Developer / About the Creator Section */}
        <DeveloperSection activeTheme={activeTheme} />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

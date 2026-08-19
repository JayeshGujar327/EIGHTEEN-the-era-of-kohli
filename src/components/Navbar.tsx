import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Flame, Shield, Award, Sparkles, Sun, Moon } from 'lucide-react';
import { ThemeMode, ColorMode } from '../types';
import { soundFx } from '../utils/audioEngine';

interface NavbarProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  activeSection: string;
  colorMode: ColorMode;
  onColorModeToggle: () => void;
  onTriggerKingMode?: () => void;
}

export function Navbar({
  activeTheme,
  onThemeChange,
  activeSection,
  colorMode,
  onColorModeToggle,
  onTriggerKingMode,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundFx.playBatCrack();
    }
  };

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'JOURNEY', href: '#journey' },
    { name: 'STATS', href: '#stats' },
    { name: 'RECORDS', href: '#records' },
    { name: 'MOMENTS', href: '#moments' },
    { name: 'PLAY', href: '#play' },
    { name: 'LEGACY', href: '#legacy' },
    { name: 'CREATOR', href: '#developer' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#08090C]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with King Mode on Double Click */}
        <a
          id="nav-brand-logo"
          href="#hero"
          onClick={() => soundFx.playClick()}
          onDoubleClick={() => onTriggerKingMode && onTriggerKingMode()}
          title="Double click for King Mode 👑"
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-red-800 to-black border border-rose-500/40 group-hover:border-amber-400 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="font-heading text-xl text-white font-bold tracking-wider">18</span>
            <div className="absolute -inset-0.5 rounded-xl bg-rose-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm sm:text-base tracking-[0.2em] text-white group-hover:text-amber-400 transition-colors uppercase">
              The Era of Kohli
            </span>
            <span className="text-[10px] tracking-[0.25em] text-neutral-400 font-mono-num uppercase">
              EIGHTEEN • 2008—FOREVER
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 py-1.5 text-xs font-semibold tracking-[0.15em] transition-all rounded-lg focus:outline-none ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-rose-500 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Themes & Audio */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Lens Switcher */}
          <div className="hidden sm:flex items-center bg-black/60 border border-white/10 rounded-full p-0.5 backdrop-blur-sm">
            <button
              id="theme-btn-all"
              title="All Perspectives"
              onClick={() => {
                soundFx.playClick();
                onThemeChange('all');
              }}
              className={`p-1.5 rounded-full text-xs font-medium transition-all ${
                activeTheme === 'all'
                  ? 'bg-neutral-800 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-btn-aggression"
              title="Aggression Lens"
              onClick={() => {
                soundFx.playClick();
                onThemeChange('aggression');
              }}
              className={`p-1.5 rounded-full text-xs font-medium transition-all ${
                activeTheme === 'aggression'
                  ? 'bg-rose-600 text-white shadow-rose-900/50 shadow'
                  : 'text-neutral-400 hover:text-rose-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-btn-discipline"
              title="Discipline Lens"
              onClick={() => {
                soundFx.playClick();
                onThemeChange('discipline');
              }}
              className={`p-1.5 rounded-full text-xs font-medium transition-all ${
                activeTheme === 'discipline'
                  ? 'bg-cyan-600 text-white shadow-cyan-900/50 shadow'
                  : 'text-neutral-400 hover:text-cyan-400'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-btn-legacy"
              title="Legacy Lens"
              onClick={() => {
                soundFx.playClick();
                onThemeChange('legacy');
              }}
              className={`p-1.5 rounded-full text-xs font-medium transition-all ${
                activeTheme === 'legacy'
                  ? 'bg-amber-600 text-white shadow-amber-900/50 shadow'
                  : 'text-neutral-400 hover:text-amber-400'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dark / Lite Mode Toggle */}
          <button
            id="color-mode-toggle-button"
            onClick={onColorModeToggle}
            aria-label={colorMode === 'dark' ? 'Switch to Lite Mode' : 'Switch to Dark Mode'}
            title={colorMode === 'dark' ? 'Switch to Lite Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-full border border-white/10 hover:border-amber-500/50 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-amber-400 transition-all focus:outline-none flex items-center justify-center cursor-pointer"
          >
            {colorMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
          </button>

          {/* Sound Atmospheric Control */}
          <button
            id="sound-toggle-button"
            onClick={handleSoundToggle}
            aria-label={isMuted ? 'Unmute atmospheric audio' : 'Mute atmospheric audio'}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            className={`p-2 rounded-full border transition-all focus:outline-none cursor-pointer ${
              !isMuted
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500/30'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {!isMuted ? (
              <Volume2 className="w-4 h-4 animate-pulse text-rose-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              soundFx.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#08090C]/98 border-b border-white/10 px-6 py-6 transition-all animate-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col gap-3">
            {/* Mobile Color Mode Switcher */}
            <div className="flex items-center justify-between py-2 border-b border-white/10 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Visual Mode:
              </span>
              <button
                id="mobile-color-mode-btn"
                onClick={() => {
                  onColorModeToggle();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white tracking-wider font-mono"
              >
                {colorMode === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> LITE MODE
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-cyan-400" /> DARK MODE
                  </>
                )}
              </button>
            </div>

            <div className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono-num pb-1 border-b border-white/5">
              DOCUMENTARY CHAPTERS
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                id={`mobile-nav-${link.name.toLowerCase()}`}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2.5 px-3 text-sm font-semibold tracking-wider text-neutral-200 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Theme Filter */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block mb-2">
                Perspective Lens:
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  id="mobile-theme-all"
                  onClick={() => {
                    onThemeChange('all');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 text-xs font-semibold rounded ${
                    activeTheme === 'all' ? 'bg-neutral-700 text-white' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  All
                </button>
                <button
                  id="mobile-theme-aggression"
                  onClick={() => {
                    onThemeChange('aggression');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 text-xs font-semibold rounded ${
                    activeTheme === 'aggression' ? 'bg-rose-600 text-white' : 'bg-white/5 text-rose-400'
                  }`}
                >
                  Aggression
                </button>
                <button
                  id="mobile-theme-discipline"
                  onClick={() => {
                    onThemeChange('discipline');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 text-xs font-semibold rounded ${
                    activeTheme === 'discipline' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-cyan-400'
                  }`}
                >
                  Discipline
                </button>
                <button
                  id="mobile-theme-legacy"
                  onClick={() => {
                    onThemeChange('legacy');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 text-xs font-semibold rounded ${
                    activeTheme === 'legacy' ? 'bg-amber-600 text-white' : 'bg-white/5 text-amber-400'
                  }`}
                >
                  Legacy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

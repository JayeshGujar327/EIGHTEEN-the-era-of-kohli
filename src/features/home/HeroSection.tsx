import { useEffect, useState } from 'react';
import { Volume2, ChevronDown, Flame, Shield, Award, Sparkles } from 'lucide-react';
import { ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';
import { ASSET_IMAGES } from '../../assets/images';

interface HeroSectionProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function HeroSection({ activeTheme, onThemeChange }: HeroSectionProps) {
  const [hasEnteredSound, setHasEnteredSound] = useState(false);

  useEffect(() => {
    // Check initial sound state
    setHasEnteredSound(!soundFx.getMuted());
  }, []);

  const handleStartAtmosphere = () => {
    soundFx.playBatCrack();
    setTimeout(() => soundFx.playCrowdRoar(), 300);
    setHasEnteredSound(true);
  };

  const getThemeAtmosphere = () => {
    switch (activeTheme) {
      case 'aggression':
        return {
          glow: 'from-rose-600/30 via-red-950/20 to-transparent',
          accentText: 'text-rose-500',
          border: 'border-rose-500/30',
          badgeText: 'AGGRESSION LENS ACTIVE',
          highlightQuote: '"I thrive in the battle. The louder the crowd roars against us, the sharper my blade becomes."',
        };
      case 'discipline':
        return {
          glow: 'from-cyan-600/30 via-blue-950/20 to-transparent',
          accentText: 'text-cyan-400',
          border: 'border-cyan-500/30',
          badgeText: 'DISCIPLINE LENS ACTIVE',
          highlightQuote: '"When you conquer your routine every single morning at 5 AM, pressure on the pitch ceases to exist."',
        };
      case 'legacy':
        return {
          glow: 'from-amber-600/30 via-yellow-950/20 to-transparent',
          accentText: 'text-amber-400',
          border: 'border-amber-500/30',
          badgeText: 'LEGACY LENS ACTIVE',
          highlightQuote: '"Numbers will eventually be broken. But the spirit and the standard you leave behind are eternal."',
        };
      default:
        return {
          glow: 'from-rose-950/30 via-slate-900/20 to-transparent',
          accentText: 'text-rose-400',
          border: 'border-white/10',
          badgeText: 'THE COMPLETE CHRONICLE',
          highlightQuote: '"You are not merely reading a story. You are witnessing an era that redefined world cricket."',
        };
    }
  };

  const atmosphere = getThemeAtmosphere();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-[#08090C]"
    >
      {/* Cinematic Ambient Background Lighting */}
      <div className={`absolute inset-0 bg-gradient-radial ${atmosphere.glow} pointer-events-none transition-all duration-1000`} />
      
      {/* Background Subtle Grid & Film Grain */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

      {/* Giant 18 Watermark in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-heading text-[28vw] md:text-[32vw] font-black text-stroke-18 opacity-20 leading-none tracking-tighter block">
          18
        </span>
      </div>

      {/* Hero Content Container with Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center my-auto">
          {/* Left Column: Typography & Story Hook */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow / Foundation Tag */}
            <div className="flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[11px] font-mono-num font-bold tracking-[0.25em] text-neutral-300 uppercase">
                  {atmosphere.badgeText}
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>•</span>
                <span className="tracking-widest uppercase">JERSEY NO. 18 • THE DIGITAL TRIBUTE</span>
              </div>
            </div>

            {/* Main Documentary Title */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-[0.9] drop-shadow-2xl">
                THE ERA OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                  KOHLI
                </span>
              </h1>

              <div className="pt-2 sm:pt-3 flex items-center gap-4">
                <div className="h-0.5 w-12 sm:w-16 bg-rose-500" />
                <p className="font-editorial text-base sm:text-xl md:text-2xl text-neutral-300 tracking-wide font-light">
                  The Legacy We Witnessed
                </p>
              </div>
            </div>

            {/* Narrative Core & Quote */}
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                From the streets of West Delhi to 85 international centuries, 54 ODI hundreds, 28,350+ international runs, and the resurrection of Indian fast bowling. This is not just a biography — it is the digital archive of the most intense, disciplined, and transformative era in modern sporting history.
              </p>

              <div className="border-l-2 border-rose-500/60 pl-4 py-1 italic text-xs sm:text-sm text-neutral-400">
                {atmosphere.highlightQuote}
              </div>
            </div>

            {/* Action Controls & Sound Trigger */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                id="hero-explore-era-btn"
                href="#journey"
                onClick={() => soundFx.playClick()}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-neutral-200 transition-all shadow-xl hover:scale-[1.02] focus:outline-none"
              >
                EXPLORE THE ERA
              </a>

              <a
                id="hero-play-interactive-btn"
                href="#play"
                onClick={() => soundFx.playClick()}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-white/10 transition-all focus:outline-none flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                PLAY
              </a>

              {!hasEnteredSound && (
                <button
                  id="hero-sound-atmosphere-btn"
                  onClick={handleStartAtmosphere}
                  className="px-4 py-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 font-semibold text-xs tracking-wider uppercase hover:bg-rose-900/40 transition-all flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4 text-rose-400 animate-bounce" />
                  <span>STADIUM AUDIO</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual Portrait Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group">
              <img
                src={ASSET_IMAGES.hero}
                alt="Virat Kohli in full intensity"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] sm:aspect-[16/11] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Overlay Text on Visual */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 block font-bold">
                    THE ARCHETYPE OF PASSION
                  </span>
                  <span className="font-display font-black text-sm sm:text-base text-white">
                    VIRAT KOHLI • NO. 18
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-heading text-xl font-black text-amber-400 block">
                    85 TONS
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase">
                    ALL-TIME SUMMIT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Career Monument Key Tickers */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <div className="flex flex-col">
            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              28,359
            </span>
            <span className="text-[11px] font-mono-num tracking-wider text-neutral-400 uppercase">
              International Runs (52.71 Avg)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-rose-400 tracking-tight">
              85
            </span>
            <span className="text-[11px] font-mono-num tracking-wider text-neutral-400 uppercase">
              International Centuries
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 tracking-tight">
              54
            </span>
            <span className="text-[11px] font-mono-num tracking-wider text-neutral-400 uppercase">
              ODI Tons (World Record)
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-cyan-400 tracking-tight">
              5 YEARS
            </span>
            <span className="text-[11px] font-mono-num tracking-wider text-neutral-400 uppercase">
              ICC Test Mace Supremacy
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <a
            href="#journey"
            onClick={() => soundFx.playClick()}
            aria-label="Scroll to journey"
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors"
          >
            <span className="text-[10px] uppercase font-mono tracking-[0.25em]">Scroll to Enter</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-rose-500" />
          </a>
        </div>
      </div>
    </section>
  );
}

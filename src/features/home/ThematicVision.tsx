import { Flame, Shield, Award, Sparkles } from 'lucide-react';
import { ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface ThematicVisionProps {
  activeTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function ThematicVision({ activeTheme, onThemeChange }: ThematicVisionProps) {
  const pillars = [
    {
      id: 'aggression' as ThemeMode,
      icon: Flame,
      title: 'AGGRESSION',
      subtitle: 'The Fire Within',
      accent: 'border-rose-500 text-rose-400 bg-rose-950/20',
      activeBg: 'bg-gradient-to-b from-rose-900/40 via-red-950/20 to-black border-rose-500 shadow-rose-950/60 shadow-2xl',
      description:
        'Taking on Mitchell Johnson, James Anderson, and Australia on their own soil. Redefining Indian cricket from docile gentlemen to fierce predators.',
      moment: 'Adelaide 2014 & Lord’s 60 Overs of Hell',
      quote: '"If you give it, you must be ready to take it back twice as hard."',
    },
    {
      id: 'discipline' as ThemeMode,
      icon: Shield,
      title: 'DISCIPLINE',
      subtitle: 'The Monastic Code',
      accent: 'border-cyan-500 text-cyan-400 bg-cyan-950/20',
      activeBg: 'bg-gradient-to-b from-cyan-900/40 via-blue-950/20 to-black border-cyan-500 shadow-cyan-950/60 shadow-2xl',
      description:
        'The Yo-Yo test revolution, giving up butter chicken and gluten, 5 AM training drills, and turning the 1-2 runs between wickets into an art form.',
      moment: 'The 2015 Fitness Transformation & 973-Run Season',
      quote: '"Discipline is doing what you hate to do, but doing it like you love it."',
    },
    {
      id: 'legacy' as ThemeMode,
      icon: Award,
      title: 'LEGACY',
      subtitle: 'The Immortal Mark',
      accent: 'border-amber-500 text-amber-400 bg-amber-950/20',
      activeBg: 'bg-gradient-to-b from-amber-900/40 via-yellow-950/20 to-black border-amber-500 shadow-amber-950/60 shadow-2xl',
      description:
        '54 ODI centuries, 85 international tons, the Melbourne miracle, bowing to Sachin Tendulkar, and lifting the 2024 T20 World Cup trophy in Barbados.',
      moment: 'Wankhede 50th Ton & 2024 T20 World Cup Farewell',
      quote: '"What remains after the scoreboard clears is how many people you inspired."',
    },
  ];

  const handlePillarClick = (theme: ThemeMode) => {
    soundFx.playBatCrack();
    onThemeChange(theme);
  };

  return (
    <section id="thematic-vision" className="py-20 bg-[#08090C] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            THE THREE PILLARS OF 18
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            THE ANATOMY OF AN ERA
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            Virat Kohli’s career was forged by three distinct forces. Click any pillar to filter the documentary narrative through that specific perspective.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activeTheme === pillar.id;

            return (
              <div
                key={pillar.id}
                id={`pillar-card-${pillar.id}`}
                onClick={() => handlePillarClick(pillar.id)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 transition-all duration-500 border relative group overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? pillar.activeBg
                    : 'bg-[#0F1117] border-white/10 hover:border-white/20 hover:scale-[1.01]'
                }`}
              >
                {/* Number Watermark */}
                <div className="absolute -right-4 -bottom-6 font-heading text-8xl font-black text-white/[0.03] select-none pointer-events-none">
                  {pillar.title.substring(0, 3)}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl border ${pillar.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                      {isSelected ? 'CURRENT PERSPECTIVE' : 'CLICK TO FILTER'}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white tracking-wide uppercase mb-1">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-4">
                    {pillar.subtitle}
                  </span>

                  <p className="text-sm text-neutral-300 leading-relaxed font-light mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-neutral-400">
                    <span className="text-[10px] uppercase font-mono text-neutral-500 block">Defining Stage</span>
                    <span className="text-white font-medium">{pillar.moment}</span>
                  </div>

                  <p className="text-xs italic text-neutral-400 border-l-2 border-white/20 pl-3">
                    {pillar.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset / All Perspective Button */}
        {activeTheme !== 'all' && (
          <div className="mt-8 text-center">
            <button
              id="reset-theme-filter-btn"
              onClick={() => {
                soundFx.playClick();
                onThemeChange('all');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase hover:bg-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              VIEW COMPLETE STORYTELLING (RESET FILTER)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

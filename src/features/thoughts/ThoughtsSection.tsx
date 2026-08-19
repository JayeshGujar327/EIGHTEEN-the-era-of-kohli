import { useState } from 'react';
import { Quote, Sparkles, MessageSquare, Flame, Shield, Award, Volume2 } from 'lucide-react';
import { AUTHENTIC_QUOTES } from '../../data/kohliData';
import { QuoteItem, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface ThoughtsSectionProps {
  activeTheme: ThemeMode;
}

export function ThoughtsSection({ activeTheme }: ThoughtsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { label: 'ALL QUOTES', id: 'ALL' },
    { label: 'VIRAT MINDSET', id: 'mindset' },
    { label: 'LEGEND VERDICTS', id: 'legend_verdict' },
    { label: 'RIVAL RESPECT', id: 'rival_praise' },
    { label: 'LEADERSHIP ETHOS', id: 'leadership' },
  ];

  const filteredQuotes = AUTHENTIC_QUOTES.filter((q) => {
    if (activeTheme !== 'all' && q.theme !== activeTheme) return false;
    if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
    return true;
  });

  const handleAudioQuote = () => {
    soundFx.playBatCrack();
  };

  return (
    <section id="mindset" className="py-24 bg-[#08090C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" />
              THE MINDSET SANCTUARY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              THOUGHTS & PHILOSOPHY
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Authentic statements on relentless work ethic, overcoming self-doubt, staring down hostility, and the ultimate purpose of competitive sport.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`quote-filter-${cat.id.toLowerCase()}`}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Large Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredQuotes.map((q) => {
            const isKohli = q.author.includes('Virat Kohli');

            return (
              <div
                key={q.id}
                id={`quote-card-${q.id}`}
                className="bg-[#0F1117] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-rose-500/40 transition-all duration-300 relative overflow-hidden group shadow-xl"
              >
                {/* Subtle Quote Symbol Watermark */}
                <div className="absolute right-6 bottom-4 text-white/[0.03] select-none pointer-events-none">
                  <Quote className="w-28 h-28" />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Top Quote Tag */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[10px] font-mono uppercase font-bold tracking-wider rounded bg-white/5 text-neutral-400 border border-white/10">
                      {q.category.replace('_', ' ')} • {q.year}
                    </span>
                    <button
                      onClick={handleAudioQuote}
                      title="Audio effect"
                      className="p-1.5 rounded-full text-neutral-500 hover:text-rose-400 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* The Quote */}
                  <p className="font-editorial text-lg sm:text-xl text-neutral-100 italic leading-relaxed">
                    "{q.quote}"
                  </p>
                </div>

                {/* Author & Context */}
                <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-black text-sm text-white ${
                      isKohli
                        ? 'bg-rose-600 border border-rose-400 shadow-md shadow-rose-900/50'
                        : 'bg-neutral-800 border border-neutral-700'
                    }`}
                  >
                    {q.avatarInitials}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      {q.author}
                    </h3>
                    <p className="text-xs text-rose-400 font-mono">
                      {q.authorRole}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      {q.context}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

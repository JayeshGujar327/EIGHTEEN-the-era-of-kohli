import { useState } from 'react';
import { Trophy, Award, Sparkles, CheckCircle2, Flame, Shield, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { IMMORTAL_RECORDS } from '../../data/kohliData';
import { RecordItem, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface RecordsSectionProps {
  activeTheme: ThemeMode;
}

export function RecordsSection({ activeTheme }: RecordsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'World Record', 'All-Time', 'Unbeaten', 'Era Defining'];

  const filteredRecords = IMMORTAL_RECORDS.filter((rec) => {
    if (activeTheme !== 'all' && rec.theme !== activeTheme) return false;
    if (selectedCategory !== 'ALL' && rec.category !== selectedCategory) return false;
    return true;
  });

  const handleCelebrate = (record: RecordItem) => {
    soundFx.playCelebrationChime();
    setTimeout(() => soundFx.playCrowdRoar(), 200);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#06B6D4', '#FFFFFF'],
    });
  };

  return (
    <section id="records" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              THE HALL OF IMMORTALITY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              HISTORIC RECORDS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              World records, milestones in the fastest time, and benchmarks etched permanently into cricket folklore. Click Celebrate on any record to trigger stadium acclaim!
            </p>
          </div>

          {/* Celebrate All Button */}
          <button
            id="celebrate-all-records-btn"
            onClick={() => {
              soundFx.playCelebrationChime();
              soundFx.playCrowdRoar();
              confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#E11D48', '#F59E0B', '#FFFFFF'],
              });
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            CELEBRATE 85 CENTURIES
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`record-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              id={`record-card-${rec.id}`}
              className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl group relative overflow-hidden"
            >
              {/* Card Watermark */}
              <div className="absolute -right-2 -bottom-4 font-heading text-8xl font-black text-white/[0.02] select-none pointer-events-none">
                18
              </div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                    {rec.badge}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {rec.dateOrEra}
                  </span>
                </div>

                {/* Big Number */}
                <div className="font-heading text-5xl sm:text-6xl font-black text-white group-hover:text-amber-400 transition-colors mb-2 tracking-tight">
                  {rec.number}
                </div>

                {/* Record Title & Description */}
                <h3 className="font-display font-bold text-base text-white mb-2 leading-snug">
                  {rec.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-4">
                  {rec.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-[11px] text-neutral-400 flex items-start gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec.verifiedFact}</span>
                </div>

                <button
                  id={`celebrate-btn-${rec.id}`}
                  onClick={() => handleCelebrate(rec)}
                  className="w-full py-2 rounded-lg bg-white/5 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 border border-white/10 hover:border-amber-500/30 text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  SALUTE RECORD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

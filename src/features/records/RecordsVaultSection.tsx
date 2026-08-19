import { useState } from 'react';
import {
  Award,
  Crown,
  Sparkles,
  Flame,
  Shield,
  CheckCircle2,
  ExternalLink,
  X,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IMMORTAL_RECORDS } from '../../data/kohliData';
import { RecordItem, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface RecordsVaultSectionProps {
  activeTheme: ThemeMode;
}

export function RecordsVaultSection({ activeTheme }: RecordsVaultSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);

  const categories = [
    { id: 'ALL', label: 'ALL RECORDS' },
    { id: 'World Record', label: 'WORLD RECORDS' },
    { id: 'All-Time', label: 'ALL-TIME PEAKS' },
    { id: 'Unbeaten', label: 'UNBEATEN BENCHMARKS' },
    { id: 'Era Defining', label: 'ERA DEFINING' },
  ];

  const filteredRecords =
    selectedCategory === 'ALL'
      ? IMMORTAL_RECORDS
      : IMMORTAL_RECORDS.filter((r) => r.category === selectedCategory);

  const handleCelebrateCenturies = () => {
    soundFx.playLegendary();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#06B6D4', '#FFFFFF'],
    });
  };

  const handleRecordClick = (record: RecordItem) => {
    soundFx.playBatCrack();
    setSelectedRecord(record);
  };

  return (
    <section id="records" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono tracking-[0.2em] text-amber-400 uppercase">
              <Award className="w-3.5 h-3.5" />
              THE HALL OF IMMORTALITY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              THE RECORD VAULT
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Every unbroken milestone, world record, and statistical benchmark forged across 18 years of unwavering excellence.
            </p>
          </div>

          {/* Celebrate 85 Centuries Action */}
          <button
            id="celebrate-85-centuries-btn"
            onClick={handleCelebrateCenturies}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-600 to-red-600 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Crown className="w-4 h-4 text-amber-200" />
            CELEBRATE 85 CENTURIES
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`record-cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-950/40'
                  : 'bg-[#12151D] border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              id={`record-card-${record.id}`}
              onClick={() => handleRecordClick(record)}
              className="bg-[#0E1017] border border-white/10 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-amber-400 font-bold">
                    {record.badge}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {record.dateOrEra}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="font-heading font-black text-3xl sm:text-4xl text-white group-hover:text-amber-400 transition-colors">
                    {record.number}
                  </div>
                  <h4 className="font-display font-bold text-base text-neutral-200">
                    {record.title}
                  </h4>
                </div>

                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {record.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-amber-400/90 text-[11px] truncate max-w-[200px]">
                  {record.verifiedFact}
                </span>
                <span className="group-hover:translate-x-1 transition-transform text-white font-bold">
                  Details →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0F1117] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative space-y-6">
            <button
              id="record-modal-close"
              onClick={() => setSelectedRecord(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                {selectedRecord.category} • {selectedRecord.badge}
              </span>
              <div className="font-heading font-black text-4xl sm:text-5xl text-amber-400">
                {selectedRecord.number}
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                {selectedRecord.title}
              </h3>
            </div>

            <div className="space-y-3 bg-black/50 border border-white/10 rounded-2xl p-5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                HISTORICAL CONTEXT & NARRATIVE
              </span>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {selectedRecord.context}
              </p>
            </div>

            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Official Verified Fact: {selectedRecord.verifiedFact}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  soundFx.playCheer();
                  confetti({ particleCount: 50, spread: 60 });
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Salute Milestone
              </button>
              <span className="text-[10px] font-mono text-neutral-500">
                VERIFIED AS OF 19 AUGUST 2026
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

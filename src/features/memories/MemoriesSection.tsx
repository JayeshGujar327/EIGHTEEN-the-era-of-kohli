import { useState } from 'react';
import { Trophy, Award, Sparkles, Flame, Eye, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { KOHLI_MEMORIES } from '../../data/kohliData';
import { MemoryItem, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface MemoriesSectionProps {
  activeTheme: ThemeMode;
}

export function MemoriesSection({ activeTheme }: MemoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeMemoryModal, setActiveMemoryModal] = useState<MemoryItem | null>(null);

  const categories = ['ALL', 'Trophy', 'Best Knock', 'Celebration', 'Masterclass'];

  const filteredMemories = KOHLI_MEMORIES.filter((item) => {
    if (activeTheme !== 'all' && item.theme !== activeTheme) return false;
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
    return true;
  });

  const handleOpenMemory = (item: MemoryItem) => {
    soundFx.playBatCrack();
    setActiveMemoryModal(item);
  };

  return (
    <section id="memories" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              THE ICONIC VAULT
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              MEMORIES & TROPHIES
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Relive the immortal world championships, epochal solo centuries, and emotional celebrations etched forever into cricket history.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#12151D] border border-white/10 p-1.5 rounded-2xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`memory-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Memories Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMemories.map((item) => (
            <div
              key={item.id}
              id={`memory-card-${item.id}`}
              onClick={() => handleOpenMemory(item)}
              className="bg-[#0F1117] border border-white/10 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/30" />

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md text-white">
                    {item.year}
                  </span>
                </div>

                {/* Score badge at bottom right of image */}
                <div className="absolute bottom-2 right-3 font-heading text-lg font-black text-white bg-black/80 px-2 py-0.5 rounded border border-white/10">
                  {item.scoreOrDetail}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-amber-400 transition-colors leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mb-3">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    {item.format}
                  </span>
                  <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <Eye className="w-3.5 h-3.5" /> INSPECT
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Inspector Modal */}
      {activeMemoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveMemoryModal(null)}
        >
          <div
            className="bg-[#0F1117] border border-white/20 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-video w-full bg-neutral-900">
              <img
                src={activeMemoryModal.image}
                alt={activeMemoryModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/40" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/30 text-amber-300 border border-amber-500/50 backdrop-blur-md">
                  {activeMemoryModal.category} • {activeMemoryModal.year}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-heading text-2xl sm:text-3xl font-black text-amber-400 block">
                  {activeMemoryModal.scoreOrDetail}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {activeMemoryModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Details */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{activeMemoryModal.venue}</span>
              </div>

              <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
                {activeMemoryModal.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setActiveMemoryModal(null);
                  }}
                  className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { Sparkles, Globe, Dumbbell, Compass, Flame } from 'lucide-react';
import { BRAND_IMPACTS } from '../../data/kohliData';
import { soundFx } from '../../utils/audioEngine';

export function BrandsSection() {
  return (
    <section id="impact" className="py-24 bg-[#08090C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            BEYOND THE BOUNDARY
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            CULTURAL FOOTPRINT & IMPACT
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light">
            How number 18 transformed Indian athlete endorsements, ignited a nationwide fitness culture, and built a global commercial empire.
          </p>
        </div>

        {/* Global Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_IMPACTS.map((item) => (
            <div
              key={item.id}
              id={`impact-card-${item.id}`}
              onClick={() => soundFx.playClick()}
              className="bg-[#0F1117] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group shadow-xl relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
                    {item.sector}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    Est. {item.yearStarted}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl text-white mb-1 group-hover:text-rose-400 transition-colors">
                  {item.brand}
                </h3>
                <p className="text-xs text-rose-400 font-mono mb-4 font-medium">
                  {item.partnershipType}
                </p>

                <p className="text-xs text-neutral-300 leading-relaxed font-light mb-6">
                  {item.impactStory}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="text-[11px] text-neutral-400 italic">
                  "{item.philosophy}"
                </div>
                <div className="text-[11px] font-mono font-semibold text-amber-400 flex items-center gap-1.5 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {item.statOrFact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

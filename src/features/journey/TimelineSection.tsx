import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, MapPin, Trophy, ChevronRight, Activity, Zap } from 'lucide-react';
import { MILESTONES } from '../../data/kohliData';
import { Milestone, CareerFormat, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';
import { MilestoneModal } from '../../components/MilestoneModal';

interface TimelineSectionProps {
  activeTheme: ThemeMode;
}

export function TimelineSection({ activeTheme }: TimelineSectionProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalMilestone, setActiveModalMilestone] = useState<Milestone | null>(null);

  const formats = ['ALL', 'ODI', 'TEST', 'T20I', 'CAPTAINCY'];

  // Filter milestones based on theme, format, and search
  const filteredMilestones = useMemo(() => {
    return MILESTONES.filter((m) => {
      // Theme filter
      if (activeTheme !== 'all' && m.theme !== activeTheme) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'ALL' && m.format !== selectedFormat) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.opponent.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q) ||
          m.year.toString().includes(q) ||
          m.summary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTheme, selectedFormat, searchQuery]);

  const handleMilestoneClick = (milestone: Milestone) => {
    soundFx.playBatCrack();
    setActiveModalMilestone(milestone);
  };

  return (
    <section id="journey" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              THE 18 DEFINING MILESTONES
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              CAREER TIMELINE
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Explore the epochal match moments, masterclass chases, and captaincy milestones that cemented the legend. Click any card for in-depth scorecard data.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              id="timeline-search-input"
              type="text"
              placeholder="Search by opponent, year, shot..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#12151D] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
        </div>

        {/* Format Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mr-2">
            <Filter className="w-3 h-3" /> FORMAT:
          </span>
          {formats.map((fmt) => (
            <button
              key={fmt}
              id={`format-filter-${fmt.toLowerCase()}`}
              onClick={() => {
                soundFx.playClick();
                setSelectedFormat(fmt);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider font-mono transition-all ${
                selectedFormat === fmt
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        {/* Milestones Timeline Grid */}
        {filteredMilestones.length === 0 ? (
          <div className="text-center py-20 bg-[#0F1117] border border-white/5 rounded-2xl">
            <p className="text-neutral-400 text-sm">No milestones found matching your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedFormat('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-rose-400 underline"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMilestones.map((milestone) => {
              const isAggression = milestone.theme === 'aggression';
              const isDiscipline = milestone.theme === 'discipline';
              const isLegacy = milestone.theme === 'legacy';

              return (
                <div
                  key={milestone.id}
                  id={`milestone-card-${milestone.id}`}
                  onClick={() => handleMilestoneClick(milestone)}
                  className="cursor-pointer bg-[#0F1117] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top glowing edge */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      isAggression
                        ? 'bg-rose-500'
                        : isDiscipline
                        ? 'bg-cyan-500'
                        : isLegacy
                        ? 'bg-amber-500'
                        : 'bg-white/20'
                    }`}
                  />

                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-2xl font-black text-white/40 group-hover:text-white transition-colors">
                          {milestone.year}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-mono-num uppercase font-semibold bg-white/5 rounded border border-white/10 text-neutral-300">
                          {milestone.format}
                        </span>
                      </div>

                      {milestone.score && (
                        <span className="font-heading text-xl font-black text-rose-400">
                          {milestone.score}
                        </span>
                      )}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-rose-400 transition-colors leading-snug mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light mb-4 line-clamp-1">
                      {milestone.subtitle}
                    </p>

                    {/* Opponent & Venue */}
                    <div className="space-y-1.5 text-xs text-neutral-400 mb-4 bg-black/40 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span className="text-neutral-300">vs {milestone.opponent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span className="text-neutral-400 truncate">{milestone.venue}</span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                      {milestone.summary}
                    </p>
                  </div>

                  {/* Card Bottom: Highlights & Trigger */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {milestone.statHighlight || milestone.matchResult}
                    </span>

                    <span className="text-[11px] font-semibold text-rose-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      VIEW <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal Component */}
      <MilestoneModal
        milestone={activeModalMilestone}
        onClose={() => setActiveModalMilestone(null)}
      />
    </section>
  );
}

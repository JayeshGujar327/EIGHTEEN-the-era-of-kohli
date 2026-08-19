import { useState } from 'react';
import {
  Calendar,
  Compass,
  Sparkles,
  ChevronRight,
  Trophy,
  Activity,
  Flame,
  Shield,
  Award,
  BookOpen,
  Layers,
  ArrowRight,
  Maximize2,
} from 'lucide-react';
import { ERA_ITEMS, EVOLUTION_STAGES } from '../../data/interactiveData';
import { MILESTONES, STORY_CHAPTERS } from '../../data/kohliData';
import { EraItem, EvolutionStage, Milestone, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';
import { MilestoneModal } from '../../components/MilestoneModal';

interface JourneyHubSectionProps {
  activeTheme: ThemeMode;
}

export function JourneyHubSection({ activeTheme }: JourneyHubSectionProps) {
  const [activeTab, setActiveTab] = useState<'eras' | 'evolution' | 'milestones' | 'chapters'>('eras');
  const [selectedEraYear, setSelectedEraYear] = useState<number>(2016);
  const [selectedEvolutionYear, setSelectedEvolutionYear] = useState<number>(2016);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const currentEra = ERA_ITEMS.find((e) => e.year === selectedEraYear) || ERA_ITEMS[3];
  const currentEvolution =
    EVOLUTION_STAGES.find((ev) => ev.year === selectedEvolutionYear) || EVOLUTION_STAGES[2];

  const handleEraSelect = (year: number) => {
    soundFx.playClick();
    setSelectedEraYear(year);
  };

  const handleEvolutionSelect = (year: number) => {
    soundFx.playClick();
    setSelectedEvolutionYear(year);
  };

  return (
    <section id="journey" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              <Compass className="w-3.5 h-3.5 text-rose-500" />
              THE DIGITAL MUSEUM CHRONICLE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              THE JOURNEY
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Witness the transformation from a fiery 19-year-old Delhi boy into the greatest run-chaser and all-format titan in cricket history.
            </p>
          </div>

          {/* Sub-Section Navigation Tabs */}
          <div className="flex flex-wrap items-center bg-[#12151D] border border-white/10 rounded-xl p-1 gap-1">
            <button
              id="journey-tab-eras"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('eras');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'eras'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              CHOOSE YOUR ERA
            </button>
            <button
              id="journey-tab-evolution"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('evolution');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'evolution'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-300" />
              EVOLUTION
            </button>
            <button
              id="journey-tab-milestones"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('milestones');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'milestones'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-cyan-300" />
              18 MILESTONES
            </button>
            <button
              id="journey-tab-chapters"
              onClick={() => {
                soundFx.playClick();
                setActiveTab('chapters');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'chapters'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-300" />
              9 CHAPTERS
            </button>
          </div>
        </div>

        {/* Tab 1: "Choose Your Era" Interactive Timeline */}
        {activeTab === 'eras' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Year Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
              {ERA_ITEMS.map((era) => (
                <button
                  key={era.year}
                  id={`era-btn-${era.year}`}
                  onClick={() => handleEraSelect(era.year)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedEraYear === era.year
                      ? 'bg-white text-black shadow-xl scale-[1.03]'
                      : 'bg-[#12151D] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{era.year}</span>
                  {selectedEraYear === era.year && (
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Era Spotlight Card */}
            <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Visual Frame */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 group shadow-2xl h-72 sm:h-96">
                <img
                  src={currentEra.image}
                  alt={currentEra.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-amber-400">
                  {currentEra.year} ERA
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">
                    ICONIC MOMENT
                  </span>
                  <p className="font-display font-bold text-white text-sm sm:text-base leading-snug">
                    {currentEra.iconicMoment}
                  </p>
                </div>
              </div>

              {/* Narrative & Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-rose-400 font-bold block">
                    {currentEra.subtitle}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                    {currentEra.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    {currentEra.description}
                  </p>
                </div>

                {/* Achievement & Stat Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      MAJOR ACHIEVEMENT
                    </span>
                    <p className="font-display font-bold text-sm sm:text-base text-amber-300 leading-snug">
                      {currentEra.majorAchievement}
                    </p>
                  </div>

                  <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                      KEY STATISTIC
                    </span>
                    <p className="font-display font-bold text-sm sm:text-base text-cyan-300 leading-snug">
                      {currentEra.keyStatistic}
                    </p>
                  </div>
                </div>

                {/* Scorecard Snapshot */}
                {currentEra.matchScorecard && (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300">
                    <span className="text-neutral-400">SCORECARD CONTEXT:</span>
                    <span className="font-bold text-white">{currentEra.matchScorecard}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: "Evolution of Kohli" Interactive Slider */}
        {activeTab === 'evolution' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Evolution Stage Navigator */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {EVOLUTION_STAGES.map((ev) => (
                <button
                  key={ev.year}
                  id={`evolution-stage-${ev.year}`}
                  onClick={() => handleEvolutionSelect(ev.year)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedEvolutionYear === ev.year
                      ? 'bg-[#151922] border-amber-500 shadow-xl shadow-amber-950/40 scale-[1.02]'
                      : 'bg-[#0E1017] border-white/10 hover:border-white/20 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-amber-400">{ev.year}</span>
                    <span className="text-[10px] font-mono text-neutral-500">Age {ev.age}</span>
                  </div>
                  <p className="font-display font-bold text-xs text-white leading-tight truncate">
                    {ev.phase}
                  </p>
                </button>
              ))}
            </div>

            {/* Evolution Stage Spotlight */}
            <div className="bg-[#0F1117] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                      {currentEvolution.year} • AGE {currentEvolution.age}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      {currentEvolution.phase}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                    {currentEvolution.title}
                  </h3>
                </div>

                <div className="italic text-xs text-neutral-400 max-w-md border-l-2 border-amber-500/60 pl-3 py-1">
                  {currentEvolution.eraQuote}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                    FITNESS & PHYSICAL PROTOCOL
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {currentEvolution.weightFitness}
                  </p>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                    DIET & MINDSET TRANSFORMATION
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {currentEvolution.dietMindset}
                  </p>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block font-bold">
                    ON-FIELD ROLE & METRICS
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {currentEvolution.battingRole}
                  </p>
                  <p className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                    {currentEvolution.keyStatsSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: The 18 Defining Milestones Gallery */}
        {activeTab === 'milestones' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MILESTONES.map((milestone) => (
                <div
                  key={milestone.id}
                  id={`milestone-card-${milestone.id}`}
                  onClick={() => {
                    soundFx.playBatCrack();
                    setSelectedMilestone(milestone);
                  }}
                  className="bg-[#0E1017] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-cyan-300">
                      {milestone.format} • {milestone.year}
                    </div>
                    {milestone.score && (
                      <div className="absolute bottom-3 right-3 font-heading font-black text-2xl text-amber-400">
                        {milestone.score}
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                        vs {milestone.opponent} • {milestone.venue}
                      </span>
                      <h4 className="font-display font-bold text-base text-white group-hover:text-cyan-400 transition-colors">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light line-clamp-2 mt-1">
                        {milestone.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/5">
                      <span className="text-emerald-400 font-semibold">{milestone.matchResult}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                        View Scorecard <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: The 9 Story Chapters */}
        {activeTab === 'chapters' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STORY_CHAPTERS.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-purple-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-2xl font-black text-purple-400">
                        {chapter.numStr}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400">
                        {chapter.period}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">{chapter.title}</h4>
                    <span className="text-[11px] font-mono text-neutral-400 block">
                      {chapter.subtitle}
                    </span>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed pt-2">
                      {chapter.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                      CHAPTER QUOTE
                    </span>
                    <p className="text-xs italic text-neutral-300 font-light mt-1">
                      “{chapter.keyQuote.substring(0, 100)}...”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Milestone Scorecard Modal */}
      {selectedMilestone && (
        <MilestoneModal
          milestone={selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
        />
      )}
    </section>
  );
}

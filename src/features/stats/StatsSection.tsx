import { useState } from 'react';
import { BarChart3, TrendingUp, Target, Award, Flame, Shield, Compass, Calendar, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { CAREER_STATS, CHASE_STATS, LATEST_ODI_MATCH, LATEST_ODI_SERIES, MILESTONE_TRACKERS, DATA_TIMESTAMPS } from '../../data/kohliData';
import { soundFx } from '../../utils/audioEngine';

export function StatsSection() {
  const [selectedFormat, setSelectedFormat] = useState<string>('INTERNATIONAL TOTAL');
  const [statsView, setStatsView] = useState<'formats' | 'chase' | 'milestones'>('formats');

  const currentStat = CAREER_STATS.find((s) => s.format === selectedFormat) || CAREER_STATS[4];

  const getFormatBadgeStyle = (statusType?: string) => {
    switch (statusType) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'retired':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'total':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-white/10 text-neutral-300 border-white/20';
    }
  };

  return (
    <section id="stats" className="py-24 bg-[#08090C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
                <BarChart3 className="w-3.5 h-3.5 text-rose-500" />
                THE MATHEMATICS OF DOMINANCE
              </div>
              <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">
                VERIFIED: {DATA_TIMESTAMPS.updatedOn}
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              STATISTICAL EMPIRE
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              28,359 international runs, 85 centuries, and 54 ODI tons. Complete verified metrics spanning 16+ years of world cricket domination.
            </p>
          </div>

          {/* Toggle between Format Breakdown, Chase Master, & Milestones */}
          <div className="flex flex-wrap items-center bg-[#12151D] border border-white/10 rounded-xl p-1 gap-1">
            <button
              id="stats-view-formats-btn"
              onClick={() => {
                soundFx.playClick();
                setStatsView('formats');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all ${
                statsView === 'formats'
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              FORMAT METRICS
            </button>
            <button
              id="stats-view-chase-btn"
              onClick={() => {
                soundFx.playBatCrack();
                setStatsView('chase');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                statsView === 'chase'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-300" />
              CHASE MASTER
            </button>
            <button
              id="stats-view-milestones-btn"
              onClick={() => {
                soundFx.playClick();
                setStatsView('milestones');
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                statsView === 'milestones'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-300" />
              HORIZONS
            </button>
          </div>
        </div>

        {/* View 1: Career Formats Breakdown */}
        {statsView === 'formats' && (
          <div className="space-y-8">
            {/* Format Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {CAREER_STATS.map((stat) => (
                <button
                  key={stat.format}
                  id={`stat-tab-${stat.format.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedFormat(stat.format);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-2 ${
                    selectedFormat === stat.format
                      ? 'bg-white text-black shadow-xl scale-[1.02]'
                      : 'bg-[#12151D] border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{stat.format}</span>
                  {stat.statusType === 'active' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Active Format Large Dashboard */}
            <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-xl text-white tracking-wider uppercase">
                    {currentStat.format} CAREER
                  </span>
                  {currentStat.statusLabel && (
                    <span
                      className={`px-3 py-1 text-[10px] font-mono font-bold rounded-full border ${getFormatBadgeStyle(
                        currentStat.statusType
                      )}`}
                    >
                      {currentStat.statusLabel}
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-neutral-400">
                  {currentStat.matches} Matches • {currentStat.innings} Innings
                </div>
              </div>

              {/* Background Number 18 */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 font-heading text-[18vw] font-black text-white/[0.02] select-none pointer-events-none">
                {currentStat.format.substring(0, 3)}
              </div>

              {/* Top Hero Stats in active format */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-white/10 relative z-10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">
                    CAREER RUNS
                  </span>
                  <div className="font-heading text-4xl sm:text-6xl font-black text-white tracking-tight">
                    {currentStat.runs.toLocaleString()}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {currentStat.innings} Innings ({currentStat.matches} Matches)
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">
                    BATTING AVERAGE
                  </span>
                  <div className="font-heading text-4xl sm:text-6xl font-black text-rose-400 tracking-tight">
                    {currentStat.average.toFixed(2)}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {currentStat.notOuts} Not Outs
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">
                    CENTURIES (100s)
                  </span>
                  <div className="font-heading text-4xl sm:text-6xl font-black text-amber-400 tracking-tight">
                    {currentStat.hundreds}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    Plus {currentStat.fifties} Half-Centuries
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-neutral-400">
                    STRIKE RATE
                  </span>
                  <div className="font-heading text-4xl sm:text-6xl font-black text-cyan-400 tracking-tight">
                    {currentStat.strikeRate.toFixed(1)}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    HS: {currentStat.highestScore}
                  </span>
                </div>
              </div>

              {/* Secondary Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 relative z-10">
                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                    Boundaries (4s)
                  </span>
                  <span className="font-mono-num text-xl sm:text-2xl font-bold text-white">
                    {currentStat.fours.toLocaleString()}
                  </span>
                </div>

                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                    Maximums (6s)
                  </span>
                  <span className="font-mono-num text-xl sm:text-2xl font-bold text-rose-400">
                    {currentStat.sixes.toLocaleString()}
                  </span>
                </div>

                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                    Highest Score
                  </span>
                  <span className="font-mono-num text-xl sm:text-2xl font-bold text-amber-400">
                    {currentStat.highestScore}
                  </span>
                </div>

                <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                  <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-1">
                    Fielding Catches
                  </span>
                  <span className="font-mono-num text-xl sm:text-2xl font-bold text-cyan-400">
                    {currentStat.catches}
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Match & Series Showcase Card */}
            <div className="bg-gradient-to-br from-[#10131B] via-[#0E1017] to-black border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 block font-bold">
                      ACTIVE FORMAT PERFORMANCE
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      Latest ODI Appearance • Lord’s Cricket Ground
                    </h3>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold self-start md:self-auto">
                  {LATEST_ODI_MATCH.date}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
                {/* Match Score */}
                <div className="bg-black/50 border border-white/5 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    3rd ODI vs England
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-black text-amber-400">
                      74
                    </span>
                    <span className="text-sm font-mono text-neutral-400">
                      off 60 balls
                    </span>
                  </div>
                  <div className="text-xs font-mono text-neutral-300 flex items-center gap-3 pt-1">
                    <span>4 Fours</span>
                    <span>•</span>
                    <span>3 Sixes</span>
                    <span>•</span>
                    <span className="text-cyan-400">SR: 123.33</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 pt-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{LATEST_ODI_MATCH.result}</span>
                  </div>
                </div>

                {/* Series Breakdown */}
                <div className="bg-black/50 border border-white/5 rounded-2xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    {LATEST_ODI_SERIES.seriesName}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-black text-white">
                      144
                    </span>
                    <span className="text-sm font-mono text-neutral-400">
                      Runs (Avg 48.00)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {LATEST_ODI_SERIES.scores.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                      >
                        {s.score}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 pt-2">
                    {LATEST_ODI_SERIES.result}
                  </p>
                </div>

                {/* Verification Notice */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Verified Career Baseline
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {DATA_TIMESTAMPS.careerThrough}. All match counts, run tallies, and century milestones are synchronized with international cricket records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: The Chase Master Engine */}
        {statsView === 'chase' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#0F1117] border border-amber-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold">
                  <Target className="w-3.5 h-3.5" />
                  THE ART OF THE CHASE
                </div>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                  WHY KOHLI IS THE GREATEST RUN-CHASER IN CRICKET HISTORY
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  While most batsmen falter when the required rate climbs, Virat Kohli’s average actually accelerates. In successful ODI chases, his batting average surpasses a staggering 90.40 with 25 centuries.
                </p>
              </div>

              {/* Chase Matrix Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {CHASE_STATS.map((chase, idx) => (
                  <div
                    key={idx}
                    className="bg-black/60 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-base font-bold text-white tracking-wide">
                        {chase.condition}
                      </h4>
                      <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                        {chase.winPercentage} WIN RATE
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                          AVERAGE
                        </span>
                        <span className="font-heading text-3xl font-black text-amber-400">
                          {chase.average.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                          RUNS
                        </span>
                        <span className="font-mono-num text-xl font-bold text-white">
                          {chase.runs.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                          HUNDREDS
                        </span>
                        <span className="font-mono-num text-xl font-bold text-rose-400">
                          {chase.hundreds} Tons
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 border-t border-white/10 pt-3 font-light italic">
                      💡 {chase.notable}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View 3: Milestone Horizons Progress Tracker */}
        {statsView === 'milestones' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#0F1117] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-semibold">
                  <Activity className="w-3.5 h-3.5" />
                  THE SUMMIT HORIZONS
                </div>
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
                  PROGRESSION TOWARD ALL-TIME PINNACLES
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Real-time distance to the greatest remaining statistical summits in international cricket.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {MILESTONE_TRACKERS.map((milestone, idx) => {
                  const progressPct = Math.min(
                    100,
                    Math.round((milestone.current / milestone.target) * 1000) / 10
                  );

                  return (
                    <div
                      key={idx}
                      className="bg-black/60 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                          {milestone.format}
                        </span>
                        <h4 className="font-display font-bold text-lg text-white">
                          {milestone.title}
                        </h4>
                        <p className="text-xs text-neutral-400 font-light leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-white/10">
                        {/* Numbers */}
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="font-heading text-2xl font-black text-white">
                              {milestone.current.toLocaleString()}
                            </span>
                            <span className="text-xs font-mono text-neutral-400">
                              {' '}
                              / {milestone.target.toLocaleString()} {milestone.unit}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-bold text-cyan-400">
                            {progressPct}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full transition-all duration-1000"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>

                        {/* Remaining Pill */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-amber-300">
                          <span>Remaining needed:</span>
                          <span className="font-bold">
                            {milestone.remaining.toLocaleString()} {milestone.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

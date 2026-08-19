import { X, Volume2, Trophy, MapPin, Calendar, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Milestone } from '../types';
import { soundFx } from '../utils/audioEngine';

interface MilestoneModalProps {
  milestone: Milestone | null;
  onClose: () => void;
}

export function MilestoneModal({ milestone, onClose }: MilestoneModalProps) {
  if (!milestone) return null;

  const handleAudioEffect = () => {
    soundFx.playBatCrack();
    setTimeout(() => soundFx.playCrowdRoar(), 200);
  };

  const getThemeAccent = (theme: Milestone['theme']) => {
    switch (theme) {
      case 'aggression':
        return {
          border: 'border-rose-500/40',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          glow: 'from-rose-600/20 to-transparent',
          accentText: 'text-rose-400',
        };
      case 'discipline':
        return {
          border: 'border-cyan-500/40',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
          glow: 'from-cyan-600/20 to-transparent',
          accentText: 'text-cyan-400',
        };
      case 'legacy':
        return {
          border: 'border-amber-500/40',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          glow: 'from-amber-600/20 to-transparent',
          accentText: 'text-amber-400',
        };
      default:
        return {
          border: 'border-white/20',
          badge: 'bg-white/10 text-white border-white/20',
          glow: 'from-white/10 to-transparent',
          accentText: 'text-white',
        };
    }
  };

  const style = getThemeAccent(milestone.theme);

  return (
    <div
      id="milestone-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="milestone-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl bg-[#0F1117] border ${style.border} rounded-2xl shadow-2xl overflow-hidden my-8`}
      >
        {/* Ambient Top Glow */}
        <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${style.glow} pointer-events-none`} />

        {/* Close Button */}
        <button
          id="close-milestone-modal-btn"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-neutral-300 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full border ${style.badge}`}>
              {milestone.category}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono-num font-semibold text-neutral-300 bg-white/5 rounded-full border border-white/10">
              {milestone.format}
            </span>
            <span className="px-2.5 py-1 text-[11px] font-mono-num text-neutral-400">
              {milestone.year}
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
            {milestone.title}
          </h2>
          <p className={`mt-1 text-sm sm:text-base ${style.accentText} font-medium`}>
            {milestone.subtitle}
          </p>

          {/* Quick Score Highlight Badge */}
          {milestone.score && (
            <div className="mt-4 inline-flex items-center gap-3 bg-black/60 border border-white/10 px-4 py-2 rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                  Innings Score
                </span>
                <span className="font-heading text-3xl font-black text-white tracking-wide">
                  {milestone.score}
                </span>
              </div>
              {milestone.ballsFaced && (
                <div className="pl-3 border-l border-white/10 flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                    Balls Faced
                  </span>
                  <span className="font-mono-num text-lg font-bold text-neutral-200">
                    {milestone.ballsFaced}
                  </span>
                </div>
              )}
              {milestone.strikeRate && (
                <div className="pl-3 border-l border-white/10 flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                    Strike Rate
                  </span>
                  <span className="font-mono-num text-lg font-bold text-neutral-200">
                    {milestone.strikeRate.toFixed(1)}
                  </span>
                </div>
              )}
              {milestone.fours !== undefined && (
                <div className="pl-3 border-l border-white/10 flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                    4s / 6s
                  </span>
                  <span className="font-mono-num text-base font-bold text-neutral-200">
                    {milestone.fours} / {milestone.sixes || 0}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Match Location & Opponent metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block font-mono">Date</span>
                <span className="text-xs text-neutral-200 font-medium">{milestone.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block font-mono">Venue</span>
                <span className="text-xs text-neutral-200 font-medium truncate block max-w-[180px]">
                  {milestone.venue}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase text-neutral-500 block font-mono">Versus</span>
                <span className="text-xs text-neutral-200 font-medium">{milestone.opponent}</span>
              </div>
            </div>
          </div>

          {/* Context & Narration */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-mono">
              The Match Context
            </h4>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {milestone.context}
            </p>
          </div>

          {/* Historical Significance */}
          <div className="space-y-3 bg-black/40 border border-white/10 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-rose-400 font-mono font-semibold">
              <Zap className="w-3.5 h-3.5" /> Historical Significance
            </h4>
            <p className="text-sm text-neutral-200 leading-relaxed font-body">
              {milestone.significance}
            </p>
          </div>

          {/* Iconic Shot / Stat Highlight */}
          {milestone.iconicShot && (
            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 p-3.5 rounded-xl">
              <Activity className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="text-xs text-neutral-200">
                <span className="font-semibold text-white">Signature Moment: </span>
                {milestone.iconicShot}
              </div>
            </div>
          )}

          {/* Result outcome */}
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/20 border border-emerald-500/20 px-3.5 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Match Outcome: {milestone.matchResult}</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-black/50 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            id="play-stadium-sound-btn"
            onClick={handleAudioEffect}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors border border-white/10"
          >
            <Volume2 className="w-4 h-4 text-rose-400" />
            REPLAY STADIUM IMPACT
          </button>

          <button
            id="close-milestone-footer-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold tracking-wider transition-colors"
          >
            CLOSE CHAPTER
          </button>
        </div>
      </div>
    </div>
  );
}

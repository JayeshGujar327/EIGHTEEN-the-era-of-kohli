import { RotateCcw, Home, Trophy } from 'lucide-react';
import { soundFx } from '../../utils/audioEngine';

interface NotFoundPageProps {
  onBackHome: () => void;
}

export function NotFoundPage({ onBackHome }: NotFoundPageProps) {
  return (
    <div
      id="not-found-page"
      className="min-h-screen bg-[#08090C] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* 18 Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-heading text-[35vw] font-black text-white/[0.03] leading-none">
          18
        </span>
      </div>

      <div className="relative z-10 text-center max-w-lg space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono tracking-widest uppercase">
          <Trophy className="w-4 h-4" /> 18 NOT OUT • OFF THE PITCH
        </div>

        <div className="font-heading text-8xl sm:text-9xl font-black text-rose-500 tracking-tight">
          404
        </div>

        <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
          BALL OUTSIDE OFF STUMP
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          You stepped outside the crease into uncharted territory. Like Kohli leaving the swinging red ball outside off stump, let's reset and return to the main documentary.
        </p>

        <div className="pt-4">
          <button
            id="return-home-404-btn"
            onClick={() => {
              soundFx.playBatCrack();
              onBackHome();
            }}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all shadow-xl inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            RETURN TO THE ERA OF KOHLI
          </button>
        </div>
      </div>
    </div>
  );
}

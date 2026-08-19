import { useState, FormEvent } from 'react';
import {
  Sparkles,
  Flame,
  Shuffle,
  Heart,
  Download,
  Share2,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Clock,
  MapPin,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CINEMATIC_MOMENTS } from '../../data/interactiveData';
import { CinematicMoment, FanMemory, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface MomentsSectionProps {
  activeTheme: ThemeMode;
}

export function MomentsSection({ activeTheme }: MomentsSectionProps) {
  const [selectedMomentId, setSelectedMomentId] = useState<string>(CINEMATIC_MOMENTS[0].id);
  const [randomMoment, setRandomMoment] = useState<CinematicMoment | null>(null);

  // Fan Memory Form State
  const [fanMemoryText, setFanMemoryText] = useState('');
  const [fanName, setFanName] = useState('');
  const [fanSelectedMoment, setFanSelectedMoment] = useState(CINEMATIC_MOMENTS[0].title);
  const [savedMemory, setSavedMemory] = useState<FanMemory | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const currentMoment =
    CINEMATIC_MOMENTS.find((m) => m.id === selectedMomentId) || CINEMATIC_MOMENTS[0];

  const handleRandomMoment = () => {
    soundFx.playBatCrack();
    const otherMoments = CINEMATIC_MOMENTS.filter((m) => m.id !== (randomMoment?.id || currentMoment.id));
    const random = otherMoments[Math.floor(Math.random() * otherMoments.length)] || CINEMATIC_MOMENTS[0];
    setRandomMoment(random);
    setSelectedMomentId(random.id);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleSaveFanMemory = (e: FormEvent) => {
    e.preventDefault();
    if (!fanMemoryText.trim()) return;

    soundFx.playLegendary();
    const newMemory: FanMemory = {
      id: `mem-${Date.now()}`,
      momentTitle: fanSelectedMoment,
      opponent: currentMoment.opponent,
      year: parseInt(currentMoment.date.split(' ').pop() || '2022', 10),
      memoryText: fanMemoryText.trim(),
      authorName: fanName.trim() || 'A Devoted 18 Fan',
      createdAt: 'August 2026',
    };

    setSavedMemory(newMemory);
    confetti({ particleCount: 70, spread: 70 });
  };

  const handleCopyCardText = () => {
    if (!savedMemory) return;
    soundFx.playClick();
    const shareText = `🏏 My Virat Kohli Memory: "${savedMemory.memoryText}" — During ${savedMemory.momentTitle} | EIGHTEEN: The Era of Kohli`;
    navigator.clipboard?.writeText(shareText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <section id="moments" className="py-24 bg-[#08090C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono tracking-[0.2em] text-cyan-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              CINEMATIC STORY MODE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              THE MOMENTS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Step inside the greatest innings in modern cricket history. Relive the pressure, the turning points, and why they transcended the sport.
            </p>
          </div>

          {/* Random Generator Action */}
          <button
            id="random-moment-btn"
            onClick={handleRandomMoment}
            className="px-5 py-3 rounded-2xl bg-[#151922] border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-mono text-xs font-bold uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 hover:scale-105"
          >
            <Shuffle className="w-4 h-4 text-cyan-400" />
            🎲 TAKE ME TO A MOMENT
          </button>
        </div>

        {/* Moments Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CINEMATIC_MOMENTS.map((m) => (
            <button
              key={m.id}
              id={`moment-tab-${m.id}`}
              onClick={() => {
                soundFx.playClick();
                setSelectedMomentId(m.id);
                setFanSelectedMoment(m.title);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                selectedMomentId === m.id
                  ? 'bg-[#151922] border-cyan-500 shadow-xl shadow-cyan-950/40 scale-[1.02]'
                  : 'bg-[#0E1017] border-white/10 hover:border-white/20 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                {m.format} • {m.date.split(' ').pop()}
              </span>
              <p className="font-display font-bold text-xs text-white leading-tight truncate">
                {m.title}
              </p>
              <span className="font-mono text-[11px] text-amber-400 font-bold mt-2">
                {m.score}
              </span>
            </button>
          ))}
        </div>

        {/* 6-Stage Narrative Spotlight */}
        <div className="bg-[#0F1117] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
          {/* Moment Banner & Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6 border-b border-white/10">
            <div className="lg:col-span-4 h-56 sm:h-72 rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl">
              <img
                src={currentMoment.image}
                alt={currentMoment.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-cyan-300">
                AURA SCORE: {currentMoment.auraScore}/100 👑
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <span className="font-heading font-black text-2xl text-amber-400">
                  {currentMoment.score}
                </span>
                <p className="text-xs text-neutral-300 font-mono truncate">{currentMoment.match}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                    {currentMoment.format}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {currentMoment.date} • {currentMoment.venue}
                  </span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
                  {currentMoment.title}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 italic text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {currentMoment.iconicQuote}
              </div>
            </div>
          </div>

          {/* 6-Stage Narrative Breakdown Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              THE 6-STAGE MATCH ANATOMY
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                  1. SITUATION
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {currentMoment.stage1Situation}
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-1.5">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block font-bold">
                  2. THE PRESSURE
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {currentMoment.stage2Pressure}
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-bold">
                  3. KOHLI'S ENTRY
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {currentMoment.stage3Entry}
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                  4. THE TURNING POINT
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {currentMoment.stage4TurningPoint}
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                  5. THE RESULT
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {currentMoment.stage5Result}
                </p>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-1.5">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block font-bold">
                  6. WHY IT MATTERED
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {currentMoment.stage6WhyItMattered}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* "Where Were You?" Fan Tribute Creator */}
        <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-mono text-rose-400 uppercase">
              <Heart className="w-3.5 h-3.5" />
              WHERE WERE YOU?
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
              RECORD YOUR KOHLI MEMORY
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Every cricket fan remembers where they were during the 82* at MCG or the Hobart 133*. Type your memory to create a personalized keepsake tribute card.
            </p>

            <form onSubmit={handleSaveFanMemory} className="space-y-3 pt-2">
              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                  Select Moment
                </label>
                <select
                  value={fanSelectedMoment}
                  onChange={(e) => setFanSelectedMoment(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl p-2.5 focus:border-rose-500 focus:outline-none"
                >
                  {CINEMATIC_MOMENTS.map((m) => (
                    <option key={m.id} value={m.title}>
                      {m.title} ({m.score})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                  Your Name / Handle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul S. / Fan 18"
                  value={fanName}
                  onChange={(e) => setFanName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl p-2.5 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                  Your Memory
                </label>
                <textarea
                  rows={3}
                  placeholder="Where were you sitting? Who did you hug? What did you scream when the ball cleared long-on?"
                  value={fanMemoryText}
                  onChange={(e) => setFanMemoryText(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl p-2.5 focus:border-rose-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                id="generate-fan-memory-btn"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xl transition-all"
              >
                GENERATE TRIBUTE CARD ✨
              </button>
            </form>
          </div>

          {/* Generated Fan Card Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {savedMemory ? (
              <div
                id="fan-memory-card"
                className="w-full max-w-md bg-gradient-to-br from-[#1A1D27] via-[#0E1017] to-black border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center font-heading font-bold text-white text-sm">
                      18
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm text-white block">
                        THE ERA OF KOHLI
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase">
                        FAN TRIBUTE ARCHIVE
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-rose-300">
                    VERIFIED FAN
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    REMEMBERING: {savedMemory.momentTitle}
                  </span>
                  <p className="text-sm sm:text-base text-neutral-200 italic font-light leading-relaxed">
                    “{savedMemory.memoryText}”
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-neutral-400">
                  <span className="text-white font-bold">{savedMemory.authorName}</span>
                  <span>EIGHTEEN • DIGITAL MUSEUM</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={handleCopyCardText}
                    className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-rose-400" />
                    {copiedNotification ? 'Copied to Clipboard!' : 'Share Tribute Text'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md border border-dashed border-white/10 rounded-3xl p-10 text-center space-y-3 text-neutral-500">
                <MessageSquare className="w-8 h-8 mx-auto text-neutral-600" />
                <p className="text-xs font-mono">
                  Your personalized memory keepsake will appear here once submitted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

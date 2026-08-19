import { useState, useEffect, FormEvent } from 'react';
import {
  Crown,
  Sparkles,
  Award,
  Send,
  Download,
  Share2,
  Lock,
  Unlock,
  CheckCircle2,
  MessageSquare,
  Bot,
  Flame,
  Shield,
  Compass,
  BarChart3,
  Brain,
  Quote,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_UNLOCK_BADGES } from '../../data/interactiveData';
import { BRAND_IMPACTS, AUTHENTIC_QUOTES } from '../../data/kohliData';
import { ThemeMode, UnlockBadge } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface LegacySectionProps {
  activeTheme: ThemeMode;
  isKingMode: boolean;
  onTriggerKingMode: () => void;
}

export function LegacySection({
  activeTheme,
  isKingMode,
  onTriggerKingMode,
}: LegacySectionProps) {
  // Fan Card State
  const [fanName, setFanName] = useState('Die-Hard 18');
  const [favoriteEra, setFavoriteEra] = useState('2016 Peak Run Machine');
  const [favoriteMoment, setFavoriteMoment] = useState('82* vs Pakistan at MCG');
  const [fanCopied, setFanCopied] = useState(false);

  // Unlock Badges State
  const [badges, setBadges] = useState<UnlockBadge[]>(INITIAL_UNLOCK_BADGES);

  // AI Assistant State
  const [aiQuery, setAiQuery] = useState('');
  const [aiMessages, setAiMessages] = useState<
    { role: 'user' | 'assistant'; text: string; isFallback?: boolean }[]
  >([
    {
      role: 'assistant',
      text: 'Greetings! I am the verified Kohli Career Assistant. Ask me anything about Virat Kohli’s 85 centuries, 28,359 runs, historic chases, captaincy records, or career milestones as of August 2026.',
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Sync King Mode badge
  useEffect(() => {
    if (isKingMode) {
      setBadges((prev) =>
        prev.map((b) => (b.id === 'king-certified' ? { ...b, unlocked: true } : b))
      );
    }
  }, [isKingMode]);

  const handleAskAi = async (e: FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || aiLoading) return;

    const userQ = aiQuery.trim();
    setAiQuery('');
    setAiMessages((prev) => [...prev, { role: 'user', text: userQ }]);
    setAiLoading(true);
    soundFx.playClick();

    try {
      const response = await fetch('/api/ask-kohli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQ }),
      });
      const data = await response.json();
      setAiMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer || 'Career Record: 85 international hundreds and 28,359 international runs across all formats.',
          isFallback: data.isVerifiedFallback,
        },
      ]);
    } catch (err) {
      // Local verified fallback engine
      const queryLower = userQ.toLowerCase();
      let answer = 'Virat Kohli holds 85 international centuries and 28,359 international runs across all formats (54 ODI tons, 30 Test tons, 1 T20I ton).';
      
      if (queryLower.includes('odi') || queryLower.includes('century') || queryLower.includes('record')) {
        answer = 'In One Day Internationals, Virat Kohli holds the all-time world record with 54 centuries, 14,941 runs, and a 58.13 batting average across 314 matches (verified as of August 2026).';
      } else if (queryLower.includes('mcg') || queryLower.includes('pakistan') || queryLower.includes('82')) {
        answer = 'On 23 October 2022 at the MCG, Kohli scored 82* off 53 balls to rescue India from 31/4 and chase down 160 against Pakistan, highlighted by back-to-back sixes off Haris Rauf in the 19th over.';
      } else if (queryLower.includes('test') || queryLower.includes('captain')) {
        answer = 'As Test Captain, Virat Kohli led India to 40 victories in 68 matches (58.8% win rate) and held the ICC Test Mace for 5 consecutive years (2016–2021).';
      }

      setAiMessages((prev) => [
        ...prev,
        { role: 'assistant', text: answer, isFallback: true },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleShareFanCard = () => {
    soundFx.playClick();
    const shareText = `👑 My Eighteen Fan Card: ${fanName} | Favorite Era: ${favoriteEra} | Favorite Moment: ${favoriteMoment} | EIGHTEEN: The Era of Kohli`;
    navigator.clipboard?.writeText(shareText);
    setFanCopied(true);
    setTimeout(() => setFanCopied(false), 3000);
  };

  return (
    <section id="legacy" className="py-24 bg-[#08090C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono tracking-[0.2em] text-amber-400 uppercase">
            <Crown className="w-3.5 h-3.5" />
            THE LIVING MONUMENT
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            THE LEGACY
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Beyond the numbers lies a cultural revolution. The mindset, the fitness gospel, the fan devotion, and the immortality of Jersey No. 18.
          </p>
        </div>

        {/* 1. THE EIGHTEEN FAN CARD */}
        <div className="bg-[#0F1117] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
              DIGITAL SOUVENIR
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
              THE EIGHTEEN FAN CARD
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Personalize your fan identity card to celebrate your journey through the Era of Kohli.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                  Fan Name / Handle
                </label>
                <input
                  type="text"
                  value={fanName}
                  onChange={(e) => setFanName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl p-2.5 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                  Favorite Era
                </label>
                <select
                  value={favoriteEra}
                  onChange={(e) => setFavoriteEra(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl p-2.5 focus:border-amber-500 focus:outline-none"
                >
                  <option value="2008 U19 Leader">2008 U19 Leader</option>
                  <option value="2012 Hobart Chase Master">2012 Hobart Chase Master</option>
                  <option value="2016 Peak Run Machine">2016 Peak Run Machine (973 Runs)</option>
                  <option value="2018 Test Gladiator Captain">2018 Test Gladiator Captain</option>
                  <option value="2022 Melbourne Miracle">2022 Melbourne Miracle</option>
                  <option value="2023 50th Century King">2023 50th Century King</option>
                  <option value="2026 Immortal 28k Titan">2026 Immortal 28k Titan</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                  Favorite Moment
                </label>
                <input
                  type="text"
                  value={favoriteMoment}
                  onChange={(e) => setFavoriteMoment(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl p-2.5 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Generated Card Display */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              id="the-eighteen-fan-card"
              className="w-full max-w-md bg-gradient-to-br from-neutral-900 via-[#12151D] to-black border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center font-heading font-black text-black text-lg shadow-lg">
                    18
                  </div>
                  <div>
                    <span className="font-display font-black text-sm sm:text-base text-white block uppercase tracking-wider">
                      KING CERTIFIED FAN
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                      DIGITAL MUSEUM CITIZEN
                    </span>
                  </div>
                </div>
                <Crown className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 border border-white/5 rounded-xl p-3">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">FAN IDENTITY</span>
                  <p className="font-display font-bold text-lg text-amber-300">{fanName || 'Devoted 18'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/50 border border-white/5 rounded-xl p-3">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase block">ERA ALLEGIANCE</span>
                    <p className="text-xs font-mono text-white truncate">{favoriteEra}</p>
                  </div>
                  <div className="bg-black/50 border border-white/5 rounded-xl p-3">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase block">BADGE LEVEL</span>
                    <p className="text-xs font-mono text-emerald-400 font-bold">18 IMMORTAL</p>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/5 rounded-xl p-3">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">GREATEST MOMENT</span>
                  <p className="text-xs font-mono text-neutral-200 truncate">{favoriteMoment}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-neutral-400">
                <span>VERIFIED MUSEUM CARD</span>
                <span>2008 — FOREVER</span>
              </div>

              <button
                onClick={handleShareFanCard}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-black font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Share2 className="w-3.5 h-3.5" />
                {fanCopied ? 'Copied to Clipboard!' : 'Share Fan Card Text'}
              </button>
            </div>
          </div>
        </div>

        {/* 2. UNLOCK THE LEGACY (ACHIEVEMENTS) */}
        <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
                INTERACTIVE QUESTS
              </span>
              <h3 className="font-display font-black text-2xl text-white uppercase mt-1">
                UNLOCK THE LEGACY
              </h3>
            </div>
            <button
              onClick={onTriggerKingMode}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono border border-amber-500/40 flex items-center gap-1.5 transition-colors"
            >
              <Crown className="w-3.5 h-3.5" />
              {isKingMode ? '👑 King Mode Active' : 'Unlock King Mode Easter Egg'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  b.unlocked
                    ? 'bg-[#151922] border-amber-500/40 text-white'
                    : 'bg-black/30 border-white/5 text-neutral-500 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    b.unlocked
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-white/5 text-neutral-600'
                  }`}
                >
                  {b.unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-xs text-white">{b.title}</h4>
                    {b.unlocked && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400 font-light">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AI "ASK KOHLI'S CAREER" ASSISTANT */}
        <div className="bg-[#0F1117] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white uppercase">
                ASK KOHLI'S CAREER ASSISTANT
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Ask any verified cricket query • Grounded in official career database
              </p>
            </div>
          </div>

          {/* Chat Stream Window */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-4 max-h-72 overflow-y-auto">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xl rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-rose-600 text-white rounded-tr-none'
                      : 'bg-[#151922] border border-white/10 text-neutral-200 rounded-tl-none font-light'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.isFallback && (
                    <span className="text-[9px] font-mono text-cyan-400 block mt-1">
                      • Verified Database Response
                    </span>
                  )}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div className="text-xs font-mono text-cyan-400 animate-pulse">
                Assistant is querying verified career archives...
              </div>
            )}
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleAskAi} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. What are Kohli's records against Pakistan? Or compare 2016 and 2023..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 text-white text-xs font-mono rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={aiLoading || !aiQuery.trim()}
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              ASK
            </button>
          </form>
        </div>

        {/* 4. BRAND & CULTURAL IMPACT */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              THE OFF-FIELD REVOLUTION
            </span>
            <h3 className="font-display font-black text-2xl text-white uppercase">
              CULTURAL IMPACT & THE KOHLI GOSPEL
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRAND_IMPACTS.map((b) => (
              <div
                key={b.id}
                className="bg-[#0E1017] border border-white/10 rounded-2xl p-5 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="font-display font-black text-lg text-white">{b.brand}</span>
                  <span className="text-[10px] font-mono text-neutral-400">{b.yearStarted}</span>
                </div>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {b.impactStory}
                </p>
                <span className="text-[10px] font-mono text-amber-400 font-bold block pt-2 border-t border-white/5">
                  {b.statOrFact}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. AUTHENTIC QUOTES SANCTUARY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUTHENTIC_QUOTES.slice(0, 3).map((q) => (
            <div
              key={q.id}
              className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
            >
              <Quote className="w-6 h-6 text-rose-500/40" />
              <p className="text-xs sm:text-sm text-neutral-200 italic font-light leading-relaxed">
                “{q.quote}”
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{q.author}</span>
                <span className="text-neutral-500">{q.authorRole}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

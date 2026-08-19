import { useState } from 'react';
import {
  Gamepad2,
  Target,
  Brain,
  HelpCircle,
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Crown,
  ChevronRight,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  GUESS_INNINGS_DATA,
  KOHLI_QUIZ_QUESTIONS,
  CURATED_INDIA_XI_PLAYERS,
  WHAT_IF_SCENARIOS,
} from '../../data/interactiveData';
import { IndiaXIPlayer, ThemeMode } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface PlayPavilionSectionProps {
  activeTheme: ThemeMode;
}

export function PlayPavilionSection({ activeTheme }: PlayPavilionSectionProps) {
  const [activePlayTab, setActivePlayTab] = useState<
    'chase' | 'decision' | 'guess' | 'quiz' | 'aura' | 'india11' | 'whatif'
  >('chase');

  // --- GAME 1: CHASE SIMULATOR STATE ---
  const [runsNeeded, setRunsNeeded] = useState(42);
  const [ballsRemaining, setBallsRemaining] = useState(24);
  const [currentScore, setCurrentScore] = useState(118);
  const [wickets, setWickets] = useState(4);
  const [chaseLogs, setChaseLogs] = useState<string[]>([
    'Match context: 42 runs needed off 24 balls. Kohli on strike facing 145 km/h pace bowling.',
  ]);
  const [chaseStatus, setChaseStatus] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');

  const resetChase = () => {
    soundFx.playClick();
    setRunsNeeded(42);
    setBallsRemaining(24);
    setCurrentScore(118);
    setWickets(4);
    setChaseLogs(['Match context: 42 runs needed off 24 balls. Kohli on strike facing 145 km/h pace bowling.']);
    setChaseStatus('PLAYING');
  };

  const handleChaseShot = (shotType: 'defend' | 'single' | 'boundary' | 'six') => {
    if (chaseStatus !== 'PLAYING') return;

    let runs = 0;
    let isWicket = false;
    let comment = '';

    if (shotType === 'defend') {
      soundFx.playBatCrack();
      runs = 0;
      comment = 'Pushed with soft hands to short cover. Dot ball.';
    } else if (shotType === 'single') {
      soundFx.playBatCrack();
      runs = Math.random() > 0.3 ? 1 : 2;
      comment = runs === 1 ? 'Worked through midwicket for a quick single.' : 'Pushed hard into the deep, brilliant running for 2!';
    } else if (shotType === 'boundary') {
      const roll = Math.random();
      if (roll > 0.25) {
        soundFx.playBatCrack();
        runs = 4;
        comment = 'CRACK! Trademark Kohli cover drive piercing the gap for FOUR!';
      } else {
        soundFx.playGasp();
        isWicket = true;
        comment = 'Edged outside off! Caught behind.';
      }
    } else if (shotType === 'six') {
      const roll = Math.random();
      if (roll > 0.4) {
        soundFx.playLegendary();
        runs = 6;
        comment = 'HIGH AND HANDSOME! Stood tall and punched straight back over long-on for SIX!';
      } else {
        soundFx.playGasp();
        isWicket = true;
        comment = 'Mistimed the pull shot, caught at deep midwicket!';
      }
    }

    const nextBalls = ballsRemaining - 1;
    const nextRuns = Math.max(0, runsNeeded - runs);
    const nextScore = currentScore + runs;
    const nextWickets = isWicket ? wickets + 1 : wickets;

    setBallsRemaining(nextBalls);
    setRunsNeeded(nextRuns);
    setCurrentScore(nextScore);
    setWickets(nextWickets);
    setChaseLogs((prev) => [comment, ...prev]);

    if (nextRuns === 0) {
      soundFx.playCheer();
      setChaseStatus('WON');
      confetti({ particleCount: 100, spread: 80 });
    } else if (nextBalls === 0 || nextWickets >= 10) {
      soundFx.playGasp();
      setChaseStatus('LOST');
    }
  };

  // --- GAME 2: DECISION SIMULATOR STATE ---
  const [decisionStep, setDecisionStep] = useState(0);
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  const decisions = [
    {
      scenario: '18th Over vs Haris Rauf at MCG. 28 needed from 8 balls. Rauf delivers a 148 km/h back-of-length rocket.',
      optionA: 'Stand tall on back foot and punch straight back down the ground with straight bat',
      optionB: 'Back away to leg side and try a wild horizontal sweep',
      correct: 'A',
      explanation: 'Iconic decision! Kohli stood tall, trusted the bounce, and produced the Shot of the Century over long-on.',
    },
    {
      scenario: 'Edgbaston 2018. James Anderson swinging the Duke ball 4th stump outside off with 3 slips and a gully.',
      optionA: 'Flash hard with hands at wide outswinger to assert dominance',
      optionB: 'Stand outside crease, leave on length, and play only when ball is directly under eyes',
      correct: 'B',
      explanation: 'Monastic discipline! Kohli left 40+ deliveries outside off, scoring a legendary 149.',
    },
  ];

  const handleDecision = (choice: 'A' | 'B') => {
    const current = decisions[decisionStep];
    if (choice === current.correct) {
      soundFx.playCheer();
      setDecisionFeedback(`👑 MASTERCLASS EXECUTION: ${current.explanation}`);
    } else {
      soundFx.playGasp();
      setDecisionFeedback(`⚠️ RISKY DECISION: Playing against the line increases risk of edge.`);
    }
  };

  // --- GAME 3: GUESS THE INNINGS STATE ---
  const [guessIndex, setGuessIndex] = useState(0);
  const [selectedGuessOption, setSelectedGuessOption] = useState<string | null>(null);
  const currentGuess = GUESS_INNINGS_DATA[guessIndex % GUESS_INNINGS_DATA.length];

  const handleGuessSubmit = (optionId: string, isCorrect: boolean) => {
    setSelectedGuessOption(optionId);
    if (isCorrect) {
      soundFx.playCheer();
      confetti({ particleCount: 50, spread: 60 });
    } else {
      soundFx.playGasp();
    }
  };

  const nextGuess = () => {
    soundFx.playClick();
    setSelectedGuessOption(null);
    setGuessIndex((prev) => prev + 1);
  };

  // --- GAME 4: KOHLI QUIZ STATE ---
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuizQ = KOHLI_QUIZ_QUESTIONS[quizQuestionIndex];

  const handleQuizAnswer = (index: number) => {
    if (selectedQuizAnswer !== null) return;
    setSelectedQuizAnswer(index);

    if (index === currentQuizQ.correctIndex) {
      soundFx.playBatCrack();
      setQuizScore((prev) => prev + 1);
    } else {
      soundFx.playGasp();
    }
  };

  const handleNextQuizQuestion = () => {
    soundFx.playClick();
    if (quizQuestionIndex + 1 < KOHLI_QUIZ_QUESTIONS.length) {
      setQuizQuestionIndex((prev) => prev + 1);
      setSelectedQuizAnswer(null);
    } else {
      soundFx.playLegendary();
      setQuizFinished(true);
      confetti({ particleCount: 120, spread: 90 });
    }
  };

  const resetQuiz = () => {
    soundFx.playClick();
    setQuizQuestionIndex(0);
    setQuizScore(0);
    setSelectedQuizAnswer(null);
    setQuizFinished(false);
  };

  // --- GAME 5: AURA METER STATE ---
  const [auraPressure, setAuraPressure] = useState(90);
  const [auraTarget, setAuraTarget] = useState(85);
  const [auraBowlerSpeed, setAuraBowlerSpeed] = useState(95);

  const calculatedAuraScore = Math.min(
    100,
    Math.round((auraPressure * 0.35 + auraTarget * 0.35 + auraBowlerSpeed * 0.3) * 1.05)
  );

  // --- GAME 6: BUILD YOUR INDIA XI STATE ---
  const [selectedXI, setSelectedXI] = useState<IndiaXIPlayer[]>([
    CURATED_INDIA_XI_PLAYERS[0], // Rohit
    CURATED_INDIA_XI_PLAYERS[1], // Sachin
    CURATED_INDIA_XI_PLAYERS[3], // Kohli (C)
    CURATED_INDIA_XI_PLAYERS[4], // Dravid
    CURATED_INDIA_XI_PLAYERS[5], // Yuvraj
    CURATED_INDIA_XI_PLAYERS[6], // Dhoni
    CURATED_INDIA_XI_PLAYERS[7], // Hardik
    CURATED_INDIA_XI_PLAYERS[8], // Jadeja
    CURATED_INDIA_XI_PLAYERS[9], // Bumrah
    CURATED_INDIA_XI_PLAYERS[10], // Zaheer
    CURATED_INDIA_XI_PLAYERS[12], // Kumble
  ]);

  const togglePlayerInXI = (player: IndiaXIPlayer) => {
    soundFx.playClick();
    const exists = selectedXI.some((p) => p.id === player.id);
    if (exists) {
      if (selectedXI.length > 1) {
        setSelectedXI(selectedXI.filter((p) => p.id !== player.id));
      }
    } else {
      if (selectedXI.length < 11) {
        setSelectedXI([...selectedXI, player]);
      }
    }
  };

  // --- GAME 7: WHAT IF SIMULATOR STATE ---
  const [whatIfScenarioIndex, setWhatIfScenarioIndex] = useState(0);
  const [whatIfMode, setWhatIfMode] = useState<'conservative' | 'average' | 'peak'>('average');
  const currentWhatIf = WHAT_IF_SCENARIOS[whatIfScenarioIndex];

  const currentOdiRuns = 14941;
  const currentOdiTons = 54;

  const simAssumption = currentWhatIf.assumptions[whatIfMode];
  const projectedExtraRuns = Math.round(currentWhatIf.matchesToPlay * simAssumption.avgRunsPerInnings);
  const projectedExtraTons = Math.round(currentWhatIf.matchesToPlay / simAssumption.tonEveryInnings);

  const projectedFinalRuns = currentOdiRuns + projectedExtraRuns;
  const projectedFinalTons = currentOdiTons + projectedExtraTons;

  return (
    <section id="play" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono tracking-[0.2em] text-emerald-400 uppercase">
              <Gamepad2 className="w-3.5 h-3.5" />
              THE INTERACTIVE PAVILION
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              PLAY THE ERA
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Step into the boots of Jersey No. 18. Recreate iconic chases, test your cricket IQ, calculate the aura score, and simulate future milestones.
            </p>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex flex-wrap items-center bg-[#12151D] border border-white/10 rounded-xl p-1 gap-1">
            <button
              id="play-tab-chase"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('chase');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'chase'
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              THE CHASE
            </button>
            <button
              id="play-tab-decision"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('decision');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'decision'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-amber-300" />
              DECISIONS
            </button>
            <button
              id="play-tab-guess"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('guess');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'guess'
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
              GUESS INNINGS
            </button>
            <button
              id="play-tab-quiz"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('quiz');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'quiz'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-purple-300" />
              MASTER QUIZ
            </button>
            <button
              id="play-tab-aura"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('aura');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'aura'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-emerald-300" />
              AURA METER
            </button>
            <button
              id="play-tab-india11"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('india11');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'india11'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-300" />
              INDIA XI
            </button>
            <button
              id="play-tab-whatif"
              onClick={() => {
                soundFx.playClick();
                setActivePlayTab('whatif');
              }}
              className={`px-3 py-2 text-xs font-semibold rounded-lg font-mono transition-all flex items-center gap-1.5 ${
                activePlayTab === 'whatif'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-300" />
              WHAT IF?
            </button>
          </div>
        </div>

        {/* 1. RECREATE THE CHASE SIMULATOR */}
        {activePlayTab === 'chase' && (
          <div className="bg-[#0F1117] border border-rose-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold">
                  INTERACTIVE SIMULATOR • FAN-MADE
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
                  RECREATE THE CHASE
                </h3>
              </div>
              <button
                onClick={resetChase}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Match
              </button>
            </div>

            {/* Match Status Scoreboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Runs Needed</span>
                <p className="font-heading font-black text-4xl text-rose-500">{runsNeeded}</p>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Balls Left</span>
                <p className="font-heading font-black text-4xl text-white">{ballsRemaining}</p>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Current Score</span>
                <p className="font-heading font-black text-4xl text-amber-400">
                  {currentScore}/{wickets}
                </p>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Req. Run Rate</span>
                <p className="font-heading font-black text-4xl text-cyan-400">
                  {ballsRemaining > 0 ? ((runsNeeded / ballsRemaining) * 6).toFixed(1) : '0.0'}
                </p>
              </div>
            </div>

            {/* Shot Action Controls */}
            {chaseStatus === 'PLAYING' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  id="shot-defend-btn"
                  onClick={() => handleChaseShot('defend')}
                  className="py-3.5 rounded-2xl bg-[#151922] border border-white/10 hover:border-white/30 text-white font-mono text-xs font-bold transition-all hover:scale-[1.02]"
                >
                  🛡️ DEFEND (0)
                </button>
                <button
                  id="shot-single-btn"
                  onClick={() => handleChaseShot('single')}
                  className="py-3.5 rounded-2xl bg-[#151922] border border-white/10 hover:border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold transition-all hover:scale-[1.02]"
                >
                  ⚡ QUICK SINGLE (1-2)
                </button>
                <button
                  id="shot-boundary-btn"
                  onClick={() => handleChaseShot('boundary')}
                  className="py-3.5 rounded-2xl bg-gradient-to-r from-rose-900/60 to-rose-700/60 border border-rose-500/40 text-rose-200 font-mono text-xs font-bold transition-all hover:scale-[1.02]"
                >
                  🏏 COVER DRIVE (4)
                </button>
                <button
                  id="shot-six-btn"
                  onClick={() => handleChaseShot('six')}
                  className="py-3.5 rounded-2xl bg-gradient-to-r from-amber-900/60 to-amber-700/60 border border-amber-500/40 text-amber-200 font-mono text-xs font-bold transition-all hover:scale-[1.02]"
                >
                  🚀 LOFTED SIX (6)
                </button>
              </div>
            ) : chaseStatus === 'WON' ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-center space-y-2">
                <Crown className="w-8 h-8 mx-auto text-amber-400" />
                <h4 className="font-display font-black text-2xl text-white uppercase">
                  MATCH WON! THE CHASE MASTER STRIKES AGAIN!
                </h4>
                <p className="text-xs font-mono text-emerald-300">
                  Target hunted down with ice in the veins.
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-rose-500/20 border border-rose-500 text-center space-y-2">
                <XCircle className="w-8 h-8 mx-auto text-rose-400" />
                <h4 className="font-display font-black text-2xl text-white uppercase">
                  CHASE INCOMPLETE
                </h4>
                <p className="text-xs font-mono text-rose-300">
                  Pressure took its toll. Hit Reset to try again.
                </p>
              </div>
            )}

            {/* Commentary Log */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-2 max-h-40 overflow-y-auto">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                BALL-BY-BALL COMMENTARY
              </span>
              {chaseLogs.map((log, idx) => (
                <p key={idx} className="text-xs font-mono text-neutral-300 leading-relaxed">
                  • {log}
                </p>
              ))}
            </div>

            <div className="text-[10px] font-mono text-neutral-500 text-center uppercase">
              Notice: Fan-Made Interactive Simulation — Not Real Match Statistics
            </div>
          </div>
        )}

        {/* 2. DECISION SIMULATOR */}
        {activePlayTab === 'decision' && (
          <div className="bg-[#0F1117] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                TACTICAL IQ SIMULATOR
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                KOHLI DECISION SIMULATOR
              </h3>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 space-y-4">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                MATCH SCENARIO #{decisionStep + 1}
              </span>
              <p className="font-display font-bold text-base sm:text-lg text-white leading-relaxed">
                {decisions[decisionStep].scenario}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleDecision('A')}
                className="p-5 rounded-2xl bg-[#151922] border border-white/10 hover:border-amber-500 text-left transition-all hover:scale-[1.02] space-y-2"
              >
                <span className="text-xs font-mono text-amber-400 font-bold block">OPTION A</span>
                <p className="text-xs sm:text-sm text-neutral-200">{decisions[decisionStep].optionA}</p>
              </button>

              <button
                onClick={() => handleDecision('B')}
                className="p-5 rounded-2xl bg-[#151922] border border-white/10 hover:border-amber-500 text-left transition-all hover:scale-[1.02] space-y-2"
              >
                <span className="text-xs font-mono text-amber-400 font-bold block">OPTION B</span>
                <p className="text-xs sm:text-sm text-neutral-200">{decisions[decisionStep].optionB}</p>
              </button>
            </div>

            {decisionFeedback && (
              <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/40 text-xs sm:text-sm font-mono text-amber-300">
                {decisionFeedback}
              </div>
            )}
          </div>
        )}

        {/* 3. GUESS THE INNINGS */}
        {activePlayTab === 'guess' && (
          <div className="bg-[#0F1117] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                  RAPID ROUND • &lt;30 SECONDS
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  GUESS THE INNINGS
                </h3>
              </div>
              <button
                onClick={nextGuess}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                Next Match <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Clues Box */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-b border-white/5 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Score</span>
                  <p className="font-heading font-black text-3xl text-amber-400">
                    {currentGuess.clues.score}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Balls</span>
                  <p className="font-heading font-black text-3xl text-white">
                    {currentGuess.clues.balls}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Boundaries</span>
                  <p className="font-heading font-black text-3xl text-cyan-400">
                    {currentGuess.clues.fours}x4 / {currentGuess.clues.sixes}x6
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Strike Rate</span>
                  <p className="font-heading font-black text-3xl text-purple-400">
                    {currentGuess.clues.strikeRate}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Key Match Context:</span>
                <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed">
                  {currentGuess.clues.keyContextClue}
                </p>
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentGuess.options.map((opt) => {
                const isSelected = selectedGuessOption === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`guess-opt-${opt.id}`}
                    onClick={() => handleGuessSubmit(opt.id, opt.isCorrect)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500 text-white'
                          : 'bg-rose-950/60 border-rose-500 text-white'
                        : 'bg-[#12151D] border-white/10 hover:border-white/30 text-neutral-300'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      {opt.opponent} • {opt.year}
                    </span>
                    <p className="font-display font-bold text-sm text-white">{opt.matchTitle}</p>
                    <span className="text-xs text-neutral-400 font-mono mt-1 block">{opt.venue}</span>
                  </button>
                );
              })}
            </div>

            {selectedGuessOption && (
              <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/40 text-xs sm:text-sm font-mono text-cyan-300">
                {currentGuess.explanation}
              </div>
            )}
          </div>
        )}

        {/* 4. MASTER 10-QUESTION QUIZ */}
        {activePlayTab === 'quiz' && (
          <div className="bg-[#0F1117] border border-purple-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            {!quizFinished ? (
              <>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                      QUESTION {quizQuestionIndex + 1} OF {KOHLI_QUIZ_QUESTIONS.length}
                    </span>
                    <h3 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                      HOW WELL DO YOU KNOW KOHLI?
                    </h3>
                  </div>
                  <div className="text-right font-mono text-xs text-neutral-400">
                    Score: <strong className="text-amber-400 text-base">{quizScore}</strong>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-2xl p-6">
                  <p className="font-display font-bold text-base sm:text-lg text-white leading-relaxed">
                    {currentQuizQ.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuizQ.options.map((opt, idx) => {
                    const isSelected = selectedQuizAnswer === idx;
                    const isCorrect = idx === currentQuizQ.correctIndex;

                    return (
                      <button
                        key={idx}
                        id={`quiz-choice-${idx}`}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`p-4 rounded-2xl border text-left transition-all font-mono text-xs sm:text-sm ${
                          selectedQuizAnswer !== null
                            ? isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500 text-white'
                              : isSelected
                              ? 'bg-rose-950/60 border-rose-500 text-white'
                              : 'bg-black/40 border-white/5 text-neutral-500'
                            : 'bg-[#12151D] border-white/10 hover:border-purple-500 text-neutral-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedQuizAnswer !== null && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/40 text-xs sm:text-sm font-mono text-purple-300">
                      {currentQuizQ.explanation}
                    </div>

                    <button
                      onClick={handleNextQuizQuestion}
                      className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      {quizQuestionIndex + 1 < KOHLI_QUIZ_QUESTIONS.length
                        ? 'Next Question →'
                        : 'Finish Quiz & View Rank 👑'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-6 py-6">
                <Crown className="w-16 h-16 mx-auto text-amber-400 animate-bounce" />
                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    QUIZ COMPLETED
                  </span>
                  <h3 className="font-display font-black text-4xl text-white">
                    {quizScore >= 9
                      ? 'KING CERTIFIED 👑'
                      : quizScore >= 7
                      ? 'DIE-HARD 18 FAN ⚡'
                      : quizScore >= 4
                      ? 'KOHLI ENTHUSIAST 🏏'
                      : 'CASUAL VIEWER 📺'}
                  </h3>
                  <p className="text-sm font-mono text-amber-400">
                    You scored {quizScore} out of {KOHLI_QUIZ_QUESTIONS.length}
                  </p>
                </div>

                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 rounded-2xl bg-white text-black font-mono text-xs font-bold uppercase transition-all hover:scale-105"
                >
                  Play Quiz Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* 5. KOHLI AURA SCORE METER */}
        {activePlayTab === 'aura' && (
          <div className="bg-[#0F1117] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                FAN-MADE CALCULATOR • FOR ENTERTAINMENT
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                KOHLI AURA SCORE
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-300">Match Pressure:</span>
                    <span className="text-rose-400">{auraPressure}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={auraPressure}
                    onChange={(e) => setAuraPressure(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-300">Target Deficit / Chase Stakes:</span>
                    <span className="text-amber-400">{auraTarget}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={auraTarget}
                    onChange={(e) => setAuraTarget(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-300">Bowler Threat / Speed (145+ km/h):</span>
                    <span className="text-cyan-400">{auraBowlerSpeed}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={auraBowlerSpeed}
                    onChange={(e) => setAuraBowlerSpeed(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>

              {/* Dynamic Aura Visual */}
              <div className="bg-black/60 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-3">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  CALCULATED MATCH AURA
                </span>
                <div className="font-heading font-black text-6xl text-emerald-400">
                  {calculatedAuraScore}/100
                </div>
                <p className="text-xs font-mono text-neutral-300">
                  {calculatedAuraScore >= 95
                    ? '👑 GOD MODE: Defying physics at the MCG'
                    : calculatedAuraScore >= 85
                    ? '⚡ UNSTOPPABLE: Total command over the opposition'
                    : '🏏 ELITE: Masterful execution under pressure'}
                </p>
                <span className="text-[9px] font-mono text-neutral-500 block pt-2">
                  Fan-made entertainment score
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. BUILD YOUR INDIA XI */}
        {activePlayTab === 'india11' && (
          <div className="bg-[#0F1117] border border-blue-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold">
                  SQUAD BUILDER • {selectedXI.length}/11 SELECTED
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  BUILD YOUR ALL-TIME INDIA XI
                </h3>
              </div>
            </div>

            {/* Available Players Grid */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400 uppercase">
                Click to Select / Deselect Players:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {CURATED_INDIA_XI_PLAYERS.map((p) => {
                  const isSelected = selectedXI.some((item) => item.id === p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlayerInXI(p)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg'
                          : 'bg-[#12151D] border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-mono text-blue-300 font-bold">{p.role}</span>
                        {p.isCaptainChoice && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-black text-[9px] font-bold">
                            CAPTAIN
                          </span>
                        )}
                      </div>
                      <p className="font-display font-bold text-xs text-white">{p.name}</p>
                      <span className="text-[10px] text-neutral-400 truncate block mt-1">
                        {p.specialSkill}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected XI Display */}
            <div className="bg-black/60 border border-white/10 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                YOUR SELECTED PLAYING XI ({selectedXI.length}/11)
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedXI.map((p, idx) => (
                  <span
                    key={p.id}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5"
                  >
                    <span className="text-neutral-500">{idx + 1}.</span> {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. WHAT IF SIMULATOR */}
        {activePlayTab === 'whatif' && (
          <div className="bg-[#0F1117] border border-teal-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono font-bold">
                SIMULATION — NOT OFFICIAL STATISTICS
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                WHAT IF? CAREER PROJECTOR
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase">
                    Select Projection Scenario:
                  </span>
                  <div className="flex gap-2">
                    {WHAT_IF_SCENARIOS.map((s, idx) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          soundFx.playClick();
                          setWhatIfScenarioIndex(idx);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                          whatIfScenarioIndex === idx
                            ? 'bg-teal-500 text-black border-teal-500'
                            : 'bg-black/40 border-white/10 text-neutral-400'
                        }`}
                      >
                        +{s.matchesToPlay} ODIs
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase">
                    Form Trajectory Mode:
                  </span>
                  <div className="flex gap-2">
                    {(['conservative', 'average', 'peak'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          soundFx.playClick();
                          setWhatIfMode(m);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize border transition-all ${
                          whatIfMode === m
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-black/40 border-white/10 text-neutral-400'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-neutral-400 font-mono">
                  {currentWhatIf.description}
                </p>
              </div>

              {/* Projection Result */}
              <div className="bg-black/60 border border-teal-500/40 rounded-3xl p-6 space-y-4">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  PROJECTED ODI CAREER TOTALS
                </span>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Est. Total ODI Runs
                    </span>
                    <p className="font-heading font-black text-3xl sm:text-4xl text-teal-400">
                      {projectedFinalRuns.toLocaleString()}
                    </p>
                    <span className="text-[10px] font-mono text-neutral-500">
                      +{projectedExtraRuns} runs
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Est. Total ODI Tons
                    </span>
                    <p className="font-heading font-black text-3xl sm:text-4xl text-amber-400">
                      {projectedFinalTons}
                    </p>
                    <span className="text-[10px] font-mono text-neutral-500">
                      +{projectedExtraTons} centuries
                    </span>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-neutral-500 text-center uppercase pt-2 border-t border-white/5">
                  Notice: Model simulation for fan illustration.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

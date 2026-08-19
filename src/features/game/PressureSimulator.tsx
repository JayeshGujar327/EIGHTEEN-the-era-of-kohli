import { useState } from 'react';
import { Play, RotateCcw, Heart, Zap, Volume2, ShieldAlert, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SIMULATOR_SCENARIOS } from '../../data/kohliData';
import { SimulatorScenario, SimulatorChoice } from '../../types';
import { soundFx } from '../../utils/audioEngine';

export function PressureSimulator() {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<SimulatorChoice | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const scenario = SIMULATOR_SCENARIOS[selectedScenarioIdx];
  const step = scenario.steps[currentStepIdx];

  const handleScenarioChange = (idx: number) => {
    soundFx.playClick();
    setSelectedScenarioIdx(idx);
    resetGame();
  };

  const resetGame = () => {
    setCurrentStepIdx(0);
    setSelectedChoice(null);
    setTotalScore(0);
    setIsGameOver(false);
    setIsSuccess(false);
  };

  const handleMakeShotChoice = (choice: SimulatorChoice) => {
    setSelectedChoice(choice);
    soundFx.playHeartbeat();

    if (choice.audioFeedback === 'legendary') {
      setTimeout(() => {
        soundFx.playBatCrack();
        soundFx.playCrowdRoar();
      }, 300);
    } else if (choice.audioFeedback === 'crack') {
      setTimeout(() => soundFx.playBatCrack(), 300);
    }

    const newTotal = totalScore + choice.runsScored;
    setTotalScore(newTotal);

    // Check if last step in scenario
    if (currentStepIdx === scenario.steps.length - 1) {
      setIsGameOver(true);
      const won = choice.isCorrectMasterChoice || newTotal >= 12;
      setIsSuccess(won);

      if (won) {
        setTimeout(() => {
          soundFx.playCelebrationChime();
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#E11D48', '#F59E0B', '#06B6D4', '#FFFFFF'],
          });
        }, 600);
      }
    }
  };

  const handleNextBall = () => {
    soundFx.playClick();
    setSelectedChoice(null);
    setCurrentStepIdx((prev) => prev + 1);
  };

  return (
    <section id="simulator" className="py-24 bg-[#0A0C10] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono tracking-[0.2em] uppercase">
              <Zap className="w-3.5 h-3.5" />
              INTERACTIVE CHASE ARENA
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              PRESSURE SIMULATOR
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Step into Virat Kohli’s shoes at the crease. Make split-second shot calculations under unbearable scoreboard tension and experience his actual tactical mindset.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex items-center gap-2 bg-[#12151D] border border-white/10 p-1 rounded-xl">
            {SIMULATOR_SCENARIOS.map((scen, idx) => (
              <button
                key={scen.id}
                id={`scenario-tab-${scen.id}`}
                onClick={() => handleScenarioChange(idx)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold font-mono tracking-wider transition-all ${
                  selectedScenarioIdx === idx
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {scen.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Game Simulator Card */}
        <div className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Match Atmosphere Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                {scenario.match}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                {scenario.title}
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                📍 {scenario.venue} • {scenario.date}
              </p>
            </div>

            {/* Scoreboard Ticker */}
            <div className="flex items-center gap-4 bg-black/60 border border-white/10 px-4 py-2 rounded-xl">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">RUNS ADDED</span>
                <span className="font-heading text-2xl font-black text-amber-400">
                  +{totalScore}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">BALL</span>
                <span className="font-mono-num text-lg font-bold text-white">
                  {currentStepIdx + 1} / {scenario.steps.length}
                </span>
              </div>
            </div>
          </div>

          {/* Active Pitch Situation */}
          {!isGameOver ? (
            <div className="py-8 space-y-8">
              {/* Bowler Run-Up & Speed info */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-mono font-bold uppercase text-neutral-300">
                      BOWLER RUNNING IN: {step.bowler}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-200 font-medium">
                    {step.ballType}
                  </p>
                  <p className="text-xs text-neutral-400 font-light italic">
                    {step.situationContext}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-[#181B26] px-4 py-2.5 rounded-xl border border-white/10 self-start sm:self-auto">
                  <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Pace</span>
                    <span className="font-mono-num font-bold text-sm text-white">
                      {step.bowlerSpeed}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shot Selection Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    CHOOSE YOUR SHOT RESPONSE:
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Time to react: 0.4 seconds
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {step.choices.map((choice) => {
                    const isSelected = selectedChoice?.id === choice.id;
                    return (
                      <button
                        key={choice.id}
                        id={`shot-choice-${choice.id}`}
                        disabled={selectedChoice !== null}
                        onClick={() => handleMakeShotChoice(choice)}
                        className={`p-5 rounded-2xl text-left border transition-all duration-300 relative flex flex-col justify-between ${
                          isSelected
                            ? choice.isCorrectMasterChoice
                              ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40'
                              : 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/40'
                            : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
                        } ${selectedChoice !== null && !isSelected ? 'opacity-40' : ''}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                choice.risk === 'EXTREME'
                                  ? 'bg-red-500/20 text-red-300'
                                  : choice.risk === 'HIGH'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-cyan-500/20 text-cyan-300'
                              }`}
                            >
                              {choice.risk} RISK
                            </span>
                            {selectedChoice && isSelected && (
                              <span className="font-heading text-xl font-bold text-white">
                                +{choice.runsScored} RUNS
                              </span>
                            )}
                          </div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2 leading-snug">
                            {choice.shotName}
                          </h4>
                          <p className="text-xs text-neutral-400 font-light leading-relaxed">
                            {choice.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback & Commentary on Shot Taken */}
              {selectedChoice && (
                <div className="bg-[#151822] border border-white/15 rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase font-bold text-rose-400">
                      🎙️ LIVE COMMENTARY:
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-white">
                      {selectedChoice.commentary}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block font-semibold">
                      🧠 VIRAT’S IN-GAME THOUGHT PROCESS:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      "{selectedChoice.viratMindsetNote}"
                    </p>
                  </div>

                  {currentStepIdx < scenario.steps.length - 1 && (
                    <button
                      id="next-ball-btn"
                      onClick={handleNextBall}
                      className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center gap-2"
                    >
                      FACE NEXT DELIVERY
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Simulation End Screen */
            <div className="py-12 text-center max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-rose-600/20 border border-rose-500/40 text-rose-400">
                {isSuccess ? <Sparkles className="w-8 h-8 text-amber-400" /> : <AlertTriangle className="w-8 h-8 text-rose-400" />}
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
                  {isSuccess ? 'CHASE MASTERED!' : 'CHASE COMPLETED'}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {isSuccess
                    ? 'You channeled the ice-cold calculation of number 18 to conquer the impossible target!'
                    : 'A brave effort at the crease. To pull off historic chases, every single calculation must be executed with millimeter precision.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 inline-flex items-center gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Total Runs Scored</span>
                  <span className="font-heading text-3xl font-black text-amber-400">
                    +{totalScore} Runs
                  </span>
                </div>
              </div>

              <div>
                <button
                  id="restart-simulator-btn"
                  onClick={resetGame}
                  className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  REPLAY SCENARIO
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

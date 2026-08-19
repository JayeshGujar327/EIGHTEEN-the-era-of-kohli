import { useState } from 'react';
import { ChevronRight, Volume2, Quote, Flame, Shield, Award, Sparkles, BookOpen } from 'lucide-react';
import { STORY_CHAPTERS } from '../../data/kohliData';
import { ThemeMode, StoryChapter } from '../../types';
import { soundFx } from '../../utils/audioEngine';

interface ChaptersStorySectionProps {
  activeTheme: ThemeMode;
}

export function ChaptersStorySection({ activeTheme }: ChaptersStorySectionProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(STORY_CHAPTERS[0].id);

  // Filter chapters based on active theme
  const filteredChapters = STORY_CHAPTERS.filter((chap) => {
    if (activeTheme === 'all') return true;
    return chap.theme === activeTheme;
  });

  const selectedChapter = STORY_CHAPTERS.find((c) => c.id === selectedChapterId) || filteredChapters[0] || STORY_CHAPTERS[0];

  const handleSelectChapter = (chapter: StoryChapter) => {
    soundFx.playClick();
    setSelectedChapterId(chapter.id);
  };

  const handlePlayImpact = () => {
    soundFx.playBatCrack();
    setTimeout(() => soundFx.playCrowdRoar(), 250);
  };

  const getThemeIcon = (theme: StoryChapter['theme']) => {
    switch (theme) {
      case 'aggression':
        return <Flame className="w-3.5 h-3.5 text-rose-500" />;
      case 'discipline':
        return <Shield className="w-3.5 h-3.5 text-cyan-400" />;
      case 'legacy':
        return <Award className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  return (
    <section id="story" className="py-24 bg-[#08090C] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
              <BookOpen className="w-3.5 h-3.5 text-rose-500" />
              THE 9 PILLARS OF IMMORTALITY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              DOCUMENTARY CHAPTERS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light">
              Follow the cinematic narrative arc of Virat Kohli’s journey — from childhood grief and rebellion to master craftsmanship and immortality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">
              SHOWING {filteredChapters.length} OF 9 CHAPTERS
            </span>
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Navigation List (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredChapters.map((chapter) => {
              const isCurrent = chapter.id === selectedChapter.id;
              return (
                <button
                  key={chapter.id}
                  id={`chapter-tab-${chapter.numStr}`}
                  onClick={() => handleSelectChapter(chapter)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-[#151821] border-rose-500/60 shadow-xl ring-1 ring-rose-500/30'
                      : 'bg-[#0F1117] border-white/5 hover:border-white/20 hover:bg-[#12151D]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Chapter Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading text-lg font-black transition-colors ${
                        isCurrent
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                          : 'bg-white/5 text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      {chapter.numStr}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        {getThemeIcon(chapter.theme)}
                        <span className="text-[10px] font-mono-num uppercase tracking-wider text-neutral-400">
                          {chapter.period}
                        </span>
                      </div>
                      <h3
                        className={`font-display text-sm sm:text-base font-bold tracking-wide transition-colors ${
                          isCurrent ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-neutral-400 line-clamp-1 font-light">
                        {chapter.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isCurrent
                        ? 'text-rose-500 translate-x-1'
                        : 'text-neutral-600 group-hover:text-neutral-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Featured Chapter Cinematic Dossier (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div
              id="active-chapter-dossier"
              className="bg-[#0F1117] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500"
            >
              {/* Top Accent Gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${selectedChapter.bgGradient} pointer-events-none opacity-80`}
              />

              {/* Header Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl sm:text-5xl font-black text-white/20">
                    CHAPTER {selectedChapter.numStr}
                  </span>
                  <span className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider bg-white/5 border border-white/10 rounded-full text-neutral-300">
                    {selectedChapter.period}
                  </span>
                </div>

                <button
                  id="play-chapter-impact-btn"
                  onClick={handlePlayImpact}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors border border-white/10"
                >
                  <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                  AUDIO HIT
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="relative z-10 space-y-2 mb-6">
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight uppercase leading-tight">
                  {selectedChapter.title}
                </h3>
                <p className="font-editorial text-base sm:text-lg text-rose-400/90 font-medium">
                  {selectedChapter.subtitle}
                </p>
              </div>

              {/* Hero Stat Box */}
              <div className="relative z-10 mb-8 p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-1">
                    DEFINING METRIC
                  </span>
                  <span className="font-heading text-3xl sm:text-4xl font-black text-white tracking-wide">
                    {selectedChapter.heroStat}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300 block font-light mt-0.5">
                    {selectedChapter.heroStatLabel}
                  </span>
                </div>
                <div className="font-heading text-6xl font-black text-white/10 select-none">
                  18
                </div>
              </div>

              {/* Chapter Narration Paragraphs */}
              <div className="relative z-10 space-y-4 mb-8 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
                {selectedChapter.narration.map((para, i) => (
                  <p key={i} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              {/* Quote Block */}
              <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-rose-400">
                  <Quote className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    AUTHENTIC PHILOSOPHY
                  </span>
                </div>
                <p className="text-xs sm:text-sm italic text-neutral-200 font-editorial leading-relaxed">
                  "{selectedChapter.keyQuote}"
                </p>
                <span className="text-[11px] font-mono font-medium text-neutral-400 block text-right">
                  — {selectedChapter.quoteAuthor}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import {
  Code2,
  User,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Palette,
  Terminal,
  CheckCircle2,
  Trophy,
  Shield,
  Flame,
  Award,
  BookOpen,
  ArrowUpRight,
  Heart,
  Copy,
  Check,
  Compass,
  Zap,
} from 'lucide-react';
import { soundFx } from '../../utils/audioEngine';
import confetti from 'canvas-confetti';
import { ThemeMode } from '../../types';

interface DeveloperSectionProps {
  activeTheme?: ThemeMode;
}

export function DeveloperSection({ activeTheme = 'all' }: DeveloperSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'built' | 'stack' | 'philosophy' | 'skills'>('overview');

  const developerEmail = 'gujarj327@gmail.com';
  const githubUrl = 'https://github.com/JayeshGujar327';
  const linkedinUrl = 'https://www.linkedin.com/in/jayesh-gujar-943626315/';
  const instagramUrl = 'https://www.instagram.com/thejayesh327/';

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(developerEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCelebrateCreator = () => {
    soundFx.playLegendary();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#F59E0B', '#06B6D4', '#FFFFFF'],
    });
  };

  // Technologies actually present in this project
  const techStack = [
    {
      name: 'React 19',
      category: 'Frontend Core',
      description: 'Modern component-driven UI architecture, hooks, and declarative state orchestration.',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/20',
      icon: Code2,
    },
    {
      name: 'TypeScript',
      category: 'Type Safety',
      description: 'Strict compile-time type validation across player stats, records, and interactive engines.',
      badgeColor: 'border-blue-500/30 text-blue-300 bg-blue-950/20',
      icon: Terminal,
    },
    {
      name: 'Vite 6',
      category: 'Build Tooling',
      description: 'Next-generation lightning frontend build engine with optimized production treeshaking.',
      badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-950/20',
      icon: Zap,
    },
    {
      name: 'Tailwind CSS 4',
      category: 'Styling & Design',
      description: 'Utility-first modern design system supporting dark & light modes and responsive typography.',
      badgeColor: 'border-sky-500/30 text-sky-300 bg-sky-950/20',
      icon: Palette,
    },
    {
      name: 'Motion (Framer)',
      category: 'Interactions',
      description: 'Smooth layout animations, transition choreography, and gesture-driven UI feedback.',
      badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-950/20',
      icon: Sparkles,
    },
    {
      name: 'Web Audio API',
      category: 'Audio Synthesis',
      description: 'Zero-asset procedural audio engine synthesizing bat cracks, crowd murmurs, and cheers.',
      badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-950/20',
      icon: Cpu,
    },
    {
      name: 'Canvas Confetti',
      category: 'Visual FX',
      description: 'Lightweight particle physics engine for milestone celebrations and King Mode fanfare.',
      badgeColor: 'border-yellow-500/30 text-yellow-300 bg-yellow-950/20',
      icon: Trophy,
    },
    {
      name: 'Express.js & Node.js',
      category: 'Server Layer',
      description: 'Lightweight Node.js backend proxying AI assistant interactions and production static serving.',
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/20',
      icon: Layers,
    },
    {
      name: 'Google GenAI SDK',
      category: 'AI Integration',
      description: 'Grounded career query engine assisting fans with verified match data and records.',
      badgeColor: 'border-violet-500/30 text-violet-300 bg-violet-950/20',
      icon: Sparkles,
    },
    {
      name: 'Lucide Icons',
      category: 'Vector Graphics',
      description: 'Clean, uniform, and accessible iconography enhancing scannability across all views.',
      badgeColor: 'border-zinc-500/30 text-zinc-300 bg-zinc-950/20',
      icon: CheckCircle2,
    },
  ];

  // Core feature modules built inside the project
  const builtFeatures = [
    {
      title: 'Interactive 7-Pillar Experience Hub',
      area: 'Architecture & UX',
      description:
        'Engineered an intuitive single-page museum flow encompassing Home, Journey, Stats, Records, Moments, Play, and Legacy with active scroll spy.',
      icon: Compass,
    },
    {
      title: 'The Machine & Opponent Matrix',
      area: 'Data Visualization',
      description:
        'Multi-axis statistical filter comparing all formats (ODI, TEST, T20I, IPL) and verified head-to-head records vs Pakistan, Australia, England, and South Africa.',
      icon: Terminal,
    },
    {
      title: 'VS Legends Comparison Engine',
      area: 'Interactive Analytics',
      description:
        'Head-to-head statistical engine benchmarking Kohli against Sachin Tendulkar, Ponting, Lara, Smith, Root, Williamson, Rohit, and AB de Villiers.',
      icon: Trophy,
    },
    {
      title: 'The Record Vault & 85 Tons Hall',
      area: 'Milestone Preservation',
      description:
        'Filterable hall of immortality detailing all 54 ODI tons, 85 international centuries, 973 IPL runs, 7 double centuries, and chase averages.',
      icon: Shield,
    },
    {
      title: '6-Stage Match Anatomy & Fan Memories',
      area: 'Cinematic Storytelling',
      description:
        'Deconstruction of iconic chases (Hobart 133*, MCG 82*, Wankhede 50th ton) paired with a personalized fan tribute souvenir generator.',
      icon: BookOpen,
    },
    {
      title: 'The Interactive Play Pavilion',
      area: 'Gamification & Engagement',
      description:
        'Recreate The Chase match simulator, Decision Simulator, Guess The Innings game, 10-Question Master Quiz, Aura Score calculator, and India XI builder.',
      icon: Flame,
    },
    {
      title: 'Zero-Asset Procedural Audio Engine',
      area: 'Web Audio Engineering',
      description:
        'Crafted an in-browser Web Audio synthesizer generating custom sound effects (bat cracks, crowd murmurs, chimes) without heavy external MP3 downloads.',
      icon: Cpu,
    },
    {
      title: 'Dark / Light Adaptive Theme System',
      area: 'Design System',
      description:
        'Dual-theme CSS variable architecture ensuring pristine contrast, readability, and mood across dark stadium lights and crisp day-match modes.',
      icon: Palette,
    },
  ];

  // Development process flow
  const developmentStages = [
    { step: '01', title: 'Concept & Vision', desc: 'Framing Kohli’s 18-year career not as a list of numbers, but as an emotional digital museum.' },
    { step: '02', title: 'Data Curation', desc: 'Verifying 562 matches, 85 centuries, 14,941 ODI runs, and head-to-head statistics.' },
    { step: '03', title: 'Information Architecture', desc: 'Structuring the 7 core pillars with clear visual hierarchy and zero unnecessary friction.' },
    { step: '04', title: 'UI & Motion Design', desc: 'Pairing bold athletic typography with subtle gold/rose/cyan accents and smooth transitions.' },
    { step: '05', title: 'Interactive Engineering', desc: 'Building the quiz engine, match simulator, comparison matrix, and procedural sound.' },
    { step: '06', title: 'Optimization & Polish', desc: 'Ensuring 100% responsive fluid layouts across mobile, tablet, and ultra-wide screens.' },
  ];

  // Developer skill categories
  const skillCategories = [
    {
      title: 'Frontend Engineering',
      skills: ['React 19', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & Semantic Markup', 'CSS3 & Responsive Design', 'Single Page Architecture (SPA)', 'Component Design Systems'],
      icon: Code2,
      color: 'text-rose-400',
    },
    {
      title: 'UI/UX & Creative Tech',
      skills: ['Visual Hierarchy & Typography', 'Web Audio API Synthesis', 'Micro-interactions & Animations', 'Accessible Design (WCAG)', 'Information Architecture', 'Data Visualization UI'],
      icon: Palette,
      color: 'text-amber-400',
    },
    {
      title: 'Backend & Tools',
      skills: ['Node.js', 'Express.js', 'Vite', 'Git & GitHub', 'REST APIs', 'Google GenAI SDK Integration', 'esbuild & Bundle Optimization'],
      icon: Terminal,
      color: 'text-cyan-400',
    },
  ];

  return (
    <section id="developer" className="py-24 bg-[#07080B] relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-mono tracking-[0.25em] text-rose-400 uppercase">
              <User className="w-3.5 h-3.5" />
              DEVELOPER & CREATOR CASE STUDY
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              THE MIND BEHIND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-rose-400">
                EIGHTEEN
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Designed, developed, and crafted as a digital tribute to an era that defined a generation of Indian cricket — demonstrating modern frontend engineering, UI/UX storytelling, and interactive web craftsmanship.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              id="dev-github-top-btn"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jayesh Gujar on GitHub"
              onClick={() => soundFx.playClick()}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
            </a>

            <a
              id="dev-linkedin-top-btn"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jayesh Gujar on LinkedIn"
              onClick={() => soundFx.playClick()}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/40 text-sky-200 font-mono text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sky-300" />
            </a>

            <a
              id="dev-instagram-top-btn"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jayesh Gujar on Instagram"
              onClick={() => soundFx.playClick()}
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 hover:from-purple-900/50 hover:to-pink-900/50 border border-pink-500/30 text-pink-200 font-mono text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-pink-300" />
            </a>

            <button
              id="dev-celebrate-btn"
              onClick={handleCelebrateCreator}
              aria-label="Applaud Creator"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-mono text-xs font-bold uppercase shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Applaud</span>
            </button>
          </div>
        </div>

        {/* Profile Card & Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Creator Profile Summary Card */}
          <div className="lg:col-span-5 bg-[#0D0F16] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-600 via-neutral-800 to-amber-500 p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full bg-[#0E1118] rounded-[14px] flex items-center justify-center">
                    <span className="font-heading font-black text-2xl text-white">JG</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                    Jayesh Gujar
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-rose-400">
                    Full-Stack Developer & UI/UX Engineer
                  </p>
                  <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for High-Impact Projects
                  </span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5 space-y-3">
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  Passionate web developer specializing in building immersive, high-performance web applications with modern React, TypeScript, and rich interactive animations.
                </p>

                <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-rose-400" />
                      Email:
                    </span>
                    <a
                      href={`mailto:${developerEmail}`}
                      aria-label="Email Jayesh Gujar"
                      className="text-white hover:text-rose-300 underline underline-offset-2 transition-colors select-all"
                    >
                      {developerEmail}
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-white" />
                      GitHub:
                    </span>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Jayesh Gujar on GitHub"
                      className="text-neutral-200 hover:text-white underline underline-offset-2 transition-colors flex items-center gap-1"
                    >
                      JayeshGujar327
                      <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                      LinkedIn:
                    </span>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Jayesh Gujar on LinkedIn"
                      className="text-sky-300 hover:text-sky-200 underline underline-offset-2 transition-colors flex items-center gap-1"
                    >
                      Jayesh Gujar
                      <ArrowUpRight className="w-3 h-3 text-sky-400" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      Instagram:
                    </span>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Jayesh Gujar on Instagram"
                      className="text-pink-300 hover:text-pink-200 underline underline-offset-2 transition-colors flex items-center gap-1"
                    >
                      @thejayesh327
                      <ArrowUpRight className="w-3 h-3 text-pink-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 relative z-10">
              <button
                id="dev-copy-email-btn"
                onClick={handleCopyEmail}
                aria-label="Copy Jayesh Gujar's email address"
                className="flex-1 min-w-[140px] px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-200 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Email copied ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                id="dev-mail-link"
                href={`mailto:${developerEmail}?subject=Regarding%20EIGHTEEN%20Project`}
                aria-label="Email Jayesh Gujar"
                onClick={() => soundFx.playClick()}
                className="flex-1 min-w-[140px] px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </a>
            </div>
          </div>

          {/* "Why I Built EIGHTEEN" - Storytelling Card */}
          <div className="lg:col-span-7 bg-[#0D0F16] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 fill-amber-400" />
                MOTIVATION & VISION
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Why I Built EIGHTEEN
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                <p>
                  Cricket for millions of us is not merely a sport; it is an emotional anchor. For over a decade and a half, <strong className="text-white font-medium">Virat Kohli (Jersey No. 18)</strong> redefined Indian sport with an unapologetic pursuit of perfection, ruthless fitness standards, and an unmatched ability to execute impossible run chases.
                </p>
                <p>
                  Most cricket websites reduce a legendary career to static Wikipedia tables or noisy ad-filled blogs. I wanted to build something worthy of the legacy: a <strong className="text-rose-400 font-medium">cinematic digital museum</strong> that allows fans to relive the 2012 Hobart carnage, feel the sheer tension of the 2022 MCG miracle, inspect the anatomy of 85 international centuries, and test their cricket acumen through interactive simulators.
                </p>
                <p className="italic text-neutral-400 border-l-2 border-amber-500/60 pl-3">
                  "This project represents the convergence of two personal passions: the artistry of Indian cricket and the limitless possibilities of modern frontend engineering."
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                <span className="font-heading font-black text-xl text-white block">18+</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Years of Lore</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                <span className="font-heading font-black text-xl text-rose-400 block">85</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Centuries Data</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                <span className="font-heading font-black text-xl text-amber-400 block">7</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Museum Pillars</span>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center">
                <span className="font-heading font-black text-xl text-cyan-400 block">100%</span>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Interactive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/5">
          {[
            { id: 'overview', label: 'PROJECT DETAILS', icon: BookOpen },
            { id: 'built', label: 'WHAT I BUILT', icon: Layers },
            { id: 'stack', label: 'TECH STACK', icon: Cpu },
            { id: 'philosophy', label: 'DESIGN PHILOSOPHY', icon: Palette },
            { id: 'skills', label: 'DEVELOPER SKILLS', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`dev-tab-${tab.id}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50 scale-[1.02]'
                    : 'bg-[#10131B] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Project Details & Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Summary Specification Card */}
            <div className="bg-[#0E1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest mb-4">
                <Shield className="w-3.5 h-3.5" />
                PROJECT SPECIFICATION SHEET
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Project Name</span>
                  <div className="font-display font-bold text-white text-base">
                    EIGHTEEN — The Legacy We Witnessed
                  </div>
                  <p className="text-xs text-neutral-400">Interactive Digital Museum & Tribute</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Creator / Developer</span>
                  <div className="font-display font-bold text-rose-400 text-base">
                    Jayesh Gujar
                  </div>
                  <p className="text-xs text-neutral-400">Full-Stack & Frontend Engineer</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Primary Focus</span>
                  <div className="font-display font-bold text-amber-300 text-base">
                    Virat Kohli (Jersey No. 18)
                  </div>
                  <p className="text-xs text-neutral-400">Milestones, Mindset, Records & Chases</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Core Architecture</span>
                  <div className="font-display font-bold text-cyan-300 text-base">
                    React 19 + TypeScript + Vite
                  </div>
                  <p className="text-xs text-neutral-400">Client SPA with Serverless API Endpoints</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Current Status</span>
                  <div className="font-display font-bold text-emerald-400 text-base flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Fully Interactive
                  </div>
                  <p className="text-xs text-neutral-400">Verified through 19 August 2026</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">Design System</span>
                  <div className="font-display font-bold text-purple-300 text-base">
                    Tailwind CSS + Dark/Light Mode
                  </div>
                  <p className="text-xs text-neutral-400">Cabinet Grotesk + JetBrains Mono Typography</p>
                </div>
              </div>
            </div>

            {/* Development Lifecycle Flow */}
            <div className="bg-[#0E1017] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5" />
                THE DEVELOPMENT LIFECYCLE
              </div>

              <h4 className="font-display font-black text-2xl text-white">
                From Research to Immersive Experience
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {developmentStages.map((st) => (
                  <div
                    key={st.step}
                    className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all space-y-2 group"
                  >
                    <span className="font-mono font-bold text-xs text-rose-500 group-hover:text-amber-400 transition-colors">
                      STEP {st.step}
                    </span>
                    <h5 className="font-display font-bold text-white text-base">
                      {st.title}
                    </h5>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: What I Built */}
        {activeTab === 'built' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {builtFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#0E1017] border border-white/10 hover:border-rose-500/40 rounded-2xl p-6 transition-all duration-300 space-y-3 group shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-rose-600/20 group-hover:border-rose-500/30 transition-colors">
                        <Icon className="w-5 h-5 text-rose-400" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 uppercase">
                        {feat.area}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-white group-hover:text-rose-300 transition-colors">
                      {feat.title}
                    </h4>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Technology Stack */}
        {activeTab === 'stack' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-[#0E1017] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AUTHENTIC WORKSPACE STACK
              </div>
              <h3 className="font-display font-black text-2xl text-white">
                Technologies Used in EIGHTEEN
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-3xl">
                Every technology listed here is actively bundled and running inside this project without redundant dependencies or artificial bloat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0D0F16] border border-white/10 hover:border-white/20 transition-all space-y-3 group shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-display font-bold text-white text-base">
                          {tech.name}
                        </h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] font-mono ${tech.badgeColor}`}>
                        {tech.category}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: Design Philosophy */}
        {activeTab === 'philosophy' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  01 • TYPOGRAPHIC HIERARCHY
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Mathematical Scales & High Legibility
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Strictly avoiding generic AI UI templates. Headings employ high-contrast display geometry paired with crisp mono numbers for scorecards and averages.
                </p>
              </div>

              <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                  02 • EMOTIONAL CINEMA
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Atmospheric Storytelling
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Every chapter and match anatomy is framed with lighting cues, stadium acoustics, and curated real quotes capturing the raw psychological tension.
                </p>
              </div>

              <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  03 • DATA INTEGRITY
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Zero Fabrication Rule
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Strict separation between official verified cricket statistics (562 matches, 85 centuries, 14,941 ODI runs) and fan-made simulation games.
                </p>
              </div>

              <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                  04 • ZERO BLOAT PERFORMANCE
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Lightweight Web Audio
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Synthesizing audio procedurally via oscillators eliminates megabytes of sound file transfers, delivering sub-second load times on mobile devices.
                </p>
              </div>

              <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                  05 • PURPOSEFUL MICRO-INTERACTIONS
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Tactile Feedback
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Subtle card lifts, particle confetti on hundred milestones, and King Mode celebratory audio transform reading into an active discovery journey.
                </p>
              </div>

              <div className="bg-[#0E1017] border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
                  06 • ADAPTIVE ACCESSIBILITY
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Day & Night Stadium Modes
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Complete support for high-contrast dark stadium viewing alongside a clean daylight paper mode, with accessible 44px minimum touch targets.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Developer Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#0E1017] border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <Icon className={`w-4 h-4 ${cat.color}`} />
                      </div>
                      <h4 className="font-display font-bold text-white text-base">
                        {cat.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-neutral-300 hover:border-rose-500/40 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Developer CTA Bar: GitHub, LinkedIn, Contact */}
        <div className="mt-16 bg-gradient-to-r from-rose-950/40 via-neutral-900/60 to-black border border-white/15 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              CONNECT & COLLABORATE
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl text-white">
              Explore More of My Work
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Have an exciting web engineering opportunity, creative collaboration, or frontend feedback? Feel free to reach out directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <a
              id="dev-github-cta"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jayesh Gujar on GitHub"
              onClick={() => soundFx.playClick()}
              className="px-5 py-3 rounded-2xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Github className="w-4 h-4 text-black" />
              <span>View GitHub</span>
            </a>

            <a
              id="dev-linkedin-cta"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jayesh Gujar on LinkedIn"
              onClick={() => soundFx.playClick()}
              className="px-5 py-3 rounded-2xl bg-[#0077B5] hover:bg-[#00669c] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              id="dev-instagram-cta"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Jayesh Gujar on Instagram"
              onClick={() => soundFx.playClick()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>

            <a
              id="dev-email-cta"
              href={`mailto:${developerEmail}?subject=EIGHTEEN%20Project%20Inquiry`}
              aria-label="Email Jayesh Gujar"
              onClick={() => soundFx.playClick()}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Send an Email</span>
            </a>
          </div>
        </div>

        {/* Acknowledgements & Subtle Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-neutral-400 font-light">
          <div className="space-y-2">
            <span className="font-mono font-bold text-neutral-300 uppercase tracking-wider block">
              ACKNOWLEDGEMENTS
            </span>
            <p className="leading-relaxed">
              Grateful to the game of cricket and the enduring legacy of Virat Kohli. Statistics and match narratives are based on public international archives and verified scorecards. Built using open-source tools: React, TypeScript, Vite, Tailwind CSS, Lucide Icons, and the global developer community.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-mono font-bold text-neutral-300 uppercase tracking-wider block">
              IMPORTANT DISCLAIMER
            </span>
            <p className="leading-relaxed text-neutral-400">
              EIGHTEEN is an independent fan-made digital tribute created for educational, creative, and showcase purposes. It is not officially affiliated with Virat Kohli, the BCCI, the Indian cricket team, or any commercial brand represented on the website.
            </p>
          </div>
        </div>

        {/* Final Sign-off Quote */}
        <div className="mt-12 text-center pt-8 border-t border-white/5 space-y-2">
          <p className="font-editorial text-lg sm:text-xl text-neutral-300 italic">
            "Built to remember an era. Designed to preserve a legacy."
          </p>
          <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
            EIGHTEEN — THE LEGACY WE WITNESSED • CRAFTED WITH PASSION BY JAYESH GUJAR
          </p>
        </div>
      </div>
    </section>
  );
}

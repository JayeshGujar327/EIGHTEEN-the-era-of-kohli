import { ChevronUp, Heart, Shield, Award } from 'lucide-react';
import { soundFx } from '../utils/audioEngine';

export function Footer() {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-black border-t border-white/10 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center font-heading text-xl text-white font-bold tracking-wider">
                18
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-widest text-white uppercase">
                  The Era of Kohli
                </span>
                <span className="text-[10px] tracking-[0.25em] text-neutral-400 font-mono-num uppercase">
                  EIGHTEEN • THE LEGACY WE WITNESSED
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-md">
              A cinematic digital archive celebrating the mindset, intensity, records, and cultural revolution of Virat Kohli — Jersey No. 18.
            </p>

            <div className="text-[11px] font-mono text-neutral-400 pt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Statistics updated: 19 August 2026 • Verified ICC Standards</span>
            </div>
          </div>

          {/* Quick Chapters Navigation */}
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-4">
              EXPERIENCE
            </span>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a
                  href="#story"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  The 9 Story Chapters
                </a>
              </li>
              <li>
                <a
                  href="#journey"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  Career Timeline (18 Milestones)
                </a>
              </li>
              <li>
                <a
                  href="#stats"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  The Chase Master Engine & Horizon
                </a>
              </li>
              <li>
                <a
                  href="#records"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  The 85 Centuries Record Hall
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive & Creator Modes */}
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-4">
              CREATOR & CODE
            </span>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a
                  href="#developer"
                  onClick={() => soundFx.playClick()}
                  className="text-rose-400 hover:text-white transition-colors font-medium flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  About the Developer
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/JayeshGujar327"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jayesh Gujar on GitHub"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  GitHub (@JayeshGujar327)
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jayesh-gujar-943626315/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jayesh Gujar on LinkedIn"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  LinkedIn (Jayesh Gujar)
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/thejayesh327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Jayesh Gujar on Instagram"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  Instagram (@thejayesh327)
                </a>
              </li>
              <li>
                <a
                  href="mailto:gujarj327@gmail.com"
                  aria-label="Email Jayesh Gujar"
                  onClick={() => soundFx.playClick()}
                  className="hover:text-white transition-colors"
                >
                  Email (gujarj327@gmail.com)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div>
            © {new Date().getFullYear()} THE ERA OF KOHLI • Crafted with dedication by{' '}
            <a
              href="#developer"
              onClick={() => soundFx.playClick()}
              className="text-white hover:text-rose-400 underline underline-offset-4 decoration-white/20 transition-colors"
            >
              Jayesh Gujar
            </a>
          </div>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors border border-white/10 text-xs font-semibold"
          >
            <span>BACK TO TOP</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

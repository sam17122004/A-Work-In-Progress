import React, { useState } from 'react';
import { ArrowUp, Mail, Copy, Check, Sparkles, Compass, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface FooterSectionProps {
  userName: string;
  onEditName: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ userName, onEditName }) => {
  const [copied, setCopied] = useState(false);
  const emailPlaceholder = 'sambeet.sabat.2002@gmail.com';
  const githubPlaceholder = 'github.com/sam17122004';
  const linkedinPlaceholder = 'linkedin.com/in/sambeet-sabat-640996304';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    soundEngine.playChime(880);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailPlaceholder);
    setCopied(true);
    soundEngine.playChime(987.77);
    setTimeout(() => setCopied(false), 2500);
  };

  const triggerCelebration = () => {
    soundEngine.playChime(1046.5);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#6685FF', '#A18CFF', '#F4F5FA'],
      disableForReducedMotion: true,
    });
  };

  return (
    <footer className="relative py-28 md:py-36 px-6 md:px-12 bg-[#07080D] border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-96 rounded-full bg-gradient-to-t from-[#6685FF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Animated Visual Symbol connecting to the Hero Centerpiece */}
        <div className="relative mb-10 group cursor-pointer" onClick={triggerCelebration} title="Click to celebrate progress">
          <div className="w-16 h-16 rounded-2xl bg-[#11131B] border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-[0_0_30px_rgba(102,133,255,0.2)]">
            <Compass className="w-8 h-8 text-[#6685FF] animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#6685FF]/20 to-[#A18CFF]/20 animate-pulse" />
          </div>
          {/* Subtle concentric orbital halo */}
          <div className="absolute -inset-2 rounded-3xl border border-[#6685FF]/20 animate-ping opacity-25 pointer-events-none" />
        </div>

        {/* Main Statements */}
        <div className="max-w-3xl space-y-3 mb-10">
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#F4F5FA] tracking-tighter">
            “THIS ISN’T THE <br />
            <span className="text-gradient-electric">FINAL VERSION.”</span>
          </h2>
          <p className="font-mono text-base sm:text-lg text-[#9396A7] tracking-wider">
            Just the latest chapter.
          </p>
        </div>

        {/* Interactive Identity Reminder */}
        <div className="mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#11131B] border border-white/10 text-xs font-mono text-[#F4F5FA]">
          <span>CURRENT ARCHITECT:</span>
          <button
            onClick={onEditName}
            className="text-[#6685FF] font-bold hover:underline flex items-center gap-1"
          >
            {userName} <Sparkles className="w-3 h-3" />
          </button>
        </div>

        {/* Contact & Social Placeholders */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14 text-left">
          {/* Email */}
          <div className="p-4 rounded-2xl bg-[#11131B]/80 border border-white/10 hover:border-[#6685FF]/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#6685FF] mb-2 font-mono text-xs">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> EMAIL
              </span>
              <button
                onClick={handleCopyEmail}
                title="Copy email placeholder"
                className="hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <a
              href={`mailto:${emailPlaceholder}`}
              className="text-xs text-[#F4F5FA] font-mono hover:text-[#6685FF] truncate"
            >
              {emailPlaceholder}
            </a>
          </div>

          {/* GitHub Link */}
          <div className="p-4 rounded-2xl bg-[#11131B]/80 border border-white/10 hover:border-[#6685FF]/40 transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between text-[#A18CFF] mb-2 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GITHUB</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9396A7] group-hover:text-[#A18CFF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <a
              href={githubPlaceholder.startsWith('http') ? githubPlaceholder : `https://${githubPlaceholder}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#F4F5FA] font-mono hover:text-[#6685FF] truncate hover:underline"
              title="Visit GitHub profile"
            >
              {githubPlaceholder}
            </a>
          </div>

          {/* LinkedIn Link */}
          <div className="p-4 rounded-2xl bg-[#11131B]/80 border border-white/10 hover:border-[#6685FF]/40 transition-colors flex flex-col justify-between group">
            <div className="flex items-center justify-between text-white mb-2 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LINKEDIN</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9396A7] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <a
              href={linkedinPlaceholder.startsWith('http') ? linkedinPlaceholder : `https://${linkedinPlaceholder}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#F4F5FA] font-mono hover:text-[#6685FF] truncate hover:underline"
              title="Visit LinkedIn profile"
            >
              {linkedinPlaceholder}
            </a>
          </div>
        </div>

        {/* Back To Top Button */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#11131B] border border-white/10 text-xs font-mono text-[#F4F5FA] hover:border-[#6685FF] hover:bg-[#161924] transition-all duration-300 mb-16 shadow-lg"
        >
          <span>RETURN TO BEGINNING</span>
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1 text-[#6685FF]" />
        </button>

        {/* Editorial Sub-Footer */}
        <div className="w-full pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9396A7]">
          <div>
            <span>“Made with curiosity. Updated by experience.”</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>CONTINUOUS DEPLOYMENT // NEVER COMPLETE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

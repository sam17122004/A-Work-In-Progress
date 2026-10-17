import React from 'react';
import { HeroCenterpiece } from './HeroCenterpiece';
import { ChevronDown, Sparkles, ArrowUpRight, Edit2 } from 'lucide-react';

interface HeroSectionProps {
  userName: string;
  onEditName: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ userName, onEditName }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 overflow-hidden bg-tech-grid"
    >
      {/* Background ambient light orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#6685FF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#A18CFF]/10 blur-[120px] pointer-events-none" />

      {/* Top Metadata Header Line */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-[#9396A7] tracking-wider">
            STATUS: ACTIVE EXPLORATION
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 font-mono text-xs text-[#9396A7]">
          <span>PHASE // 00.ORIGIN</span>
          <span>SYSTEM // CONSTANT_EVOLUTION</span>
        </div>
      </div>

      {/* Main Grid: Typography Left, 3D Centerpiece Right / Integrated */}
      <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
        {/* Left Column: Headlines & Storytelling */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Identity Label with interactive edit prompt */}
          <div className="inline-flex items-center gap-2.5 self-start px-3.5 py-1.5 rounded-full bg-[#11131B] border border-white/10 backdrop-blur-md">
            <span className="font-mono text-xs text-[#6685FF] font-medium tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              IDENTITY
            </span>
            <span className="text-white/20">/</span>
            <button
              onClick={onEditName}
              className="group flex items-center gap-1.5 font-mono text-xs text-[#F4F5FA] hover:text-[#6685FF] transition-colors"
              title="Click to rename"
            >
              <span className="font-bold underline decoration-white/30 decoration-dashed group-hover:decoration-[#6685FF]">
                {userName}
              </span>
              <span className="text-[#9396A7]"> — HUMAN / THINKER / BUILDER</span>
              <Edit2 className="w-3 h-3 text-[#9396A7] group-hover:text-[#6685FF] transition-colors opacity-75" />
            </button>
          </div>

          {/* Main Editorial Headline */}
          <div className="space-y-1">
            <h1 className="font-display font-black text-5xl sm:text-7xl xl:text-8xl leading-[0.92] tracking-tighter text-[#F4F5FA]">
              I AM STILL <br />
              <span className="text-gradient-electric inline-block mt-1">BECOMING.</span>
            </h1>
          </div>

          {/* Supporting Statement */}
          <p className="max-w-xl text-lg sm:text-xl text-[#9396A7] font-light leading-relaxed">
            “Curious by nature. Driven by possibility. Defined by what I choose to become.”
          </p>

          {/* Quick Action Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#07080D] font-display font-bold text-sm tracking-wide hover:bg-[#6685FF] hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] group"
            >
              ENTER THE JOURNEY
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#mindset"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#11131B] text-[#F4F5FA] border border-white/10 font-mono text-xs tracking-wider hover:border-[#6685FF]/50 hover:bg-[#161924] transition-all duration-300"
            >
              EXPLORE MINDSET
            </a>
          </div>
        </div>

        {/* Right Column: 3D Centerpiece */}
        <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[540px] w-full relative">
          <HeroCenterpiece />
        </div>
      </div>

      {/* Bottom Bar: Scroll to explore & Technical Details */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 font-mono text-xs text-[#9396A7]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6685FF]" />
          <span>EST. TODAY — HORIZON UNLIMITED</span>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="group flex items-center gap-2 font-mono text-xs text-[#9396A7] hover:text-[#6685FF] transition-colors"
        >
          <span className="tracking-widest">SCROLL TO EXPLORE</span>
          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#6685FF] transition-colors">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </a>

        <div className="hidden sm:block font-mono text-xs text-[#9396A7]">
          <span>COGNITIVE EXPEDITION // 2026</span>
        </div>
      </div>
    </section>
  );
};

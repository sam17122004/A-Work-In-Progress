import React, { useEffect, useRef } from 'react';
import { Mail, Compass, Star, Feather } from 'lucide-react';

interface LetterSectionProps {
  userName: string;
}

export const LetterSection: React.FC<LetterSectionProps> = ({ userName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stream of light particles moving upward toward a distant horizon
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: Array<{ x: number; y: number; speed: number; radius: number; opacity: number }> = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.7,
        radius: 0.8 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light ray toward the distant top horizon
      const horizonGrad = ctx.createLinearGradient(width / 2, height, width / 2, 0);
      horizonGrad.addColorStop(0, 'rgba(7, 8, 13, 0)');
      horizonGrad.addColorStop(0.5, 'rgba(102, 133, 255, 0.04)');
      horizonGrad.addColorStop(1, 'rgba(161, 140, 255, 0.12)');
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, 0, width, height);

      // Center vertical beam
      const beamGrad = ctx.createLinearGradient(width / 2 - 40, 0, width / 2 + 40, 0);
      beamGrad.addColorStop(0, 'rgba(102, 133, 255, 0)');
      beamGrad.addColorStop(0.5, 'rgba(161, 140, 255, 0.08)');
      beamGrad.addColorStop(1, 'rgba(102, 133, 255, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(width / 2 - 60, 0, 120, height);

      // Particles moving towards horizon
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 140, 255, ${p.opacity})`;
        ctx.shadowColor = '#6685FF';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section id="future-self" className="relative py-32 md:py-44 px-6 md:px-12 bg-[#07080D] border-t border-white/[0.06] overflow-hidden">
      {/* Background Particle Canvas & Distant Horizon Ray */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Atmospheric center spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-[#6685FF]/10 via-[#A18CFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center justify-center gap-3 font-mono text-xs text-[#A18CFF] tracking-widest mb-8 text-center">
          <Feather className="w-4 h-4" />
          <span>// 05. TEMPORAL TRANSMISSION</span>
          <span className="text-white/20">——</span>
          <span className="text-[#9396A7]">A NOTE TO MY FUTURE SELF</span>
        </div>

        {/* Letter Container Card with Glass Editorial Feel */}
        <div className="relative p-8 sm:p-14 lg:p-16 rounded-3xl bg-[#11131B]/80 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {/* Top Envelope Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6685FF]/20 border border-[#6685FF]/40 flex items-center justify-center text-[#6685FF]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#9396A7] block">ADDRESSED TO:</span>
                <span className="font-mono text-xs text-white font-bold tracking-wider">
                  {userName.toUpperCase()} (FUTURE ITERATION)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px] text-[#9396A7]">
              <span>STATUS // ENCRYPTED IN HOPE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center sm:text-left">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4F5FA] tracking-tight leading-tight">
              “IF YOU’RE READING THIS, <br />
              <span className="text-gradient-electric">KEEP GOING.”</span>
            </h2>
          </div>

          {/* The Letter Body */}
          <div className="space-y-8 text-base sm:text-xl text-[#F4F5FA] font-light leading-relaxed">
            <p className="font-display font-medium text-2xl text-white">
              Remember why you started.
            </p>

            <p className="text-[#9396A7]">
              Stay curious when things become familiar. Stay grounded when things go well. Do not let
              the fear of getting it wrong stop you from trying something that matters.
            </p>

            <p className="font-display text-2xl sm:text-3xl font-semibold text-gradient-electric tracking-wide">
              Keep building. Keep questioning. Keep becoming.
            </p>

            <p className="text-[#9396A7]">
              The goal was never to have everything figured out. The goal was to keep moving toward a life
              that feels worth creating.
            </p>
          </div>

          {/* Bottom Seal & Digital Signature */}
          <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6685FF]/20 to-[#A18CFF]/20 border border-white/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#A18CFF]" />
              </div>
              <div className="font-mono text-xs">
                <span className="text-white block font-semibold">{userName}</span>
                <span className="text-[#9396A7] text-[10px]">PRESENT ARCHITECT</span>
              </div>
            </div>

            <div className="font-mono text-[11px] text-[#9396A7] flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#6685FF]" />
              <span>HORIZON: UNWRITTEN // DESTINATION: FLUID</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

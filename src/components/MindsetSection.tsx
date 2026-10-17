import React, { useState, useEffect, useRef } from 'react';
import { Eye, Lightbulb, Zap, ShieldAlert, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Principle {
  id: string;
  name: string;
  tagline: string;
  quote: string;
  actionRule: string;
  mentalModel: string;
  icon: React.ElementType;
  freq: number;
  color: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: 'curiosity',
    name: 'CURIOSITY',
    tagline: 'DEPTH OVER POSTURING',
    quote: 'Understanding something deeply matters more than pretending to know it all.',
    actionRule: 'Ask "why" past the point of comfort. Resist premature closure.',
    mentalModel: 'First-Principles Inquiry',
    icon: Eye,
    freq: 523.25, // C5
    color: '#6685FF',
  },
  {
    id: 'creativity',
    name: 'CREATIVITY',
    tagline: 'UNEXPECTED ANGLES',
    quote: 'Familiar problems deserve unfamiliar perspectives.',
    actionRule: 'Cross-pollinate ideas across unrelated domains.',
    mentalModel: 'Lateral Synthesis',
    icon: Lightbulb,
    freq: 659.25, // E5
    color: '#A18CFF',
  },
  {
    id: 'discipline',
    name: 'DISCIPLINE',
    tagline: 'VELOCITY BY HABIT',
    quote: 'Motivation starts things. Consistent effort moves them forward.',
    actionRule: 'Commit to craft on ordinary Tuesdays, not just inspirational peaks.',
    mentalModel: 'Compounding Cadence',
    icon: Zap,
    freq: 783.99, // G5
    color: '#F4F5FA',
  },
  {
    id: 'resilience',
    name: 'RESILIENCE',
    tagline: 'ITERATIVE RECOVERY',
    quote: 'Failure is feedback. Progress is rarely a straight line.',
    actionRule: 'Extract the lesson cleanly and quickly re-enter the arena.',
    mentalModel: 'Antifragile Feedback Loops',
    icon: ShieldAlert,
    freq: 880.0, // A5
    color: '#6685FF',
  },
  {
    id: 'possibility',
    name: 'POSSIBILITY',
    tagline: 'UNWRITTEN TRAJECTORY',
    quote: 'The most interesting version of my future is still unwritten.',
    actionRule: 'Leave room for serendipity, audacious bets, and reinvention.',
    mentalModel: 'Probabilistic Optionality',
    icon: Sparkles,
    freq: 1046.5, // C6
    color: '#A18CFF',
  },
];

export const MindsetSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activePrinciple = PRINCIPLES[activeIdx];

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
    soundEngine.playChime(PRINCIPLES[idx].freq);
  };

  // Interactive Orbiting Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    let angleOffset = 0;

    const render = () => {
      angleOffset += 0.008;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(centerX, centerY) * 0.72;

      // Draw faint concentric orbit rings
      [0.35, 0.6, 0.85, 1.05].forEach((scale, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * scale, 0, Math.PI * 2);
        ctx.strokeStyle = i === 1 ? 'rgba(102, 133, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Core pulsing node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#6685FF';
      ctx.shadowColor = '#6685FF';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw the 5 principles in orbital constellation
      PRINCIPLES.forEach((p, idx) => {
        const theta = angleOffset + (idx * 2 * Math.PI) / PRINCIPLES.length;
        const radius = baseRadius * (0.65 + (idx % 2) * 0.25);
        const nodeX = centerX + Math.cos(theta) * radius;
        const nodeY = centerY + Math.sin(theta) * radius;

        const isSelected = idx === activeIdx;

        // Line to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeX, nodeY);
        ctx.strokeStyle = isSelected
          ? 'rgba(161, 140, 255, 0.6)'
          : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = isSelected ? 2 : 1;
        if (isSelected) {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Surrounding ripple ring if selected
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, 18, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(102, 133, 255, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, isSelected ? 9 : 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#F4F5FA' : p.color;
        if (isSelected) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 18;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label beside node
        ctx.font = `${isSelected ? 'bold 11px' : '9px'} Space Mono, monospace`;
        ctx.fillStyle = isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)';
        ctx.fillText(p.name, nodeX + 12, nodeY + 4);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [activeIdx]);

  return (
    <section id="mindset" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#07080D] border-t border-white/[0.06] overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-[#A18CFF]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#A18CFF] tracking-widest mb-6">
          <Cpu className="w-4 h-4" />
          <span>// 02. COGNITIVE ARCHITECTURE</span>
          <span className="text-white/20">——</span>
          <span className="text-[#9396A7]">MY DEFAULT SETTINGS</span>
        </div>

        <div className="max-w-3xl mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F4F5FA] tracking-tight">
            How I think. <br />
            <span className="text-gradient-electric">Five principles under constant test.</span>
          </h2>
          <p className="mt-4 text-[#9396A7] text-base sm:text-lg font-light leading-relaxed">
            These are not static affirmations. They are interactive operational parameters that determine how I
            perceive problems, navigate ambiguity, and build forward.
          </p>
        </div>

        {/* Interactive Layout: 5 Selectors on Left + Active Principle Showcase & Constellation on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Principle Buttons / Navigation */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {PRINCIPLES.map((principle, idx) => {
              const isSelected = idx === activeIdx;
              const Icon = principle.icon;

              return (
                <button
                  key={principle.id}
                  onClick={() => handleSelect(idx)}
                  className={`group relative text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#11131B] border-[#6685FF]/60 shadow-[0_8px_30px_rgba(102,133,255,0.15)] scale-[1.02]'
                      : 'bg-[#11131B]/40 hover:bg-[#11131B]/80 border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#6685FF] text-white shadow-md'
                          : 'bg-white/[0.04] text-[#9396A7] group-hover:text-white group-hover:bg-white/[0.08]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#6685FF]">0{idx + 1} //</span>
                        <span className="font-display font-bold text-base text-[#F4F5FA] tracking-wide">
                          {principle.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#9396A7]">{principle.tagline}</span>
                    </div>
                  </div>

                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isSelected ? 'bg-[#6685FF] scale-125' : 'bg-white/10 group-hover:bg-white/30'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Detailed Active Principle View & Interactive Orbital Constellation */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Dynamic Card Display */}
            <div className="relative p-8 sm:p-10 rounded-3xl bg-[#11131B] border border-white/10 shadow-2xl overflow-hidden transition-all duration-500">
              {/* Subtle accent glow */}
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-500"
                style={{ backgroundColor: activePrinciple.color }}
              />

              {/* Tag and Index */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#6685FF]">
                    <activePrinciple.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#6685FF] font-semibold tracking-wider">
                      PROTOCOL // 0{activeIdx + 1}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-[#F4F5FA] tracking-tight">
                      {activePrinciple.name}
                    </h3>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[11px] text-[#9396A7]">
                  {activePrinciple.mentalModel}
                </div>
              </div>

              {/* The Core Quote */}
              <div className="my-6">
                <span className="font-mono text-[10px] text-[#9396A7] tracking-widest uppercase block mb-2">
                  CORE AXIOM
                </span>
                <p className="font-display text-2xl sm:text-3xl text-white font-medium leading-snug">
                  “{activePrinciple.quote}”
                </p>
              </div>

              {/* Action Rule */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[11px] text-[#9396A7] uppercase tracking-wider block">
                    HOW THIS APPLIES IN REALITY
                  </span>
                  <p className="text-sm text-[#F4F5FA] font-light mt-1">
                    {activePrinciple.actionRule}
                  </p>
                </div>
              </div>
            </div>

            {/* Orbiting Constellation Canvas Visualizer */}
            <div className="relative h-[240px] sm:h-[280px] w-full rounded-3xl bg-[#11131B]/40 border border-white/[0.06] overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#9396A7] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ORBITAL CONSTELLATION SYNCED</span>
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[10px] text-[#6685FF]">
                TOUCH ANY PRINCIPLE ABOVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { Terminal, Activity, Layers, HelpCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    let step = 0;
    const linesCount = 26;

    const render = () => {
      step += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render topographic consciousness wave lines
      for (let i = 0; i < linesCount; i++) {
        const progress = i / linesCount;
        const yBase = height * 0.2 + progress * (height * 0.65);

        ctx.beginPath();
        const grad = ctx.createLinearGradient(0, yBase, width, yBase);
        grad.addColorStop(0, 'rgba(102, 133, 255, 0.02)');
        grad.addColorStop(0.3, `rgba(102, 133, 255, ${0.15 + (1 - progress) * 0.35})`);
        grad.addColorStop(0.7, `rgba(161, 140, 255, ${0.18 + progress * 0.35})`);
        grad.addColorStop(1, 'rgba(161, 140, 255, 0.02)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.25;

        for (let x = 0; x <= width; x += 12) {
          const distToMouse = Math.hypot(x - mouse.x, yBase - mouse.y);
          const mouseFactor = Math.max(0, 1 - distToMouse / 160);
          const wave1 = Math.sin(x * 0.012 + step + i * 0.28) * 18;
          const wave2 = Math.cos(x * 0.02 - step * 0.7) * 8;
          const mouseDisplacement = Math.sin(distToMouse * 0.05 - step * 3) * (mouseFactor * 32);

          const y = yBase + wave1 + wave2 - mouseDisplacement;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#07080D] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#6685FF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#6685FF] tracking-widest mb-6">
          <Terminal className="w-4 h-4" />
          <span>// 01. IDENTITY MANIFESTO</span>
          <span className="text-white/20">——</span>
          <span className="text-[#9396A7]">MORE THAN A TITLE</span>
        </div>

        {/* Editorial Subtitle / Big Quote */}
        <div className="mb-14 max-w-4xl">
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F4F5FA] leading-[1.08] tracking-tight">
            “I am not a finished product.{' '}
            <span className="text-gradient-electric block sm:inline">I am an evolving idea.”</span>
          </h2>
        </div>

        {/* Main Content Grid: Text + Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: First-Person Text */}
          <div className="lg:col-span-7 space-y-8">
            {/* Paragraph 1 */}
            <div className="relative pl-6 border-l-2 border-[#6685FF]/40">
              <p className="text-lg sm:text-xl text-[#F4F5FA] font-normal leading-relaxed">
                “I am someone who finds meaning in questions before answers. I enjoy exploring ideas,
                understanding how things work, and turning imagination into something real.”
              </p>
            </div>

            {/* Paragraph 2 */}
            <div className="relative pl-6 border-l-2 border-white/10">
              <p className="text-base sm:text-lg text-[#9396A7] font-light leading-relaxed">
                “I believe growth begins when curiosity meets action. I do not have every answer, and I do not
                need to. What matters is staying open to learning, having the courage to experiment, and being
                willing to begin again.”
              </p>
            </div>

            {/* Paragraph 3 */}
            <div className="relative pl-6 border-l-2 border-[#A18CFF]/40">
              <p className="text-base sm:text-lg text-[#F4F5FA] font-medium leading-relaxed">
                “I am a collection of experiences, evolving perspectives, unfinished ideas, and possibilities I
                have yet to discover.”
              </p>
            </div>

            {/* Micro Pillars / Value Indicators */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#11131B]/70 border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#6685FF] mb-1 font-mono text-xs">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>INQUIRY FIRST</span>
                </div>
                <div className="text-xs text-[#9396A7]">Questions unlock deeper truths than fast conclusions.</div>
              </div>

              <div className="p-4 rounded-xl bg-[#11131B]/70 border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#A18CFF] mb-1 font-mono text-xs">
                  <Activity className="w-3.5 h-3.5" />
                  <span>ACTION DRIVEN</span>
                </div>
                <div className="text-xs text-[#9396A7]">Curiosity transformed into living prototypes.</div>
              </div>

              <div className="p-4 rounded-xl bg-[#11131B]/70 border border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white mb-1 font-mono text-xs">
                  <Layers className="w-3.5 h-3.5" />
                  <span>PERPETUAL ITERATION</span>
                </div>
                <div className="text-xs text-[#9396A7]">Comfort with being unfinished and adaptable.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Topographic Canvas Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#11131B]/60 border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
              {/* Interactive Canvas */}
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

              {/* Canvas Header Annotation */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#9396A7]">
                  <span className="w-2 h-2 rounded-full bg-[#6685FF] animate-pulse" />
                  <span>CONSCIOUSNESS_WAVE // 01</span>
                </div>
                <span className="font-mono text-[10px] text-white/40 tracking-wider">TOUCH TO RIPPLE</span>
              </div>

              {/* Center Overlay Insight */}
              <div className="relative z-10 pointer-events-none self-center text-center max-w-xs">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#6685FF]/80">
                  TOPOLOGY OF THOUGHT
                </span>
                <p className="font-display font-medium text-sm text-white/80 mt-1">
                  Continuously shifting contours of curiosity & perspective
                </p>
              </div>

              {/* Canvas Footer Metadata */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-[#9396A7]">
                <span>FLUID SPECTRUM</span>
                <span>STATUS: ITERATING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

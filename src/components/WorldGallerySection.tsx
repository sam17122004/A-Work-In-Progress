import React, { useState } from 'react';
import { Layers, Maximize2, X, Sparkles, Compass, Disc, Cpu, Mountain, Moon, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Fragment {
  id: string;
  tag: string;
  theme: string;
  subtitle: string;
  quote: string;
  reflection: string;
  specifications: string[];
  icon: React.ElementType;
  accent: string;
  renderArtwork: () => React.ReactNode;
}

export const WorldGallerySection: React.FC = () => {
  const [selectedFragment, setSelectedFragment] = useState<Fragment | null>(null);

  const openFragment = (frag: Fragment) => {
    setSelectedFragment(frag);
    soundEngine.playChime(740.0);
  };

  const closeFragment = () => {
    setSelectedFragment(null);
  };

  const FRAGMENTS: Fragment[] = [
    {
      id: 'frag-tech',
      tag: 'FRAG_01 // SYSTEM_CRAFT',
      theme: 'Technology and the Joy of Building Things',
      subtitle: 'The alchemy of turning conceptual logic into living tools',
      quote: 'Code is not merely instructions for silicon; it is the closest thing humanity has to executable thought.',
      reflection:
        'There is a quiet thrill in conceiving a system that did not exist an hour ago, assembling primitives, wrestling with edge cases, and watching it spring to life. Building technology isn’t about gadgets—it is about expanding human agency.',
      specifications: [
        'Architecture: Modular & Antifragile',
        'Medium: Compilers, Shaders, Logic',
        'State: Compounding Craft',
      ],
      icon: Cpu,
      accent: '#6685FF',
      renderArtwork: () => (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6685FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A18CFF" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6685FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#6685FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="#0C0E17" />
          {/* Isometric grid lines */}
          <path
            d="M50 250 L200 160 L350 250 M200 160 L200 40 M50 130 L200 40 L350 130 M50 130 L50 250 M350 130 L350 250"
            stroke="url(#techGrad)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Internal floating data plane */}
          <polygon
            points="200,80 300,140 200,200 100,140"
            fill="#6685FF"
            fillOpacity="0.08"
            stroke="#A18CFF"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          {/* Circuit nodes */}
          <circle cx="200" cy="140" r="6" fill="#F4F5FA" />
          <circle cx="200" cy="140" r="18" fill="url(#nodeGlow)" />
          <circle cx="100" cy="140" r="3.5" fill="#6685FF" />
          <circle cx="300" cy="140" r="3.5" fill="#A18CFF" />
          <circle cx="200" cy="40" r="4" fill="#F4F5FA" />
          <path d="M200 140 L260 90 L320 90" stroke="#6685FF" strokeWidth="1" strokeDasharray="2,3" />
          <text x="210" y="275" fill="#9396A7" fontSize="10" fontFamily="Space Mono">
            SYS_LAYER // 0101
          </text>
        </svg>
      ),
    },
    {
      id: 'frag-ideas',
      tag: 'FRAG_02 // PARADIGMS',
      theme: 'Ideas that Challenge the Ordinary',
      subtitle: 'Interrogating the defaults we take for granted',
      quote: 'The most dangerous phrase in any discipline is: "That is just how things are done."',
      reflection:
        'True breakthroughs rarely emerge from slight optimizations of conventional wisdom. They come from asking: What if our foundational assumptions are inverted? What if the constraint is entirely self-imposed?',
      specifications: [
        'Method: Counterfactual Reasoning',
        'Focus: Paradigm Inversion',
        'Orientation: Unorthodox',
      ],
      icon: Compass,
      accent: '#A18CFF',
      renderArtwork: () => (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <defs>
            <linearGradient id="ideaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A18CFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6685FF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="#0C0E17" />
          {/* Concentric impossible nested geometries */}
          <circle cx="200" cy="150" r="90" stroke="url(#ideaGrad)" strokeWidth="1.2" fill="none" />
          <circle cx="200" cy="150" r="60" stroke="#F4F5FA" strokeWidth="0.8" strokeDasharray="3,6" fill="none" />
          <rect
            x="135"
            y="85"
            width="130"
            height="130"
            stroke="#A18CFF"
            strokeWidth="1.2"
            fill="none"
            transform="rotate(45 200 150)"
          />
          <polygon
            points="200,70 270,190 130,190"
            stroke="#6685FF"
            strokeWidth="1.5"
            fill="#A18CFF"
            fillOpacity="0.05"
          />
          <line x1="80" y1="150" x2="320" y2="150" stroke="#F4F5FA" strokeOpacity="0.2" strokeWidth="1" />
          <text x="30" y="275" fill="#9396A7" fontSize="10" fontFamily="Space Mono">
            AXIS // NON_EUCLIDEAN
          </text>
        </svg>
      ),
    },
    {
      id: 'frag-art',
      tag: 'FRAG_03 // FREQUENCY',
      theme: 'Music, Art, and Visual Inspiration',
      subtitle: 'The non-verbal language that stirs emotion and resets perception',
      quote: 'Art is what reminds us why we engineer machines in the first place: to touch the sublime.',
      reflection:
        'Whether in the minimalist cadence of ambient synthesis, the raw texture of brutalist architecture, or the rhythm of typography, aesthetics are not superficial ornamentation. They are how we communicate nuance beyond vocabulary.',
      specifications: [
        'Resonance: 432Hz Harmonic',
        'Format: Chromatic & Spatial',
        'Impulse: Poetic Depth',
      ],
      icon: Disc,
      accent: '#F4F5FA',
      renderArtwork: () => (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#0C0E17" />
          {/* Soundwave harmonic ribbons */}
          {[-40, -20, 0, 20, 40].map((offset, i) => (
            <path
              key={i}
              d={`M20 ${150 + offset} Q 100 ${100 + offset * 1.5}, 200 ${150 - offset} T 380 ${150 + offset}`}
              fill="none"
              stroke={i === 2 ? '#F4F5FA' : i % 2 === 0 ? '#6685FF' : '#A18CFF'}
              strokeWidth={i === 2 ? '2' : '1.2'}
              strokeOpacity={0.4 + i * 0.12}
            />
          ))}
          <circle cx="200" cy="150" r="45" fill="#6685FF" fillOpacity="0.07" />
          <circle cx="200" cy="150" r="3" fill="#F4F5FA" />
          <text x="270" y="275" fill="#9396A7" fontSize="10" fontFamily="Space Mono">
            CHROMA // HARMONICS
          </text>
        </svg>
      ),
    },
    {
      id: 'frag-solitude',
      tag: 'FRAG_04 // STILLNESS',
      theme: 'Quiet Moments of Reflection',
      subtitle: 'Where the noise fades and clarity slowly crystallizes',
      quote: 'In an era of hyper-acceleration, the ultimate rebellion is unhurried contemplation.',
      reflection:
        'When you unplug from notifications and external demands, the mental silt settles. In that quiet water, you discover which desires are truly yours and which ones were merely broadcast into you by the surrounding world.',
      specifications: [
        'State: Uncluttered Mind',
        'Medium: Silence & Solitude',
        'Value: Grounded Authenticity',
      ],
      icon: Moon,
      accent: '#6685FF',
      renderArtwork: () => (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#0C0E17" />
          {/* Minimalist Horizon and Lunar Crescent */}
          <line x1="40" y1="200" x2="360" y2="200" stroke="#9396A7" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="200" cy="130" r="38" stroke="#6685FF" strokeWidth="1.2" fill="none" />
          <circle cx="210" cy="125" r="34" fill="#0C0E17" />
          <line x1="200" y1="200" x2="200" y2="280" stroke="#6685FF" strokeOpacity="0.2" strokeDasharray="2,4" />
          <text x="35" y="275" fill="#9396A7" fontSize="10" fontFamily="Space Mono">
            EQUILIBRIUM // NULL
          </text>
        </svg>
      ),
    },
    {
      id: 'frag-perspectives',
      tag: 'FRAG_05 // EXPANSION',
      theme: 'Experiences that Change Perspective',
      subtitle: 'The threshold moments that rewrite how you see the world',
      quote: 'You never return from a transformative journey as the exact same traveler who embarked upon it.',
      reflection:
        'Whether traveling through unfamiliar cultures, enduring an agonizing failure, or encountering an insight that dismantles your ego—these moments stretch your perceptual boundaries. Once stretched, the mind never snaps back to its old dimensions.',
      specifications: [
        'Dynamic: Irreversible Growth',
        'Catalyst: Encountering The Other',
        'Result: Expanded Empathy',
      ],
      icon: Mountain,
      accent: '#A18CFF',
      renderArtwork: () => (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#0C0E17" />
          {/* Overlapping triangular mountain summits with parallax depth */}
          <polygon points="120,240 220,110 320,240" fill="#11131B" stroke="#6685FF" strokeWidth="1.2" />
          <polygon points="60,250 160,150 260,250" fill="#161924" fillOpacity="0.6" stroke="#A18CFF" strokeWidth="1" />
          <polygon points="180,245 280,95 380,245" fill="#161924" fillOpacity="0.4" stroke="#F4F5FA" strokeWidth="1" />
          <circle cx="280" cy="70" r="2" fill="#F4F5FA" />
          <circle cx="220" cy="85" r="1.5" fill="#6685FF" />
          <text x="30" y="275" fill="#9396A7" fontSize="10" fontFamily="Space Mono">
            ELEVATION // EXPANSIVE
          </text>
        </svg>
      ),
    },
    {
      id: 'frag-dreams',
      tag: 'FRAG_06 // TRAJECTORY',
      theme: 'Dreams that Are Still Taking Shape',
      subtitle: 'The nebulous blueprints of things not yet realized',
      quote: 'The gap between what is and what could be is the sole playground of the human imagination.',
      reflection:
        'Not everything is meant to be packaged neatly today. Some ideas require simmering in the background for years, waiting for the right technology, the right partners, or personal maturity to ripen. I honor these unfinished dreams.',
      specifications: [
        'Horizon: Future Decades',
        'Format: Latent Possibility',
        'State: Incubating',
      ],
      icon: Sparkles,
      accent: '#F4F5FA',
      renderArtwork: () => (
        <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
          <rect width="400" height="300" fill="#0C0E17" />
          {/* Constellation web of nascent particles */}
          <circle cx="200" cy="150" r="70" stroke="#6685FF" strokeWidth="1" strokeDasharray="2,5" fill="none" />
          <circle cx="200" cy="150" r="110" stroke="#A18CFF" strokeWidth="0.8" strokeDasharray="4,8" fill="none" />
          {[
            [170, 120],
            [230, 110],
            [240, 180],
            [160, 175],
            [200, 150],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={i === 4 ? 4 : 2.5} fill="#F4F5FA" />
          ))}
          <line x1="170" y1="120" x2="230" y2="110" stroke="#6685FF" strokeWidth="1" />
          <line x1="230" y1="110" x2="240" y2="180" stroke="#A18CFF" strokeWidth="1" />
          <line x1="240" y1="180" x2="160" y2="175" stroke="#6685FF" strokeWidth="1" />
          <line x1="160" y1="175" x2="170" y2="120" stroke="#A18CFF" strokeWidth="1" />
          <line x1="170" y1="120" x2="200" y2="150" stroke="#F4F5FA" strokeWidth="1" />
          <text x="210" y="275" fill="#9396A7" fontSize="10" fontFamily="Space Mono">
            LATENT // INCUBATION
          </text>
        </svg>
      ),
    },
  ];

  return (
    <section id="world" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#07080D] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#6685FF] tracking-widest mb-6">
          <Layers className="w-4 h-4" />
          <span>// 03. INTERIOR DIMENSIONS</span>
          <span className="text-white/20">——</span>
          <span className="text-[#9396A7]">MY WORLD, IN FRAGMENTS</span>
        </div>

        <div className="max-w-3xl mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F4F5FA] tracking-tight">
            Fragments of an inner world. <br />
            <span className="text-gradient-electric">Not a resume. An ecosystem of interests.</span>
          </h2>
          <p className="mt-4 text-[#9396A7] text-base sm:text-lg font-light leading-relaxed">
            Identity is not a single neat headline. It is a constellation of curiosities, memories, creative
            impulses, and unpolished aspirations. Click any fragment to explore its depth.
          </p>
        </div>

        {/* Asymmetrical Artistic Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FRAGMENTS.map((frag, idx) => {
            const Icon = frag.icon;
            return (
              <div
                key={frag.id}
                onClick={() => openFragment(frag)}
                className={`group relative rounded-3xl bg-[#11131B]/60 hover:bg-[#11131B] border border-white/[0.08] hover:border-[#6685FF]/50 p-6 flex flex-col justify-between cursor-pointer transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden ${
                  idx === 0 || idx === 3 ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                {/* Artwork Canvas Frame */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/[0.06] mb-5 bg-[#0C0E17]">
                  {frag.renderArtwork()}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11131B] via-transparent to-transparent opacity-60" />

                  {/* Expand badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#11131B]/80 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:scale-110 transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Tag & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-[#6685FF] font-semibold tracking-wider">
                    {frag.tag}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/[0.04] text-[#9396A7] group-hover:text-[#6685FF] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-[#F4F5FA] group-hover:text-white transition-colors mb-2">
                  {frag.theme}
                </h3>

                {/* Subtitle / Teaser */}
                <p className="text-xs text-[#9396A7] font-light leading-relaxed mb-4">
                  {frag.subtitle}
                </p>

                {/* Bottom line with Arrow */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[#9396A7] group-hover:text-white transition-colors">
                  <span>INSPECT FRAGMENT</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#6685FF]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expandable Detail Lightbox Modal */}
      {selectedFragment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#07080D]/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#11131B] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeFragment}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#6685FF] mb-2">
              <selectedFragment.icon className="w-4 h-4" />
              <span>{selectedFragment.tag}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
              {selectedFragment.theme}
            </h3>
            <p className="text-sm font-mono text-[#9396A7] mb-6">{selectedFragment.subtitle}</p>

            {/* Artwork Banner */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-[#0C0E17]">
              {selectedFragment.renderArtwork()}
            </div>

            {/* Quote */}
            <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#6685FF] mb-6">
              <p className="font-display italic text-base text-white/90">
                “{selectedFragment.quote}”
              </p>
            </div>

            {/* Deeper Reflection */}
            <div className="mb-6">
              <h4 className="font-mono text-xs text-[#9396A7] uppercase tracking-wider mb-2">
                INNER PERSPECTIVE
              </h4>
              <p className="text-sm sm:text-base text-[#F4F5FA] font-light leading-relaxed">
                {selectedFragment.reflection}
              </p>
            </div>

            {/* Specifications / Meta */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
              {selectedFragment.specifications.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] text-[#9396A7]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

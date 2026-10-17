import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Target, Flame, BrainCircuit, Users, Compass, Check } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Aspiration {
  id: string;
  num: string;
  title: string;
  description: string;
  manifesto: string;
  icon: React.ElementType;
}

const ASPIRATIONS: Aspiration[] = [
  {
    id: 'solve',
    num: '01',
    title: 'Build technology that solves meaningful problems.',
    description: 'Rejecting cleverness for its own sake. Building tools that tangibly elevate human capability and address foundational challenges.',
    manifesto: 'Utility over novelty. Substance over spectacle.',
    icon: Target,
  },
  {
    id: 'learn',
    num: '02',
    title: 'Keep learning beyond what is required.',
    description: 'Refusing intellectual plateau. Pursuing masterclasses in subjects that have no immediate commercial deadline simply because understanding is a joy.',
    manifesto: 'Lifelong amateur status. Relentless student mindset.',
    icon: Flame,
  },
  {
    id: 'create',
    num: '03',
    title: 'Turn difficult ideas into practical creations.',
    description: 'Bridging the chasm between raw theory and concrete realization. Embracing the friction of shipping real things into the physical or digital world.',
    manifesto: 'Ideas are cheap. Execution is transcendent.',
    icon: BrainCircuit,
  },
  {
    id: 'influence',
    num: '04',
    title: 'Become someone whose work and character positively influence others.',
    description: 'Leaving behind more clarity, kindness, and inspiration than I found. Mentoring, empowering, and holding high ethical standards.',
    manifesto: 'Character compounds longer than accomplishments.',
    icon: Users,
  },
];

export const VisionSection: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeAspiration, setActiveAspiration] = useState<number>(0);

  // Three.js Animated Hyper-Dimensional Wireframe & Luminous Horizon
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);

    // Group for rotating geometric monolith
    const group = new THREE.Group();
    scene.add(group);

    // Inner glowing octahedron
    const innerGeo = new THREE.OctahedronGeometry(1.6, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x6685FF,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // Outer icosahedron cage
    const outerGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xA18CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // Vertex points on outer geometry
    const vertexPointsGeo = new THREE.BufferGeometry();
    vertexPointsGeo.setAttribute('position', outerGeo.attributes.position);
    const vertexPointsMat = new THREE.PointsMaterial({
      color: 0xF4F5FA,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeo, vertexPointsMat);
    group.add(vertexPoints);

    // Horizon grid floor
    const gridHelper = new THREE.GridHelper(20, 20, 0x6685FF, 0x1A1D29);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) * 0.001;

      // Smooth geometric rotation
      group.rotation.x = t * 0.15 + mouseY * 0.2;
      group.rotation.y = t * 0.25 + mouseX * 0.3;
      innerMesh.rotation.z = -t * 0.3;

      // Pulse
      const scale = 1 + Math.sin(t * 1.8) * 0.04;
      innerMesh.scale.set(scale, scale, scale);

      // Grid subtle scroll effect
      gridHelper.position.z = (t * 0.8) % 1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      vertexPointsGeo.dispose();
      vertexPointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  const selectAspiration = (idx: number) => {
    setActiveAspiration(idx);
    soundEngine.playChime(600 + idx * 70);
  };

  return (
    <section id="vision" className="relative py-28 md:py-36 px-6 md:px-12 bg-[#07080D] border-t border-white/[0.06] overflow-hidden">
      {/* Background Luminous Horizon Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-t from-transparent via-[#6685FF]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-[#6685FF] tracking-widest mb-6">
          <Compass className="w-4 h-4" />
          <span>// 04. TRAJECTORY & TELEOLOGY</span>
          <span className="text-white/20">——</span>
          <span className="text-[#9396A7]">THE NEXT VERSION</span>
        </div>

        {/* Featured Prominent Statement */}
        <div className="max-w-4xl mb-16">
          <span className="font-mono text-xs text-[#A18CFF] uppercase tracking-widest block mb-3">
            GUIDING CONVICTION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F4F5FA] leading-[1.08] tracking-tight">
            “I do not want to predict my future.{' '}
            <span className="text-gradient-electric block sm:inline">
              I want to participate in creating it.”
            </span>
          </h2>
        </div>

        {/* Layout: Interactive 3D Wireframe + 4 Aspirations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3D Rotating Geometric Wireframe */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl bg-[#11131B]/70 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between p-6">
              {/* 3D Canvas */}
              <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full cursor-grab" />

              {/* Header inside Canvas Frame */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#6685FF] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6685FF] animate-ping" />
                  FUTURE_SYNTHESIS_MONOLITH
                </span>
                <span className="font-mono text-[10px] text-white/40">3D_VECTOR // ACTIVE</span>
              </div>

              {/* Bottom annotation */}
              <div className="relative z-10 text-center pointer-events-none">
                <span className="font-mono text-[10px] text-[#9396A7] tracking-widest uppercase">
                  UNFOLDING COMPLEXITY
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Aspirations Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {ASPIRATIONS.map((asp, idx) => {
              const isSelected = idx === activeAspiration;
              const Icon = asp.icon;

              return (
                <div
                  key={asp.id}
                  onClick={() => selectAspiration(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#11131B] border-[#6685FF]/70 shadow-[0_10px_35px_rgba(102,133,255,0.15)] scale-[1.01]'
                      : 'bg-[#11131B]/40 hover:bg-[#11131B]/80 border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#6685FF] text-white shadow-md'
                          : 'bg-white/5 text-[#9396A7]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-[#6685FF] font-semibold">
                          ASPIRATION {asp.num}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                            <Check className="w-3 h-3" /> ACTIVE VECTOR
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#F4F5FA] mb-2 leading-snug">
                        {asp.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#9396A7] font-light leading-relaxed mb-3">
                        {asp.description}
                      </p>

                      <div className="inline-block px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-[11px] text-[#A18CFF]">
                        {asp.manifesto}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

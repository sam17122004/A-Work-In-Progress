import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface FloatingWord {
  text: string;
  angle: number;
  speed: number;
  radius: number;
  height: number;
}

export const HeroCenterpiece: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wordsPos, setWordsPos] = useState<Array<{ text: string; x: number; y: number; opacity: number; scale: number }>>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL support
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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    // Group holding the entire centerpiece
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Particle Cloud & Constellation
    const particleCount = 750;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseCoords: THREE.Vector3[] = [];

    const blueColor = new THREE.Color('#6685FF');
    const violetColor = new THREE.Color('#A18CFF');
    const whiteColor = new THREE.Color('#F4F5FA');

    for (let i = 0; i < particleCount; i++) {
      // Golden ratio spiral on sphere for organic distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.2 + (Math.random() - 0.5) * 1.8;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      baseCoords.push(new THREE.Vector3(x, y, z));

      // Color gradient
      const mixed = Math.random() > 0.4 ? (Math.random() > 0.5 ? blueColor : violetColor) : whiteColor;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular soft particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(161,140,255,0.8)');
      grad.addColorStop(0.7, 'rgba(102,133,255,0.2)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // 2. Connecting delicate lines between proximate points
    const lineIndices: number[] = [];
    const maxDistance = 1.35;
    for (let i = 0; i < particleCount; i += 3) {
      for (let j = i + 1; j < particleCount; j += 4) {
        const dist = baseCoords[i].distanceTo(baseCoords[j]);
        if (dist < maxDistance) {
          lineIndices.push(i, j);
        }
      }
    }
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    lineGeometry.setIndex(lineIndices);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6685FF,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    mainGroup.add(lines);

    // 3. Central glowing geodesic wireframe core
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xA18CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 4. Subtle concentric orbital energy rings
    const ringGeo1 = new THREE.RingGeometry(5.2, 5.23, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x6685FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(6.4, 6.43, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xA18CFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // Floating concept words config
    const wordsConfig: FloatingWord[] = [
      { text: 'CURIOSITY', angle: 0, speed: 0.007, radius: 5.8, height: 1.5 },
      { text: 'IMAGINATION', angle: (2 * Math.PI) / 5, speed: 0.006, radius: 6.2, height: -2.0 },
      { text: 'DISCIPLINE', angle: (4 * Math.PI) / 5, speed: 0.008, radius: 5.6, height: 2.8 },
      { text: 'POSSIBILITY', angle: (6 * Math.PI) / 5, speed: 0.0055, radius: 6.5, height: -0.8 },
      { text: 'RESILIENCE', angle: (8 * Math.PI) / 5, speed: 0.0075, radius: 6.0, height: 2.2 },
    ];

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize handling
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Group rotation with cursor reactivity
      mainGroup.rotation.y = elapsedTime * 0.08 + mouseRef.current.x * 0.6;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.15 - mouseRef.current.y * 0.5;

      // Core counter-rotation & pulsation
      coreMesh.rotation.y = -elapsedTime * 0.12;
      coreMesh.rotation.z = elapsedTime * 0.06;
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Rings independent rotation
      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.z = -elapsedTime * 0.08;

      // Breathing movement of particles
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const base = baseCoords[i];
        const wave = Math.sin(elapsedTime * 1.2 + i * 0.05) * 0.15;
        arr[i * 3] = base.x * (1 + wave * 0.1);
        arr[i * 3 + 1] = base.y * (1 + wave * 0.1);
        arr[i * 3 + 2] = base.z * (1 + wave * 0.1);
      }
      posAttr.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;

      // Calculate 2D screen positions for floating words
      const projectedWords = wordsConfig.map(w => {
        w.angle += w.speed;
        const wx = Math.cos(w.angle) * w.radius;
        const wz = Math.sin(w.angle) * w.radius;
        const wy = w.height + Math.sin(elapsedTime + w.angle) * 0.4;

        const vec = new THREE.Vector3(wx, wy, wz);
        vec.applyEuler(mainGroup.rotation);
        vec.add(mainGroup.position);

        const depth = vec.z;
        vec.project(camera);

        const screenX = ((vec.x + 1) / 2) * container.clientWidth;
        const screenY = ((-vec.y + 1) / 2) * container.clientHeight;
        const opacity = Math.min(Math.max((depth + 8) / 16, 0.2), 0.95);
        const scale = 0.8 + ((depth + 6) / 20) * 0.4;

        return {
          text: w.text,
          x: screenX,
          y: screenY,
          opacity,
          scale: Math.max(0.7, Math.min(1.2, scale)),
        };
      });

      setWordsPos(projectedWords);

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
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric center glow */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-[#6685FF]/20 to-[#A18CFF]/15 blur-3xl pointer-events-none animate-subtle-pulse" />

      {/* Floating 3D Words */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {wordsPos.map((item, idx) => (
          <div
            key={idx}
            className="absolute transition-transform duration-75 ease-out"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              opacity: item.opacity,
              transform: `translate(-50%, -50%) scale(${item.scale})`,
            }}
          >
            <div className="px-3 py-1 rounded-full bg-[#11131B]/70 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6685FF]" />
              <span className="font-mono text-[11px] font-semibold text-[#F4F5FA] tracking-wider">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

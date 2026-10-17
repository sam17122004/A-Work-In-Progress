import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Edit3, Compass } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  userName: string;
  onEditName: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userName, onEditName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
      setScrolled(currentScroll > 40);

      // Section spy
      const sections = ['hero', 'about', 'mindset', 'world', 'vision', 'future-self'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundEngine.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'MINDSET', href: '#mindset', id: 'mindset' },
    { label: 'MY WORLD', href: '#world', id: 'world' },
    { label: 'VISION', href: '#vision', id: 'vision' },
    { label: 'FUTURE SELF', href: '#future-self', id: 'future-self' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    if (isAudioActive) soundEngine.playChime(659.25);
  };

  return (
    <>
      {/* Top scroll progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/5 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#6685FF] via-[#A18CFF] to-[#F4F5FA] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-[#07080D]/85 backdrop-blur-md border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Title */}
          <a
            href="#hero"
            onClick={handleLinkClick}
            className="group flex items-center gap-3 text-white no-underline focus:outline-none focus:ring-1 focus:ring-[#6685FF]"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#11131B] border border-white/10 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:border-[#6685FF]/50">
              <Compass className="w-4 h-4 text-[#6685FF] animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute inset-0 bg-gradient-to-br from-[#6685FF]/10 to-[#A18CFF]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-widest text-[#F4F5FA] group-hover:text-white transition-colors">
                A WORK IN PROGRESS
              </span>
              <span className="font-mono text-[10px] text-[#9396A7] tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6685FF] animate-pulse" />
                V.0.84 // BECOMING
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#11131B]/60 p-1.5 rounded-full border border-white/[0.07] backdrop-blur-md">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(102,133,255,0.2)]'
                      : 'text-[#9396A7] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="text-[10px] text-[#6685FF] mr-1.5">0{idx + 1}.</span>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6685FF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Sound toggle & Name Badge */}
          <div className="flex items-center gap-3">
            {/* Identity Badge Button */}
            <button
              onClick={onEditName}
              title="Click to customize identity"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#11131B]/80 hover:bg-[#161924] border border-white/10 hover:border-[#6685FF]/40 text-xs font-mono text-[#F4F5FA] transition-all duration-300 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="truncate max-w-[120px] font-semibold">{userName}</span>
              <Edit3 className="w-3 h-3 text-[#9396A7] group-hover:text-[#6685FF] transition-colors" />
            </button>

            {/* Audio Soundscape Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isAudioActive ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-mono ${
                isAudioActive
                  ? 'border-[#6685FF]/60 bg-[#6685FF]/10 text-white shadow-[0_0_20px_rgba(102,133,255,0.25)]'
                  : 'border-white/10 bg-[#11131B]/80 text-[#9396A7] hover:text-white hover:border-white/20'
              }`}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#6685FF]" />
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-[2px] h-full bg-[#6685FF] animate-[pulse_0.6s_ease-in-out_infinite]" />
                    <span className="w-[2px] h-2/3 bg-[#A18CFF] animate-[pulse_0.8s_ease-in-out_infinite_0.1s]" />
                    <span className="w-[2px] h-4/5 bg-[#6685FF] animate-[pulse_0.7s_ease-in-out_infinite_0.2s]" />
                  </div>
                  <span className="hidden md:inline text-[11px]">AUDIO ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden md:inline text-[11px]">AMBIENCE</span>
                </>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#11131B] border border-white/10 text-[#F4F5FA] hover:text-[#6685FF] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`lg:hidden fixed inset-x-0 top-full bg-[#07080D]/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-400 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-[460px] opacity-100 py-6' : 'max-h-0 opacity-0 py-0 pointer-events-none'
          }`}
        >
          <div className="px-6 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEditName();
              }}
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#11131B] border border-white/10 text-xs font-mono text-[#F4F5FA]"
            >
              <span className="text-[#9396A7]">IDENTITY PROFILE:</span>
              <span className="text-[#6685FF] font-bold flex items-center gap-1.5">
                {userName} <Edit3 className="w-3.5 h-3.5" />
              </span>
            </button>

            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/[0.05] text-[#F4F5FA] font-display text-base tracking-wide border-b border-white/[0.03]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#6685FF]">0{idx + 1} //</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

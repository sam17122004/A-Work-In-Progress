import { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { MindsetSection } from './components/MindsetSection';
import { WorldGallerySection } from './components/WorldGallerySection';
import { VisionSection } from './components/VisionSection';
import { LetterSection } from './components/LetterSection';
import { FooterSection } from './components/FooterSection';
import { IdentityModal } from './components/IdentityModal';
import { soundEngine } from './utils/audio';

export function App() {
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('wip_user_name') || 'Sambeet Sabat';
  });
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);

  // Save to localStorage when changed
  const handleSaveName = (newName: string) => {
    setUserName(newName);
    localStorage.setItem('wip_user_name', newName);
  };

  // Keyboard shortcut: Press 'i' or 'I' to open identity modal, 'm' or 'M' for music
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'i' || e.key === 'I') {
        setIsIdentityModalOpen(prev => !prev);
      }
      if (e.key === 'm' || e.key === 'M') {
        soundEngine.toggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080D] text-[#F4F5FA] selection:bg-[#6685FF]/30 selection:text-white">
      {/* Restrained custom cursor on desktop */}
      <CustomCursor />

      {/* Atmospheric subtle grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 bg-noise opacity-70" />

      {/* Top Navbar */}
      <Navbar
        userName={userName}
        onEditName={() => setIsIdentityModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero */}
        <HeroSection
          userName={userName}
          onEditName={() => setIsIdentityModalOpen(true)}
        />

        {/* 2. More Than A Title (About) */}
        <AboutSection />

        {/* 3. My Default Settings (Mindset) */}
        <MindsetSection />

        {/* 4. My World, In Fragments (Gallery) */}
        <WorldGallerySection />

        {/* 5. The Next Version (Vision) */}
        <VisionSection />

        {/* 6. A Note to My Future Self (Letter) */}
        <LetterSection userName={userName} />
      </main>

      {/* 7. The Story Continues (Footer) */}
      <FooterSection
        userName={userName}
        onEditName={() => setIsIdentityModalOpen(true)}
      />

      {/* Identity Personalization Modal */}
      <IdentityModal
        isOpen={isIdentityModalOpen}
        currentName={userName}
        onSave={handleSaveName}
        onClose={() => setIsIdentityModalOpen(false)}
      />
    </div>
  );
}

export default App;

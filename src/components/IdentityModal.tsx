import React, { useState } from 'react';
import { X, Check, User, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface IdentityModalProps {
  isOpen: boolean;
  currentName: string;
  onSave: (newName: string) => void;
  onClose: () => void;
}

export const IdentityModal: React.FC<IdentityModalProps> = ({
  isOpen,
  currentName,
  onSave,
  onClose,
}) => {
  const [nameInput, setNameInput] = useState(currentName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onSave(nameInput.trim());
      soundEngine.playChime(880);
    }
    onClose();
  };

  const handleReset = () => {
    setNameInput('[YOUR NAME]');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07080D]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#11131B] border border-white/10 p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#6685FF] mb-2">
          <Sparkles className="w-4 h-4" />
          <span>IDENTITY PARAMETER</span>
        </div>

        <h3 className="font-display font-bold text-2xl text-white mb-2">
          Personalize Your Identity
        </h3>
        <p className="text-xs text-[#9396A7] font-light mb-6">
          This site is an exploration of who you are and who you are becoming. Enter your name or leave it as
          an editable archetype.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-[#9396A7] mb-2 uppercase tracking-wider">
              DISPLAY NAME / ARCHETYPE
            </label>
            <div className="relative">
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="e.g. Alex Vance or [YOUR NAME]"
                maxLength={32}
                className="w-full px-4 py-3 rounded-xl bg-[#161924] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#6685FF] focus:ring-1 focus:ring-[#6685FF] transition-all"
                autoFocus
              />
              <User className="absolute right-3.5 top-3.5 w-4 h-4 text-[#9396A7]" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-[#9396A7] hover:text-white underline decoration-dashed"
            >
              Reset to Default Archetype
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6685FF] text-white font-display font-semibold text-xs tracking-wide hover:bg-[#A18CFF] transition-colors shadow-lg shadow-[#6685FF]/20"
            >
              <Check className="w-3.5 h-3.5" />
              APPLY IDENTITY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

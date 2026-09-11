import React, { useState } from 'react';
import { Play, Volume2, VolumeX, Sparkles } from 'lucide-react';

export const FashionFilmSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#070707] flex items-center justify-center overflow-hidden border-b border-[#1A1A1A]">
      {/* Background Editorial Visual Layer with Cinematic Treatment */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1920&auto=format&fit=crop"
          alt="KAALD Editorial Campaign — Built Different"
          className="w-full h-full object-cover filter contrast-125 brightness-75 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Dark Vignette & Grain */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/60 via-transparent to-[#070707]/60" />
      </div>

      {/* Cinematic Centerpiece Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <span className="text-[11px] font-mono-tech tracking-[0.4em] text-[#A8A8A2] uppercase mb-4 px-3 py-1 bg-[#070707]/80 backdrop-blur-md border border-[#282828]">
          CAMPAIGN FILM // AUTUMN WINTER 2026
        </span>

        <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.05em] text-[#F4F4F1] uppercase leading-none">
          BUILT<br />DIFFERENT
        </h2>

        <p className="mt-6 text-sm sm:text-base text-[#D0D0C8] max-w-lg font-light leading-relaxed">
          Oversized French Terry hoodies, raw cotton tees, articulated knee twill cargos, and weatherproof flight jackets photographed across industrial Mumbai.
        </p>

        {/* Minimal Audio / Media Mood Controller */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0E0E0E]/90 border border-[#333] text-xs font-mono-tech text-[#BBB]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SOUNDTRACK: KAALD NOCTURNE FREQUENCIES // 124 BPM</span>
          </div>
        </div>
      </div>

      {/* Bottom Visual Stamp */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-[10px] font-mono-tech text-[#777] uppercase tracking-widest hidden sm:flex pointer-events-none">
        <span>ASPECT: 2.39:1 CINEMASCOPE</span>
        <span>LOCATION: MUMBAI DOCKYARDS // 18.96° N</span>
        <span>PRODUCED BY KAALD CREATIVE LAB</span>
      </div>
    </section>
  );
};

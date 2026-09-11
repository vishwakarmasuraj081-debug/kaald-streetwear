import React from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const feedItems = [
    {
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=600&auto=format&fit=crop',
      tag: 'NEW DELHI // SECTOR 12',
    },
    {
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=600&auto=format&fit=crop',
      tag: 'DROP 01 HOODIE // NOCTURNE',
    },
    {
      image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=600&auto=format&fit=crop',
      tag: 'MUMBAI SEA LINK // 02:40 AM',
    },
    {
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop',
      tag: 'K-MOVE SNEAKERS // ON FOOT',
    },
    {
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop',
      tag: 'COMMUNITY FIT // BENGALURU',
    },
    {
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=600&auto=format&fit=crop',
      tag: 'STUDIO ARCHIVE // 2026',
    },
  ];

  return (
    <section className="relative w-full py-28 bg-[#070707] text-[#F4F4F1] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase block mb-2">
              COMMUNITY DISPATCHES // 10
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em]">
              @KAALD
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-display font-bold tracking-[0.2em] uppercase text-[#F4F4F1] hover:text-white group"
          >
            <Instagram className="w-4 h-4" />
            <span>FOLLOW US ON INSTAGRAM</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 6-Item High Fashion Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {feedItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square bg-[#121212] border border-[#202020] overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt="KAALD Community"
                className="w-full h-full object-cover filter contrast-110 group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[9px] font-mono-tech text-[#DDD] leading-tight uppercase">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

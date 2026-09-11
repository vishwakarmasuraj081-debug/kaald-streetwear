import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types';
import { ArrowUpRight, X, Clock, Calendar, User } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const featuredArticle = JOURNAL_ARTICLES[0];
  const secondaryArticles = JOURNAL_ARTICLES.slice(1);

  return (
    <section
      id="journal"
      className="relative w-full py-28 bg-[#070707] text-[#F4F4F1] border-b border-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1A1A1A]">
          <div>
            <span className="text-[10px] font-mono-tech tracking-[0.3em] text-[#7A7A74] uppercase block mb-2">
              DISCOURSE & CULTURE // VOL. 01
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em] uppercase">
              THE JOURNAL
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-mono-tech tracking-wider text-[#888] max-w-sm">
            STORIES. PEOPLE. CULTURE. IDEAS THAT MOVE YOU.
          </p>
        </div>

        {/* Editorial Layout: Hero Story + Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Hero Article (7 cols) */}
          <div
            onClick={() => setSelectedArticle(featuredArticle)}
            className="lg:col-span-7 group cursor-pointer bg-[#0D0D0D] border border-[#202020] hover:border-[#444] transition-all p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#141414] overflow-hidden mb-6">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#070707]/80 backdrop-blur-md border border-[#2A2A2A] text-[9px] font-mono-tech uppercase text-[#DDD]">
                  {featuredArticle.category}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-tech text-[#777] mb-3">
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4F4F1] group-hover:text-white transition-colors leading-tight mb-3">
                {featuredArticle.title}
              </h3>

              <p className="text-sm text-[#A0A09A] font-light leading-relaxed mb-4">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#888] uppercase">
                BY {featuredArticle.author}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-widest text-[#F4F4F1] group-hover:translate-x-1 transition-transform">
                <span>READ STORY</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Secondary Editorial Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group cursor-pointer bg-[#0D0D0D] border border-[#202020] hover:border-[#444] transition-all p-5 flex gap-4 sm:gap-6 items-center"
              >
                <div className="relative w-28 sm:w-36 aspect-[4/5] bg-[#141414] flex-shrink-0 overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono-tech text-[#777] mb-1.5">
                      <span>{art.category}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-[#E8E8E4] group-hover:text-white transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#787872] line-clamp-2 mt-1.5 font-light">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-mono-tech text-[#AAA] uppercase group-hover:text-white">
                    <span>READ ESSAY</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070707]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-4xl bg-[#0C0C0C] border border-[#242424] p-6 sm:p-12 shadow-2xl my-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 text-[#888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Meta */}
            <div className="flex items-center gap-3 text-xs font-mono-tech text-[#888] mb-4 uppercase">
              <span>{selectedArticle.category}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            {/* Title */}
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F4F4F1] leading-tight mb-4">
              {selectedArticle.title}
            </h2>

            <p className="text-base sm:text-lg text-[#AAA] font-light leading-relaxed mb-8">
              {selectedArticle.subtitle}
            </p>

            {/* Cover Image */}
            <div className="w-full aspect-[16/9] bg-[#141414] overflow-hidden mb-8 border border-[#222]">
              <img
                src={selectedArticle.coverImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Body */}
            <div className="space-y-8 text-sm sm:text-base text-[#BDBDB5] font-light leading-relaxed max-w-2xl mx-auto">
              {selectedArticle.content.map((sec, i) => (
                <div key={i} className="space-y-4">
                  {sec.heading && (
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4F4F1] mt-6">
                      {sec.heading}
                    </h3>
                  )}
                  {sec.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                  {sec.quote && (
                    <blockquote className="my-6 p-6 border-l-2 border-[#F4F4F1] bg-[#141414] text-lg sm:text-xl font-display italic text-[#F4F4F1]">
                      “{sec.quote}”
                    </blockquote>
                  )}
                  {sec.image && (
                    <div className="my-6 aspect-[16/9] bg-[#151515] overflow-hidden border border-[#222]">
                      <img
                        src={sec.image}
                        alt="Editorial visual"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Article Author Footer */}
            <div className="mt-12 pt-8 border-t border-[#1F1F1F] flex items-center justify-between text-xs font-mono-tech text-[#777] max-w-2xl mx-auto">
              <span>AUTHOR: {selectedArticle.author}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-[#F4F4F1] hover:underline"
              >
                RETURN TO JOURNAL ↑
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

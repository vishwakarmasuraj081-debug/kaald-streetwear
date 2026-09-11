import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('PLEASE ENTER A VALID EMAIL ADDRESS');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className="relative w-full py-28 bg-[#0B0B0B] text-[#F4F4F1] border-b border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        <span className="text-[10px] font-mono-tech tracking-[0.35em] text-[#7A7A74] uppercase mb-4">
          DISPATCH TRANSMISSION // 11
        </span>

        <h2 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.04em] uppercase mb-4">
          STAY IN MOTION
        </h2>

        <p className="text-sm sm:text-base text-[#9A9A92] font-light max-w-lg mb-10 leading-relaxed">
          Join our global community for secret drop access codes, priority archive releases, and editorial essays before public announcement.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row items-stretch border border-[#2E2E2E] bg-[#121212] focus-within:border-[#F4F4F1] transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="ENTER YOUR EMAIL..."
                className="flex-1 px-4 py-3.5 bg-transparent text-xs font-mono-tech text-[#F4F4F1] placeholder-[#555] focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#F4F4F1] text-[#070707] text-xs font-display font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {error && (
              <p className="mt-2 text-[10px] font-mono-tech text-rose-400 text-left uppercase tracking-wider">
                {error}
              </p>
            )}
            <p className="mt-3 text-[10px] font-mono-tech text-[#666] tracking-wider uppercase">
              NO SPAM. STRICTLY CURATED DISPATCHES. UNSUBSCRIBE ANYTIME.
            </p>
          </form>
        ) : (
          <div className="p-6 bg-[#141414] border border-emerald-500/40 text-center animate-fade-in max-w-md w-full">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-300">
              <Check className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-base text-[#F4F4F1] mb-1">
              WELCOME TO THE MOTION COLLECTIVE
            </h3>
            <p className="text-xs font-mono-tech text-[#999]">
              CONFIRMATION DISPATCHED TO {email.toUpperCase()}. CHECK YOUR INBOX FOR PRIORITY ACCESS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CollectionCTAProps {
  onShopAll: () => void;
}

export const CollectionCTA: React.FC<CollectionCTAProps> = ({ onShopAll }) => {
  return (
    <section
      id="collection-cta"
      className="relative w-full max-w-[1800px] mx-auto py-20 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 text-center"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#73737E]"
        >
          KAALD / CAMPAIGN 01 FINALE
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[36px] sm:text-[56px] lg:text-[72px] font-bold leading-[1.0] tracking-[-0.03em] uppercase text-white"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          THE COLLECTION
          <br />
          IS IN MOTION.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[13px] sm:text-[15px] tracking-[0.1em] uppercase text-[#A2A2AD] font-normal"
        >
          DISCOVER THE FULL KAALD COLLECTION.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="pt-4"
        >
          <button
            type="button"
            onClick={onShopAll}
            className="group inline-flex items-center gap-3 px-9 py-4 bg-white text-black text-[12px] sm:text-[13px] font-mono tracking-[0.2em] uppercase font-bold hover:bg-[#E8E8EC] transition-all"
          >
            <span>SHOP ALL</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCommerce();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 bg-white text-black px-4 py-3 rounded-sm shadow-2xl flex items-center gap-3 border border-neutral-200"
        >
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span className="text-[12px] font-mono tracking-wider uppercase font-bold">
            {toastMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { ProductCategory } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: ProductCategory;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'HOODIES',
}) => {
  const [unit, setUnit] = useState<'CM' | 'INCH'>('CM');
  const [activeCategory, setActiveCategory] = useState<string>(
    ['HOODIES', 'T-SHIRTS', 'CARGOS', 'JACKETS', 'FOOTWEAR'].includes(defaultCategory)
      ? defaultCategory
      : 'HOODIES'
  );

  if (!isOpen) return null;

  // Measurement charts
  const hoodieData = {
    headers: ['SIZE', 'CHEST', 'LENGTH', 'SHOULDER', 'SLEEVE'],
    cm: [
      ['S', '118', '70', '58', '59'],
      ['M', '124', '72', '60', '60'],
      ['L', '130', '74', '62', '61'],
      ['XL', '136', '76', '64', '62'],
      ['XXL', '142', '78', '66', '63'],
    ],
    inch: [
      ['S', '46.5', '27.5', '22.8', '23.2'],
      ['M', '48.8', '28.3', '23.6', '23.6'],
      ['L', '51.2', '29.1', '24.4', '24.0'],
      ['XL', '53.5', '29.9', '25.2', '24.4'],
      ['XXL', '55.9', '30.7', '26.0', '24.8'],
    ],
  };

  const tshirtData = {
    headers: ['SIZE', 'CHEST', 'LENGTH', 'SHOULDER', 'SLEEVE'],
    cm: [
      ['S', '112', '71', '52', '24'],
      ['M', '118', '73', '54', '25'],
      ['L', '124', '75', '56', '26'],
      ['XL', '130', '77', '58', '27'],
      ['XXL', '136', '79', '60', '28'],
    ],
    inch: [
      ['S', '44.0', '28.0', '20.5', '9.4'],
      ['M', '46.5', '28.7', '21.3', '9.8'],
      ['L', '48.8', '29.5', '22.0', '10.2'],
      ['XL', '51.2', '30.3', '22.8', '10.6'],
      ['XXL', '53.5', '31.1', '23.6', '11.0'],
    ],
  };

  const cargoData = {
    headers: ['SIZE', 'WAIST (RELAXED)', 'INSEAM', 'OUTSEAM', 'THIGH'],
    cm: [
      ['S (30)', '76–81', '76', '103', '66'],
      ['M (32)', '81–86', '77', '105', '69'],
      ['L (34)', '86–91', '78', '107', '72'],
      ['XL (36)', '91–96', '79', '109', '75'],
      ['XXL (38)', '96–101', '80', '111', '78'],
    ],
    inch: [
      ['S (30)', '30–32', '30.0', '40.5', '26.0'],
      ['M (32)', '32–34', '30.3', '41.3', '27.2'],
      ['L (34)', '34–36', '30.7', '42.1', '28.3'],
      ['XL (36)', '36–38', '31.1', '42.9', '29.5'],
      ['XXL (38)', '38–40', '31.5', '43.7', '30.7'],
    ],
  };

  const footwearData = {
    headers: ['UK / INDIA', 'US MENS', 'EU', 'FOOT LENGTH (CM)'],
    cm: [
      ['UK 7', 'US 8', 'EU 41', '25.5'],
      ['UK 8', 'US 9', 'EU 42', '26.5'],
      ['UK 9', 'US 10', 'EU 43', '27.5'],
      ['UK 10', 'US 11', 'EU 44', '28.5'],
      ['UK 11', 'US 12', 'EU 45', '29.5'],
    ],
    inch: [
      ['UK 7', 'US 8', 'EU 41', '10.0'],
      ['UK 8', 'US 9', 'EU 42', '10.4'],
      ['UK 9', 'US 10', 'EU 43', '10.8'],
      ['UK 10', 'US 11', 'EU 44', '11.2'],
      ['UK 11', 'US 12', 'EU 45', '11.6'],
    ],
  };

  let currentTable = hoodieData;
  if (activeCategory === 'T-SHIRTS') currentTable = tshirtData;
  if (activeCategory === 'CARGOS') currentTable = cargoData;
  if (activeCategory === 'FOOTWEAR') currentTable = footwearData;

  const rows = unit === 'CM' ? currentTable.cm : currentTable.inch;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070707]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0C0C0C] border border-[#242424] p-6 sm:p-10 shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1E1E1E]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#F4F4F1]" />
            <h3 className="font-display font-black text-2xl uppercase tracking-wider text-[#F4F4F1]">
              ARCHITECTURAL SIZE GUIDE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Unit Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['HOODIES', 'T-SHIRTS', 'CARGOS', 'FOOTWEAR'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono-tech tracking-wider uppercase border transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#F4F4F1] text-[#070707] border-[#F4F4F1]'
                    : 'bg-[#141414] text-[#888] border-[#262626] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center border border-[#2E2E2E] bg-[#141414] p-0.5 self-start sm:self-auto">
            <button
              onClick={() => setUnit('CM')}
              className={`px-3 py-1 text-xs font-mono-tech uppercase transition-colors ${
                unit === 'CM' ? 'bg-[#F4F4F1] text-[#070707] font-bold' : 'text-[#888]'
              }`}
            >
              CENTIMETERS (CM)
            </button>
            <button
              onClick={() => setUnit('INCH')}
              className={`px-3 py-1 text-xs font-mono-tech uppercase transition-colors ${
                unit === 'INCH' ? 'bg-[#F4F4F1] text-[#070707] font-bold' : 'text-[#888]'
              }`}
            >
              INCHES (IN)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-[#222] bg-[#111] mb-8">
          <table className="w-full text-left text-xs font-mono-tech">
            <thead className="bg-[#171717] text-[#CCC] border-b border-[#222]">
              <tr>
                {currentTable.headers.map((h, i) => (
                  <th key={i} className="p-3.5 font-bold tracking-wider uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C1C] text-[#AAA]">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#181818] transition-colors">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`p-3.5 ${ci === 0 ? 'font-bold text-[#F4F4F1]' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Notes */}
        <div className="p-4 bg-[#141414] border border-[#262626] text-xs font-light text-[#999] leading-relaxed space-y-2">
          <p className="font-display font-bold uppercase text-[#F4F4F1]">
            KAALD FIT ARCHITECTURE // DROPPED SHOULDERS
          </p>
          <p>
            All KAALD hoodies and tees are intentionally tailored with a relaxed box-fit, wide chest circumference, and drop-shoulder profile. If you desire a standard tailored fit, consider sizing down one step.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono-tech text-[#777]">
          <span>UNSURE ABOUT SIZING? REACH OUR ATELIER AT HELP@KAALD.COM</span>
          <button
            onClick={onClose}
            className="text-[#F4F4F1] underline hover:text-white"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

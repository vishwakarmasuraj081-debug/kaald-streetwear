import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCommerce();

  // Recommendation inputs
  const [height, setHeight] = useState('178');
  const [weight, setWeight] = useState('72');
  const [usualSize, setUsualSize] = useState('L');
  const [fitPreference, setFitPreference] = useState<'REGULAR' | 'RELAXED' | 'OVERSIZED'>('OVERSIZED');
  const [recommendedSize, setRecommendedSize] = useState<string | null>('L');

  const calculateSize = () => {
    const h = parseInt(height, 10) || 175;
    const w = parseInt(weight, 10) || 70;

    let base = 'M';
    if (w < 62 || h < 168) base = 'S';
    else if (w <= 74 && h <= 178) base = 'M';
    else if (w <= 86 && h <= 186) base = 'L';
    else if (w <= 98) base = 'XL';
    else base = 'XXL';

    if (fitPreference === 'OVERSIZED' && base !== 'XXL') {
      const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
      const idx = sizes.indexOf(base);
      base = sizes[Math.min(sizes.length - 1, idx + 1)];
    }

    setRecommendedSize(base);
  };

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-3xl bg-[#0D0D0D] border border-white/10 text-white rounded-sm shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-[20px] font-bold tracking-tight uppercase">
                  SIZE & SILHOUETTE GUIDE
                </h3>
                <p className="text-[11px] font-mono text-neutral-400 tracking-wider mt-0.5">
                  METRIC DIMENSIONS IN INCHES (CM EQUIVALENT)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Measurement Table */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                  GARMENT BENCHMARK MEASUREMENTS (INCHES)
                </span>
                <div className="overflow-x-auto border border-white/10 rounded-sm">
                  <table className="w-full text-[12px] font-mono text-left">
                    <thead className="bg-neutral-900 border-b border-white/10 text-neutral-400">
                      <tr>
                        <th className="p-3">SIZE</th>
                        <th className="p-3">CHEST</th>
                        <th className="p-3">SHOULDER</th>
                        <th className="p-3">LENGTH</th>
                        <th className="p-3">WAIST (PANTS)</th>
                        <th className="p-3">INSEAM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-neutral-200">
                      <tr>
                        <td className="p-3 font-bold text-white">S</td>
                        <td className="p-3">44"</td>
                        <td className="p-3">21.5"</td>
                        <td className="p-3">27.5"</td>
                        <td className="p-3">28–30"</td>
                        <td className="p-3">30"</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">M</td>
                        <td className="p-3">46"</td>
                        <td className="p-3">22.5"</td>
                        <td className="p-3">28.5"</td>
                        <td className="p-3">31–33"</td>
                        <td className="p-3">30.5"</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">L</td>
                        <td className="p-3">48"</td>
                        <td className="p-3">23.5"</td>
                        <td className="p-3">29.5"</td>
                        <td className="p-3">34–36"</td>
                        <td className="p-3">31"</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">XL</td>
                        <td className="p-3">51"</td>
                        <td className="p-3">24.5"</td>
                        <td className="p-3">30.5"</td>
                        <td className="p-3">37–39"</td>
                        <td className="p-3">31.5"</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">XXL</td>
                        <td className="p-3">54"</td>
                        <td className="p-3">25.5"</td>
                        <td className="p-3">31.5"</td>
                        <td className="p-3">40–42"</td>
                        <td className="p-3">32"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FIND YOUR SIZE Recommendation Tool */}
              <div className="bg-neutral-900/60 p-6 border border-white/10 rounded-sm space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-mono tracking-widest text-white uppercase font-bold">
                    FIND YOUR SIZE ADVISOR
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    CALCULATED FOR KAALD SILHOUETTES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px]">
                  {/* Height */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-400">HEIGHT (CM)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-black border border-white/20 p-2 text-white rounded-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-400">WEIGHT (KG)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-black border border-white/20 p-2 text-white rounded-sm focus:border-white focus:outline-none"
                    />
                  </div>

                  {/* Usual Size */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-400">USUAL BRAND SIZE</label>
                    <select
                      value={usualSize}
                      onChange={(e) => setUsualSize(e.target.value)}
                      className="w-full bg-black border border-white/20 p-2 text-white rounded-sm focus:border-white focus:outline-none"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                </div>

                {/* Fit Preference */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-neutral-400 block">
                    FIT PREFERENCE
                  </label>
                  <div className="flex gap-2">
                    {(['REGULAR', 'RELAXED', 'OVERSIZED'] as const).map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setFitPreference(pref)}
                        className={`flex-1 py-2 text-[11px] font-mono tracking-wider border rounded-sm transition-colors ${
                          fitPreference === pref
                            ? 'bg-white text-black border-white font-bold'
                            : 'border-white/20 text-neutral-400 hover:border-white/40'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={calculateSize}
                  className="w-full py-3 bg-white text-black font-extrabold text-[12px] tracking-widest uppercase hover:bg-neutral-200 transition-colors rounded-sm cursor-pointer"
                >
                  CALCULATE SIZE
                </button>

                {recommendedSize && (
                  <div className="p-4 bg-white/5 border border-white/20 rounded-sm flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-400 block uppercase">
                        RECOMMENDED KAALD SIZE
                      </span>
                      <span className="text-[28px] font-extrabold text-white tracking-tight font-sans">
                        {recommendedSize}
                      </span>
                    </div>
                    <div className="text-right text-[11px] font-mono text-neutral-400">
                      <span>FOR A {fitPreference} DRAPE</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { Layers, Globe, Zap, Truck, Leaf } from 'lucide-react';

export const BrandBenefitStrip: React.FC = () => {
  const benefits = [
    {
      icon: Layers,
      title: 'PREMIUM FABRICS',
      subtitle: 'BUILT TO LAST (480+ GSM)',
    },
    {
      icon: Globe,
      title: 'INDIAN BRAND',
      subtitle: 'GLOBAL MINDSET & ATTITUDE',
    },
    {
      icon: Zap,
      title: 'LIMITED DROPS',
      subtitle: 'NO MASS OVERPRODUCTION',
    },
    {
      icon: Truck,
      title: 'FREE EXPRESS SHIPPING',
      subtitle: 'ON ORDERS ABOVE ₹2,499',
    },
    {
      icon: Leaf,
      title: 'CONSCIOUS CHOICES',
      subtitle: 'PLASTIC-FREE PACKAGING',
    },
  ];

  return (
    <section className="relative z-20 w-full border-y border-[#1F1F1F] bg-[#0B0B0B] py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 items-center">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 group transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="p-2 bg-[#141414] border border-[#262626] text-[#C6C6BE] group-hover:text-[#F4F4F1] group-hover:border-[#444] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-display font-bold tracking-wider text-[#E8E8E2] uppercase leading-tight">
                    {b.title}
                  </span>
                  <span className="text-[9px] font-mono-tech tracking-wider text-[#7A7A74] uppercase leading-tight mt-0.5">
                    {b.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

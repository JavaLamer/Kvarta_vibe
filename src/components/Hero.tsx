import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { CoffeeBeanArt } from './CraftArt';

interface HeroProps {
  onSelectCoffee: () => void;
  onSubscribe: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCoffee, onSubscribe }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E8DFD8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Factual unboxed kicker (Zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#6E5D53]">
              <span>Обжариваем с 2019 года</span>
              <span aria-hidden="true" className="text-[#C35B34]">·</span>
              <span>Партии по 5 кг</span>
              <span aria-hidden="true" className="text-[#C35B34]">·</span>
              <span>Минск</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#261C18] leading-[1.12] tracking-tight [text-wrap:balance]">
              Обжарили в четверг. <br />
              <span className="text-[#C35B34] italic font-normal">Пьёте в выходные.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5A4B42] leading-relaxed max-w-xl">
              Небольшая обжарка в Минске. Свежие зёрна маленькими партиями — от нашей мастерской на Короля, 9 до вашей чашки.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onSelectCoffee}
                className="px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-[#261C18] hover:bg-[#C35B34] rounded-sm transition-all duration-150 shadow-xs cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-[#C35B34]"
              >
                <span>Выбрать кофе</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onSubscribe}
                className="px-6 py-3.5 text-sm sm:text-base font-medium text-[#261C18] hover:text-[#C35B34] bg-transparent hover:bg-[#F4EFEA] border border-[#261C18]/30 hover:border-[#C35B34] rounded-sm transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 text-center focus-visible:outline-2 focus-visible:outline-[#C35B34]"
              >
                Оформить подписку
              </button>
            </div>

            {/* Micro proof line (clean typography) */}
            <div className="pt-4 flex items-center gap-6 text-xs text-[#6E5D53] border-t border-[#E8DFD8]/70">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C35B34]" />
                <span>Четверг: день обжарки</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5843]" />
                <span>Пятница: доставка по Минску</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tactile Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-b from-[#F7F2EB] to-[#EFE8DE] p-6 sm:p-8 rounded-sm border border-[#E3DAD1] shadow-xs">
              
              {/* Header plate */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D8CEC4] text-xs font-mono text-[#6E5D53]">
                <span>МАСТЕРСКАЯ ОБЖАРКИ</span>
                <span>МИНСК · 2019</span>
              </div>

              {/* Real Coffee Roastery Photo (replaces SVG) */}
              <div className="py-4">
                <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#EAE2D8] border border-[#D8CEC4] shadow-xs relative">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
                    alt="Свежеобжаренные зёрна спешелти кофе в барабане ростера"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-[#261C18]/85 backdrop-blur-xs text-[10px] font-mono text-[#FAF7F2] rounded-xs">
                    5 КГ · СВЕЖИЙ ОБЖАР
                  </div>
                </div>
              </div>

              {/* Real craft caption */}
              <div className="pt-4 border-t border-[#D8CEC4] flex items-center justify-between text-xs text-[#5A4B42]">
                <div className="flex items-center gap-2">
                  <CoffeeBeanArt className="w-4 h-4 text-[#C35B34]" />
                  <span className="font-medium">100% арабика спешелти</span>
                </div>
                <span className="font-mono text-[#6E5D53]">1–3 дня после ростера</span>
              </div>
            </div>

            {/* Stamp mark */}
            <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center justify-center w-20 h-20 rounded-full border border-[#C35B34]/40 bg-[#FAF7F2] text-[#C35B34] text-[10px] font-mono uppercase text-center p-2 rotate-12 shadow-xs">
              Свежий обжар
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

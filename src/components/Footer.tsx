import React from 'react';
import { CoffeeBeanArt } from './CraftArt';
import { MapPin, Clock, Phone, Mail, Instagram, Send } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  return (
    <footer className="bg-[#211713] text-[#FAF7F2] py-12 md:py-16 border-t border-[#3D2E26]">
      <div id="contacts" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-22">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">Кварта</span>
              <CoffeeBeanArt className="w-5 h-5 text-[#C35B34]" />
            </div>
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              Кофейная мастерская в Минске. Обжариваем спешелти зерно партиями по 5 кг каждый четверг. Доставка по пятницам.
            </p>
            <div className="text-xs font-mono text-[#FAF7F2]/50">
              Основана в 2019 году · Минск, Беларусь
            </div>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#C35B34]">
              Мастерская и самовывоз
            </h4>
            <div className="text-sm text-[#FAF7F2]/90 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C35B34] shrink-0 mt-0.5" />
                <span>г. Минск, ул. Короля, 9</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C35B34] shrink-0 mt-0.5" />
                <div className="text-xs text-[#FAF7F2]/70 leading-normal">
                  <div>Пн–Пт: 08:00 – 20:00</div>
                  <div>Сб–Вс: 10:00 – 18:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contacts with clear placeholders */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#C35B34]">
              Связь с мастерской
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C35B34]" />
                <span className="font-mono text-[#FAF7F2]/60 hover:text-white transition-colors cursor-pointer" title="Заполните перед публикацией">
                  +375 (29) 123-45-67 <span className="text-[10px] text-[#C35B34]">(заглушка)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#C35B34]" />
                <span className="font-mono text-[#FAF7F2]/60 hover:text-white transition-colors cursor-pointer" title="Заполните перед публикацией">
                  @kvarta_coffee <span className="text-[10px] text-[#C35B34]">(заглушка)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C35B34]" />
                <span className="font-mono text-[#FAF7F2]/60 hover:text-white transition-colors cursor-pointer" title="Заполните перед публикацией">
                  hello@kvartacoffee.by <span className="text-[10px] text-[#C35B34]">(заглушка)</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/50">
          <div>
            © 2019–2026 Кофейная мастерская «Кварта». Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline cursor-pointer"
            >
              Политика обработки данных (проект)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

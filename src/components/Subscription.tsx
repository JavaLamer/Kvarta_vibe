import React from 'react';
import { Check, Calendar, Truck, Package } from 'lucide-react';

interface SubscriptionProps {
  onSubscribeClick: () => void;
}

export const Subscription: React.FC<SubscriptionProps> = ({ onSubscribeClick }) => {
  return (
    <section className="py-12 md:py-20 border-b border-[#E8DFD8] bg-[#F5EFE8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div id="subscription" className="max-w-3xl mx-auto bg-white border border-[#E3DAD1] rounded-sm p-8 sm:p-12 shadow-xs scroll-mt-20 sm:scroll-mt-22">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34]">
              03 · Регулярная доставка
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#261C18] leading-tight">
              Кофе, о котором не нужно вспоминать
            </h2>
            <p className="text-base sm:text-lg text-[#5A4B42] max-w-xl mx-auto">
              Мы обжариваем зерно специально для вас и привозим свежим раз в месяц. Ваш ритуал продолжается без пауз.
            </p>
          </div>

          {/* Offer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-[#E8DFD8] mb-10">
            
            <div className="space-y-2 text-center sm:text-left">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3DAD1] flex items-center justify-center mx-auto sm:mx-0 text-[#C35B34]">
                <Package className="w-4 h-4" />
              </div>
              <div className="font-serif text-lg font-bold text-[#261C18]">
                2 пачки по 250 г
              </div>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Два разных сорта свежей обжарки каждый месяц или ваш любимый сорт
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3DAD1] flex items-center justify-center mx-auto sm:mx-0 text-[#C35B34]">
                <Truck className="w-4 h-4" />
              </div>
              <div className="font-serif text-lg font-bold text-[#261C18]">
                Доставка бесплатно
              </div>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Курьерская доставка по Минску в пятницу сразу после обжарки
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3DAD1] flex items-center justify-center mx-auto sm:mx-0 text-[#C35B34]">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="font-serif text-lg font-bold text-[#261C18]">
                Раз в месяц
              </div>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Менеджер согласует удобную дату и сорт перед каждой отправкой
              </p>
            </div>

          </div>

          {/* Pricing & CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
            <div>
              <div className="text-xs font-mono text-[#6E5D53] uppercase tracking-wider mb-1">
                Стоимость подписки
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#261C18] tabular-nums">
                  54 BYN
                </span>
                <span className="text-sm font-mono text-[#6E5D53]">/ в месяц</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onSubscribeClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#261C18] hover:bg-[#C35B34] text-white text-sm sm:text-base font-medium rounded-sm transition-colors cursor-pointer shadow-xs whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C35B34]"
            >
              Хочу подписку
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-[#6E5D53]">
            Без предоплаты на сайте — менеджер свяжется с вами и согласует удобный способ оплаты при доставке.
          </div>

        </div>

      </div>
    </section>
  );
};

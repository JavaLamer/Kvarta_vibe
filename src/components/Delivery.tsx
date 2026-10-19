import React from 'react';
import { MapPin, Clock, Truck, Store } from 'lucide-react';

export const Delivery: React.FC = () => {
  return (
    <section className="py-12 md:py-20 border-b border-[#E8DFD8] bg-[#F5EFE8]">
      <div id="delivery" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-22">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-3">
            05 · Доставка и самовывоз
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#261C18] leading-tight">
            Как забрать или получить ваш кофе
          </h2>
          <p className="text-base text-[#5A4B42] mt-3">
            Мы находимся в центре Минска. Вы можете забрать заказ лично из мастерской или заказать курьерскую доставку на дом.
          </p>
        </div>

        {/* 2 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Самовывоз */}
          <div className="bg-white border border-[#E3DAD1] rounded-sm p-6 sm:p-8 flex flex-col h-full justify-between shadow-2xs">
            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E3DAD1] flex items-center justify-center text-[#C35B34] shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#261C18]">
                    Самовывоз из мастерской
                  </h3>
                  <span className="text-xs font-mono text-[#4A5843] font-medium">Бесплатно · Любая сумма</span>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div className="p-4 bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm space-y-1">
                  <div className="font-serif font-bold text-base text-[#261C18]">
                    Минск, ул. Короля, 9
                  </div>
                  <p className="text-xs text-[#6E5D53] leading-relaxed">
                    Вход со двора, кофейная мастерская «Кварта». Забрать готовый кофе можно в день обжарки или в любой удобный день недели.
                  </p>
                </div>

                <div className="space-y-2 text-sm text-[#5A4B42]">
                  <div className="font-medium text-[#261C18]">Часы работы мастерской:</div>
                  <div className="text-xs sm:text-sm text-[#6E5D53] space-y-1">
                    <div>Понедельник — пятница: <span className="font-mono text-[#261C18]">08:00 – 20:00</span></div>
                    <div>Суббота — воскресенье: <span className="font-mono text-[#261C18]">10:00 – 18:00</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom line aligned with Card 2 */}
            <div className="mt-6 pt-6 border-t border-[#E8DFD8] text-xs text-[#6E5D53]">
              Заказ можно забрать в день готовности после согласования с менеджером.
            </div>
          </div>

          {/* Card 2: Доставка по Минску */}
          <div className="bg-white border border-[#E3DAD1] rounded-sm p-6 sm:p-8 flex flex-col h-full justify-between shadow-2xs">
            <div className="flex-1 flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E3DAD1] flex items-center justify-center text-[#C35B34] shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#261C18]">
                    Доставка курьером по Минску
                  </h3>
                  <span className="text-xs font-mono text-[#C35B34] font-medium">Каждую пятницу</span>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                <div className="p-4 bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm space-y-1">
                  <div className="font-serif font-bold text-base text-[#261C18]">
                    Бесплатная доставка от 50 BYN
                  </div>
                  <p className="text-xs text-[#6E5D53] leading-relaxed">
                    При заказе на сумму от 50 BYN или оформлении регулярной подписки курьерская доставка по Минску полностью бесплатна.
                  </p>
                </div>

                <div className="space-y-2 text-sm text-[#5A4B42]">
                  <div className="font-medium text-[#261C18]">График доставки:</div>
                  <p className="text-xs text-[#6E5D53] leading-relaxed">
                    Доставка осуществляется по пятницам после четверговой обжарки в согласованный с вами временной интервал. При заказе менее 50 BYN стоимость доставки курьером согласовывается менеджером при подтверждении.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom line aligned with Card 1 */}
            <div className="mt-6 pt-6 border-t border-[#E8DFD8] text-xs text-[#6E5D53]">
              Оплата производится при получении заказа курьеру или при самовывозе.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

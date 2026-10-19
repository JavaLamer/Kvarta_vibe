import React from 'react';
import { Flame, PackageCheck, Truck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      day: 'Четверг',
      icon: Flame,
      title: 'День обжарки в печи',
      description: 'Каждый четверг мы запускаем обжарочную печь на Короля, 9 и готовим кофе микро-партиями по 5 кг под поступившие заказы. Никакого залежавшегося зерна.',
    },
    {
      day: 'Сборка',
      icon: PackageCheck,
      title: 'Подготовка и клапан свежести',
      description: 'Зёрна остывают на охлаждающем столе после печи, дегазируются и упаковываются в защитные пакеты с клапаном дегазации. На каждой пачке ставится точная дата обжарки.',
    },
    {
      day: 'Пятница',
      icon: Truck,
      title: 'Доставка по Минску',
      description: 'В пятницу заказы отправляются с курьером по Минску либо готовы к самовывозу. Вы получаете кофе на 1–3-й день после печи — в самом идеальном окне свежести.',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-b border-[#E8DFD8] bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-3">
            04 · График и свежесть
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#261C18] leading-tight">
            Почему свежесть обжарки решает всё: короткий цикл от печи до чашки
          </h2>
          <p className="text-base text-[#5A4B42] mt-3 leading-relaxed">
            Кофе — это свежий натуральный продукт. В отличие от магазинных пачек, которые лежат на полках по полгода, зерно из нашей печи попадает в вашу чашку на пике своего природного аромата.
          </p>
        </div>

        {/* 3 Step Cards (Equal Height) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E3DAD1] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xs h-full"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD8] text-xs font-mono text-[#6E5D53]">
                    <span className="text-[#C35B34] font-medium">{step.day}</span>
                    <span>ЭТАП 0{idx + 1}</span>
                  </div>

                  <div className="py-6 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#F5EFE8] flex items-center justify-center text-[#261C18]">
                      <Icon className="w-5 h-5 text-[#C35B34]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#261C18]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5A4B42] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DFD8] text-xs font-mono text-[#6E5D53]">
                  {idx === 0 && 'Партии 5 кг · Минск'}
                  {idx === 1 && 'Клапан дегазации'}
                  {idx === 2 && '1–3 дня после обжарки'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Freshness Explanation Callout */}
        <div className="p-6 sm:p-8 bg-[#F5EFE8] border border-[#E3DAD1] rounded-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34]">
              Пик вкуса зерна
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#261C18]">
              Почему кофе теряет вкус со временем?
            </h3>
          </div>
          <div className="md:col-span-8 space-y-3 text-sm text-[#5A4B42] leading-relaxed">
            <p>
              В первые 1–3 недели после обжарки в зёрнах сохраняются живые летучие эфирные соединения, натуральные сахара и деликатные цветочные ноты. 
            </p>
            <p>
              Через 2–3 месяца в обычных пачках из супермаркета эти масла окисляются на свету и воздухе: напиток теряет индивидуальный профиль сорта и становится однообразно горьким и пыльным. Именно поэтому мы обжариваем кофе партиями по 5 кг только под заказ и доставляем его свежим каждую пятницу.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

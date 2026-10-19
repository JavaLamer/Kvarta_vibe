import React from 'react';
import { MinimalBeanRouteArt } from './MinimalBeanRouteArt';

export const About: React.FC = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 border-b border-[#E8DFD8] bg-[#FAF7F2]">
      <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 scroll-mt-20 sm:scroll-mt-22">
        
        {/* Section Header (stretched) */}
        <div className="max-w-4xl mb-10 sm:mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-3">
            01 · О мастерской
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#261C18] leading-tight [text-wrap:balance]">
            Сначала мы варили кофе. Теперь обжариваем его уже 7 лет.
          </h2>
        </div>

        {/* 2-Column Grid: Text on the left, Visual Route on the right (stretched) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-stretch">
          
          {/* Left Column: Narrative Text */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-between space-y-6 text-[#5A4B42] text-base sm:text-lg leading-relaxed">
            <div className="space-y-5">
              <p>
                Основатели «Кварты» — Аня и Дмитрий. До открытия собственной мастерской мы несколько лет работали бариста в минских кофейнях: настраивали эспрессо, заваривали воронки и каждый день узнавали, как сильно зерно влияет на вкус в чашке.
              </p>
              <p>
                В 2019 году мы решили пойти дальше и начать обжаривать кофе самостоятельно. С тех пор работаем небольшими партиями — по 5 килограммов за одну загрузку ростера. Так мы можем внимательнее следить за процессом и раскрывать характер каждого сорта.
              </p>
              
              <div className="p-5 sm:p-6 bg-[#F5EFE8] border border-[#E3DAD1] rounded-sm space-y-2.5">
                <h3 className="font-serif text-lg font-bold text-[#261C18]">
                  Свежесть начинается с обжарки.
                </h3>
                <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
                  Мы не запасаемся кофе на месяцы вперёд. Каждую неделю обжариваем зерно в четверг, а в пятницу развозим заказы по Минску. Поэтому кофе попадает к вам через 1–3 дня после обжарки— без долгого ожидания на складе.
                </p>
              </div>

              <p>
                За семь лет наш подход не изменился: лучше небольшая партия, за которой следишь сам, чем большие объёмы ради количества. Ведь хороший кофе — это не только происхождение зерна, но и внимание к тому, что происходит с ним после обжарки.
              </p>
            </div>
          </div>

          {/* Right Column: Visual route without text (mainland, ship, Minsk) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
            <MinimalBeanRouteArt className="h-full min-h-[460px] sm:min-h-[500px]" />
          </div>

        </div>

      </div>
    </section>
  );
};

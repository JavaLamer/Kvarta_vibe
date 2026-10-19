import React from 'react';

export const CoffeeJourneyMap: React.FC = () => {
  const stages = [
    {
      num: '01',
      title: 'Остров и плантация',
      subtitle: 'Эфиопия, Колумбия, Бразилия',
      timing: 'Сбор урожая',
      coord: '6°~4° N, 1900 м',
      description: 'Высокогорный терруар (1200–2200 м). Сбор только спелых ягод вручную, деликатная мытая или сухая обработка, сушка на африканских кроватях.',
    },
    {
      num: '02',
      title: 'Кораблик к материку',
      subtitle: 'Морской переход через океан',
      timing: '3–6 недель в пути',
      coord: 'Атлантика · GrainPro',
      description: 'Зелёное зерно упаковывается в джутовые мешки с герметичной защитой GrainPro и плывёт через океан в трюмах грузового судна.',
    },
    {
      num: '03',
      title: 'Прибытие в Минск',
      subtitle: 'Мастерская на Короля, 9',
      timing: 'Континентальный путь',
      coord: 'Минск · 53°54′ N',
      description: 'Мешки с отборным зелёным зерном поступают прямо в нашу мастерскую в центре Минска. Зерно проходит входной контроль и отдыхает перед обжаркой.',
    },
    {
      num: '04',
      title: 'Ростер «Кварта»',
      subtitle: 'Партии ровно по 5 кг',
      timing: 'Каждый четверг',
      coord: 'Чугунный барабан',
      description: 'Обжарка в чугунном ростере под чутким контролем температуры и времени развития. Никакого промышленного склада — только свежие партии.',
    },
    {
      num: '05',
      title: 'Ваша утренняя чашка',
      subtitle: 'Доставка по пятницам',
      timing: '1–3 дня после обжара',
      coord: 'Минск & дома',
      description: 'Кофе приезжает к вам на пике вкуса, когда зерно дегазировалось и раскрыло свой полный букет: цветы, спелые яблоки, тёмный шоколад.',
    },
  ];

  return (
    <div className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-12 xl:px-16">
      
      {/* Section Header inside Full-Width Band */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[#E3DAD1] gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C35B34] animate-pulse" />
            <span>Интерактивная карта происхождения и логистики</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#261C18]">
            Путь зерна: от далёкого острова до вашей чашки
          </h3>
        </div>
        <div className="text-xs font-mono text-[#6E5D53] shrink-0 bg-white/70 px-3 py-1.5 border border-[#E3DAD1] rounded-xs">
          Полная цепочка · 5 кг загрузка · 1–3 дня свежести
        </div>
      </div>

      {/* FULL-WIDTH PANORAMIC ROUTE MAP (Vector Illustration: Island -> Boat -> Mainland -> Minsk Roaster -> Fresh Cup) */}
      <div className="max-w-7xl mx-auto mb-10 overflow-hidden bg-white border border-[#E3DAD1] rounded-sm p-4 sm:p-6 lg:p-8 shadow-xs">
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <div className="min-w-[800px] lg:min-w-full">
            <svg
              viewBox="0 0 1200 230"
              className="w-full h-auto drop-shadow-2xs select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Схема пути зерна: остров в океане, кораблик к материку, прибытие в Минск, ростер и утренняя чашка"
            >
              <defs>
                {/* Subtle linear gradients */}
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FAF7F2" />
                  <stop offset="30%" stopColor="#F0EAE1" />
                  <stop offset="70%" stopColor="#F5EFE8" />
                  <stop offset="100%" stopColor="#FAF7F2" />
                </linearGradient>
                <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C35B34" />
                  <stop offset="50%" stopColor="#A64823" />
                  <stop offset="100%" stopColor="#261C18" />
                </linearGradient>
              </defs>

              {/* Water background panel */}
              <rect x="10" y="10" width="1180" height="210" rx="4" fill="url(#oceanGrad)" stroke="#E8DFD8" strokeWidth="1" />

              {/* Subtle navigation grid / latitude lines */}
              <line x1="20" y1="60" x2="1180" y2="60" stroke="#E3DAD1" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />
              <line x1="20" y1="120" x2="1180" y2="120" stroke="#E3DAD1" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />
              <line x1="20" y1="180" x2="1180" y2="180" stroke="#E3DAD1" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.6" />

              {/* CONTINUOUS LOGISTICS ROUTE (Dashed path with animated indicator) */}
              <path
                d="M 140 135 C 230 135, 290 85, 410 110 C 530 135, 600 95, 710 120 C 820 145, 890 95, 1000 130"
                stroke="url(#routeGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 5"
                strokeLinecap="round"
              />

              {/* ========================================================
                  STAGE 1: TROPICAL ISLAND & COFFEE PLANTATION (left)
                  ======================================================== */}
              <g id="island-stage" transform="translate(40, 45)">
                {/* Island base landmass */}
                <path d="M 10 125 Q 45 100 110 105 Q 165 95 185 125 Q 160 145 95 142 Q 25 145 10 125 Z" fill="#E5DDD2" stroke="#3D2E26" strokeWidth="1.5" />
                {/* Volcanic mountains on island */}
                <path d="M 30 115 L 65 55 L 100 115 Z" fill="#D3C7B8" stroke="#3D2E26" strokeWidth="1.5" />
                <path d="M 55 72 L 65 55 L 75 72 Z" fill="#FAF7F2" />
                <path d="M 85 118 L 120 70 L 155 118 Z" fill="#DFD4C7" stroke="#3D2E26" strokeWidth="1.5" />
                
                {/* Coffee trees with ripe red cherries */}
                <path d="M 145 118 V 95" stroke="#3D2E26" strokeWidth="2" />
                <circle cx="145" cy="90" r="11" fill="#4A5843" stroke="#3D2E26" strokeWidth="1" />
                <circle cx="142" cy="88" r="2.5" fill="#C35B34" />
                <circle cx="148" cy="91" r="2.5" fill="#C35B34" />
                <circle cx="144" cy="94" r="2" fill="#C35B34" />

                {/* Plantation Drying Bed */}
                <rect x="25" y="118" width="28" height="8" rx="1" fill="#FAF7F2" stroke="#3D2E26" strokeWidth="1" />
                <line x1="25" y1="122" x2="53" y2="122" stroke="#C35B34" strokeWidth="1" strokeDasharray="2 2" />

                {/* Island Label & Pin */}
                <rect x="42" y="24" width="90" height="20" rx="2" fill="#FAF7F2" stroke="#C35B34" strokeWidth="1" />
                <text x="87" y="38" textAnchor="middle" fill="#261C18" fontSize="9" fontFamily="sans-serif" fontWeight="bold">01 · ОСТРОВ</text>
                <circle cx="87" cy="48" r="2" fill="#C35B34" />
                
                {/* Sun over island */}
                <circle cx="25" cy="30" r="8" fill="#FBF9F5" stroke="#C35B34" strokeWidth="1.2" strokeDasharray="2 2" />
              </g>

              {/* ========================================================
                  STAGE 2: SHIP SAILING ACROSS OCEAN TO MAINLAND
                  ======================================================== */}
              <g id="ship-stage" transform="translate(340, 55)">
                {/* Ocean swell waves */}
                <path d="M -50 85 Q -30 75 -10 85 T 30 85 T 70 85 T 110 85 T 150 85" stroke="#8A776A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                <path d="M -40 95 Q -20 88 0 95 T 40 95 T 80 95 T 120 95" stroke="#B8ABA0" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                
                {/* Cargo Boat Hull */}
                <path d="M 0 68 L 14 85 H 86 L 102 68 H 0 Z" fill="#261C18" stroke="#261C18" strokeWidth="1.5" />
                <line x1="0" y1="68" x2="102" y2="68" stroke="#FAF7F2" strokeWidth="1" />
                
                {/* Ship Cabin & Bridge */}
                <rect x="65" y="48" width="22" height="20" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.5" />
                <rect x="70" y="52" width="6" height="5" fill="#3D2E26" />
                <rect x="78" y="52" width="6" height="5" fill="#3D2E26" />
                
                {/* Exhaust Funnel / Mast */}
                <rect x="77" y="36" width="6" height="12" fill="#C35B34" stroke="#261C18" strokeWidth="1" />
                
                {/* GrainPro burlap containers/sacks on deck */}
                <rect x="14" y="56" width="16" height="12" rx="1" fill="#C35B34" stroke="#261C18" strokeWidth="1" />
                <rect x="32" y="56" width="16" height="12" rx="1" fill="#A64823" stroke="#261C18" strokeWidth="1" />
                <rect x="50" y="56" width="14" height="12" rx="1" fill="#D9CFC3" stroke="#261C18" strokeWidth="1" />
                <rect x="23" y="44" width="16" height="12" rx="1" fill="#EAE2D8" stroke="#261C18" strokeWidth="1" />

                {/* Route Arrow forward */}
                <polygon points="120,70 135,76 120,82" fill="#C35B34" />

                {/* Ship Label */}
                <rect x="12" y="14" width="96" height="20" rx="2" fill="#FAF7F2" stroke="#261C18" strokeWidth="1" />
                <text x="60" y="28" textAnchor="middle" fill="#261C18" fontSize="9" fontFamily="sans-serif" fontWeight="bold">02 · КОРАБЛИК</text>
              </g>

              {/* ========================================================
                  STAGE 3: MAINLAND COASTLINE & ROAD TO MINSK
                  ======================================================== */}
              <g id="mainland-stage" transform="translate(620, 50)">
                {/* Mainland shoreline */}
                <path d="M 0 130 C 20 110, 40 80, 50 40 L 150 40 L 150 140 L 0 140 Z" fill="#EAE2D8" opacity="0.6" />
                {/* Port crane on shore */}
                <path d="M 18 105 L 30 75 L 42 105" stroke="#3D2E26" strokeWidth="1.5" />
                <line x1="22" y1="75" x2="65" y2="75" stroke="#C35B34" strokeWidth="1.5" />
                <line x1="55" y1="75" x2="55" y2="90" stroke="#3D2E26" strokeWidth="1" strokeDasharray="1 1" />
                <rect x="51" y="90" width="8" height="6" fill="#A64823" />

                {/* Continental route to Minsk pin */}
                <path d="M 45 105 Q 80 100 115 82" stroke="#C35B34" strokeWidth="2" strokeDasharray="3 3" />
                
                {/* Workshop Building at Korolya 9 */}
                <rect x="110" y="70" width="45" height="32" rx="1" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.5" />
                <polygon points="105,70 132.5,52 160,70" fill="#3D2E26" />
                <rect x="128" y="82" width="10" height="20" fill="#C35B34" />
                <rect x="115" y="76" width="8" height="8" fill="#EAE2D8" stroke="#3D2E26" strokeWidth="0.8" />
                <rect x="142" y="76" width="8" height="8" fill="#EAE2D8" stroke="#3D2E26" strokeWidth="0.8" />

                {/* Minsk Location Pin */}
                <circle cx="132" cy="40" r="5" fill="#C35B34" stroke="#261C18" strokeWidth="1.5" />
                <circle cx="132" cy="40" r="2" fill="#FAF7F2" />

                {/* Stage 3 Label */}
                <rect x="80" y="10" width="105" height="20" rx="2" fill="#FAF7F2" stroke="#261C18" strokeWidth="1" />
                <text x="132" y="24" textAnchor="middle" fill="#261C18" fontSize="9" fontFamily="sans-serif" fontWeight="bold">03 · МАТЕРИК · МИНСК</text>
              </g>

              {/* ========================================================
                  STAGE 4: KVARTA 5KG ROASTER DRUM (Thursday)
                  ======================================================== */}
              <g id="roaster-stage" transform="translate(850, 55)">
                {/* Roaster Body Drum */}
                <rect x="10" y="52" width="65" height="42" rx="4" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.8" />
                <circle cx="42" cy="73" r="16" stroke="#C35B34" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="42" cy="73" r="6" fill="#261C18" />
                <circle cx="42" cy="73" r="2" fill="#C35B34" />

                {/* Hopper funnel on top */}
                <polygon points="32,42 52,42 47,52 37,52" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.5" />

                {/* Cooling round tray */}
                <ellipse cx="42" cy="102" rx="30" ry="7" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.5" />
                <line x1="24" y1="102" x2="60" y2="102" stroke="#C35B34" strokeWidth="1.5" />
                
                {/* 5kg Badge */}
                <rect x="2" y="18" width="82" height="20" rx="2" fill="#FAF7F2" stroke="#C35B34" strokeWidth="1" />
                <text x="43" y="32" textAnchor="middle" fill="#C35B34" fontSize="9" fontFamily="sans-serif" fontWeight="bold">04 · РОСТЕР 5 КГ</text>
                
                {/* Flame indicator */}
                <path d="M 38 116 Q 42 110 42 108 Q 42 110 46 116 Z" fill="#C35B34" />
              </g>

              {/* ========================================================
                  STAGE 5: FRESH MORNING CUP & DELIVERY (Friday)
                  ======================================================== */}
              <g id="cup-stage" transform="translate(1020, 50)">
                {/* Ceramic Coffee Cup */}
                <path d="M 25 72 L 32 110 C 33 114 38 117 44 117 H 70 C 76 117 80 114 82 110 L 89 72 Z" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.8" />
                <line x1="22" y1="72" x2="92" y2="72" stroke="#261C18" strokeWidth="2.2" strokeLinecap="round" />
                
                {/* Cup handle */}
                <path d="M 87 78 C 98 82 99 98 85 104" stroke="#261C18" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Coffee crema inside cup */}
                <ellipse cx="57" cy="74" rx="26" ry="4" fill="#C35B34" />

                {/* Aromatic Steam spirals */}
                <path d="M 46 62 C 48 52 44 45 47 36" stroke="#C35B34" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 57 60 C 59 48 55 42 58 32" stroke="#8A776A" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 68 62 C 70 52 66 45 69 36" stroke="#C35B34" strokeWidth="1.5" strokeLinecap="round" />

                {/* Saucer */}
                <ellipse cx="57" cy="120" rx="42" ry="5" fill="#FAF7F2" stroke="#261C18" strokeWidth="1.5" />

                {/* Stage 5 Label */}
                <rect x="15" y="14" width="85" height="20" rx="2" fill="#261C18" stroke="#261C18" strokeWidth="1" />
                <text x="57" y="28" textAnchor="middle" fill="#FAF7F2" fontSize="9" fontFamily="sans-serif" fontWeight="bold">05 · ВАША ЧАШКА</text>
              </g>

            </svg>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#6E5D53] border-t border-[#E8DFD8] pt-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C35B34]" />
            Маршрут: Островная высокогорная плантация → Переход через океан → Порт и материк → Мастерская на Короля, 9 → Свежая чашка
          </span>
          <span className="hidden sm:inline-block text-[#A64823]">
            100% прозрачность логистики
          </span>
        </div>
      </div>

      {/* 5 STAGES CARDS GRID (Spanning full width cleanly) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
        {stages.map((stage) => (
          <div
            key={stage.num}
            className="flex flex-col justify-between bg-white border border-[#E3DAD1] hover:border-[#C35B34] rounded-sm p-5 transition-all duration-150 shadow-2xs hover:shadow-xs group h-full"
          >
            <div>
              {/* Card Top Pill */}
              <div className="flex items-center justify-between text-xs font-mono pb-2.5 border-b border-[#E8DFD8] mb-3">
                <span className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E3DAD1] group-hover:border-[#C35B34] flex items-center justify-center font-bold text-[#261C18] group-hover:text-[#C35B34] transition-colors">
                  {stage.num}
                </span>
                <span className="text-[11px] font-medium text-[#C35B34]">
                  {stage.timing}
                </span>
              </div>

              {/* Title & Location */}
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#261C18] group-hover:text-[#C35B34] transition-colors leading-snug">
                {stage.title}
              </h4>
              <div className="text-[11px] font-mono text-[#6E5D53] mt-1 mb-2.5">
                {stage.subtitle}
              </div>

              {/* Coordinates / Specs */}
              <div className="inline-block px-1.5 py-0.5 bg-[#FAF7F2] border border-[#E8DFD8] rounded-xs text-[10px] font-mono text-[#5A4B42] mb-3">
                {stage.coord}
              </div>
            </div>

            {/* Description */}
            <p className="pt-3 border-t border-[#E8DFD8]/70 text-xs text-[#5A4B42] leading-relaxed">
              {stage.description}
            </p>
          </div>
        ))}
      </div>

      {/* Quality Guarantees Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#E3DAD1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E5D53] gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4A5843]" />
          <span>Спешелти-зерно в мешках GrainPro — влажность стабильна от острова до ростера</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C35B34]" />
          <span>Каждую неделю в четверг обжариваем ровно столько, сколько заказали</span>
        </div>
      </div>

    </div>
  );
};

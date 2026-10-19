import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

interface ProductCatalogProps {
  onProductClick: (product: Product) => void;
  onSelectSubscription: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onProductClick,
  onSelectSubscription,
}) => {
  return (
    <section className="py-12 md:py-20 border-b border-[#E8DFD8]">
      <div id="catalog" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 sm:scroll-mt-22">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-3">
            02 · Ассортимент
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#261C18] leading-tight">
            Три зерна. Три разных утра.
          </h2>
        </div>

        {/* 3 Grain Varieties Grid (Unified aesthetic matching each origin) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 items-stretch">
          {PRODUCTS.filter(p => !p.isDrip).map((product) => {
            // Curated photos in unified editorial style matching each origin's roast level
            const originDetails = {
              'ethiopia-yirgacheffe': {
                image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
                badge: 'ЭФИОПИЯ · 1900М · СВЕТЛАЯ',
                accentColor: '#C35B34',
              },
              'colombia-huila': {
                image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
                badge: 'КОЛУМБИЯ · 1700М · СРЕДНЯЯ',
                accentColor: '#A64823',
              },
              'brazil-cerrado': {
                image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
                badge: 'БРАЗИЛИЯ · 1100М · ЭСПРЕССО',
                accentColor: '#4A5843',
              },
            }[product.id] || {
              image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
              badge: 'СПЕШЕЛТИ АРАБИКА',
              accentColor: '#C35B34',
            };

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white border border-[#E3DAD1] hover:border-[#C35B34] rounded-sm p-6 sm:p-7 transition-all duration-150 shadow-2xs hover:shadow-xs h-full"
              >
                <div className="flex flex-col">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#6E5D53] pb-3 border-b border-[#E8DFD8]">
                    <span>{product.roastLevel}</span>
                    <span>{product.weight}</span>
                  </div>

                  {/* Unified Photo in cohesive editorial style */}
                  <div className="py-4">
                    <div className="w-full h-48 sm:h-52 rounded-sm overflow-hidden bg-[#FAF7F2] border border-[#E3DAD1] relative shadow-2xs">
                      <img
                        src={originDetails.image}
                        alt={`Зёрна и пачка свежеобжаренного кофе ${product.name}`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {/* Top left weight badge */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#261C18]/85 backdrop-blur-xs text-[10px] font-mono text-white rounded-xs">
                        250 Г
                      </div>
                      {/* Bottom origin badge */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 px-2.5 py-1 bg-[#FAF7F2]/95 backdrop-blur-xs border border-[#E3DAD1] text-[10px] font-mono text-[#261C18] rounded-xs flex items-center justify-between">
                        <span>{originDetails.badge}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: originDetails.accentColor }} />
                      </div>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#261C18] mt-1 mb-2">
                    {product.name}
                  </h3>

                  {/* Tasting notes (strictly aligned across all 3 cards) */}
                  <div className="space-y-1.5 mt-1">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#6E5D53]">
                      Вкусовой профиль
                    </div>
                    <div className="text-sm font-semibold text-[#261C18] h-10 sm:h-11 flex items-start leading-snug">
                      {product.flavorProfile}
                    </div>
                  </div>
                </div>

                {/* Footer action button */}
                <div className="pt-5 mt-5 border-t border-[#E8DFD8] flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl font-bold text-[#261C18] tabular-nums">
                      {product.price} {product.currency}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onProductClick(product)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#261C18] group-hover:text-[#C35B34] transition-colors cursor-pointer py-1"
                  >
                    <span>Подробнее</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4th & 5th Items: Drip Bags (friendly format) & Subscription Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-4 items-stretch">
          
          {/* Friendly Drip Packets Card */}
          {PRODUCTS.filter(p => p.isDrip).map((dripProduct) => (
            <div
              key={dripProduct.id}
              className="lg:col-span-6 group bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm p-6 sm:p-8 flex flex-col justify-between hover:border-[#C35B34] transition-all shadow-2xs h-full"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#6E5D53] pb-3 border-b border-[#E8DFD8]">
                  <span className="font-medium text-[#C35B34]">Кофе в чашку (фильтр-пакеты)</span>
                  <span>{dripProduct.weight}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-6">
                  {/* Photo of drip packet brewing */}
                  <div className="sm:col-span-5 aspect-square max-w-[175px] mx-auto rounded-sm overflow-hidden bg-[#EAE2D8] border border-[#E3DAD1] shadow-2xs relative">
                    <img
                      src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
                      alt="Заваривание свежего кофе в фильтр-пакете прямо в чашку"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#261C18]/85 backdrop-blur-xs text-[9px] font-mono text-white rounded-xs">
                      10 ПОРЦИЙ
                    </div>
                  </div>
                  <div className="sm:col-span-7 space-y-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#261C18]">
                      {dripProduct.name}
                    </h3>
                    <p className="text-sm text-[#5A4B42] leading-relaxed">
                      Любимый кофе без кофемолки и сложных воронок. Просто закрепите фильтр-пакет на чашке и залейте горячей водой дома, в офисе или в дороге.
                    </p>
                    <div className="text-xs font-mono text-[#C35B34]">
                      10 порций фильтр-кофе · Ассорти 3 сортов
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DFD8] flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-[#261C18] tabular-nums">
                  {dripProduct.price} {dripProduct.currency}
                </span>
                <button
                  type="button"
                  onClick={() => onProductClick(dripProduct)}
                  className="px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-white bg-[#261C18] hover:bg-[#C35B34] rounded-sm transition-colors cursor-pointer"
                >
                  Хочу кофе в чашку
                </button>
              </div>
            </div>
          ))}

          {/* Quick Subscription Card */}
          <div className="lg:col-span-6 bg-[#261C18] text-[#FAF7F2] rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#FAF7F2]/60 pb-3 border-b border-white/10">
                <span>Регулярная доставка</span>
                <span>Бесплатная доставка по Минску</span>
              </div>

              <div className="py-6 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34]">
                  Кофейная подписка
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Две пачки по 250 г каждый месяц
                </h3>
                <p className="text-sm text-[#FAF7F2]/80 leading-relaxed">
                  Свежая обжарка каждый месяц прямо к вам домой или в офис. Доставка бесплатная, кофе всегда в наличии.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="font-serif text-xl font-bold text-white tabular-nums">
                  54 BYN
                </span>
                <span className="text-xs font-mono text-[#FAF7F2]/60 ml-2">/ месяц</span>
              </div>
              <button
                type="button"
                onClick={onSelectSubscription}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#261C18] bg-[#FAF7F2] hover:bg-[#C35B34] hover:text-white rounded-sm transition-colors cursor-pointer"
              >
                Подробнее о подписке
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

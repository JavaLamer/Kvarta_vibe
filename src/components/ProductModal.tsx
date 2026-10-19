import React, { useEffect, useRef } from 'react';
import { X, Check, Flame, Coffee, Package } from 'lucide-react';
import { Product } from '../types';
import ethiopiaImg from '../assets/images/regenerated_image_1792414078239.jpg';
import colombiaImg from '../assets/images/regenerated_image_1792414067922.jpg';
import brazilImg from '../assets/images/regenerated_image_1792414057933.jpg';
import dripBagsImg from '../assets/images/regenerated_image_1792414052726.jpg';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectForOrder: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSelectForOrder,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape & trap focus
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6E5D53] hover:text-[#261C18] hover:bg-[#EAE2D8] rounded-sm transition-colors cursor-pointer"
          aria-label="Закрыть модальное окно"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-8 pb-4 border-b border-[#E8DFD8]">
          <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-1">
            {product.subtitle}
          </div>
          <h3
            id="modal-product-title"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#261C18]"
          >
            {product.name}
          </h3>
          <div className="mt-3 flex items-baseline gap-4">
            <span className="font-serif text-2xl font-bold text-[#261C18] tabular-nums">
              {product.price} {product.currency}
            </span>
            <span className="text-sm font-mono text-[#6E5D53]">
              / {product.weight}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6">
          {/* Product Photo */}
          <div className="w-full h-44 sm:h-52 rounded-sm overflow-hidden bg-[#EAE2D8] border border-[#E3DAD1]">
            <img
              src={
                product.id === 'ethiopia-yirgacheffe'
                  ? ethiopiaImg
                  : product.id === 'colombia-huila'
                  ? colombiaImg
                  : product.id === 'brazil-cerrado'
                  ? brazilImg
                  : dripBagsImg
              }
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Flavor Profile */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6E5D53] mb-2">
              Вкусовой профиль
            </h4>
            <div className="p-3.5 bg-[#F4EFEA] border border-[#E3DAD1] rounded-sm text-base font-medium text-[#261C18]">
              {product.flavorProfile}
            </div>
          </div>

          {/* Tasting notes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6E5D53] mb-2">
              Дескрипторы вкуса
            </h4>
            <div className="flex flex-wrap gap-2 text-sm text-[#261C18]">
              {product.notes.map((note, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-white border border-[#E3DAD1] rounded-sm font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Characteristics */}
          {product.roastLevel && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white border border-[#E3DAD1] rounded-sm">
                <span className="text-xs font-mono text-[#6E5D53] block mb-1">Степень обжарки</span>
                <span className="font-medium text-[#261C18] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#C35B34]" />
                  {product.roastLevel}
                </span>
              </div>
              <div className="p-3 bg-white border border-[#E3DAD1] rounded-sm">
                <span className="text-xs font-mono text-[#6E5D53] block mb-1">Вес упаковки</span>
                <span className="font-medium text-[#261C18] flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#4A5843]" />
                  {product.weight}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="text-sm sm:text-base text-[#5A4B42] leading-relaxed">
            {product.description}
          </div>

          {/* Recommendations (noted as practical barista tips) */}
          {product.recommendedBrew && product.recommendedBrew.length > 0 && (
            <div className="pt-4 border-t border-[#E8DFD8]">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6E5D53] mb-2 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-[#C35B34]" />
                Рекомендованный способ заваривания
              </h4>
              <ul className="space-y-1.5 text-sm text-[#5A4B42]">
                {product.recommendedBrew.map((method, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C35B34] font-bold">·</span>
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal CTA */}
        <div className="pt-4 border-t border-[#E8DFD8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6E5D53]">
            Обжариваем в четверг · Доставка в пятницу
          </div>
          <button
            type="button"
            onClick={() => onSelectForOrder(product)}
            className="w-full sm:w-auto px-6 py-3 bg-[#261C18] hover:bg-[#C35B34] text-white text-sm font-medium rounded-sm transition-colors cursor-pointer shadow-xs whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#C35B34]"
          >
            Хочу этот кофе
          </button>
        </div>
      </div>
    </div>
  );
};

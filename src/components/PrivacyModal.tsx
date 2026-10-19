import React, { useEffect } from 'react';
import { X, FileText, AlertTriangle } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#6E5D53] hover:text-[#261C18] rounded-sm transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pr-8 pb-4 border-b border-[#E8DFD8]">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C35B34] mb-1">
            <FileText className="w-4 h-4" />
            <span>Документ-заготовка</span>
          </div>
          <h3 id="privacy-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-[#261C18]">
            Политика обработки персональных данных
          </h3>
        </div>

        {/* Notice of draft status */}
        <div className="my-4 p-4 bg-[#F5EFE8] border border-[#C35B34]/30 rounded-sm flex items-start gap-3 text-xs sm:text-sm text-[#5A4B42]">
          <AlertTriangle className="w-5 h-5 text-[#C35B34] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#261C18] block font-medium mb-0.5">Внимание (для владельцев мастерской):</strong>
            Это проект документа-заготовки в соответствии с Законом Республики Беларусь от 07.05.2021 № 99-З «О защите персональных данных». Перед публичным запуском сайта необходимо внести официальные реквизиты юридического лица или ИП и утвердить документ.
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#5A4B42] leading-relaxed">
          <section>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#261C18] mb-1">
              1. Общие положения
            </h4>
            <p>
              Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта кофейной мастерской «Кварта» (г. Минск, ул. Короля, 9). Мы собираем минимально необходимый объем данных исключительно для обработки заказов, подписок и связи с покупателем.
            </p>
          </section>

          <section>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#261C18] mb-1">
              2. Какие данные обрабатываются
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Имя клиента (для обращения при подтверждении заказа).</li>
              <li>Номер телефона (для звонка или сообщения менеджера).</li>
              <li>Комментарий и состав заказа (сорт кофе, помол, адрес доставки).</li>
              <li>Технические метки источника перехода (UTM-метки) для оценки эффективности рекламы.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#261C18] mb-1">
              3. Цели обработки данных
            </h4>
            <p>
              Персональные данные используются только для:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Уточнения параметров заказа кофе или подписки.</li>
              <li>Организации доставки по Минску или самовывоза на Короля, 9.</li>
              <li>Предоставления консультаций по обжарке и методам заваривания.</li>
            </ul>
          </section>

          <section>
            <h4 className="font-serif font-bold text-sm sm:text-base text-[#261C18] mb-1">
              4. Защита и передача третьим лицам
            </h4>
            <p>
              Мы не передаём ваши контактные данные третьим лицам в рекламных целях. Доступ к заявкам имеют только основатели и сотрудники мастерской для выполнения вашего заказа.
            </p>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E8DFD8] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#261C18] hover:bg-[#C35B34] text-white text-xs font-medium rounded-sm transition-colors cursor-pointer"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};

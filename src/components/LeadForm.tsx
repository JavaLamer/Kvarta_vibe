import React, { useState } from 'react';
import { InterestType, LeadFormData, LeadApiResponse } from '../types';
import { formatByPhoneInput, isValidByPhone } from '../lib/phone';
import { getOrCaptureUtmParams } from '../lib/utm';
import { CheckCircle2, AlertCircle, Loader2, X, RefreshCw } from 'lucide-react';

interface LeadFormProps {
  initialInterest?: InterestType;
  selectedProduct?: string | null;
  onClearProduct?: () => void;
  onOpenPrivacy: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialInterest = 'one_time',
  selectedProduct = null,
  onClearProduct,
  onOpenPrivacy,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+375 ');
  const [interest, setInterest] = useState<InterestType>(initialInterest);
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(true);

  // Form interaction states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<LeadApiResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Sync initial interest when changed by parent button clicks
  React.useEffect(() => {
    if (initialInterest) {
      setInterest(initialInterest);
    }
  }, [initialInterest]);

  const phoneInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const oldRaw = phone;
    const newRaw = input.value;

    // Count digits before cursor in old string
    const oldDigitsBeforeCursor = oldRaw.slice(0, cursorPosition).replace(/\D/g, '').length;

    const formatted = formatByPhoneInput(newRaw);
    setPhone(formatted);

    // Move cursor to the end to ensure smooth typing experience
    requestAnimationFrame(() => {
      if (phoneInputRef.current) {
        const len = formatted.length;
        phoneInputRef.current.setSelectionRange(len, len);
      }
    });

    if (fieldErrors.phone) {
      setFieldErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (fieldErrors.name) {
      setFieldErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const validateClientSide = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Пожалуйста, введите ваше имя';
    }

    if (!phone || phone.trim() === '+375' || !isValidByPhone(phone)) {
      errors.phone = 'Укажите номер Беларуси с кодом 29, 33, 44, 17, 25 или 15: +375 (XX) XXX-XX-XX';
    }

    if (!consent) {
      errors.consent = 'Необходимо согласие на обработку контактных данных';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsDuplicate(false);

    if (!validateClientSide()) {
      return;
    }

    setIsSubmitting(true);

    const utm = getOrCaptureUtmParams();

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      interest,
      comment: comment.trim() || null,
      product: selectedProduct || null,
      ...utm,
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: LeadApiResponse = await response.json();

      if (response.status === 201 && data.success) {
        setSuccessResponse(data);
        setErrorMessage(null);
        setFieldErrors({});
      } else if (response.status === 409) {
        // Duplicate request within 10 minutes
        setIsDuplicate(true);
        setErrorMessage(
          data.message ||
            'Заявка с этого номера уже получена. Наш менеджер обрабатывает её. Повторную заявку можно отправить через 10 минут.'
        );
      } else if (response.status === 422 || response.status === 400) {
        // Validation error from backend
        if (data.field_errors) {
          setFieldErrors(data.field_errors);
        }
        setErrorMessage(data.message || 'Пожалуйста, проверьте корректность введённых данных');
      } else {
        // Server error 500/503
        setErrorMessage(
          data.message || 'Не удалось сохранить заявку. Пожалуйста, попробуйте снова через минуту.'
        );
      }
    } catch (networkError) {
      setErrorMessage(
        'Ошибка соединения с сервером. Пожалуйста, проверьте подключение к интернету и повторите попытку.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForNewOrder = () => {
    setSuccessResponse(null);
    setIsDuplicate(false);
    setErrorMessage(null);
    setName('');
    setPhone('+375 ');
    setComment('');
    if (onClearProduct) onClearProduct();
  };

  return (
    <section className="py-12 md:py-20 border-b border-[#E8DFD8] bg-[#FAF7F2]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container (exact scroll target aligned below header) */}
        <div id="lead-form" className="scroll-mt-20 sm:scroll-mt-22 bg-white border border-[#E3DAD1] rounded-sm p-6 sm:p-10 shadow-xs">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-[#C35B34]">
              06 · Оформление заявки
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#261C18]">
              Давайте подберём вам кофе
            </h2>
            <p className="text-sm sm:text-base text-[#5A4B42]">
              Оставьте номер — менеджер свяжется с вами и поможет оформить заказ.
            </p>
          </div>

          {/* Success Confirmation State */}
          {successResponse ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 bg-[#FAF7F2] border border-[#C35B34] text-[#C35B34] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#261C18]">
                Заявка принята!
              </h3>
              <p className="text-sm sm:text-base text-[#5A4B42] max-w-md mx-auto leading-relaxed">
                Спасибо, {successResponse.data?.name || name}! Мы получили ваш контакт ({successResponse.data?.phone || phone}). Наш менеджер позвонит вам или напишет в Telegram/Viber для согласования сорта и доставки.
              </p>
              {selectedProduct && (
                <div className="inline-block px-3 py-1 bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm text-xs font-mono text-[#261C18]">
                  Выбранный кофе: {selectedProduct}
                </div>
              )}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetForNewOrder}
                  className="px-6 py-2.5 bg-[#261C18] hover:bg-[#C35B34] text-white text-xs sm:text-sm font-medium rounded-sm transition-colors cursor-pointer"
                >
                  Оформить ещё одну заявку
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Product Badge if selected */}
              {selectedProduct && (
                <div className="p-3 bg-[#FAF7F2] border border-[#E3DAD1] rounded-sm flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[#6E5D53] mr-2">Выбранный кофе:</span>
                    <strong className="text-[#261C18] font-semibold">{selectedProduct}</strong>
                  </div>
                  {onClearProduct && (
                    <button
                      type="button"
                      onClick={onClearProduct}
                      className="p-1 text-[#6E5D53] hover:text-[#C35B34] transition-colors"
                      title="Убрать выбор товара"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* Duplicate alert if 409 Conflict */}
              {isDuplicate && (
                <div className="p-4 bg-[#F5EFE8] border border-[#C35B34]/40 rounded-sm flex items-start gap-3 text-sm text-[#261C18]">
                  <AlertCircle className="w-5 h-5 text-[#C35B34] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#C35B34] mb-0.5">Повторный запрос</div>
                    <div>{errorMessage}</div>
                  </div>
                </div>
              )}

              {/* General error banner (network/server) */}
              {!isDuplicate && errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3 text-sm text-red-800">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* Field 1: Name */}
              <div>
                <label htmlFor="lead-name" className="block text-xs font-mono uppercase tracking-wider text-[#261C18] mb-1.5">
                  Ваше имя <span className="text-[#C35B34]">*</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Например, Анна"
                  className={`w-full px-4 py-3 bg-[#FAF7F2] border ${fieldErrors.name ? 'border-red-400 focus:border-red-500' : 'border-[#E3DAD1] focus:border-[#C35B34]'} rounded-sm text-sm text-[#261C18] placeholder-[#9E9086] transition-colors focus:bg-white`}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.name}</p>
                )}
              </div>

              {/* Field 2: Phone */}
              <div>
                <label htmlFor="lead-phone" className="block text-xs font-mono uppercase tracking-wider text-[#261C18] mb-1.5">
                  Телефон (Беларусь) <span className="text-[#C35B34]">*</span>
                </label>
                <input
                  id="lead-phone"
                  ref={phoneInputRef}
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+375 (29) 123-45-67"
                  className={`w-full px-4 py-3 bg-[#FAF7F2] border ${fieldErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#E3DAD1] focus:border-[#C35B34]'} rounded-sm text-sm text-[#261C18] placeholder-[#9E9086] font-mono transition-colors focus:bg-white`}
                />
                {fieldErrors.phone ? (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.phone}</p>
                ) : (
                  <p className="mt-1 text-[11px] text-[#6E5D53]">
                    Принимаются номера Беларуси с кодами: 29, 33, 44, 17, 25, 15 (A1, МТС, life:, городские)
                  </p>
                )}
              </div>

              {/* Field 3: Interest Type */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#261C18] mb-2">
                  Что вас интересует? <span className="text-[#C35B34]">*</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setInterest('subscription')}
                    className={`px-4 py-3 text-xs sm:text-sm font-medium rounded-sm border transition-all text-center cursor-pointer ${
                      interest === 'subscription'
                        ? 'bg-[#261C18] text-white border-[#261C18] shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#5A4B42] border-[#E3DAD1] hover:border-[#261C18]'
                    }`}
                  >
                    Подписка
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterest('one_time')}
                    className={`px-4 py-3 text-xs sm:text-sm font-medium rounded-sm border transition-all text-center cursor-pointer ${
                      interest === 'one_time'
                        ? 'bg-[#261C18] text-white border-[#261C18] shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#5A4B42] border-[#E3DAD1] hover:border-[#261C18]'
                    }`}
                  >
                    Разовый заказ
                  </button>

                  <button
                    type="button"
                    onClick={() => setInterest('question')}
                    className={`px-4 py-3 text-xs sm:text-sm font-medium rounded-sm border transition-all text-center cursor-pointer ${
                      interest === 'question'
                        ? 'bg-[#261C18] text-white border-[#261C18] shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#5A4B42] border-[#E3DAD1] hover:border-[#261C18]'
                    }`}
                  >
                    Вопрос
                  </button>
                </div>
              </div>

              {/* Field 4: Comment (optional) */}
              <div>
                <label htmlFor="lead-comment" className="block text-xs font-mono uppercase tracking-wider text-[#261C18] mb-1.5">
                  Комментарий или пожелания <span className="text-[#6E5D53] normal-case">(необязательно)</span>
                </label>
                <textarea
                  id="lead-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: нужен помол под гейзер, или доставка во второй половине дня"
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E3DAD1] focus:border-[#C35B34] rounded-sm text-sm text-[#261C18] placeholder-[#9E9086] transition-colors focus:bg-white resize-y"
                />
              </div>

              {/* Consent checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer text-xs text-[#5A4B42] select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded-xs text-[#C35B34] focus:ring-[#C35B34] cursor-pointer"
                  />
                  <span>
                    Я согласен на обработку контактных данных для связи по заказу согласно{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPrivacy();
                      }}
                      className="text-[#C35B34] underline hover:text-[#A64823]"
                    >
                      политике обработки персональных данных
                    </button>.
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#261C18] hover:bg-[#C35B34] disabled:bg-[#6E5D53] text-white font-medium text-sm sm:text-base rounded-sm transition-all duration-150 cursor-pointer disabled:cursor-not-allowed shadow-xs flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-[#C35B34]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Отправляем заявку...</span>
                    </>
                  ) : (
                    <span>Отправить заявку</span>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-[#6E5D53]">
                Менеджер свяжется с вами в течение рабочего времени · Без онлайн-оплаты на сайте
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

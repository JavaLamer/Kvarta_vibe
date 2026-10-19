/**
 * Formats user input as Belarusian phone format: +375 (XX) XXX-XX-XX
 */
export function formatByPhoneInput(input: string): string {
  // Strip non-digit characters
  let digits = input.replace(/\D/g, '');

  // Handle national 80 prefix -> convert to 375
  if (digits.startsWith('80') && digits.length >= 4) {
    digits = '375' + digits.slice(2);
  }

  // Prepend 375 if user started typing local codes (29, 33, 44, 17, 25, 15)
  if (!digits.startsWith('375') && digits.length > 0) {
    if (digits.startsWith('75')) {
      digits = '3' + digits;
    } else if (digits.startsWith('5')) {
      digits = '37' + digits;
    } else if (['29', '33', '44', '17', '25', '15'].some(p => digits.startsWith(p))) {
      digits = '375' + digits;
    }
  }

  // Limit to maximum 12 digits (+375 XX XXX-XX-XX)
  digits = digits.slice(0, 12);

  if (digits.length === 0) return '';
  if (digits.length <= 3) return `+${digits}`;

  let formatted = `+${digits.slice(0, 3)}`;

  if (digits.length > 3) {
    formatted += ` (${digits.slice(3, Math.min(5, digits.length))}`;
  }
  if (digits.length >= 5) {
    formatted += `) ${digits.slice(5, Math.min(8, digits.length))}`;
  }
  if (digits.length >= 8) {
    formatted += `-${digits.slice(8, Math.min(10, digits.length))}`;
  }
  if (digits.length >= 10) {
    formatted += `-${digits.slice(10, 12)}`;
  }

  return formatted;
}

export const ALLOWED_BY_CODES = ['29', '33', '44', '17', '25', '15'] as const;

export function isValidByPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  // Must be 12 digits, starting with 375, followed by valid allowed codes: 29, 33, 44, 17, 25, 15
  if (digits.length !== 12 || !digits.startsWith('375')) {
    return false;
  }
  const operatorCode = digits.slice(3, 5);
  return (ALLOWED_BY_CODES as readonly string[]).includes(operatorCode);
}


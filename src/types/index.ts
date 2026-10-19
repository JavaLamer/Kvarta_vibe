export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  weight: string;
  roastLevel?: 'Светлая' | 'Средняя' | 'Под эспрессо';
  flavorProfile: string;
  notes: string[];
  recommendedBrew?: string[];
  description: string;
  isDrip?: boolean;
}

export type InterestType = 'subscription' | 'one_time' | 'question';

export interface LeadFormData {
  name: string;
  phone: string;
  interest: InterestType;
  comment?: string;
  product?: string;
}

export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  landing_page: string;
  referrer: string | null;
}

export interface LeadApiResponse {
  success?: boolean;
  lead_id?: number;
  message?: string;
  error?: string;
  field_errors?: Record<string, string>;
  retry_after_seconds?: number;
  data?: {
    name: string;
    phone: string;
    interest: string;
    product?: string | null;
    created_at?: string;
  };
}

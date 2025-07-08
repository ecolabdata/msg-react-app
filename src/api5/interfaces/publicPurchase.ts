import { Card } from './common';

export type PublicPurchaseCard = Card & {
  purchasingEntity: string | null;
  departments: Array<string> | null;
  status: string;
  social_considerations: string | null;
  environmental_considerations: string | null;
  reserved_public_markets: Array<string> | null;
  publication_date: Date;
  cpv_code: string | null;
  duration_month: number | null;
  estimated_amount: number | null;
  procedure_type: string | null;
  category: string | null;
  temporality: string | null;
};

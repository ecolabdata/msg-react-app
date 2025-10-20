import { Card } from './common';

export type PublicPurchaseCard = Card & {
  purchasing_entity: string | null;
  departments: Array<string> | null;
  status: PublicPurchaseStatus;
  social_considerations_concerned: boolean | null;
  environmental_considerations_concerned: boolean | null;
  reserved_public_markets: Array<string> | null;
  publication_target_date: string | null;
  submission_deadline: string | null;
  website_url: string | null;
  cpv_code: string | null;
  market_max_duration: number | null;
  market_estimated_amount: number | null;
  procedure_type: string | null;
  purchasing_category: string | null;
  source_data: Array<Record<string, unknown>> | null;
};

export type PublicPurchaseStatus = "close" | "cancel" | "draft" | "current" | "active";

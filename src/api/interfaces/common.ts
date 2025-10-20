import { CompanyCard } from './company';
import { PublicBuyerCard } from './publicBuyer';
import { PublicPurchaseCard } from './publicPurchase';

export type CardsSearchResult = {
  filter: object;
  page: number;
  page_size: number;
  total_count: number;
  results: UnknownCard[];
  query: string;
};

export type Card = {
  id: string;
  cardTitle: string;
  cardSubtitle: string;
  shortDescription: string | null;
  logo: { width: number | null, height: number | null, url: string | null };
  description: string | null;
  card_type: Card_type;
};

export type Card_type = 'company' | 'public_buyer' | 'public_purchase' | 'aid';
export type Label = { description: string; name: string; label: LabelNames };
export type LabelNames = 'GREEN20' | 'Solar Impulse' | 'GreenTech Innovation';

export type UnknownCard = Card &
  Partial<CompanyCard> &
  Partial<PublicBuyerCard> &
  Partial<PublicPurchaseCard>;

export const cardApiNames = [
  'public_procurement_cards',
  'aid_cards',
  'company_cards',
  'public_buyer_cards',
] as const;
export type CardApiNames = typeof cardApiNames[number];
export type AnyCard = CompanyCard | PublicBuyerCard | PublicPurchaseCard;


export type Image = {
  width: number | null;
  height: number | null;
  url: string;
};

export type ImageDetailed = Image & {
  filename: string;
  type: string;
  thumbnails: Record<'small' | 'large' | 'full', Image>;
};

export type SelectFilterData = Record<string, string[]>;

export const API_URL = 'https://api-v5.msg.greentechinnovation.fr';
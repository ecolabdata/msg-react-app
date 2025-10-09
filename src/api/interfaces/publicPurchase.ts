import { Card } from './common';

export type PublicPurchaseCard = Card & {
  purchasingEntity: string | null;
  departments: Array<string> | null;
  status: string;
  socialConsiderations: string | null;
  environmentalConsiderations: string | null;
  reservedPublicMarkets: Array<string> | null;
  publicationDate: Date;
  cpvCode: string | null;
  durationMonth: number | null;
  estimatedAmount: number | null;
  procedureType: string | null;
  category: string | null;
  temporality: string | null;
};

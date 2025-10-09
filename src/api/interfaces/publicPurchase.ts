import { Card } from './common';

export type PublicPurchaseCard = Card & {
  purchasingEntity: string | null;
  departments: Array<string> | null;
  status: string;
  socialConsiderationsConcerned: boolean | null;
  environmentalConsiderationsConcerned: boolean | null;
  reservedPublicMarkets: Array<string> | null;
  publicationTargetDate: string | null;
  submissionDeadline: string | null;
  websiteUrl: string | null;
  cpvCode: string | null;
  marketMaxDuration: number | null;
  marketEstimatedAmount: number | null;
  procedureType: string | null;
  purchasingCategory: string | null;
  sourceData?: any[];
};

import { Card } from './common';

export type PublicBuyerCard = Card & {
  labelled_startups: Array<string> | null;
  marketContents: Array<PublicBuyerMarketsTab> | null;
  buyContents: Array<PublicBuyerBuyTab> | null;
  averageMarketDealAmount: number | null;
};

export type PublicBuyerMarketsTab = {
  cpvCode: number;
  monthDuration: number;
  procedure: string;
  amount: number;
  content: string;
};

export type PublicBuyerBuyTab = {
  description: string;
  marketEstimatedAmount: number | null;
  dlro: string;
  purchasingCategory: string;
  procedureType: string;
  consultationLink: string;
  status: string;
};

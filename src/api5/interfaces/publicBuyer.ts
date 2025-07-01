import { Card } from './common';

export type PublicBuyerCard = Card & {
  cardType: 'publicBuyer';
  labelled_startups: Array<string> | null;
  marketContents: Array<PublicBuyerMarketsTab> | null;
  buyContents: Array<PublicBuyerBuyTab> | null;
  averageMarketDealAmount: number | null; // Reprendre la logique de getAverageMarketDealAmount dans DetailsPublicBuyerContent.tsx
};

// Actuellement les tabs sont paginés en front, on change ça ?
type PublicBuyerMarketsTab = {
  cpvCode: number;
  monthDuration: number;
  procedure: string;
  amount: number;
  content: string;
};

type PublicBuyerBuyTab = {
  description: string;
  marketEstimatedAmount: number | null;
  dlro: Date;
  purchasingCategory: string;
  procedureType: string;
  consultationLink: string;
  status: string;
};

// type Card = {
//   id: string;
//   cardTitle: actuellement item.fields.public_actor_nom[0];
//   cardSubtitle: l'info n'existe pas actuellement: élément à afficher sur la fiche sous le titre;
//   shortDescription: l'info n'existe pas actuellement, élément à afficher sur la carte sous le titre;
//   logoUrl: null pour ce type de carte;
//   description: string | null;
// };

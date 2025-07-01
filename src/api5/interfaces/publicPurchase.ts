import { Card } from './common';

export type PublicPurchaseCard = Card & {
  purchasingEntity: string | null; // item.card.data_source['approch']?.purchasingEntity?.label
  departments: Array<string> | null; // data.card.departments
  status: string;
  social_considerations: string | null; // ne pas laisser 'no' en string, remplacer par null
  environmental_considerations: string | null; // ne pas laisser 'no' en string, remplacer par null
  reserved_public_markets: Array<string> | null; // data.card.reserved_public_markets
  publication_date: Date;
  cpv_code: string | null;
  duration_month: number | null;
  estimated_amount: number | null;
  procedure_type: string | null;
  category: string | null;
  temporality: string | null; // reprendre la logique de getDateText dans ForecastedBuyInformations.tsx
};

// type Card = {
//   id: string;
//   cardTitle: actuellement item.fields.public_actor_nom[0];
//   cardSubtitle: actuellement on affiche les départmments avec avant la string "Périmètre géographique : ";
//   shortDescription: // actuellement item.card.description mais semble contenur des infos non pertinentes;
//   logoUrl: null pour ce type de carte;
//   description: string | null;
// };

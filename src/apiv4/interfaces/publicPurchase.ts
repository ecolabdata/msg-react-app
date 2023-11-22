import { BaseResultCard, Department, ReservedPublicMarkets } from './common';

export type PublicPurchaseResult = BaseResultCard & {
  card: PublicPurchaseCard;
};

export type PublicPurchaseCard = {
  slug: string;
  name: string | null;
  description: string | null;
  status: string | null;
  source_url: string | null;
  publication_date: string | null;
  estimated_amount: number | null;
  procedure_type: string | null;
  reserved_public_markets: string[] | null;
  social_considerations: string | null;
  environmental_considerations: string | null;
  submission_deadline: string | null;
  cpv_code: number | null;
  duration_month: number | null;
  category: string | null;
  contact: string | null;
  departments: string[] | null;
  data_source: {
    approch: ApprochRecord;
  };
};

type ApprochRecord = {
  url: string | null;
  label: string | null;
  description: string | null;
  purchasingCategory: string | null;
  CPVPrimary: number | null;
  status: string | null;
  publicationTargetDate: string | null;
  dlro: string | null;
  marketEstimatedAmount: number | null;
  marketMaxDuration: number | null;
  socialConsiderationsConcerned: string | null;
  environmentalConsiderationsConcerned: string | null;
  consultationLink: string | null;
  keywords: string | null;
  messagingActive: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
  procedureType: ProcedureType | null;
  purchasingEntity: PurchasingEntity;
  reservedPublicMarkets: ReservedPublicMarkets[] | null;
  departments: Department[] | null;
};

type ProcedureType = {
  label: string | null;
  description: string | null;
  code: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

type PurchasingEntity = {
  label: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  siren: string | null;
  siret: string | null;
  tvaIntra: string | null;
  codeApe: string | null;
  effectif: string | null;
  legalForm: string | null;
  enterpriseType: string | null;
  website: string | null;
  idNationnal: string | null;
  type: string | null;
  mission: string | null;
  publicFunction: string | null;
  buyerProfil: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  keywords: string | null;
};

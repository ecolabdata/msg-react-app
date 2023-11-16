import { Department, ReservedPublicMarkets } from './common';

//FIXME: find out why it is not returning a Card
export type PublicBuyerResults = {
  total: {
    value: number;
    relation: string;
  };
  max_score: number;
  hits: PublicBuyerHit[];
};

export type PublicBuyerHit = {
  _index: string;
  _id: string;
  _version: number;
  _score: number;
  fields: Record<string, unknown> & {
    public_actor_nom?: string[];
  };
  highlight: Record<string, unknown>;
};

export type PublicBuyerCard = {
  public_actor_id: string;
  public_actor_nom: string;
  decp: Decp[];
  labelled_startups: Startup[];
  public_references_startups: Startup[];
  public_actor_id_siren: string;
  approch_content: ApprochContent[];
};

type Decp = {
  id: string;
  source: string;
  uid: string;
  _type: string;
  objet: string;
  codeCPV: string;
  dureeMois: number;
  dateNotification: string;
  datePublicationDonnees: string;
  montant: number;
  formePrix?: string | null;
  modifications: Record<string, unknown>[];
  nature: string;
  procedure: string;
  dateSignature?: string | null;
  dateDebutExecution?: string | null;
  valeurGlobale?: number | null;
  montantSubventionPublique?: number | null;
  donneesExecution?: string | null;
  uuid?: string | null;
  lieuExecution_code: string;
  lieuExecution_typeCode: string;
  lieuExecution_nom: string;
};

type Startup = {
  nom?: string | null;
  siren: string;
};

type ApprochContent = {
  url: string;
  label: string;
  description: string;
  purchasingCategory: string;
  CPVPrimary?: string | null;
  status: string;
  publicationTargetDate: string;
  dlro: string;
  marketEstimatedAmount: number;
  marketMaxDuration: number;
  socialConsiderationsConcerned: string;
  environmentalConsiderationsConcerned: string;
  consultationLink: string;
  keywords?: string | null;
  messagingActive: boolean;
  createdAt: string;
  updatedAt: string;
  procedureType: {
    $ref: string;
  };
  reservedPublicMarkets: ReservedPublicMarkets[]; // Update this type accordingly
  departments: Department[];
};

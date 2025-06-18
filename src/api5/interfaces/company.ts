import { Card, Label } from './common';

export type CompanyCard = Card & {
  cardType: 'company';
  phone: 'string' | null;
  email: 'string' | null;
  linkedIn: 'string' | null;
  websiteUrl: string | null;
  creationDate: string | null;
  headquarterAddress: string | null;
  headquarterRegion: string | null;
  pitch: string | null;
  publicClients: string[] | null;
  privateClients: string[] | null;
  helpersAndSupports: string[] | null;
  zones: string[] | null;
  markets: string[] | null;
  oddStakes: string[] | null;
  sourceUrl: string | null;
  labels: Label[];
  siren: string | null;
  financialData: {};
  images: string[];
  projectDescription: string | null;
  companyDescrition: string | null;
};

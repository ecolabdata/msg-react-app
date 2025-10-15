import { Card, ImageDetailed, Label } from './common';

export type CompanyCard = Card & {
  phone: string | null;
  email: string | null;
  linkedIn: string | null;
  websiteUrl: string | null;
  pitch: string | null;
  publicClients: string[] | null;
  privateClients: string[] | null;
  helpersAndSupports: string[] | null;
  ville: string | null;
  departement: string | null;
  region: string | null;
  markets: string[] | null;
  oddStakes: string[] | null;
  labels: Label[] | null;
  siren: number | null;
  images: ImageDetailed[] | null;
  thematic: string | null;
  source_data: Array<Record<string, unknown>> | null;
};

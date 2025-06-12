import { CompanyCard } from './company';

export type CardsSearchResult = {
  filter: object;
  page: number;
  page_size: number;
  total_count: number;
  results: AllCards[];
  query: string;
};

export type Card = {
  id: string;
  slug: string;
  cardTitle: string;
  cardSubtitle: string;
  shortDescription: string | null;
  logoUrl: string | null;
  descriptionThumbnail: string | null;
};

export type Label = { description: string; name: string; label: string } | null;

export type AllCards = CompanyCard;

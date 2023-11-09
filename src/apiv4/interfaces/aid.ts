import { AideTerritoire, BaseResultCard } from './common';

export type AidResult = BaseResultCard & {
  card: AidCard;
};

export type AidCard = {
  slug: string;
  name?: string | null;
  html_description?: string | null;
  supports?: string[] | null;
  nature?: string[] | null;
  recurrence?: string | null;
  submission_deadline?: string | null;
  beneficiaries?: string[] | null;
  html_contact?: string | null;
  source_url?: string | null;
  zone?: string[] | null;
  html_eligibility?: string | null;
  subvention_rate_lower_bound?: number | null;
  subvention_rate_upper_bound?: number | null;
  data_source: { aide_territoire: AideTerritoire | null };
};

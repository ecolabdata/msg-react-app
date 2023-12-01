import { AidResult } from './aid';
import { CompanyResult } from './company';
import { InvestorResult } from './investor';
import { PublicBuyerHit, PublicBuyerResultById, PublicBuyerResults } from './publicBuyer';
import { PublicPurchaseResult } from './publicPurchase';

export type SearchResultItem = CompanyResult | InvestorResult | AidResult | PublicPurchaseResult | PublicBuyerResultById;
export function isPublicPurchaseV4(x: SearchResultItem): x is PublicPurchaseResult {
  return "card" in x && 'approch' in x.card.data_source;
}
export function isInvestorV4(x: SearchResultItem): x is InvestorResult {
  return "card" in x && 'transformed_pexe_api' in x.card.data_source;
}
export function isAidV4(x: SearchResultItem): x is AidResult {
  return "card" in x && 'aide_territoire' in x.card.data_source;
}

export function isCompanyV4(x: SearchResultItem): x is CompanyResult {
  const companySources = ['greentech_innovation', 'green20', 'solar_impulse'];
  return "card" in x && companySources.some((prop) => prop in x.card.data_source);
}

export function isPublicBuyerResultList(x: PublicBuyerResults | SearchResultItem[]): x is PublicBuyerResults {
  return 'total' in x;
}

export function isCompanyCardList(x: PublicBuyerResults | SearchResultItem[]): x is CompanyResult[] { //this is only used to filter green20 in SearchPage.jsx
  return Array.isArray(x) && isCompanyV4(x[0]);
}

export function isPublicBuyerResults(x: SearchResultItem): x is PublicBuyerResultById {
  return '_source' in x;
}

export function isPublicBuyerResultHit(x: SearchResultItem | PublicBuyerHit): x is PublicBuyerHit {
  return 'fields' in x;
}

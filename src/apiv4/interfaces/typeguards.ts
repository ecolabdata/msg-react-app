import { AidResult } from './aid';
import { CompanyResult } from './company';
import { InvestorResult } from './investor';
import { PublicBuyerHit, PublicBuyerResults } from './publicBuyer';
import { PublicPurchaseResult } from './publicPurchase';

export type SearchResultItem = CompanyResult | InvestorResult | AidResult | PublicPurchaseResult;

export function isPublicPurchaseV4(x: SearchResultItem): x is PublicPurchaseResult {
  const sources = x.card.data_source;
  return 'approch' in sources;
}
export function isInvestorV4(x: SearchResultItem): x is InvestorResult {
  const sources = x.card.data_source;
  return 'transformed_pexe_api' in sources;
}
export function isAidV4(x: SearchResultItem): x is AidResult {
  const sources = x.card.data_source;
  return 'aide_territoire' in sources;
}

export function isCompanyV4(x: SearchResultItem): x is CompanyResult {
  const sources = x.card.data_source;
  const companySources = ['greentech_innovation', 'green20', 'solar_impulse'];
  return companySources.some((prop) => prop in sources);
}

export function isPublicBuyerResultList(
  x: SearchResultItem[] | PublicBuyerResults
): x is PublicBuyerResults {
  return 'total' in x;
}

export function isPublicBuyerHit(x: SearchResultItem | PublicBuyerHit): x is PublicBuyerHit {
  return 'card' in x === false;
}

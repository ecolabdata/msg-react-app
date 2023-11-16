import { AidResult } from './aid';
import { CompanyResult } from './company';
import { InvestorResult } from './investor';
import { PublicBuyerResult } from './publicBuyer';
import { PublicPurchaseResult } from './publicPurchase';

export type SearchResultItem = CompanyResult | InvestorResult | AidResult | PublicPurchaseResult;

// export function isAcheteurPublicV4(x: AnyCard): x is Collectivite {
//     return x.cardTypeName === acheteurPublic.name;
//   }
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

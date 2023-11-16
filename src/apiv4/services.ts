import { AidResult } from './interfaces/aid';
import { CompanyResult } from './interfaces/company';
import { InvestorResult } from './interfaces/investor';
import { PublicBuyerResult } from './interfaces/publicBuyer';
import { PublicPurchaseResult } from './interfaces/publicPurchase';

export const baseApiUrl = process.env.REACT_APP_API_URL;

const baseGetRequestOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

export function getAll(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/all?${params}`,
    ...baseGetRequestOptions
  };
}

export type GetCompanyByIdReponse = CompanyResult;

export function getCompanies(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/company_card_v4?${params}`,
    ...baseGetRequestOptions
  };
}

export function getCompanyById(id: string) {
  return {
    url: `${baseApiUrl}/v4/company_card_v4/${id}`,
    ...baseGetRequestOptions
  };
}

export type GetInvestorResponse = InvestorResult;

export function getInvestors(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/investor_card_v4?${params}`,
    ...baseGetRequestOptions
  };
}

export function getInvestorById(id: string) {
  return {
    url: `${baseApiUrl}/v4/investor_card_v4/${id}`,
    ...baseGetRequestOptions
  };
}

export type GetAidResult = AidResult;

export function getCompanyAids(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/company_aid_card_v4?${params}`,
    ...baseGetRequestOptions
  };
}

export function getCompanyAidById(id: string) {
  return {
    url: `${baseApiUrl}/v4/company_aid_card_v4/${id}`,
    ...baseGetRequestOptions
  };
}

export function getPublicBuyerAids(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/public_buyer_aid_card_v4?${params}`,
    ...baseGetRequestOptions
  };
}

export function getPublicBuyerAidById(id: string) {
  return {
    url: `${baseApiUrl}/v4/public_buyer_aid_card_v4/${id}`,
    ...baseGetRequestOptions
  };
}

export type GetPublicPurchaseResult = PublicPurchaseResult;

export function getPublicPurchases(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/public_purchase_card_v4?${params}`,
    ...baseGetRequestOptions
  };
}

export function getPublicPurchaseById(id: string) {
  return {
    url: `${baseApiUrl}/v4/public_purchase_card_v4/${id}`,
    ...baseGetRequestOptions
  };
}

export type GetPublicBuyerV2 = PublicBuyerResult;

export function getPublicBuyersV2(query: string) {
  const params = new URLSearchParams({ query });
  return {
    url: `${baseApiUrl}/v4/public_buyer_card_v2?${params}`,
    ...baseGetRequestOptions
  };
}

export function getPublicBuyerV2ById(id: string) {
  return {
    url: `${baseApiUrl}/v4/public_buyer_card_v2/${id}`,
    ...baseGetRequestOptions
  };
}

export function generateCardByIDFetchParameters(id: string, type: string) {
  if (!typeToUrl[type]) return { url: undefined, method: undefined, headers: undefined };

  return {
    url: `${baseApiUrl}/v4/${typeToUrl[type]}/${id}`,
    ...baseGetRequestOptions
  };
}

const typeToUrl: { [key: string]: string | undefined } = {
  projets_achats: 'public_purchase_card_v4',
  aides_innovation: 'company_aid_card_v4',
  aides_clients: 'public_buyer_aid_card_v4',
  investisseurs: 'investor_card_v4',
  startups: 'company_card_v4',
  collectivites: undefined
};

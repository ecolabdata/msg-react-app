import { canonicalize } from 'json-canonicalize';
import sha1 from 'sha1';
import {
  achatPrevi,
  acheteurPublic,
  aideClient,
  aideInno,
  investisseur,
  startups
} from '../model/CardType';
import mockApiResponse from './mock_api_resp.json';
import { StartupV2 as StartupV2, CollectiviteV2 as CollectiviteV2 } from 'api2/Api';
import { CompanyCard } from 'apiv4/interfaces/company';
import { AidCard } from 'apiv4/interfaces/aid';
import { InvestorCard } from 'apiv4/interfaces/investor';
import { PublicBuyerCard } from 'apiv4/interfaces/publicBuyer';
import { PublicPurchaseCard } from 'apiv4/interfaces/publicPurchase';

export const buildId = (obj: any) => sha1(canonicalize(obj)).slice(0, 8);

export const cardTypeNames = [
  'collectivites',
  'projets_achats',
  'investisseurs',
  'aides_clients',
  'aides_innovation',
  'startups'
] as const;
export type CardTypeName = typeof cardTypeNames[number];

type GeneratedData = { id: string; cardTypeName: string; url?: string };
/*
cardType list
https://www.notion.so/messervicesgreentech/0290b8c9cfd4437b8f9ee8bb9ee697ee?v=94b3a82bc59243e5b99ed4574bf8407f
*/
export type Aide = Omit<
  | typeof mockApiResponse.cards.aides_clients[number]
  | typeof mockApiResponse.cards.aides_innovation[number],
  'id'
> &
  GeneratedData;

export type Collectivite = CollectiviteV2 & GeneratedData;

export type ProjetAchat = typeof mockApiResponse.cards.projets_achats[number] & GeneratedData;

export type Investisseur = typeof mockApiResponse.cards.investisseurs[number] & GeneratedData;

export type Startup = StartupV2 & GeneratedData;

export type AnyCard = CompanyCard | AidCard | InvestorCard | PublicBuyerCard | PublicPurchaseCard;

export type ApiResponse = typeof mockApiResponse;

export type Search = ReturnType<typeof handleResp>;

function handleResp(
  query: Query | InvestisseurQuery | AidesClientQuery | AidesInnoQuery | ForecastedBuyQuery,
  resp: ApiResponse
) {
  const cards = {
    projets_achats: resp.cards.projets_achats.map((x) => {
      return { ...x, id: buildId(x), cardTypeName: achatPrevi.name };
    }),
    investisseurs: !resp.cards.investisseurs
      ? []
      : resp.cards.investisseurs.map((x) => {
          return { ...x, id: buildId(x), cardTypeName: investisseur.name };
        }),
    aides_clients: !resp.cards.aides_clients
      ? []
      : resp.cards.aides_clients.map((x) => {
          return { ...x, id: buildId(x), cardTypeName: aideClient.name };
        }),
    aides_innovation: !resp.cards.aides_innovation
      ? []
      : resp.cards.aides_innovation.map((x) => {
          return { ...x, id: buildId(x), cardTypeName: aideInno.name };
        })
  };
  return { query, cards };
}

function buildFetchRequest(params: any) {
  // if (useMockResponse) {
  //   return new Promise<ApiResponse>(res => setTimeout(() => res(mockApiResponse), 3000))
  // } else {
  return fetch(localStorage.apiUrl || 'https://api.msg.greentechinnovation.fr/getCards/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      Object.assign(
        {
          cards: {
            collectivites: [],
            aides_clients: [],
            aides_innovation: [],
            investisseurs: [],
            startups: [],
            projets_achats: []
          }
        },
        params
      )
    )
  }).then((resp) => resp.json());
  //.then(resp => resp.text()).then(str => JSON.parse(str.replace(/\bNaN\b/g, "null")))
  // }
}

/*
  GENERAL QUERY
*/

export type Query = {
  description: string;
  secteurs: string[];
  motsclefs?: string[];
};

export const search = (query: Query) =>
  buildFetchRequest({
    fichier_decp: 'decp_score.csv',
    fichier_investisseurs: 'out_PEXE.json',
    fichier_aides_inno: 'corpusinno.pkl',
    descriptionSU: query.description,
    nb_aides: 10,
    nb_acheteur: 10,
    nb_Startups: 10,
    nb_projetsachat: 10,
    montant_min: 0,
    secteurs: query.secteurs,
    keywords: query.motsclefs
  }).then((resp) => handleResp(query, resp));

/* Investisseurs */

export interface InvestisseurQuery extends Omit<Query, 'type'> {
  type: 'investisseur';
  montantMin: number;
}

export const searchInvestisseur = (query: InvestisseurQuery) =>
  buildFetchRequest({
    fichier_investisseurs: 'out_PEXE.json',
    montant_min: query.montantMin * 1000 || 0,
    secteurs: query.secteurs,
    keywords: query.motsclefs || []
  }).then((resp) => handleResp(query, resp));

export interface AidesQuery extends Omit<Query, 'type'> {
  displayAidePermanente: boolean;
  aid_type: string;
  echeance: string;
}

/* Aides Client */

export type AidesClientQuery = AidesQuery;

export const searchAidesClient = (query: AidesClientQuery) =>
  buildFetchRequest({
    descriptionSU: query.description,
    nb_aides: 100,
    secteurs: query.secteurs,
    keywords: query.motsclefs || []
  }).then((resp) => handleResp(query, resp));

/* Aides Inno */

export type AidesInnoQuery = AidesQuery;

export const searchAidesInno = (query: AidesInnoQuery) =>
  buildFetchRequest({
    fichier_aides_inno: 'corpusinno.pkl'
  }).then((resp) => handleResp(query, resp));

/* Achats prévisionnels */
export interface Buy extends Omit<Query, 'type' | 'motsclefs'> {
  publicationDate: string;
  zone: string;
  hasEcologicalConcern: boolean;
}

export type ForecastedBuyQuery = Buy;

export const searchForecastedBuys = (query: ForecastedBuyQuery) => {
  return buildFetchRequest({
    descriptionSU: query.description,
    nb_projetsachat: 10,
    secteurs: query.secteurs
  }).then((resp) => handleResp(query, resp));
};

/* Start ups */
export interface IStartup extends Omit<Query, 'type' | 'motsclefs'> {
  market: string;
  zone: string;
}

export type StartupQuery = IStartup;

export const searchStartups = (query: StartupQuery) => {
  return buildFetchRequest({
    descriptionSU: query.description,
    secteurs: query.secteurs,
    nb_Startups: 10
  }).then((resp) => handleResp(query, resp));
};

/* Acheteurs publics */
export interface PublicBuy extends Omit<Query, 'type' | 'motsclefs'> {
  entity: string;
  certification: string;
}

export type PublicBuyQuery = PublicBuy;

export const searchPublicBuys = (query: PublicBuyQuery) => {
  return buildFetchRequest({
    descriptionSU: query.description,
    secteurs: query.secteurs,
    fichier_decp: 'decp_score.csv',
    nb_acheteur: 10
  }).then((resp) => handleResp(query, resp));
};

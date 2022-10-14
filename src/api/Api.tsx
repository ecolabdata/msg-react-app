import { canonicalize } from 'json-canonicalize';
import sha1 from 'sha1';
import {
  achatPrevi,
  acheteurPublic,
  aideClient,
  aideInno,
  all as allCardType,
  investisseur,
  startups
} from '../model/CardType';
import mockApiResponse from './mock_api_resp.json';

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

type GeneratedData = { id: string; cardTypeName: string };
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

export type Collectivite = typeof mockApiResponse.cards.collectivites[number] & GeneratedData; //Deduced from DECP

export type ProjetAchat = typeof mockApiResponse.cards.projets_achats[number] & GeneratedData; //deduced from DECP

export type Investisseur = typeof mockApiResponse.cards.investisseurs[number] & GeneratedData; //From GI file

export type Startup = typeof mockApiResponse.cards.startups[number] & GeneratedData; //From GI file

export type AnyCard = Aide | ProjetAchat | Collectivite | Investisseur | Startup;

export type ApiResponse = typeof mockApiResponse;

export type Search = ReturnType<typeof handleResp>;

export function isAcheteurPublic(x: AnyCard): x is Collectivite {
  return x.cardTypeName === acheteurPublic.name;
}
export function isProjetAchat(x: AnyCard): x is ProjetAchat {
  return x.cardTypeName === achatPrevi.name;
}
export function isInvestisseur(x: AnyCard): x is Investisseur {
  return x.cardTypeName === investisseur.name;
}
export function isAide(x: AnyCard): x is Aide {
  return x.cardTypeName === aideClient.name || x.cardTypeName === aideInno.name;
}
export function isStartup(x: AnyCard): x is Startup {
  return x.cardTypeName === startups.name;
}

export function applyCard<T>(
  cardData: AnyCard,
  doAcheteurPublic: (x: Collectivite) => T,
  doProjetAchat: (x: ProjetAchat) => T,
  doInvestisseur: (x: Investisseur) => T,
  doAide: (x: Aide) => T,
  doStartup: (x: Startup) => T,
  other: () => T
): T {
  if (isAcheteurPublic(cardData)) return doAcheteurPublic(cardData);
  else if (isProjetAchat(cardData)) return doProjetAchat(cardData);
  else if (isInvestisseur(cardData)) return doInvestisseur(cardData);
  else if (isAide(cardData)) return doAide(cardData);
  else if (isStartup(cardData)) return doStartup(cardData);
  return other();
}

function handleResp(
  query: Query | InvestisseurQuery | AidesClientQuery | AidesInnoQuery,
  resp: ApiResponse
) {
  const cards = {
    collectivites: !resp.cards.collectivites
      ? []
      : resp.cards.collectivites.map((x) => {
          return { ...x, id: buildId(x), cardTypeName: acheteurPublic.name };
        }),
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
        }),
    startups: !resp.cards.startups
      ? []
      : resp.cards.startups.map((x) => {
          return { ...x, id: buildId(x), cardTypeName: startups.name };
        })
  };
  const cardsById = Object.fromEntries(
    allCardType.flatMap((x): AnyCard[] => cards[x.apiName]).map((x) => [x.id, x])
  );
  return { query, cardsById, cards };
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
  motsclefs: string[];
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
    montant_min: query.montantMin * 1000,
    secteurs: query.secteurs,
    keywords: query.motsclefs
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
    keywords: query.motsclefs
  }).then((resp) => handleResp(query, resp));

/* Aides Inno */

export type AidesInnoQuery = AidesQuery;

export const searchAidesInno = (query: AidesInnoQuery) =>
  buildFetchRequest({
    fichier_aides_inno: 'corpusinno.pkl'
  }).then((resp) => handleResp(query, resp));

export const searchStartups = (query: Query) =>
  buildFetchRequest({}).then((resp) => handleResp(query, resp));

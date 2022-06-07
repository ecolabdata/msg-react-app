import { canonicalize } from 'json-canonicalize';
import sha1 from 'sha1';
import { acheteurPublic, aideClient, aideInno, all as allCardType, investisseur, startups } from '../model/CardType';
import mockApiResponse from './mock_api_resp.json';

export const buildId = (obj: any) => sha1(canonicalize(obj)).slice(0, 8)

export const cardTypeNames = ["collectivites", "marches", "investisseurs", "aides_clients", "aides_innovation", 'startups'] as const;
export type CardTypeName = typeof cardTypeNames[number];

/*
cardType list
https://www.notion.so/messervicesgreentech/0290b8c9cfd4437b8f9ee8bb9ee697ee?v=94b3a82bc59243e5b99ed4574bf8407f
*/
export type Aide = typeof mockApiResponse.cards.aides_clients[number] | typeof mockApiResponse.cards.aides_innovation[number];
//export type Aide = typeof mockApiResponse.cards.aides[number] //From old FTE file
export type Collectivite = typeof mockApiResponse.cards.collectivites[number]//Deduced from DECP
//? PROVISORY : This type is provisory until we get the good one
export type Marche = typeof mockApiResponse.cards.collectivites[number]//deduced from DECP
//?----------------------------------------------------------------
export type Investisseur = typeof mockApiResponse.cards.investisseurs[number]//From GI file

export type Startup = typeof mockApiResponse.cards.startups[number]//From GI file

export type AnyCard = Omit<Partial<Aide>, "id"> & Partial<Marche> & Partial<Collectivite> & Partial<Investisseur> & Partial<Startup> & { id: string, cardTypeName: string }
// types of property '"deadline"' are incompatible.
//             Type 'null' is not assignable to type 'string | undefined'

export type ApiResponse = typeof mockApiResponse

export type Search = ReturnType<typeof handleResp>


function handleResp(query: Query | InvestisseurQuery | AidesClientQuery | AidesInnoQuery, resp: ApiResponse) {
  const cards = {
    collectivites: !resp.cards.collectivites ? [] : resp.cards.collectivites.map((x) => { return { ...x, id: buildId(x), cardTypeName: acheteurPublic.name } }),
    // marches: resp.cards.marches.map(x => {return {...x, id: buildId(x), cardTypeName: achatPrevi.name}}),
    //?Provisory
    marches: !resp.cards.aides_innovation ? [] : resp.cards.aides_innovation.map((x)=> { return { ...x, id: buildId(x), cardTypeName: aideInno.name } }),
    //?-------------------------------------------------------------------
    investisseurs: !resp.cards.investisseurs ? [] : resp.cards.investisseurs.map((x) => { return { ...x, id: buildId(x), cardTypeName: investisseur.name } }),
    aides_clients: !resp.cards.aides_clients ? [] : resp.cards.aides_clients.map((x) => { return { ...x, id: buildId(x), cardTypeName: aideClient.name } }),
    aides_innovation: !resp.cards.aides_innovation ? [] : resp.cards.aides_innovation.map((x)=> { return { ...x, id: buildId(x), cardTypeName: aideInno.name } }),
    startups: !resp.cards.startups ? [] : resp.cards.startups.map((x) => { return { ...x, id: buildId(x), cardTypeName: startups.name } }),
  }
  const cardsById = Object.fromEntries(allCardType.flatMap((x) : AnyCard[] => cards[x.apiName]).map(x => [x.id, x]))
  return { query, cardsById, cards};
}


function buildFetchRequest(params: any) {
  // if (useMockResponse) {
  //   return new Promise<ApiResponse>(res => setTimeout(() => res(mockApiResponse), 3000))
  // } else {
  return fetch(localStorage.apiUrl || 'https://api.msg.greentechinnovation.fr:9000/getCards/', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      Object.assign({
        "cards": {
          "collectivites": [],
          "aides_clients": [],
          "aides_innovation": [],
          "investisseurs": [],
          "startups":[]
        }
      }, params)
    )

  }).then(resp => resp.json())
  // }
}

/*
  GENERAL QUERY
*/

export type Query = {
  description: string,
  secteurs: string[],
  motsclefs: string[]
}

export const search = (query: Query) => buildFetchRequest({
  "fichier_decp": "decp_score.csv",
  "fichier_investisseurs": "out_PEXE.json",
  "fichier_aides_inno": "corpusinno.pkl",
  "descriptionSU": query.description,
  "nb_aides": 10,
  "nb_acheteur": 10,
  "nb_Startups" : 10,
  "montant_min": 0,
  "secteurs": query.secteurs,
  "keywords": query.motsclefs
}).then(resp => handleResp(query, resp));

/* Investisseurs */

export interface InvestisseurQuery extends Omit<Query, "type"> {
  type: "investisseur"
  montantMin: number
}

export const searchInvestisseur = (query: InvestisseurQuery) => buildFetchRequest({
  "fichier_investisseurs": "GTIetmontant.csv",
  "montant_min": query.montantMin * 1000,
  "secteurs": query.secteurs,
  "keywords": query.motsclefs,
}).then(resp => handleResp(query, resp));

export interface AidesQuery extends Omit<Query, "type"> {
  "Afficher les aides permanentes": boolean,
  "aid_type": string,
  "echeance": string
}

/* Aides Client */

export interface AidesClientQuery extends AidesQuery {
}

export const searchAidesClient = (query: AidesClientQuery) => buildFetchRequest({
  "descriptionSU": query.description,
  "nb_aides": 100,
  "secteurs": query.secteurs,
  "keywords": query.motsclefs
}).then(resp => handleResp(query, resp));

/* Aides Inno */

export interface AidesInnoQuery extends AidesQuery {
}

export const searchAidesInno = (query: AidesInnoQuery) => buildFetchRequest({
  "fichier_aides_inno": "corpusinno.pkl"
}).then(resp => handleResp(query, resp));


import { canonicalize } from 'json-canonicalize';
import sha1 from 'sha1';
import { acheteurPublic, aideClient, aideInno, investisseur } from '../model/CardType';
import mockApiResponse from './mock_api_resp.json';

export const buildId = (obj: any) => sha1(canonicalize(obj)).slice(0, 8)

export const cardTypeNames = ["collectivites", /*"marches",*/ "investisseurs", "aides_clients", "aides_innovation"] as const;
export type CardTypeName = typeof cardTypeNames[number];

/*
cardType list
https://www.notion.so/messervicesgreentech/0290b8c9cfd4437b8f9ee8bb9ee697ee?v=94b3a82bc59243e5b99ed4574bf8407f
*/


export type Aide = {
  "titre_aide": string,
  "score": number,
  "aide_detail_clean": string,
  "aide_detail": string,
  "contact": string,
  "funding_source_url": string,
  "clients": string[],
  "deadline": null | string,
  "type d'aide": string[],
  "éligibilité": string | null,
  "perimètre": string | null | undefined,
  "exemples_projets": string,
  "url_aidesterritoires": string
}
//export type Aide = typeof mockApiResponse.cards.aides[number] //From old FTE file
export type Collectivite = typeof mockApiResponse.cards.collectivites[number]//Deduced from DECP
//export type Marche = typeof mockApiResponse.cards.[number]//deduced from DECP
export type Investisseur = typeof mockApiResponse.cards.investisseurs[number]//From GI file

export type AnyCard = Partial<Aide> /*& Partial<Marche>*/ & Partial<Collectivite> & Partial<Investisseur>  & {id:string, cardTypeName:string}
// types of property '"deadline"' are incompatible.
//             Type 'null' is not assignable to type 'string | undefined'

export type ApiResponse = typeof mockApiResponse

export type Search = ReturnType<typeof handleResp>


function  handleResp(query : Query | InvestisseurQuery, resp : ApiResponse) {
  const cards = {

    collectivites: resp.cards.collectivites.map(x => {return {...x, id: buildId(x), cardTypeName: acheteurPublic.name}}),
    //marches: resp.cards.marches.map(x => {return {...x, id: buildId(x), cardTypeName: achatPrevi.name}}),
    investisseurs: resp.cards.investisseurs.map(x => {return {...x, id: buildId(x), cardTypeName: investisseur.name}}),
    aides_clients: resp.cards.aides_clients.map(x => {return {...x, id: buildId(x), cardTypeName: aideClient.name}}),
    aides_innovation: resp.cards.aides_innovation.map(x => {return {...x, id: buildId(x), cardTypeName: aideInno.name}})
  }
  const cardsById = Object.fromEntries([...cards.collectivites, /*...cards.marches,*/ ...cards.investisseurs, ...cards.aides_clients, ...cards.aides_innovation].map(x => [x.id, x]))
  return {query, cardsById};
}

/*
  GENERAL QUERY
*/

export type Query = {
  type: "general"
  description:string,
  secteurs: string[],
  motsclefs: string[]
}

export function searchByQuery(query : Query) {
  return searchRequest(query.description, query.secteurs, query.motsclefs, 0).then(resp => handleResp(query, resp));
}

export function searchRequest(description: string, secteurs:string[], motsclefs:string[], montant_min:number) {
  // if (useMockResponse) {
  //   return new Promise<ApiResponse>(res => setTimeout(() => res(mockApiResponse), 3000))
  // } else {
    
    return fetch(localStorage.apiUrl || 'https://api.msg.greentechinnovation.fr:8080/getCards/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fichier_decp": "decp_score.csv",
        "fichier_investisseurs": "GTIetmontant.csv",
        "fichier_aides_inno": "corpusinno.pkl",
        "descriptionSU": description,
        "nb_aides": 10,
        "nb_acheteur": 10,
        "montant_min": montant_min*1000,
        "secteurs": secteurs,
        "keywords": motsclefs,
        "cards": {
          "collectivites" : [],
          "aides_clients" : [],
          "aides_innovation":[],
          "investisseurs" : []
        }
      })
    })
    .then(resp => resp.json())
  // }
}

/*
  INVESTISSEUR QUERY
*/
export type InvestisseurQuery = {
  type: "investisseur"
  description:string,
  secteurs: string[],
  montantMin: number
}
export function searchInvestisseurByQuery(query : InvestisseurQuery) {
  return searchRequestInvestisseur(query.secteurs, query.montantMin).then(resp => handleResp(query, resp));
}
export function searchRequestInvestisseur(secteurs:string[], montant_min:number) {
  // if (useMockResponse) {
  //   return new Promise<ApiResponse>(res => setTimeout(() => res(mockApiResponse), 3000))
  // } else {
    return fetch(localStorage.apiUrl ||'https://api.msg.greentechinnovation.fr/getCards/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fichier_investisseurs": "GTIetmontant.csv",
        "montant_min": montant_min*1000,
        "secteurs": secteurs,    
        "cards": {
          "collectivites" : [],
          "aides_clients" : [],
          "aides_innovation":[],
          "investisseurs" : []
        }
      })
    })
    .then(resp => resp.json())
  // }
}


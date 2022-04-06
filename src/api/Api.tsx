import mockApiResponse from './mock_api_resp.json'
import sha1 from 'sha1';
import { canonicalize } from 'json-canonicalize';
import { CardType } from '../model/CardType';

export const buildId = (obj: any) => sha1(canonicalize(obj))

export const cardTypeNames = ["collectivites", "marches", "investisseurs", "aides"] as const;
export type CardTypeName = typeof cardTypeNames[number];

export type Aide = typeof mockApiResponse.cards.aides[number] //From old FTE file
export type Collectivite = typeof mockApiResponse.cards.collectivites[number]//Deduced from DECP
export type Marche = typeof mockApiResponse.cards.marches[number]//deduced from DECP
export type Investisseur = typeof mockApiResponse.cards.investisseurs[number]//From GI file

export type AnyCard = Partial<Aide> & Partial<Marche> & Partial<Collectivite> & Partial<Investisseur>  & {id:string}

export type ApiResponse = typeof mockApiResponse

export type Query = {
  description:string
}

export type Search = ReturnType<typeof handleResp>


export function getSearch(searchId : string) : Search | null {
  const searchDataStr = localStorage.getItem(`search-${searchId}`)
  return searchDataStr ? (JSON.parse(searchDataStr) as Search ) : null
}

type Test<T> = Record<CardTypeName, T>

const MAX_QUERY_STORED = 10;
const getNextQueryId = () => {
  const last = localStorage.getItem(`lastQueryId`)
  const next = last ? ((JSON.parse(last) as number + 1)  % MAX_QUERY_STORED) : 0;
  localStorage.setItem(`lastQueryId`, JSON.stringify(next))
  return next.toString();
}

const handleResp = (query : Query, resp : ApiResponse) => {
  const queryStr = JSON.stringify(query);
  const queryId = (getNextQueryId() ) //sha1(queryStr).slice(0, 8);
  const cards = {
    collectivites: resp.cards.collectivites.map(x => {return {...x, id: buildId(x)}}),
    marches: resp.cards.marches.map(x => {return {...x, id: buildId(x)}}),
    investisseurs: resp.cards.investisseurs.map(x => {return {...x, id: buildId(x)}}),
    aides: resp.cards.aides.map(x => {return {...x, id: buildId(x)}})
  }
  const search = {id: queryId, query, resp, cards};
  const jsonStr = JSON.stringify(search)
  console.log({searchSize: new Blob([jsonStr]).size})
  localStorage.setItem(`search-${queryId}`, jsonStr)
  
  return search;
}

export function searchByQuery(query : Query) {
  //TODO default params
  return searchRequest(query.description, [], 0, 1000000).then(resp => handleResp(query, resp));
}


export function searchRequest(description: string, secteurs:string[], montant_min:number, montant_max:number) {
  // if (useMockResponse) {
  //   return new Promise<ApiResponse>(res => setTimeout(() => res(mockApiResponse), 3000))
  // } else {
    return fetch('https://api.msg.greentechinnovation.fr/getCards/', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "fichier_aides": "Aides_detailsandname.xlsx",
        "fichier_decp": "decp_score.csv",
        "fichier_investisseurs": "GTIetmontant.csv",
        "descriptionSU": description,
        "fichier_vocab": "vocab.pkl",
        "fichier_embeddings_achats": "vocab_achats_previs.pkl",
        "vectorizer_achats": "vectorizer_AchatsEtat.pickle",
        "vectorizer_aides": "vectorizer_aides.pickle",
        "faiss_index" : "aides.index",
        "faiss_index_generation" : "aides_newmod.index",
        "nb_aides": 10,
        "nb_achats_previs": 12,
        "nb_acheteur": 10,
        "montant_min": montant_min,
        "montant_max": montant_max,
        "secteurs": secteurs,    
        "cards": {
          "collectivites": [],
          "aides": [],
          "marches": [],
          "investisseurs" : []
        }
      })
    })
    .then(resp => resp.json())
  // }
}


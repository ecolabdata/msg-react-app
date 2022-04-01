import mockApiResponse from './mock_api_resp.json'
import sha1 from 'sha1';


/*
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
export type Collectivite = typeof mockApiResponse.cards.collectivites[0]
//export type Marche = typeof mockApiResponse.cards.marches[0]
export type Investisseur = typeof mockApiResponse.cards.investisseurs[0]

export type AnyCard = Partial<Aide> /*& Partial<Marche>*/ & Partial<Collectivite> & Partial<Investisseur>
// types of property '"deadline"' are incompatible.
//             Type 'null' is not assignable to type 'string | undefined'

export type ApiResponse = typeof mockApiResponse

export type Query = {
  description:string
}

export type Search = {
  id: string,
  query: Query,
  resp: ApiResponse
};


export function getSearch(searchId : string) : Search | null {
  localStorage.getItem(`search-${searchId}`)
  const searchDataStr = localStorage.getItem(`search-${searchId}`)
  return searchDataStr ? (JSON.parse(searchDataStr) as Search ) : null
}

export function searchByQuery(query : Query) {
  const queryStr = JSON.stringify(query);
  const queryId = sha1(queryStr).slice(0, 8);
  //TODO default params
  return searchRequest(query.description, [], 0, 1000000).then(resp => {
    const search : Search = {id: queryId, query, resp}
    localStorage.setItem(`search-${queryId}`, JSON.stringify(search))
    return search;
  });
}


export function searchRequest(description: string, secteurs:string[], montant_min:number, montant_max:number) {
  // if (useMockResponse) {
  //   return new Promise<ApiResponse>(res => setTimeout(() => res(mockApiResponse), 3000))
  // } else {
    
    return fetch('https://api.msg.greentechinnovation.fr:8080/getCards/', {
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
        "montant_min": montant_min,
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


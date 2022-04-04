import mockApiResponse from './mock_api_resp.json'
import sha1 from 'sha1';

/*
  From old FTE file
*/
export type Aide = typeof mockApiResponse.cards.aides[0]

/*
  Deduced from DECP
*/
export type Collectivite = typeof mockApiResponse.cards.collectivites[0]

/*
  deduced from DECP
*/
export type Marche = typeof mockApiResponse.cards.marches[0]

/*

*/
export type Investisseur = typeof mockApiResponse.cards.investisseurs[0]

export type AnyCard = Partial<Aide> & Partial<Marche> & Partial<Collectivite> & Partial<Investisseur>

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


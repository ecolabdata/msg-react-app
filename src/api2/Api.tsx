import searchPublicBuyer from 'api2/searchPublicBuyer.json'
import searchStartup from 'api2/searchStartup.json'
import { mockedPublicBuyer } from './mockedPublicBuyer'
import { mockedStartup } from './mockedStartup'

//Public Buyers
//    Search
export type SearchPublicBuyer = typeof searchPublicBuyer
export type HitPublicBuyer = SearchPublicBuyer["hits"][number]
//    Details
export type PublicBuyer = typeof mockedPublicBuyer
export type Collectivite = PublicBuyer

//Startup
//    Search
export type SearchStartup = typeof searchStartup
export type HitStartup = SearchStartup["hits"][number]
//    Details
export type Startup = typeof mockedStartup

const getBaseUrl = () => "http://api-v2.msg.greentechinnovation.fr/"

export const Api = {
    searchActeurPublic: (description : string) => fetch(`${getBaseUrl()}/search?` + new URLSearchParams({
        q: description,
    })).then((resp) => resp.json()).then(x => x as SearchPublicBuyer),
    getActeurPublic: (nom : string) => fetch(`${getBaseUrl()}/acteur_public?` + new URLSearchParams({
        nom: nom,
    })).then((resp) => resp.json()).then(x => x as PublicBuyer),
    searchStartup: (description : string) => fetch(`${getBaseUrl()}/startup/search?` + new URLSearchParams({
        q: description,
    })).then((resp) => resp.json()).then(x => x as SearchStartup),
    getStartup: (nom : string) => fetch(`${getBaseUrl()}/startup?` + new URLSearchParams({
        nom: nom,
    })).then((resp) => resp.json()).then(x => x as Startup)

}
import searchPublicBuyer from 'api2/searchPublicBuyer.json'
import searchStartup from 'api2/searchStartup.json'
import { acheteurPublic, startups } from 'model/CardType'
import { mockedPublicBuyer } from './mockedPublicBuyer'
import { mockedStartup } from './mockedStartup'

//Public Buyers
//    Search
export type SearchPublicBuyer = typeof searchPublicBuyer
export type HitPublicBuyer = SearchPublicBuyer["hits"][number]
//    Details
export type PublicBuyer = typeof mockedPublicBuyer
export type CollectiviteV2 = PublicBuyer

//Startup
//    Search
export type SearchStartup = typeof searchStartup
export type HitStartup = SearchStartup["hits"][number]
//    Details
export type StartupV2 = typeof mockedStartup

const getBaseUrl = () => "https://api-v2.msg.greentechinnovation.fr/"
//const getBaseUrl = () => "http://localhost:5000/"

export const Api = {
    searchActeurPublic: (description : string) => fetch(`${getBaseUrl()}acteur_public/search?` + new URLSearchParams({
            q: description,
        }))
        .then((resp) => resp.json())
        .then(x => x as SearchPublicBuyer),
    getActeurPublic: (nom : string) => fetch(`${getBaseUrl()}acteur_public?` + new URLSearchParams({
            nom: nom,
        }))
        .then((resp) => resp.json())
        .then(x => x.results[0] as PublicBuyer)
        .then(x => Object.assign(x, {cardTypeName: acheteurPublic.name, "id": "idc"})),
    searchStartup: (description : string) => fetch(`${getBaseUrl()}startup/search?` + new URLSearchParams({
            q: description,
        }))
        .then((resp) => resp.json())
        .then(x => x as SearchStartup),
    getStartup: (nom : string) => fetch(`${getBaseUrl()}startup?` + new URLSearchParams({
            nom: nom,
        }))
        .then((resp) => resp.json())
        .then(x => x.results[0] as StartupV2)
        .then(x => Object.assign(x, {cardTypeName: startups.name, "id": "idc"}))
}
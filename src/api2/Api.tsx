import searchPublicBuyer from 'api2/searchPublicBuyer.json'
import { mockedPublicBuyer } from './mockedPublicBuyer'
import { mockedStartup } from './mockedStartup'

//Public Buyers
//    Search
export type RespPublicBuyer = typeof searchPublicBuyer
export type HitPublicBuyer = RespPublicBuyer["hits"][number]
//    Details
export type PublicBuyer = typeof mockedPublicBuyer
export type Collectivite = PublicBuyer

//Startup
//    Search
// TODO
//    Details
export type Startup = typeof mockedStartup




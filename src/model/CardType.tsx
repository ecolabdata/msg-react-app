import React from 'react';
import { AnyCard, CardTypeName as ApiName, cardTypeNames, ACard, Collectivite, Investisseur, Aide, Startup, Marche } from '../api/Api';
import { PictoEnvironnement, PictoHealth, PictoRocket, PictoCalendar, PictoMoney, PictoCityHall } from '../assets/Icons';
import { ListResearchResultAidesInno, ListResearchResultAidesClient, ListResearchResultStartups } from '../components/anonymous/ListResearchResultGeneric';
import { CardDetailsStartup } from '../components/customComponents/CardDetailsStartup';
import { CardDetailsInno, CardDetailsClient, } from '../components/customComponents/DetailsAide';

import { versions } from './CardVersions';

export interface CardType {
    SVGLogo: ({ ...other }: { [x: string]: any; }) => JSX.Element,
    color: string,
    title: string,
    description: string,
    name: string,
    searchLink: string,
    apiName: ApiName,
    DetailsPage?: React.FC<{}>,
    SearchPage?: React.FC,
    version: typeof versions[number]
}

export const acheteurPublic : CardType = {
    SVGLogo: PictoCityHall,
    color: "#F95C5E",
    //title: "Organismes publics à démarcher",
    // title: "Organismes publics ouverts à l’innovation",
    title: "Clients publics à démarcher",
    description: "Collectivités ou organismes publiques ouverts à l’innovation",
    name: "acheteurs-publics",
    searchLink: "/acheteurs-publics",
    apiName: "collectivites",
    version: "alpha"
} as const

export const achatPrevi : CardType = {
    SVGLogo: PictoCalendar,
    color: "#D8C635",
    title: "Achats publics à venir",
    description: "Achats publics prévus ces trois prochaines années dans votre domaine.",
    // name: "achats-previsionnels",
    // searchLink: "/achats-previsionnels",
    // apiName: "marches",
    //? PROVISORY : We use this data until we get the good one
    name: "aides-innovations",
    searchLink: "/aides-innovations",
    DetailsPage: CardDetailsInno, //?Perhaps we need to create the right component now ?
    apiName: "aides_innovation",
    version: "alpha"
    //?-------------------------------------------------------------------

} as const

export const investisseur : CardType = {
    SVGLogo: PictoMoney,
    color: "#68A532",
    title: "Investisseurs",
    description: "Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.",
    name: "investisseurs",
    searchLink: "/investisseurs",
    apiName: "investisseurs",
    version: "alpha"
} as const

export const aideClient : CardType = {
    SVGLogo: PictoHealth,
    color: "#A558A0",
    title: "Aides aux clients",
    description: "Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions",
    name: "aides-clients",
    searchLink: "/aides-clients",
    DetailsPage: CardDetailsClient,
    SearchPage: ListResearchResultAidesClient,
    apiName: "aides_clients",
    version: "beta"
} as const

export const aideInno : CardType = {
    SVGLogo: PictoEnvironnement,
    color: "#8585F6",
    title: "Aides à l’innovation",
    description: "Aides publiques dédiées à votre développement (ADEME, Bpifrance...)",
    name: "aides-innovations",
    searchLink: "/aides-innovations",
    DetailsPage: CardDetailsInno,
    SearchPage: ListResearchResultAidesInno,
    apiName: "aides_innovation",
    version: "beta"
} as const

export const startups : CardType = {
    SVGLogo: PictoRocket,
    color: "#4EC8AE",
    title: "Start-up greentech",
    description: "Entreprises éco-innovantes qui vous ressemblent ou répondent à vos besoins",
    name: "startups",
    searchLink: "/startups",
    DetailsPage: CardDetailsStartup,
    SearchPage: ListResearchResultStartups,
    apiName: "startups",
    version: "beta"
} as const



export const all = [aideInno, aideClient, startups, achatPrevi, investisseur, acheteurPublic,] as const
export const byName = Object.fromEntries(all.map(x => [x.name, x]))
export const dropdownValues = Object.fromEntries(all.map(x => [x.name, x.title]))
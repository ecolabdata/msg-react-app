import React from 'react';
import { AnyCard, CardTypeName as ApiName, cardTypeNames } from '../api/Api';
import { Calendar, Euro, Eye, Rocket, Signal, Unicorn } from '../assets/Icons';
import ListResearchResultAidesClients from '../components/anonymous/ListResearchResultAidesClients';
import ListResearchResultInvestisseurs from '../components/anonymous/ListResearchResultInvestisseurs';
import CardDetailsInno from '../components/customComponents/DetailsAideInno';
import { versions } from './CardVersions';

export interface CardType {
    SVGLogo: ({ ...other }: { [x: string]: any; }) => JSX.Element,
    color: string,
    title: string,
    description: string,
    name: string,
    searchLink: string,
    apiName: ApiName,
    SearchPage?: React.FC,
    DetailsPage?: React.FC<{}>,
    version: typeof versions[number];
}

export const acheteurPublic: CardType = {
    SVGLogo: Signal,
    color: "#F95C5E",
    title: "Organismes publics ouverts à l’innovation",
    description: "Collectivités ou organismes publiques ouverts à l’innovation",
    name: "acheteurs-publics",
    searchLink: "/acheteurs-publics",
    apiName: "collectivites",
    version: "alpha"
} as const
// export const achatPrevi: CardType = {
//     SVGLogo: Calendar,
//     color: "#D8C635",
//     title: "Achats publics prévisionnels",
//     description: "Achats publics prévus ces trois prochaines années dans votre domaine.",
//     name: "achats-previsionnels",
//     searchLink: "/achats-previsionnels",
//     apiName: "marches"
// } as const
export const investisseur: CardType = {
    SVGLogo: Euro,
    color: "#68A532",
    title: "Investisseurs privés",
    description: "Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.",
    name: "investisseurs",
    searchLink: "/investisseurs",
    SearchPage: ListResearchResultInvestisseurs,
    apiName: "investisseurs",
    version: "alpha"
} as const

export const aideClient: CardType = {
    SVGLogo: Eye,
    color: "#A558A0",
    title: "Aides aux clients",
    description: "Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions",
    name: "aides-clients",
    searchLink: "/aides-clients",
    SearchPage: ListResearchResultAidesClients,
    apiName: "aides_clients",
    version: "beta"
} as const

export const aideInno: CardType = {
    SVGLogo: Rocket,
    color: "#8585F6",
    title: "Aides à l’innovation",
    description: "Aides publiques dédiées à votre développement (Adème, BPI...)",
    name: "aides-innovations",
    searchLink: "/aides-innovations",
    DetailsPage: CardDetailsInno,
    apiName: "aides_innovation",
    version: "beta"
} as const

export const startups: CardType = {
    SVGLogo: Unicorn,
    color: "hsla(167, 53%, 55%, 1)",
    title: "Start-up greentech",
    description: "Entreprises éco-innovantes qui vous ressemblent ou répondent à vos besoins",
    name: "startups",
    searchLink: "/startups",
    apiName: "startups",
    version: "beta"
} as const

export const all = [aideInno, aideClient, investisseur, acheteurPublic,/*achatPrevi,*/ startups]
export const byName = Object.fromEntries(all.map(x => [x.name, x]))
export const dropdownValues = Object.fromEntries(all.map(x => [x.name, x.title]))
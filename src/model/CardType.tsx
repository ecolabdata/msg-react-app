import { CardTypeName as ApiName } from '../api/Api';
import { Calendar, Euro, Eye, Rocket, Signal } from '../assets/Icons';

export interface CardType {
    SVGLogo: ({ ...other }: {[x: string]: any;}) => JSX.Element,
    color: string,
    title: string,
    description: string,
    name: string,
    searchLink: string,
    apiName: ApiName,
}

export const acheteurPublic : CardType = {
    SVGLogo: Signal,
    color: "#F95C5E",
    title: "Organismes publics ouverts à l’innovation",
    description: "Collectivités ou organismes publiques ouverts à l’innovation",
    name: "acheteurs-publics",
    searchLink: "/acheteurs-publics",
    apiName: "collectivites",
}
export const achatPrevi: CardType = {
    SVGLogo: Calendar,
    color: "#D8C635",
    title: "Achats publics prévisionnels",
    description: "Achats publics prévus ces trois prochaines années dans votre domaine.",
    name: "achats-previsionnels",
    searchLink: "/achats-previsionnels",
    apiName: "marches"
}
export const investisseur: CardType  = {
    SVGLogo: Euro,
    color: "#68A532",
    title: "Investisseurs privés ",
    description: "Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.",
    name: "investisseurs",
    searchLink: "/investisseurs",
    apiName: "investisseurs",
}

export const aideInno: CardType = {
    SVGLogo: Rocket,
    color: "#8585F6",
    title: "Aides à l’innovation",
    description: "Aides publiques dédiées à votre développement (Adème, BPI...)",
    name: "aides-innovations",
    searchLink: "/aides-innovations",
    apiName: "aides" //TODO
}

export const aideClient: CardType = {
    SVGLogo: Eye,
    color: "#A558A0",
    title: "Aides aux clients",
    description: "Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions",
    name: "aides-clients",
    searchLink: "/aides-clients",
    apiName: "aides" //TODO
}

 

export const all = [investisseur,acheteurPublic,achatPrevi,aideInno,aideClient]

export const byName = Object.fromEntries(all.map(x => [x.name, x]))
export const dropdownValues = Object.fromEntries(all.map(x => [x.name, x.title]))
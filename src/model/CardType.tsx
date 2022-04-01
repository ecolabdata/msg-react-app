import { AnyCard, ApiResponse } from '../api/Api';
import {Signal, Calendar, Euro, Rocket, Eye} from '../assets/Icons';

export interface CardType {
    SVGLogo: ({ ...other }: {[x: string]: any;}) => JSX.Element,
    color: string,
    title: string,
    description: string,
    searchLink: string
    getCards: (resp : ApiResponse) => AnyCard[]
}

export const acheteurPublic : CardType = {
    SVGLogo: Signal,
    color: "#F95C5E",
    title: "Organismes publics ouverts à l’innovation",
    description: "Collectivités ou organismes publiques ouverts à l’innovation",
    searchLink: "/acheteurs-publics",
    getCards: x => x.cards.collectivites
}
export const achatPrevi: CardType = {
    SVGLogo: Calendar,
    color: "#D8C635",
    title: "Achats publics prévisionnels",
    description: "Achats publics prévus ces trois prochaines années dans votre domaine.",
    searchLink: "/achats-prévisionnels",
    getCards: x => [] //TODO
}
export const investisseur: CardType  = {
    SVGLogo: Euro,
    color: "#68A532",
    title: "Investisseurs privés ",
    description: "Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.",
    searchLink: "/investisseurs",
    getCards: x => x.cards.investisseurs
}

export const aideInno: CardType = {
    SVGLogo: Rocket,
    color: "#8585F6",
    title: "Aides à l’innovation",
    description: "Aides publiques dédiées à votre développement (Adème, BPI...)",
    searchLink: "/aides-innovations",
    getCards: x => x.cards.aides_innovation
}

export const aideClient: CardType = {
    SVGLogo: Eye,
    color: "#A558A0",
    title: "Aides aux clients",
    description: "Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions",
    searchLink: "/aides-clients",
    getCards: x => x.cards.aides_clients
}

export const all = [investisseur,acheteurPublic,achatPrevi,aideInno,aideClient]
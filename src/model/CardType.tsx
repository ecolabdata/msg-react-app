import {Signal, Calendar, Euro, Rocket, Eye} from '../assets/Icons';

export interface CardType {
    SVGLogo: ({ ...other }: {[x: string]: any;}) => JSX.Element,
    color: string,
    title: string,
    description: string,
}

export const acheteurPublic = {
    SVGLogo: Signal,
    color: "#F95C5E",
    title: "Organismes publics ouverts à l’innovation",
    description: "Collectivités ou organismes publiques ouverts à l’innovation",
    
}
export const achatPrevi = {
    SVGLogo: Calendar,
    color: "#D8C635",
    title: "Achats publics prévisionnels",
    description: "Achats publics prévus ces trois prochaines années dans votre domaine.",
    
}
export const investisseur = {
    SVGLogo: Euro,
    color: "#68A532",
    title: "Investisseurs privés ",
    description: "Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.",
}

export const aideInno = {
    SVGLogo: Rocket,
    color: "#8585F6",
    title: "Aides à l’innovation",
    description: "Aides publiques dédiées à votre développement (Adème, BPI...)",
}

export const aideClient = {
    SVGLogo: Eye,
    color: "#A558A0",
    title: "Aides aux clients",
    description: "Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions"
}

export const all = [acheteurPublic,achatPrevi,investisseur,aideInno,aideClient]
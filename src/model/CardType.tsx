import { CardTypeName as ApiName } from '../api/Api';
import {
  PictoCalendar,
  PictoCityHall,
  PictoEnvironnement,
  PictoHealth,
  PictoMoney,
  PictoRocket
} from '../assets/Icons';
import { versions } from './CardVersions';

export type CardColors = '#D8C635' | '#68A532' | '#CE70CC' | '#8585F6' | '#4EC8AE' | '#F95C5E';

export interface CardType {
  SVGLogo: ({ ...other }: { [x: string]: unknown }) => JSX.Element;
  color: CardColors;
  backgroundColor?: string;
  title: string;
  description: string;
  name: CardTypeNameFromModel;
  searchLink: string;
  apiName: ApiName;
  useApiV2?: boolean;
  version: typeof versions[number];
  searchText?: string;
  homeDescription?: string;
}

/*
    START-UP
*/

export type CardTypeNameFromModel =
  | 'acheteurs-publics'
  | 'achats-previsionnels'
  | 'aides-clients'
  | 'aides-innovations'
  | 'aides-financieres'
  | 'achats-programmes'
  | 'investisseurs'
  | 'startups'
  | 'sourcing-startup'
  | 'retex';

export const acheteurPublic: CardType = {
  SVGLogo: PictoCityHall,
  backgroundColor: '#2C202B',
  color: '#F95C5E',
  title: 'Fiches Acheteurs',
  name: 'acheteurs-publics',
  searchLink: '/acheteurs-publics',
  apiName: 'collectivites',
  useApiV2: true,
  version: 'beta',
  description: 'La fiche acheteur de 1700 collectivités ou organismes publics',
  searchText: 'Recherchez des acteurs publics par mot clé (nom, siret, code cpv, fournisseur...)'
} as const;

export const achatPrevi: CardType = {
  SVGLogo: PictoCalendar,
  backgroundColor: '#272419',
  color: '#D8C635',
  title: 'Achats publics à venir',
  description: 'Projets d’achats publics à venir',
  homeDescription: 'Achats publics prévus ces trois prochaines années dans votre domaine.',
  name: 'achats-previsionnels',
  searchLink: '/achats-previsionnels',
  apiName: 'projets_achats',
  searchText: 'Recherchez des projets d’achat public par mots clés (nom, cpv, thématique...)',
  version: 'beta'
} as const;

export const investisseur: CardType = {
  SVGLogo: PictoMoney,
  backgroundColor: '#1E2719',
  color: '#68A532',
  title: 'Investisseurs',
  description: 'Investisseurs adaptés à votre maturité pour votre prochaine levée de fonds.',
  name: 'investisseurs',
  searchLink: '/investisseurs',
  apiName: 'investisseurs',
  version: 'beta',
  searchText: 'Recherchez des investisseurs par mots clés (nom, thématique...)'
} as const;

export const aideClient: CardType = {
  SVGLogo: PictoHealth,
  backgroundColor: '#2C202B',
  color: '#CE70CC',
  title: 'Aides pour vos clients',
  homeDescription:
    'Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions',
  description: '',
  name: 'aides-clients',
  searchLink: '/aides-clients',
  apiName: 'aides_clients',
  version: 'beta',
  searchText: 'Recherchez des aides pour vos clients par mots clés (nom, thématique...)'
} as const;

export const aideInno: CardType = {
  SVGLogo: PictoEnvironnement,
  backgroundColor: '#272747',
  color: '#8585F6',
  title: 'Aides à l’innovation',
  description: 'Aides publiques dédiées à votre développement',
  name: 'aides-innovations',
  searchLink: '/aides-innovations',
  apiName: 'aides_innovation',
  version: 'beta',
  searchText: "Recherchez des aides à l'innovation par mots clés (nom, thématique..)"
} as const;

export const startups: CardType = {
  SVGLogo: PictoRocket,
  backgroundColor: '#1A2624',
  color: '#4EC8AE',
  title: 'Start-up greentech',
  description: 'Entreprises éco-innovantes qui vous ressemblent ou répondent à vos besoins',
  name: 'startups',
  searchLink: '/startups',
  apiName: 'startups',
  useApiV2: true,
  version: 'beta'
} as const;

/*
    PUBLIC ACTOR
*/

export const aideFin: CardType = {
  SVGLogo: PictoMoney,
  backgroundColor: '#1E2719',
  color: '#68A532',
  title: 'Aides financières',
  description: 'Trouvez les aides financières pour financer vos achats responsables',
  name: 'aides-financieres',
  searchLink: '/aides-financieres',
  searchText: 'Recherchez des aides financières par mots clés',
  apiName: 'aides_clients',
  version: 'beta'
} as const;

export const sourcingSu: CardType = {
  SVGLogo: PictoRocket,
  backgroundColor: '#1A2624',
  color: '#4EC8AE',
  title: "Sourcing d'entreprises",
  description:
    'Entreprises éco-innovantes pour préparer vos projets d’achats durables. (liste évolutive)',
  name: 'sourcing-startup',
  searchLink: '/sourcing-startup',
  apiName: 'startups',
  useApiV2: true,
  version: 'beta',
  searchText: 'Recherchez des entreprises par mots clés (nom, siret, thématique...)'
} as const;

export const retex: CardType = {
  SVGLogo: PictoCityHall,
  backgroundColor: '#2C202B',
  color: '#F95C5E',
  title: 'Fiches acheteurs (1 700 fiches)',
  description: 'La fiche acheteur de 1700 collectivités ou organismes publics',
  name: 'retex',
  searchLink: '/retour-experience',
  apiName: 'collectivites',
  useApiV2: true,
  version: 'beta',
  searchText: 'Recherchez des acteurs publics par mot clé (nom, siret, code cpv, fournisseur...)'
} as const;

export const achatProg: CardType = {
  SVGLogo: PictoCalendar,
  backgroundColor: '#272419',
  color: '#D8C635',
  title: 'Achats programmés',
  description:
    'Projets d’achats des services de l’État et de leurs établissements publics, des établissements hospitaliers et des collectivités territoriales.',
  name: 'achats-programmes',
  searchLink: '/achats-programmes',
  apiName: 'projets_achats',
  version: 'beta',
  searchText: 'Recherchez des achats programmés par mots clés,'
} as const;

export const startupPersona: CardType[] = [
  aideInno,
  aideClient,
  achatPrevi,
  investisseur,
  acheteurPublic
];
export const publicActorPersona: CardType[] = [aideFin, sourcingSu, acheteurPublic, achatPrevi];
export const all = [...startupPersona, ...publicActorPersona] as const;
export const byName = Object.fromEntries(all.map((x) => [x.name, x]));
export const dropdownValues = Object.fromEntries(all.map((x) => [x.name, x.title]));

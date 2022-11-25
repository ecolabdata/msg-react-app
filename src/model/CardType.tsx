import React from 'react';
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
  name: string;
  searchLink: string;
  apiName: ApiName;
  version: typeof versions[number];
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
  | 'sourcingSu'
  | 'retex';

export const acheteurPublic: CardType = {
  SVGLogo: PictoCityHall,
  backgroundColor: '#2C202B',
  color: '#F95C5E',
  title: 'Ils ont travaillé avec des start-up',
  description: 'Collectivités ou organismes publics ouverts à l’innovation',
  name: 'acheteurs-publics',
  searchLink: '/acheteurs-publics',
  apiName: 'collectivites',
  version: 'beta'
} as const;

export const achatPrevi: CardType = {
  SVGLogo: PictoCalendar,
  backgroundColor: '#272419',
  color: '#D8C635',
  title: 'Achats publics à venir',
  description: 'Achats publics prévus ces trois prochaines années dans votre secteur.',
  name: 'achats-previsionnels',
  searchLink: '/achats-previsionnels',
  apiName: 'projets_achats',
  version: 'beta'
} as const;

export const investisseur: CardType = {
  SVGLogo: PictoMoney,
  backgroundColor: '#1E2719',
  color: '#68A532',
  title: 'Investisseurs',
  description:
    'Investisseurs publics et privés adaptés à votre maturité pour votre prochaine levée de fonds.',
  name: 'investisseurs',
  searchLink: '/investisseurs',
  apiName: 'investisseurs',
  version: 'beta'
} as const;

export const aideClient: CardType = {
  SVGLogo: PictoHealth,
  backgroundColor: '#2C202B',
  color: '#CE70CC',
  title: 'Aides pour vos clients',
  description:
    'Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions',
  name: 'aides-clients',
  searchLink: '/aides-clients',
  apiName: 'aides_clients',
  version: 'beta'
} as const;

export const aideInno: CardType = {
  SVGLogo: PictoEnvironnement,
  backgroundColor: '#272747',
  color: '#8585F6',
  title: 'Aides à l’innovation',
  description: 'Aides publiques dédiées à votre développement (ADEME, Bpifrance...)',
  name: 'aides-innovations',
  searchLink: '/aides-innovations',
  apiName: 'aides_innovation',
  version: 'beta'
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
  description: 'Trouvez des aides pour financer vos achats',
  name: 'aides-financieres',
  searchLink: '/aides-financieres',
  apiName: 'aides_clients',
  version: 'beta'
} as const;

export const sourcingSu: CardType = {
  SVGLogo: PictoRocket,
  backgroundColor: '#1A2624',
  color: '#4EC8AE',
  title: 'Entreprises éco-innovantes',
  description: 'Sourcez des entreprises éco-innovantes qui répondent à vos besoins',
  name: 'sourcingSu',
  searchLink: '/sourcing-startup',
  apiName: 'startups',
  version: 'beta'
} as const;

export const retex: CardType = {
  SVGLogo: PictoCityHall,
  backgroundColor: '#2C202B',
  color: '#F95C5E',
  title: 'Ils ont travaillé avec des start-up',
  description: 'Collectivités ou organismes publics ouverts à l’innovation',
  name: 'retex',
  searchLink: '/retour-experience',
  apiName: 'collectivites',
  version: 'beta'
} as const;

export const achatProg: CardType = {
  SVGLogo: PictoCalendar,
  backgroundColor: '#272419',
  color: '#D8C635',
  title: 'Achats publics programmés',
  description: 'Achats programmés à 3 ans par les collectivités et organismes publics',
  name: 'achats-programmes',
  searchLink: '/achats-programmes',
  apiName: 'projets_achats',
  version: 'beta'
} as const;

export const startupPersona: CardType[] = [
  aideInno,
  aideClient,
  startups,
  achatPrevi,
  investisseur,
  acheteurPublic
];
export const publicActorPersona: CardType[] = [aideFin, sourcingSu, retex, achatProg];
export const all = [...startupPersona, ...publicActorPersona] as const;
export const byName = Object.fromEntries(all.map((x) => [x.name, x]));
export const dropdownValues = Object.fromEntries(all.map((x) => [x.name, x.title]));

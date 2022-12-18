import ResultCard from 'components/customComponents/ResultCard';
import SearchResults from 'components/customComponents/SearchResults';
import { SearchPage } from 'components/page/SearchPage';
import { CardTypeName as ApiName, isAide } from '../api/Api';
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
  useApiV2: true,
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
  version: 'beta',
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
  useApiV2: true,
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
  useApiV2: true,
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
  achatPrevi,
  investisseur,
  acheteurPublic
];
export const publicActorPersona: CardType[] = [aideFin, sourcingSu, retex, achatProg];
export const all = [...startupPersona, ...publicActorPersona] as const;
export const byName = Object.fromEntries(all.map((x) => [x.name, x]));
export const dropdownValues = Object.fromEntries(all.map((x) => [x.name, x.title]));

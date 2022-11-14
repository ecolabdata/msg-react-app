import {
  AidesQuery,
  Buy,
  Collectivite,
  InvestisseurQuery,
  IStartup,
  ProjetAchat,
  Startup,
  PublicBuy,
  Query,
  Search,
  searchForecastedBuys,
  searchPublicBuys,
  searchStartups
} from '../api/Api';
import { yesNotoBoolean, departmentsByRegion } from '../utils/utilityFunctions';

export const zones: Record<string, string> = {
  'Auvergne-Rhône-Alpes': 'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté': 'Bourgogne-Franche-Comté',
  Bretagne: 'Bretagne',
  Corse: 'Corse',
  'Centre-Val de Loire': 'Centre-Val de Loire',
  'Grand Est': 'Grand Est',
  'Hauts-de-France': 'Hauts-de-France',
  'Île-de-France': 'Île-de-France',
  'Nouvelle-Aquitaine': 'Nouvelle-Aquitaine',
  Normandie: 'Normandie',
  Occitanie: 'Occitanie',
  "Provence-Alpes-Côte d'Azur": "Provence-Alpes-Côte d'Azur",
  'Pays de la Loire': 'Pays de la Loire',
  Guadeloupe: 'Guadeloupe',
  Guyane: 'Guyane',
  'La Réunion': 'La Réunion',
  Martinique: 'Martinique',
  Mayotte: 'Mayotte'
};

export type PublicationDates = 'publié' | 'Moins de 6 mois' | '6 mois et plus';

export const publicationDates: Record<PublicationDates, number> = {
  publié: 0,
  'Moins de 6 mois': 6,
  '6 mois et plus': 7
};

export const markets: Record<string, number> = {
  'B to C': 0,
  'B to B': 1,
  'B to A': 2
};

export const entities: Record<string, string> = {
  etat: 'etat',
  'collectivités territoriales': 'collectivités territoriales',
  'fonction hospitaliere': 'fonction hospitaliere',
  'autres entités': 'autres entités'
};

export const certifications: Record<string, string> = {
  'Ville durable et innovante': 'Ville durable et innovante',
  'Climat air énergie': 'Climat air énergie'
};

export type StartupFilters = {
  market: string;
  zone: string;
};

export type ForecastedBuyFilters = {
  publicationDate: string;
  zone: string;
  hasEcologicalConcern: boolean;
};

export type PublicBuyFilters = {
  certification: string;
  entity: string;
};

export type AnyFilters = StartupFilters | ForecastedBuyFilters | PublicBuyFilters;

export type FilterDefinition = {
  label: string;
  defaultOption: string;
  options?: string[];
  filterId: keyof AnyFilters;
  type: 'select' | 'toggle';
};

type FilterProperties = {
  initialValues: AnyFilters;
  searchByType: (searchParams: SearchParams) => Promise<{
    query: Buy | Query | InvestisseurQuery | AidesQuery | IStartup | PublicBuy;
  }>;
  filtersContent: FilterDefinition[];
  handleFilter:
    | ((search: Search, filters: StartupFilters) => Startup[])
    | ((search: Search, filters: ForecastedBuyFilters) => ProjetAchat[])
    | ((search: Search, filters: PublicBuyFilters) => Collectivite[]);
};

type SearchParams = { description: string; secteurs: string[]; filters: AnyFilters };

export const useAdvancedFilters = (type: string): FilterProperties => {
  if (type === 'achats-previsionnels') {
    return {
      initialValues: {
        publicationDate: '',
        zone: '',
        hasEcologicalConcern: true
      },
      searchByType: ({ description, secteurs, filters }: SearchParams) =>
        searchForecastedBuys({
          description,
          secteurs,
          ...(filters as ForecastedBuyFilters)
        }),
      handleFilter: forecastedBuyFilters,
      filtersContent: [
        {
          label: 'Date de publication',
          defaultOption: 'Toutes',
          options: Object.keys(publicationDates),
          filterId: 'publicationDate' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Zone',
          defaultOption: 'Toutes',
          options: Object.keys(zones),
          filterId: 'zone' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Considération environnementale',
          defaultOption: 'Toutes',
          filterId: 'hasEcologicalConcern' as keyof AnyFilters,
          type: 'toggle'
        }
      ]
    };
  } else if (type === 'startups') {
    return {
      initialValues: {
        market: '',
        zone: ''
      },
      searchByType: ({ description, secteurs, filters: filters }: SearchParams) =>
        searchStartups({
          description,
          secteurs,
          ...(filters as StartupFilters)
        }),
      handleFilter: startUpFilter,
      filtersContent: [
        {
          label: 'Marchés',
          defaultOption: 'Tous',
          options: Object.keys(markets),
          filterId: 'market' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Zone',
          defaultOption: 'Toutes',
          options: Object.keys(zones),
          filterId: 'zone' as keyof AnyFilters,
          type: 'select'
        }
      ]
    };
  } else {
    return {
      initialValues: {
        certification: '',
        entity: ''
      },
      searchByType: ({ description, secteurs, filters }: SearchParams) =>
        searchPublicBuys({
          description,
          secteurs,
          ...(filters as PublicBuyFilters)
        }),
      handleFilter: publicBuyFilter,
      filtersContent: [
        {
          label: 'Labels obtenus',
          defaultOption: 'Tous',
          options: Object.keys(certifications),
          filterId: 'certification' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Entité',
          defaultOption: 'Toutes',
          options: Object.keys(entities),
          filterId: 'entity' as keyof AnyFilters,
          type: 'select'
        }
      ]
    };
  }
};

const forecastedBuyFilters = (search: Search, filters: ForecastedBuyFilters) => {
  const cards: ProjetAchat[] = search.cards?.projets_achats;
  const { hasEcologicalConcern, publicationDate, zone } = filters;
  const filteredCards = cards.filter((card) => {
    let ecologicalFlag = true;
    let publicationDateFlag = true;
    let zoneFlag = true;

    const isZoneFilterActivated = Object.keys(zones).includes(zone);
    const isPublicationDateFilterActivated =
      Object.keys(publicationDates).includes(publicationDate);

    if (hasEcologicalConcern) {
      ecologicalFlag = yesNotoBoolean(card.environmentalConsiderationsConcerned);
    }

    if (isZoneFilterActivated) {
      const departmentsForZone = zone && departmentsByRegion[zone].map((d) => d.toString());

      const cardDepartments = card.departments.map((d) => d.department);
      zoneFlag = cardDepartments.some((d) => departmentsForZone?.includes(d));
    }

    if (isPublicationDateFilterActivated) {
      const deadline = new Date(card.publicationTargetDate);
      const NOW = new Date();
      if ((publicationDate as PublicationDates) === 'publié') {
        publicationDateFlag = deadline < NOW;
      } else {
        const sixMonthLater = new Date(NOW.setMonth(NOW.getMonth() + 6));
        publicationDateFlag = deadline < sixMonthLater;
      }
    }
    return ecologicalFlag && zoneFlag && publicationDateFlag;
  });
  return filteredCards;
};

const startUpFilter = (search: Search, filters: StartupFilters) => {
  const cards = search.cards?.startups;

  let zoneFlag = true;
  let marketFlag = true;
  const { market, zone } = filters;
  const filteredCards = cards.filter((card) => {
    const isZoneFilterActivated = Object.keys(zones).includes(zone);
    const isMarketFilterActivated = Object.keys(markets).includes(market);

    if (isZoneFilterActivated) {
      zoneFlag = card.Région === zone;
    }
    if (isMarketFilterActivated) {
      marketFlag = card.Marché === market;
    }

    return zoneFlag && marketFlag;
  });
  return filteredCards;
};

const publicBuyFilter = (search: Search, filters: PublicBuyFilters) => {
  const cards = search.cards?.collectivites;

  let certificationFlag = true;
  let entityFlag = true;
  const { certification, entity } = filters;
  const filteredCards = cards.filter((card) => {
    const isCertificationFilterActivated = Object.keys(certifications).includes(certification);
    const isEntityFilterActivated = Object.keys(entities).includes(entity);

    //TODO: when known filter on relevant card keys to implement filter
    if (isCertificationFilterActivated) {
      certificationFlag = false;
    }
    if (isEntityFilterActivated) {
      entityFlag = false;
    }

    return certificationFlag && entityFlag;
  });
  return filteredCards;
};

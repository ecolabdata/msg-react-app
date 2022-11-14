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
import {
  publicationDates,
  zones,
  markets,
  certifications,
  entities,
  PublicationDates
} from '../components/customComponents/filter/constants';
import { yesNotoBoolean, departmentsByRegion } from '../utils/utilityFunctions';

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
  id: keyof AnyFilters;
  type: 'select' | 'toggle';
};

type FilterProperties = {
  initialValues: AnyFilters;
  searchByType: (searchParams: SearchParams) => Promise<{
    query: Buy | Query | InvestisseurQuery | AidesQuery | IStartup | PublicBuy;
  }>;
  filters: FilterDefinition[];
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
      filters: [
        {
          label: 'Date de publication',
          defaultOption: 'Toutes',
          options: Object.keys(publicationDates),
          id: 'publicationDate' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Zone',
          defaultOption: 'Toutes',
          options: Object.keys(zones),
          id: 'zone' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Considération environnementale',
          defaultOption: 'Toutes',
          id: 'hasEcologicalConcern' as keyof AnyFilters,
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
      filters: [
        {
          label: 'Marchés',
          defaultOption: 'Tous',
          options: Object.keys(markets),
          id: 'market' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Zone',
          defaultOption: 'Toutes',
          options: Object.keys(zones),
          id: 'zone' as keyof AnyFilters,
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
      filters: [
        {
          label: 'Labels obtenus',
          defaultOption: 'Tous',
          options: Object.keys(certifications),
          id: 'certification' as keyof AnyFilters,
          type: 'select'
        },
        {
          label: 'Entité',
          defaultOption: 'Toutes',
          options: Object.keys(entities),
          id: 'entity' as keyof AnyFilters,
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
      const cardMarkets = card.Marché.split(',');
      marketFlag = cardMarkets.includes(market);
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

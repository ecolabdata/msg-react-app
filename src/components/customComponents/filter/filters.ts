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
  searchStartups,
  searchAidesInno,
  Aide,
  searchAidesClient,
  AidesClientQuery,
  AidesInnoQuery,
  searchInvestisseur,
  Investisseur
} from '../../../api/Api';
import {
  publicationDates,
  zones,
  markets,
  certifications,
  entities,
  PublicationDates,
  FilterDefinition,
  zoneFilter,
  certificationFilter,
  entityFilter,
  environnementalFilter,
  marketFilter,
  publicationDateFilter,
  departmentsByRegion,
  Regions,
  helpTypeFilter,
  deadlineFilter,
  permanentHelpFilter,
  minimumAmountFilter
} from './constants';
import { yesNotoBoolean } from '../../../utils/utilityFunctions';
import { CardTypeNameFromModel } from '../../../model/CardType';

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

export type InnovationHelpFilters = {
  isPermanentHelp: boolean;
  helpType: string;
  deadline: string;
};

export type CustomerHelpFilters = {
  isPermanentHelp: boolean;
  helpType: string;
  deadline: string;
};

export type InvestorFilters = {
  montantMin: number;
  zone: string;
};

export type AnyFilters =
  | StartupFilters
  | ForecastedBuyFilters
  | PublicBuyFilters
  | InnovationHelpFilters
  | InvestorFilters
  | CustomerHelpFilters;

type FilterProperties = {
  initialValues: AnyFilters;
  searchByType: (searchParams: SearchParams) => Promise<{
    query:
      | Buy
      | Query
      | InvestisseurQuery
      | AidesQuery
      | IStartup
      | PublicBuy
      | AidesClientQuery
      | AidesInnoQuery
      | InvestisseurQuery;
  }>;
  filters: FilterDefinition[];
  handleFilter:
    | ((search: Search, filters: StartupFilters) => Startup[])
    | ((search: Search, filters: ForecastedBuyFilters) => ProjetAchat[])
    | ((search: Search, filters: PublicBuyFilters) => Collectivite[])
    | ((search: Search, filters: InnovationHelpFilters) => Aide[])
    | ((search: Search, filters: CustomerHelpFilters) => Aide[])
    | ((search: Search, filters: InvestorFilters) => Investisseur[]);
};

type SearchParams = { description: string; secteurs: string[]; filters: AnyFilters };

export const useAdvancedFilters = (type: CardTypeNameFromModel): FilterProperties => {
  const forecastedBuyFilters = [publicationDateFilter, zoneFilter, environnementalFilter];
  const startupFilters = [marketFilter, zoneFilter];
  const publicBuyFilters = [certificationFilter, entityFilter];
  const innovationHelpFilters = [helpTypeFilter, deadlineFilter, permanentHelpFilter];
  const customerHelpFilters = [helpTypeFilter, deadlineFilter, permanentHelpFilter];
  const investorFilters = [minimumAmountFilter, zoneFilter];

  switch (type) {
    case 'achats-previsionnels':
      return {
        initialValues: getInitialValues(forecastedBuyFilters),
        searchByType: ({ description, secteurs, filters }: SearchParams) =>
          searchForecastedBuys({
            description,
            secteurs,
            ...(filters as ForecastedBuyFilters)
          }),
        handleFilter: handleForecastedBuyFilter,
        filters: forecastedBuyFilters
      };
    case 'startups':
      return {
        initialValues: getInitialValues(startupFilters),
        searchByType: ({ description, secteurs, filters: filters }: SearchParams) =>
          searchStartups({
            description,
            secteurs,
            ...(filters as StartupFilters)
          }),
        handleFilter: handleStartUpFilter,
        filters: startupFilters
      };
    case 'acheteurs-publics':
      return {
        initialValues: getInitialValues(publicBuyFilters),
        searchByType: ({ description, secteurs, filters }: SearchParams) =>
          searchPublicBuys({
            description,
            secteurs,
            ...(filters as PublicBuyFilters)
          }),
        handleFilter: handlePublicBuyFilter,
        filters: publicBuyFilters
      };
    case 'aides-innovations':
      return {
        initialValues: getInitialValues(innovationHelpFilters),
        searchByType: ({ description, secteurs, filters: filters }: SearchParams) => {
          const { deadline, isPermanentHelp, helpType } = filters as InnovationHelpFilters;
          return searchAidesInno({
            description,
            secteurs,
            aid_type: helpType,
            echeance: deadline,
            displayAidePermanente: isPermanentHelp
          });
        },
        handleFilter: handleInnovationHelpFilter,
        filters: innovationHelpFilters
      };
    case 'aides-clients':
      return {
        initialValues: getInitialValues(customerHelpFilters),
        searchByType: ({ description, secteurs, filters }: SearchParams) => {
          const { deadline, isPermanentHelp, helpType } = filters as CustomerHelpFilters;
          return searchAidesClient({
            description,
            secteurs,
            aid_type: helpType,
            echeance: deadline,
            displayAidePermanente: isPermanentHelp
          });
        },
        handleFilter: handleCustomerHelpFilter,
        filters: customerHelpFilters
      };
    case 'investisseurs':
    default:
      return {
        initialValues: getInitialValues(investorFilters),
        searchByType: ({ description, secteurs, filters }: SearchParams) =>
          searchInvestisseur({
            description,
            secteurs,
            type: 'investisseur',
            ...(filters as InvestorFilters)
          }),
        handleFilter: handleInvestorFilter,
        filters: investorFilters
      };
  }
};

const handleForecastedBuyFilter = (search: Search, filters: ForecastedBuyFilters) => {
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
      const departmentsForZone =
        zone && departmentsByRegion[zone as Regions].map((d) => d.toString());

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

const handleInnovationHelpFilter = (search: Search, filters: InnovationHelpFilters) => {
  const cards = search.cards?.aides_innovation;

  return cards;
};

const handleCustomerHelpFilter = (search: Search, filters: CustomerHelpFilters) => {
  const cards = search.cards?.aides_clients;

  return cards;
};

const handleInvestorFilter = (search: Search, filters: InvestorFilters) => {
  const cards = search.cards?.investisseurs;

  return cards;
};

const handleStartUpFilter = (search: Search, filters: StartupFilters) => {
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

const handlePublicBuyFilter = (search: Search, filters: PublicBuyFilters) => {
  const cards = search.cards?.collectivites;

  let certificationFlag = true;
  let entityFlag = true;
  const { certification, entity } = filters;
  const filteredCards = cards.filter(() => {
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

const getInitialValues = (filters: FilterDefinition[]) => {
  return filters.reduce((acc, cur) => {
    return { ...acc, [cur.id]: cur.initialValue };
  }, {} as AnyFilters);
};

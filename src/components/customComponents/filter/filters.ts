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
  FilterDefinition,
  zoneFilter,
  environnementalFilter,
  marketFilter,
  publicationDateFilter,
  helpTypeFilter,
  deadlineFilter,
  permanentHelpFilter,
  minimumAmountFilter,
  fundingTypeFilter
} from './constants';
import { CardTypeNameFromModel } from '../../../model/CardType';
import {
  handleForecastedBuyFilter,
  handleStartUpFilter,
  handlePublicBuyFilter,
  handleInnovationHelpFilter,
  handleCustomerHelpFilter,
  handleInvestorFilter
} from './filterHandlers';

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

export type HelpFilters = {
  isPermanentHelp: boolean;
  helpType: string;
  deadline: string;
};

export type InvestorFilters = {
  minimumAmount: number;
  zone: string;
  fundingType: string;
};

export type AnyFilters =
  | StartupFilters
  | ForecastedBuyFilters
  | PublicBuyFilters
  | HelpFilters
  | InvestorFilters;

export type FilterProperties = {
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
    | ((search: Search, filters: HelpFilters) => Aide[])
    | ((search: Search, filters: InvestorFilters) => Investisseur[]);
};

type SearchParams = { description: string; secteurs: string[]; filters: AnyFilters };

export function useAdvancedFilters(type: CardTypeNameFromModel): FilterProperties {
  const forecastedBuyFilters = [publicationDateFilter, zoneFilter, environnementalFilter];
  const startupFilters = [marketFilter, zoneFilter];
  const publicBuyFilters: FilterDefinition[] = [];
  const helpFilters = [helpTypeFilter, deadlineFilter, permanentHelpFilter];
  const investorFilters = [minimumAmountFilter, zoneFilter, fundingTypeFilter];

  switch (type) {
    case 'achats-previsionnels':
    case 'achats-programmes':
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
    case 'aides-innovations':
      return {
        initialValues: getInitialValues(helpFilters),
        searchByType: ({ description, secteurs, filters: filters }: SearchParams) => {
          const { deadline, isPermanentHelp, helpType } = filters as HelpFilters;
          return searchAidesInno({
            description,
            secteurs,
            aid_type: helpType,
            echeance: deadline,
            displayAidePermanente: isPermanentHelp
          });
        },
        handleFilter: handleInnovationHelpFilter,
        filters: helpFilters
      };
    case 'aides-clients':
    case 'aides-financieres':
      return {
        initialValues: getInitialValues(helpFilters),
        searchByType: ({ description, secteurs, filters }: SearchParams) => {
          const { deadline, isPermanentHelp, helpType } = filters as HelpFilters;
          return searchAidesClient({
            description,
            secteurs,
            aid_type: helpType,
            echeance: deadline,
            displayAidePermanente: isPermanentHelp
          });
        },
        handleFilter: handleCustomerHelpFilter,
        filters: helpFilters
      };
    case 'investisseurs':
    default:
      return {
        initialValues: getInitialValues(investorFilters),
        searchByType: ({ description, secteurs, filters }: SearchParams) => {
          const { minimumAmount } = filters as InvestorFilters;
          return searchInvestisseur({
            description,
            secteurs,
            type: 'investisseur',
            ...(filters as InvestorFilters),
            montantMin: minimumAmount
          });
        },
        handleFilter: handleInvestorFilter,
        filters: investorFilters
      };
  }
}

function getInitialValues(filters: FilterDefinition[]) {
  return filters.reduce((acc, cur) => {
    return { ...acc, [cur.id]: cur.initialValue };
  }, {} as AnyFilters);
}

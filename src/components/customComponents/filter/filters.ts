import {
  FilterDefinition,
  zoneFilter,
  environnementalFilter,
  marketFilter,
  publicationDateFilter,
  helpTypeFilter,
  deadlineFilter,
  minimumAmountFilter,
  fundingTypeFilter
} from './constants';
import { CardTypeNameFromModel } from '../../../model/CardType';
import {
  handleForecastedBuyFilter,
  handleStartUpFilter,
  handleInvestorFilter,
  handleHelpsFilter
} from './filterHandlers';
import { PublicBuyerHit } from 'apiv4/interfaces/publicBuyer';
import { SearchResultItem } from 'apiv4/interfaces/typeguards';
import { PublicPurchaseResult } from 'apiv4/interfaces/publicPurchase';
import { CompanyResult } from 'apiv4/interfaces/company';
import { AidResult } from 'apiv4/interfaces/aid';
import { InvestorResult } from 'apiv4/interfaces/investor';

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

export type HelpsFilters = {
  helpType: string;
  deadline: string;
  zone: string;
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
  | HelpsFilters
  | InvestorFilters;

export type FilterProperties = {
  initialValues: AnyFilters;
  filters: FilterDefinition[];
  handleFilter:
  | ((search: SearchResultItem[] | PublicBuyerHit[], filters: StartupFilters) => CompanyResult[])
  | ((search: SearchResultItem[] | PublicBuyerHit[], filters: ForecastedBuyFilters) => PublicPurchaseResult[])
  | ((search: SearchResultItem[] | PublicBuyerHit[], filters: HelpsFilters) => AidResult[])
  | ((search: SearchResultItem[] | PublicBuyerHit[], filters: InvestorFilters) => InvestorResult[]);
};

export function useAdvancedFilters(type: CardTypeNameFromModel): FilterProperties {
  const forecastedBuyFilters = [publicationDateFilter, zoneFilter, environnementalFilter];
  const startupFilters = [marketFilter, zoneFilter];
  const helpsFilters = [helpTypeFilter, deadlineFilter, zoneFilter];
  const investorFilters = [minimumAmountFilter, zoneFilter, fundingTypeFilter];

  switch (type) {
    case 'achats-publics-a-venir':
      return {
        initialValues: getInitialValues(forecastedBuyFilters),
        handleFilter: handleForecastedBuyFilter,
        filters: forecastedBuyFilters
      };
    case 'aides-innovations':
    case 'aides-clients':
    case 'aides-financieres':
      return {
        initialValues: getInitialValues(helpsFilters),
        handleFilter: handleHelpsFilter,
        filters: helpsFilters
      };
    case 'startups':
    case 'sourcing-startup':
      return {
        initialValues: getInitialValues(startupFilters),
        handleFilter: handleStartUpFilter,
        filters: startupFilters
      };

    case 'acheteurs-publics':
      return {
        initialValues: {} as AnyFilters,
        handleFilter: () => [],
        filters: []
      };
    case 'investisseurs':
    default:
      return {
        initialValues: getInitialValues(investorFilters),
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

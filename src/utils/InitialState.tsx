import { AnyCard, Search } from '../api/Api';

export type InitialState = {
  search: Search;
  results: AnyCard[];
};

export type SearchState = {
  search: {
    description: string;
    thematics: string[];
  };
  page: number;
};

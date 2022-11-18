import { AnyCard, Search } from '../api/Api';

export type InitialState = {
  search: Search;
  results: AnyCard[];
};

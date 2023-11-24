import { ThematicsEnum } from 'model/ThematicsEnum';
import { AnyCard, Search } from '../api/Api';

export type InitialState = {
  search: Search;
  results: AnyCard[];
};

export type SearchState = {
  search: {
    description: string;
    thematics: ThematicsEnum[];
  };
  page: number;
};

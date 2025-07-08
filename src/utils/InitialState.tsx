import { ThematicsEnum } from 'model/ThematicsEnum';

export type SearchState = {
  search: {
    description: string;
    thematics: ThematicsEnum[];
  };
  page: number;
};

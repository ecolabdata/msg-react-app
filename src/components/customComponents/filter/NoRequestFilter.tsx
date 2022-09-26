import { AnyCard, Query, search } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import { RequestFilter } from './RequestFIlter';

export class NoRequestFilter implements RequestFilter {
  allCards: AnyCard[] = [];

  constructor(
    initialState: (InitialState & { page?: number; montantMin: number }) | null,
    cardType: CardType
  ) {
    if (initialState?.search.cards) {
      const initialQuery = initialState?.search.query as Query;
      this.allCards = initialState.search.cards[cardType.apiName];
    }
  }

  get cards() {
    return this.allCards;
  }

  search(description: string, motsclefs: string[], secteurs: string[]) {
    return search({ description, motsclefs, secteurs });
  }

  Component = () => <>Aucun filtre supplémentaire disponible</>;
}

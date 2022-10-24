import { useState } from 'react';
import { AnyCard, searchStartups, StartupQuery } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import Select from '../../dsfrComponents/Select';
import { RequestFilter } from './RequestFIlter';

const zones: Record<string, number> = {
  zone1: 1,
  zone2: 2
};

const markets: Record<string, number> = {
  'B to C': 0,
  'B to B': 1,
  'B to A': 2
};

export class StartupRequestFilter implements RequestFilter {
  market = '';
  zone = '';
  hasEcologicalConcern = true;
  allCards: AnyCard[] = [];
  cardType: CardType;

  constructor(
    initialState: (InitialState & { page?: number; montantMin: number }) | null,
    cardType: CardType
  ) {
    this.cardType = cardType;
    if (initialState?.search.cards) {
      const initialQuery = initialState?.search.query as StartupQuery | null;
      this.allCards = initialState.search.cards[cardType.apiName];
      this.zone = initialQuery?.zone || '';
      this.market = initialQuery?.market || '';
    }
  }

  get cards() {
    return this.allCards;
  }

  search(description: string, secteurs: string[]) {
    return searchStartups({
      description,
      secteurs,
      market: this.market,
      zone: this.zone
    });
  }

  Component = ({}) => {
    const { cardType } = this;
    const [market, setMarket] = useState(this.market);
    const [zone, setZone] = useState(this.zone);

    return (
      <>
        <Select
          classes=" w-[93%] lg:mx-2 lg:max-w-[202px]"
          label="Marchés"
          color={cardType.color}
          defaultOption={'Tous'}
          optionsData={Object.keys(markets)}
          onChange={(e) => {
            this.market = e.currentTarget.value;
            setMarket(e.currentTarget.value);
          }}
          selected={market}
        />
        <Select
          classes=" w-[93%] lg:mx-2 lg:max-w-[202px]"
          label="Zone"
          color={cardType.color}
          defaultOption={'Toutes'}
          optionsData={Object.keys(zones)}
          onChange={(e) => {
            this.zone = e.currentTarget.value;
            setZone(e.currentTarget.value);
          }}
          selected={zone}
        />
      </>
    );
  };
}

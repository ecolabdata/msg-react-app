import { useState } from 'react';
import { AnyCard, searchStartups, Startup, StartupQuery } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import Select from '../../dsfrComponents/Select';
import { RequestFilter } from './RequestFIlter';

const zones: Record<string, string> = {
  'Auvergne-Rhône-Alpes': 'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté': 'Bourgogne-Franche-Comté',
  Bretagne: 'Bretagne',
  Corse: 'Corse',
  'Centre-Val de Loire': 'Centre-Val de Loire',
  'Grand Est': 'Grand Est',
  'Hauts-de-France': 'Hauts-de-France',
  'Île-de-France': 'Île-de-France',
  'Nouvelle-Aquitaine': 'Nouvelle-Aquitaine',
  Normandie: 'Normandie',
  Occitanie: 'Occitanie',
  "Provence-Alpes-Côte d'Azur": "Provence-Alpes-Côte d'Azur",
  'Pays de la Loire': 'Pays de la Loire'
};

const markets: Record<string, number> = {
  'B to C': 0,
  'B to B': 1,
  'B to A': 2
};

export class StartupRequestFilter implements RequestFilter {
  market = '';
  zone = '';
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
      this.allCards = this.filter(initialState.search.cards.startups);
    }
  }

  get cards() {
    return this.allCards;
  }

  reset() {
    this.market = '';
    this.zone = '';
  }

  search(description: string, secteurs: string[]) {
    return searchStartups({
      description,
      secteurs,
      market: this.market,
      zone: this.zone
    });
  }

  filter(cards: Startup[]) {
    let zoneFlag = true;
    let marketFlag = true;
    const { market, zone } = this;
    const filteredCards = cards.filter((card) => {
      const isZoneFilterActivated = Object.keys(zones).includes(zone);
      const isMarketFilterActivated = Object.keys(markets).includes(market);

      if (isZoneFilterActivated) {
        zoneFlag = card.Région === zone;
      }
      if (isMarketFilterActivated) {
        marketFlag = card.Marché === market;
      }

      return zoneFlag && marketFlag;
    });
    return filteredCards;
  }

  Component = ({}) => {
    const { cardType } = this;
    const [market, setMarket] = useState(this.market);
    const [zone, setZone] = useState(this.zone);

    return (
      <>
        <Select
          classes=" w-full lg:max-w-[202px] md:mr-8"
          selectClassName="bg-research-precision-container"
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
          classes=" w-full lg:max-w-[202px] md:mr-8"
          selectClassName="bg-research-precision-container"
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

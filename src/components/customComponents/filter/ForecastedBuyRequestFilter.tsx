import { useState } from 'react';
import { AnyCard, ForecastedBuyQuery, searchForecastedBuy } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';
import { RequestFilter } from './RequestFIlter';

const zones: Record<string, number> = {
  zone1: 1,
  zone2: 2
};

const publicationDates: Record<string, number> = {
  'Moins de 6 mois': 0,
  '6 mois et plus ': 1,
  publié: 2
};

export class ForecastedBuyRequestFilter implements RequestFilter {
  publicationDate = '';
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
      const initialQuery = initialState?.search.query as ForecastedBuyQuery | null;
      this.allCards = initialState.search.cards[cardType.apiName];

      this.hasEcologicalConcern = initialQuery ? initialQuery.hasEcologicalConcern : true;
      this.zone = initialQuery?.zone || '';
      this.publicationDate = initialQuery?.publicationDate || '';
    }
  }

  get cards() {
    return this.allCards;
  }

  search(description: string, secteurs: string[]) {
    return searchForecastedBuy({
      description,
      secteurs,
      hasEcologicalConcern: this.hasEcologicalConcern,
      publicationDate: this.publicationDate,
      zone: this.zone
    });
  }

  Component = ({}) => {
    const { cardType } = this;
    const [publicationDate, setPublicationDate] = useState(this.publicationDate);
    const [zone, setZone] = useState(this.zone);
    const [hasEcologicalConcern, setHasEcologicalConcern] = useState(this.hasEcologicalConcern);

    return (
      <>
        <Select
          classes=" w-full lg:max-w-[202px] md:mr-8"
          selectClassName="bg-research-precision-container"
          label="Date de publication"
          color={cardType.color}
          defaultOption={'Toutes'}
          optionsData={Object.keys(publicationDates)}
          onChange={(e) => {
            this.publicationDate = e.currentTarget.value;
            setPublicationDate(e.currentTarget.value);
          }}
          selected={publicationDate}
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
        <ToggleButton
          label={'Considération environnementale'}
          checked={hasEcologicalConcern}
          color={cardType.color}
          onChange={(e) => {
            this.hasEcologicalConcern = !this.hasEcologicalConcern;
            setHasEcologicalConcern(!hasEcologicalConcern);
          }}
        />
      </>
    );
  };
}

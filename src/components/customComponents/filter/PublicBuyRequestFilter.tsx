import { useState } from 'react';
import { AnyCard, PublicBuyQuery, searchForecastedBuys, searchPublicBuys } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import Select from '../../dsfrComponents/Select';
import { RequestFilter } from './RequestFIlter';

const entitys: Record<string, number> = {
  entity1: 1,
  entity2: 2
};

const certifications: Record<string, number> = {
  certification1: 0,
  certification2: 1
};

export class PublicBuyRequestFilter implements RequestFilter {
  certification = '';
  entity = '';
  allCards: AnyCard[] = [];
  cardType: CardType;

  constructor(
    initialState: (InitialState & { page?: number; montantMin: number }) | null,
    cardType: CardType
  ) {
    this.cardType = cardType;
    if (initialState?.search.cards) {
      const initialQuery = initialState?.search.query as PublicBuyQuery | null;
      this.allCards = initialState.search.cards[cardType.apiName];

      this.entity = initialQuery?.entity || '';
      this.certification = initialQuery?.certification || '';
    }
  }

  get cards() {
    return this.allCards;
  }

  search(description: string, secteurs: string[]) {
    return searchPublicBuys({
      description,
      secteurs,
      certification: this.certification,
      entity: this.entity
    });
  }

  reset() {
    this.certification = '';
    this.entity = '';
  }

  Component = ({}) => {
    const { cardType } = this;
    const [certification, setCertification] = useState(this.certification);
    const [entity, setEntity] = useState(this.entity);

    return (
      <>
        <Select
          classes=" w-full lg:max-w-[202px] md:mr-8"
          selectClassName="bg-research-precision-container"
          label="Labels obtenus"
          color={cardType.color}
          defaultOption={'Tous'}
          optionsData={Object.keys(certifications)}
          onChange={(e) => {
            this.certification = e.currentTarget.value;
            setCertification(e.currentTarget.value);
          }}
          selected={certification}
        />
        <Select
          classes=" w-full lg:max-w-[202px] md:mr-8"
          selectClassName="bg-research-precision-container"
          label="Entité"
          color={cardType.color}
          defaultOption={'Toutes'}
          optionsData={Object.keys(entitys)}
          onChange={(e) => {
            this.entity = e.currentTarget.value;
            setEntity(e.currentTarget.value);
          }}
          selected={entity}
        />
      </>
    );
  };
}

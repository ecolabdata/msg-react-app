import { useState } from 'react';
import { AnyCard, Collectivite, PublicBuyQuery, searchPublicBuys } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import Select from '../../dsfrComponents/Select';
import { RequestFilter } from './RequestFIlter';

const entities: Record<string, string> = {
  etat: 'etat',
  'collectivités territoriales': 'collectivités territoriales',
  'fonction hospitaliere': 'fonction hospitaliere',
  'autres entités': 'autres entités'
};

const certifications: Record<string, string> = {
  'Ville durable et innovante': 'Ville durable et innovante',
  'Climat air énergie': 'Climat air énergie'
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
      this.allCards = this.filter(initialState.search.cards.collectivites);
    }
  }

  get cards() {
    return this.allCards;
  }

  filter(cards: Collectivite[]) {
    console.log({ cards });
    let certificationFlag = true;
    let entityFlag = true;
    const { certification, entity } = this;
    const filteredCards = cards.filter((card) => {
      const isCertificationFilterActivated = Object.keys(certifications).includes(certification);
      const isEntityFilterActivated = Object.keys(entities).includes(entity);

      //TODO: when known filter on relevant card keys to implement filter
      if (isCertificationFilterActivated) {
        certificationFlag = false;
      }
      if (isEntityFilterActivated) {
        entityFlag = false;
      }

      return certificationFlag && entityFlag;
    });
    return filteredCards;
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
          optionsData={Object.keys(entities)}
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

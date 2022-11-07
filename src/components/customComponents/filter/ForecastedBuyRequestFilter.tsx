import { useState } from 'react';
import { AnyCard, ForecastedBuyQuery, ProjetAchat, searchForecastedBuys } from '../../../api/Api';
import { CardType } from '../../../model/CardType';
import { InitialState } from '../../../utils/InitialState';
import { departmentsByRegion, yesNotoBoolean, zones } from '../../../utils/utilityFunctions';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';
import { RequestFilter } from './RequestFIlter';

type PublicationDates = 'publié' | 'Moins de 6 mois' | '6 mois et plus';

const publicationDates: Record<PublicationDates, number> = {
  publié: 0,
  'Moins de 6 mois': 6,
  '6 mois et plus': 7
};

export class ForecastedBuyRequestFilter implements RequestFilter {
  publicationDate = '';
  zone = '';
  hasEcologicalConcern = true;
  allCards: AnyCard[] = [];
  cardType: CardType;
  isReseted?: boolean;

  constructor(
    initialState: (InitialState & { page?: number; montantMin: number }) | null,
    cardType: CardType
  ) {
    this.cardType = cardType;

    console.log(this.zone, this.isReseted, initialState);
    if (initialState?.search.cards) {
      const initialQuery = initialState?.search.query as ForecastedBuyQuery | null;
      this.allCards = initialState.search.cards[cardType.apiName];
      this.hasEcologicalConcern = initialQuery ? initialQuery.hasEcologicalConcern : true;
      this.zone = initialQuery?.zone || '';
      this.publicationDate = initialQuery?.publicationDate || '';

      this.allCards = this.filter(initialState.search.cards.projets_achats);
    }
  }

  get cards() {
    return this.allCards;
  }

  search(description: string, secteurs: string[]) {
    return searchForecastedBuys({
      description,
      secteurs,
      hasEcologicalConcern: this.hasEcologicalConcern,
      publicationDate: this.publicationDate,
      zone: this.zone
    });
  }

  filter(cards: ProjetAchat[]) {
    const { hasEcologicalConcern, publicationDate, zone } = this;
    const filteredCards = cards.filter((card) => {
      let ecologicalFlag = true;
      let publicationDateFlag = true;
      let zoneFlag = true;

      const isZoneFilterActivated = Object.keys(zones).includes(zone);
      const isPublicationDateFilterActivated =
        Object.keys(publicationDates).includes(publicationDate);

      if (hasEcologicalConcern) {
        ecologicalFlag = yesNotoBoolean(card.environmentalConsiderationsConcerned);
      }

      if (isZoneFilterActivated) {
        const departmentsForZone = zone && departmentsByRegion[zone].map((d) => d.toString());

        const cardDepartments = card.departments.map((d) => d.department);
        zoneFlag = cardDepartments.some((d) => departmentsForZone?.includes(d));
      }

      if (isPublicationDateFilterActivated) {
        const deadline = new Date(card.publicationTargetDate);
        const NOW = new Date();
        if ((publicationDate as PublicationDates) === 'publié') {
          publicationDateFlag = deadline < NOW;
        } else {
          const sixMonthLater = new Date(NOW.setMonth(NOW.getMonth() + 6));
          publicationDateFlag = deadline < sixMonthLater;
        }
      }
      return ecologicalFlag && zoneFlag && publicationDateFlag;
    });
    return filteredCards;
  }

  reset() {
    console.log('reset');
    this.publicationDate = 'aeazeazeazeazeaz';
    this.zone = '';
    this.hasEcologicalConcern = true;
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

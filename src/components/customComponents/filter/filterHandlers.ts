import { ProjetAchat, Search, Aide } from '../../../api/Api';
import {
  publicationDates,
  zones,
  markets,
  certifications,
  entities,
  PublicationDates,
  departmentsByRegion,
  Regions,
  deadlines,
  helpTypes
} from './constants';
import { yesNotoBoolean } from '../../../utils/utilityFunctions';
import {
  ForecastedBuyFilters,
  HelpFilters,
  InvestorFilters,
  PublicBuyFilters,
  StartupFilters
} from './filters';

export const handleForecastedBuyFilter = (search: Search, filters: ForecastedBuyFilters) => {
  const cards: ProjetAchat[] = search.cards?.projets_achats;
  const { hasEcologicalConcern, publicationDate, zone } = filters;
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
      const departmentsForZone =
        zone && departmentsByRegion[zone as Regions].map((d) => d.toString());

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
};

export const handleInnovationHelpFilter = (search: Search, filters: HelpFilters) => {
  const cards = search.cards?.aides_innovation;

  return handleHelpsFilter(cards, filters);
};

export const handleCustomerHelpFilter = (search: Search, filters: HelpFilters) => {
  const cards = search.cards?.aides_clients;

  return handleHelpsFilter(cards, filters);
};

export const handleHelpsFilter = (cards: Aide[], filters: HelpFilters) => {
  const { deadline, helpType, isPermanentHelp } = filters;

  let deadlineFlag = true;
  let helpTypeFlag = true;
  let isPermanentHelpFlag = true;

  const filteredCards = cards.filter((card) => {
    const isDeadlineFilterActivated = Object.keys(deadlines).includes(deadline);
    const isHelpTypeFilterActivated = Object.keys(helpTypes).includes(helpType);

    if (isDeadlineFilterActivated) {
      if (card.submission_deadline) {
        const monthsDelay = deadlines[deadline];
        const targetedDeadline = new Date();
        targetedDeadline.setMonth(targetedDeadline.getMonth() + monthsDelay);
        const cardDeadline = new Date(card.submission_deadline);
        deadlineFlag = cardDeadline < targetedDeadline;
      } else {
        deadlineFlag = isPermanentHelp;
      }
    }
    if (!isPermanentHelp) {
      isPermanentHelpFlag = !!card.submission_deadline;
    }
    if (isHelpTypeFilterActivated) {
      helpTypeFlag = card.aid_types.includes(helpType);
    }

    return deadlineFlag && isPermanentHelpFlag && helpTypeFlag;
  });
  return filteredCards;
};

export const handleInvestorFilter = (search: Search, filters: InvestorFilters) => {
  const cards = search.cards?.investisseurs;

  return cards;
};

export const handleStartUpFilter = (search: Search, filters: StartupFilters) => {
  const cards = search.cards?.startups;

  let zoneFlag = true;
  let marketFlag = true;
  const { market, zone } = filters;
  const filteredCards = cards.filter((card) => {
    const isZoneFilterActivated = Object.keys(zones).includes(zone);
    const isMarketFilterActivated = Object.keys(markets).includes(market);

    if (isZoneFilterActivated) {
      zoneFlag = card.Région === zone;
    }
    if (isMarketFilterActivated) {
      const cardMarkets = card.Marché.split(',');
      marketFlag = cardMarkets.includes(market);
    }

    return zoneFlag && marketFlag;
  });
  return filteredCards;
};

export const handlePublicBuyFilter = (search: Search, filters: PublicBuyFilters) => {
  const cards = search.cards?.collectivites;

  let certificationFlag = true;
  let entityFlag = true;
  const { certification, entity } = filters;
  const filteredCards = cards.filter(() => {
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
};

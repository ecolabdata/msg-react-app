import { ProjetAchat, Search, Aide } from '../../../api/Api';
import {
  publicationDates,
  zones,
  markets,
  certifications,
  entities,
  PublicationDates,
  departmentsByRegion,
  Region,
  deadlines,
  helpTypes,
  fundingTypes,
  zonesSynonymes
} from './constants';
import { yesNotoBoolean } from '../../../utils/utilityFunctions';
import {
  ForecastedBuyFilters,
  HelpFilters,
  InvestorFilters,
  PublicBuyFilters,
  StartupFilters
} from './filters';
import { SearchPublicBuyer, SearchStartup } from 'api2/Api';

export const handleForecastedBuyFilter = (search: Search, filters: ForecastedBuyFilters) => {
  const cards: ProjetAchat[] = search.cards?.projets_achats;
  const { hasEcologicalConcern, publicationDate, zone } = filters;
  const isZoneFilterActivated = Object.keys(zones).includes(zone);
  const isPublicationDateFilterActivated = Object.keys(publicationDates).includes(publicationDate);
  const filteredCards = cards.filter((card) => {
    let ecologicalFlag = true;
    let publicationDateFlag = true;
    let zoneFlag = true;

    if (hasEcologicalConcern) {
      ecologicalFlag = yesNotoBoolean(card.environmentalConsiderationsConcerned);
    }

    if (isZoneFilterActivated) {
      const departmentsForZone =
        zone && departmentsByRegion[zone as Region].map((d) => d.toString());

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

  const isDeadlineFilterActivated = Object.keys(deadlines).includes(deadline);
  const isHelpTypeFilterActivated = Object.keys(helpTypes).includes(helpType);
  const filteredCards = cards.filter((card) => {
    let deadlineFlag = true;
    let helpTypeFlag = true;
    let isPermanentHelpFlag = true;
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
  const { fundingType, zone } = filters;
  const isFundingTypeFilterActivated = Object.keys(fundingTypes).includes(fundingType);
  const isZoneFilterActivated = Object.keys(zones).includes(zone);

  const filteredCards = cards.filter((card) => {
    let fundingTypeFlag = true;
    let zoneFlag = true;
    if (isFundingTypeFilterActivated) {
      const cardFundingTypes = card['Type de financement'].split(';').map((t) => t.trim());
      fundingTypeFlag = cardFundingTypes.includes(fundingType);
    }

    if (isZoneFilterActivated) {
      const cardZones = card['Zone géographqiue ciblée'].split(';');
      if (cardZones.includes('France entière') || cardZones.includes('')) {
        zoneFlag = true;
      } else {
        const hasCardZonesSelectedFilter = cardZones.some((z) => {
          let cardZone = z.trim();
          cardZone = cardZone.startsWith('-') ? cardZone.substring(1) : cardZone;
          const selectedZoneSynonymes = zonesSynonymes[zone as Region];
          return selectedZoneSynonymes.includes(cardZone);
        });

        zoneFlag = hasCardZonesSelectedFilter;
      }
    }
    return fundingTypeFlag && zoneFlag;
  });
  return filteredCards;
};

export const handleStartUpFilter = (search: SearchStartup, filters: StartupFilters) => {
  const cards = search.hits;

  const { market, zone } = filters;
  const isZoneFilterActivated = Object.keys(zones).includes(zone);
  const isMarketFilterActivated = Object.keys(markets).includes(market);
  // const filteredCards = cards.filter((card) => {
  //   let zoneFlag = true;
  //   let marketFlag = true;

  //   const greenTechDetails = card?.SOLUTIONS && card?.SOLUTIONS['GreenTech Innovation'];
  //   if (greenTechDetails && greenTechDetails[0]) {
  //     if (isZoneFilterActivated) {
  //       zoneFlag = zonesSynonymes[zone as Region].includes(greenTechDetails[0].Région);
  //     }
  //     if (isMarketFilterActivated) {
  //       const cardMarkets = greenTechDetails[0].Marché.split(',');
  //       marketFlag = cardMarkets.includes(market);
  //     }
  //     return zoneFlag && marketFlag;
  //   }
  //   return false;
  // });
  // return filteredCards;
  return cards;
};

export const handlePublicBuyFilter = (search: SearchPublicBuyer, filters: PublicBuyFilters) => {
  const cards = search.hits;

  const { certification, entity } = filters;
  const isCertificationFilterActivated = Object.keys(certifications).includes(certification);
  const isEntityFilterActivated = Object.keys(entities).includes(entity);
  const filteredCards = cards.filter(() => {
    let certificationFlag = true;
    let entityFlag = true;

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

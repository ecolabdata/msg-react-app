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
  InvestorFilters,
  PublicBuyFilters,
  StartupFilters,
  HelpsFilters
} from './filters';
import { SearchPublicBuyer } from 'api2/Api';
import { PublicBuyerHit } from 'apiv4/interfaces/publicBuyer';
import { SearchResultItem } from 'apiv4/interfaces/typeguards';
import { PublicPurchaseResult } from 'apiv4/interfaces/publicPurchase';
import { CompanyResult } from 'apiv4/interfaces/company';
import { AidResult } from 'apiv4/interfaces/aid';
import { InvestorResult } from 'apiv4/interfaces/investor';

export const handleForecastedBuyFilter = (search: SearchResultItem[] | PublicBuyerHit[], filters: ForecastedBuyFilters) => {
  const cards = search as PublicPurchaseResult[]
  const { hasEcologicalConcern, publicationDate, zone } = filters;
  const isZoneFilterActivated = Object.keys(zones).includes(zone);
  const isPublicationDateFilterActivated = Object.keys(publicationDates).includes(publicationDate);
  const filteredCards = cards.filter(({ card }) => {
    let ecologicalFlag = true;
    let publicationDateFlag = true;
    let zoneFlag = true;

    if (hasEcologicalConcern) {
      ecologicalFlag = yesNotoBoolean(card.environmental_considerations);
    }

    if (isZoneFilterActivated) {
      const departmentsForZone =
        zone && departmentsByRegion[zone as Region].map((d) => d.toString());

      const cardDepartments = card.departments;
      zoneFlag = cardDepartments ? cardDepartments.some((d) => departmentsForZone?.includes(d)) : true;
    }

    if (isPublicationDateFilterActivated) {
      if (!card.publication_date) return true
      const deadline = new Date(card.publication_date);
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

export const handleHelpsFilter = (search: SearchResultItem[] | PublicBuyerHit[], filters: HelpsFilters) => {
  const { deadline, helpType, zone } = filters;
  const cards = search as AidResult[]
  const isDeadlineFilterActivated = Object.keys(deadlines).includes(deadline);
  const isHelpTypeFilterActivated = Object.keys(helpTypes).includes(helpType);
  const isZoneFilterActivated = Object.keys(zones).includes(zone);
  const filteredCards = cards.filter(({ card }) => {
    let deadlineFlag = true;
    let helpTypeFlag = true;
    let zoneFlag = true

    if (isDeadlineFilterActivated) {
      if (card.submission_deadline) {
        const monthsDelay = deadlines[deadline];
        const targetedDeadline = new Date();
        targetedDeadline.setMonth(targetedDeadline.getMonth() + monthsDelay);
        const cardDeadline = new Date(card.submission_deadline);
        deadlineFlag = cardDeadline < targetedDeadline;
      }
    }

    if (isZoneFilterActivated && card.zone) {
      if (card.zone.includes('France') || card.zone.includes('')) {
        zoneFlag = true;
      } else {
        const hasCardZonesSelectedFilter = card.zone.some((z) => {
          let cardZone = z.trim();
          cardZone = cardZone.startsWith('-') ? cardZone.substring(1) : cardZone;
          const selectedZoneSynonymes = zonesSynonymes[zone as Region];
          return selectedZoneSynonymes.includes(cardZone);
        });
        zoneFlag = hasCardZonesSelectedFilter;
      }
    }

    const cardNature = card.nature
    if (isHelpTypeFilterActivated && cardNature) {
      helpTypeFlag = !cardNature.length ? true : cardNature.includes(helpType);
    }

    return deadlineFlag && helpTypeFlag && zoneFlag;
  });
  return filteredCards;
};

export const handleInvestorFilter = (search: SearchResultItem[] | PublicBuyerHit[], filters: InvestorFilters) => {
  const cards = search as InvestorResult[]

  const { fundingType, zone, minimumAmount } = filters;
  const isFundingTypeFilterActivated = Object.keys(fundingTypes).includes(fundingType);
  const isZoneFilterActivated = Object.keys(zones).includes(zone);
  const isAmountFilterActivated = minimumAmount > 0

  const filteredCards = cards.filter(({ card }) => {
    let fundingTypeFlag = true;
    let zoneFlag = true;
    let minimumAmountFlag = true
    const cardData = card.data_source.transformed_pexe_api
    if (isFundingTypeFilterActivated && cardData && cardData['Type de financement']) {
      const cardFundingTypes = cardData['Type de financement'].split(';').map((t) => t.trim());
      fundingTypeFlag = cardFundingTypes.includes(fundingType);
    }
    if (isZoneFilterActivated && cardData && cardData["Zone géographique ciblée"]) {
      const cardZones = cardData['Zone géographique ciblée'].split(';');
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

    if (isAmountFilterActivated && cardData?.['Ticket_min_en_K€']) {
      if (minimumAmount > cardData?.['Ticket_min_en_K€']) {
        minimumAmountFlag = false
      }
    }
    return fundingTypeFlag && zoneFlag && minimumAmountFlag;
  });
  return filteredCards;
};

export const handleStartUpFilter = (search: SearchResultItem[] | PublicBuyerHit[], filters: StartupFilters) => {
  const cards = search as CompanyResult[]

  const { market, zone } = filters;
  const isZoneFilterActivated = Object.keys(zones).includes(zone);
  const isMarketFilterActivated = Object.keys(markets).includes(market);
  const filteredCards = cards.filter(({ card }) => {
    let zoneFlag = true;
    let marketFlag = true;
    const greenTechDetails = card?.data_source.greentech_innovation;
    if (greenTechDetails) {
      const zones = greenTechDetails["Région"]
      if (isZoneFilterActivated && zones) {
        zoneFlag = !zones.length ? true : zonesSynonymes[zone as Region].includes(zones.join(" "));
      }
      const markets = greenTechDetails["Marché"]
      if (isMarketFilterActivated && markets) {
        const cardMarkets = market.split(',');
        marketFlag = !markets.length ? true : cardMarkets.includes(market);
      }
      return zoneFlag && marketFlag;
    }
    return false;
  });
  return filteredCards;
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

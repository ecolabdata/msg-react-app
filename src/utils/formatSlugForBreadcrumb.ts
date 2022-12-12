import { Location } from 'react-router-dom';
import { AnyCard } from '../api/Api';
import { FormatedRoute } from '../components/page/Sitemap';
import { all as allCardType } from '../model/CardType';

const formatedSlugSerachPage = (urlToRedirect: string) => {
  return {
    urlToRedirect: urlToRedirect,
    slugToDisplay: 'Rechercher des leviers'
  };
};

const formatedSlugResultPage = (urlToRedirect: string) => {
  return {
    urlToRedirect: urlToRedirect,
    slugToDisplay: 'Résultats de recherche'
  };
};

const formatedSlugLegalPage = (urlToRedirect: string) => {

  const slug = { urlToRedirect };

  if (urlToRedirect === '/legal') {
    return {
      ...slug,
      slugToDisplay: 'Pages légales'
    };
  }

  if (urlToRedirect.includes('legal-notices')) {
    return {
      ...slug,
      slugToDisplay: 'Mentions légales'
    };
  }

  if (urlToRedirect.includes('cookies')) {
    return {
      ...slug,
      slugToDisplay: 'Gestion des cookies'
    };
  }

  if (urlToRedirect.includes('gdpr')) {
    return {
      ...slug,
      slugToDisplay: 'Données personnelles'
    };
  }

  if (urlToRedirect.includes('accessibility')) {
    return {
      ...slug,
      slugToDisplay: 'Accessibilité'
    };
  }

  return {
    ...slug,
    slugToDisplay: 'Légal'
  };
};

const formatSlugForCardType = (pathname: string, urlToRedirect: string) => {
  if (allCardType.map((card) => card.searchLink).includes(pathname)) {
    const card = allCardType.find((card) => card.searchLink === pathname);
    if (card) {
      return {
        urlToRedirect: urlToRedirect,
        slugToDisplay: card.title
      };
    }
  }
};

export const getGoodAttributForSlugInDetailsCard = (cardData: {
  [x: string]: string;
  cardTypeName: string;
  nom: string;
  name: string;
  description: string;
  Projet: string;
}) => {
  switch (cardData?.cardTypeName) {
    case 'acheteurs-publics':
      return cardData.nom;
    case 'aides-innovations':
      return cardData.name;
    case 'aides-clients':
      return cardData.name;
    case 'achats-previsionnels':
      return cardData.description;
    case 'investisseurs':
      return cardData['Nom du fonds'];
    case 'startups':
      return cardData.Projet;
  }
};

const formatSlugForDetailsCards = (
  query: { [k: string]: string },
  location: Location,
  urlToRedirect: string
) => {
  const initialState = location.state as { cardData: AnyCard } | null;
  if (!initialState?.cardData && !query.cardData)
    throw new Error('Missing cardData to generate page');
  const cardDataObject = initialState?.cardData || JSON.parse(query.cardData);

  const slug = getGoodAttributForSlugInDetailsCard(cardDataObject);
  if (!slug) return;

  return {
    urlToRedirect: urlToRedirect,
    slugToDisplay: slug
  };
};

const formatSlugForBreadCumb = (
  query: { [k: string]: string },
  location: Location,
  urlToRedirect: string
) => {
  if (location.pathname === '/') {
    return;
  }

  let pageData: FormatedRoute | undefined;

  const pageLocationWithoutSpecialCharacters = location.pathname.replace(/[^a-zA-Z]/g, ' ');

  // Find if it's an result page
  if (location.pathname.includes('explorer/search')) {
    pageData = formatedSlugResultPage(urlToRedirect);
  }

  // Find if it's an search page
  if (pageLocationWithoutSpecialCharacters.includes('explorer')) {
    pageData = formatedSlugSerachPage(urlToRedirect);
  }

  // Find if it's an legal page
  if (pageLocationWithoutSpecialCharacters.includes('legal')) {
    pageData = formatedSlugLegalPage(urlToRedirect);
  }

  // Find type of card
  pageData = !pageData ? formatSlugForCardType(location.pathname, urlToRedirect) : pageData;

  // Find name of a details card
  if (pageLocationWithoutSpecialCharacters.includes('details')) {
    pageData = formatSlugForDetailsCards(query, location, urlToRedirect);
  }

  // Default (not in different cases)
  if (!pageData) {
    const pageLocationFirstLetterUppercase =
      pageLocationWithoutSpecialCharacters.charAt(1).toUpperCase() +
      pageLocationWithoutSpecialCharacters.slice(2);

    pageData = {
      urlToRedirect: urlToRedirect,
      slugToDisplay: pageLocationFirstLetterUppercase
    };
  }

  return pageData;
};

export default formatSlugForBreadCumb;

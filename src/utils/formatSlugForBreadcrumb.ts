import { useLocation } from 'react-router-dom';
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

const formatSlugForCardType = (pathname: string, urlToRedirect: string) => {
  console.log('allCardType', allCardType);
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

const formatSlugForDetailsCards = (urlToRedirect: string) => {
  const search = useLocation().search;
  const cardData = new URLSearchParams(search).get('cardData');

  const cardDataObject = cardData && JSON.parse(cardData);

  const slug = getGoodAttributForSlugInDetailsCard(cardDataObject);
  if (!slug) return;

  return {
    urlToRedirect: urlToRedirect,
    slugToDisplay: slug
  };
};

const formatSlugForBreadCumb = (pathname: string, urlToRedirect: string) => {
  if (pathname === '/') {
    return;
  }

  let pageData: { urlToRedirect: string; slugToDisplay: string } | undefined;

  const pageLocationWithoutSpecialCharacters = pathname.replace(/[^a-zA-Z]/g, ' ');
  console.log(pathname, pageLocationWithoutSpecialCharacters, pathname.includes('explorer/search'));
  // Find if it's an result page
  if (pathname.includes('explorer/search')) {
    pageData = formatedSlugResultPage(urlToRedirect);
  }

  // Find if it's an search page
  if (pageLocationWithoutSpecialCharacters.includes('explorer')) {
    pageData = formatedSlugSerachPage(urlToRedirect);
  }

  // Find type of card
  pageData = !pageData ? formatSlugForCardType(pathname, urlToRedirect) : pageData;

  // Find name of a details card
  if (pageLocationWithoutSpecialCharacters.includes('details')) {
    pageData = formatSlugForDetailsCards(urlToRedirect);
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

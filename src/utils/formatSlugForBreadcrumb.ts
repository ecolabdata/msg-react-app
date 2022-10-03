import { useLocation } from 'react-router-dom';
import { all as allCardType } from '../model/CardType';

const formatedSlugSerachPage = {
  urlToRedirect: location.pathname,
  slugToDisplay: 'Rechercher des leviers'
};

const formatSlugForCardType = () => {
  if (allCardType.map((card) => card.searchLink).includes(window.location.pathname)) {
    const card = allCardType.find((card) => card.searchLink === window.location.pathname);
    if (card) {
      return {
        urlToRedirect: location.pathname,
        slugToDisplay: card.title
      };
    }
  }
};

const getGoodAttributForSlugInDetailsCard = (cardData: {
  [x: string]: string;
  cardTypeName: string;
  nom: string;
  name: string;
  description: string;
  Projet: string;
}) => {
  switch (cardData.cardTypeName) {
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

const formatSlugForDetailsCards = () => {
  const search = useLocation().search;
  const cardData = new URLSearchParams(search).get('cardData');

  const cardDataObject = cardData && JSON.parse(cardData);

  const slug = getGoodAttributForSlugInDetailsCard(cardDataObject);
  if (!slug) return;

  return {
    urlToRedirect: location.pathname,
    slugToDisplay: slug
  };
};

const formatSlugForBreadCumb = () => {
  const location = useLocation();

  if (window.location.pathname === '/') {
    return;
  }

  let pageData: { urlToRedirect: string; slugToDisplay: string } | undefined;

  const pageLocationWithoutSpecialCharacters = window.location.pathname.replace(/[^a-zA-Z]/g, ' ');

  // Find if it's an search page
  if (pageLocationWithoutSpecialCharacters.includes('explorer')) {
    pageData = formatedSlugSerachPage;
  }

  // Find type of card
  pageData = !pageData ? formatSlugForCardType() : pageData;

  // Find name of a details card
  if (pageLocationWithoutSpecialCharacters.includes('details')) {
    pageData = formatSlugForDetailsCards();
  }

  // Default (not in different cases)
  if (!pageData) {
    const pageLocationFirstLetterUppercase =
      pageLocationWithoutSpecialCharacters.charAt(1).toUpperCase() +
      pageLocationWithoutSpecialCharacters.slice(2);

    pageData = {
      urlToRedirect: location.pathname,
      slugToDisplay: pageLocationFirstLetterUppercase
    };
  }

  return pageData;
};

export default formatSlugForBreadCumb;

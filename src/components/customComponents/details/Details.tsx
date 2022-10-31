/* eslint-disable no-constant-condition */
import { useLocation } from 'react-router-dom';
import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup } from '../../../api/Api';

import { startups, achatPrevi, acheteurPublic } from '../../../model/CardType';
import DetailsFooter from './DetailsFooter';
import DetailsHeader from './DetailsHeader';
import DetailsPublicBuyerContent from './DetailsPublicBuyerContent';
import DetailsStartupContent from './DetailsStartupContent';

export const Details: React.FC = () => {
  const location = useLocation();
  const data = location.state as { cardData: AnyCard } | null;
  console.log(data);
  if (!data) return <p>Wrong card</p>;
  return (
    <div className="globalContainer flex flex-col justify-around">
      <DetailsHeader {...normalizeHeaderProps(data.cardData)} />
      {isStartup(data.cardData) && <DetailsStartupContent card={data.cardData} />}
      {isAcheteurPublic(data.cardData) && <DetailsPublicBuyerContent card={data.cardData} />}
      {isStartup(data.cardData) && <DetailsStartupContent card={data.cardData} />}
      <DetailsFooter title="titlefooter" />
    </div>
  );
};

const normalizeHeaderProps = (card: AnyCard) => {
  if (isAcheteurPublic(card)) {
    return {
      title: card.nom,
      subtitle: '',
      cardType: acheteurPublic
    };
  }
  if (isStartup(card)) {
    return {
      title: card['Start-up'],
      subtitle: card.Thématique,
      cardType: startups
    };
  }

  if (isProjetAchat(card)) {
    return {
      title: card.label,
      subtitle: card.departments?.join('|'),
      cardType: achatPrevi
    };
  }
  return {
    title: '',
    subtitle: ''
  };
};

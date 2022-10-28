/* eslint-disable no-constant-condition */
import { CSSProperties, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup, Startup } from '../../../api/Api';
import { ApplicationContext } from '../../../App';
import { useQuery } from '../../../hooks/useQuery';
import {
  CardType,
  startups,
  achatPrevi,
  acheteurPublic,
  CardTypeNameFromModel
} from '../../../model/CardType';
import Label from '../../dsfrComponents/Label';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
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
      tag: 'ils ont travaillé avec des startups',
      color: acheteurPublic.color
    };
  }
  if (isStartup(card)) {
    return {
      title: card['Start-up'],
      subtitle: card.Thématique,
      tag: startups.name,
      color: startups.color
    };
  }

  if (isProjetAchat(card)) {
    return {
      title: card.label,
      subtitle: card.departments?.join('|'),
      tag: achatPrevi.name,
      color: achatPrevi.color
    };
  }
  return {
    title: '',
    subtitle: '',
    tag: ''
  };
};

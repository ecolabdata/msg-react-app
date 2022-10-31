/* eslint-disable no-constant-condition */
import { useLocation } from 'react-router-dom';
import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup } from '../../../api/Api';
import DetailsFooter from './DetailsFooter';
import DetailsForecastedBuyContent from './DetailsForecastedBuyContent';
import DetailsHeader from './DetailsHeader';
import DetailsPublicBuyerContent from './DetailsPublicBuyerContent';
import DetailsStartupContent from './DetailsStartupContent';

export const Details: React.FC = () => {
  const location = useLocation();
  const data = location.state as { cardData: AnyCard } | null;
  console.log(data);
  if (!data) return <p>Wrong card</p>;

  const { cardData: card } = data;
  return (
    <div className="globalContainer flex flex-col justify-around">
      <DetailsHeader card={card} />
      {isStartup(card) && <DetailsStartupContent card={card} />}
      {isAcheteurPublic(card) && <DetailsPublicBuyerContent card={card} />}
      {isProjetAchat(card) && <DetailsForecastedBuyContent card={card} />}
      <DetailsFooter title="titlefooter" />
    </div>
  );
};

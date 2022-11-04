import { useLocation } from 'react-router-dom';
import { AnyCard, isAcheteurPublic, isStartup, isProjetAchat } from '../../api/Api';
import DetailsFooter from '../customComponents/details/DetailsFooter';
import DetailsHeader from '../customComponents/details/DetailsHeader';
import PublicBuyerContent from '../customComponents/details/DetailsPublicBuyerContent';
import GenericDetails from '../customComponents/details/DetailsGenericContent';

export const Details: React.FC = () => {
  const location = useLocation();
  const data = location.state as { cardData: AnyCard } | null;
  if (!data) return <p>No data</p>;

  const { cardData: card } = data;
  return (
    <div className="globalContainer flex flex-col justify-around">
      <DetailsHeader card={card} />
      <div className="mx-[9%] mt-16">
        {isAcheteurPublic(card) && <PublicBuyerContent card={card} />}
        {(isStartup(card) || isProjetAchat(card)) && <GenericDetails card={card} />}
        <DetailsFooter card={card} />
      </div>
    </div>
  );
};

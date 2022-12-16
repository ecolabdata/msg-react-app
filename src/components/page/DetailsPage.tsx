import { useLocation } from 'react-router-dom';
import {
  AnyCard,
  isAcheteurPublic,
  isStartup,
  isProjetAchat,
  isAide,
  isInvestisseur
} from '../../api/Api';
import DetailsFooter from '../customComponents/details/DetailsFooter';
import DetailsHeader from '../customComponents/details/DetailsHeader';
import PublicBuyerContent from '../customComponents/details/DetailsPublicBuyerContent';
import GenericDetails from '../customComponents/details/DetailsGenericContent';
import { useQuery } from '../../hooks/useQuery';
import { CardType } from '../../model/CardType';

type DetailsProps = {
  cardType: CardType;
};

export const Details: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();
  const query = useQuery();
  const initialState = location.state as { cardData: AnyCard } | null;
  const card: AnyCard = initialState?.cardData || JSON.parse(query.cardData);

  if (!card) return <p>No data</p>;

  return (
    <div className="globalContainer flex flex-col justify-around">
      <DetailsHeader card={card} cardType={cardType} />
      <div className="mx-[9%] mt-16">
        {isAcheteurPublic(card) && <PublicBuyerContent card={card} />}
        {(isStartup(card) || isProjetAchat(card) || isAide(card) || isInvestisseur(card)) && (
          <GenericDetails card={card} />
        )}
        <DetailsFooter card={card} />
      </div>
    </div>
  );
};

import { useLocation } from 'react-router-dom';
import {
  AnyCard,
  isAcheteurPublic, isAide,
  isInvestisseur, isProjetAchat, isStartup
} from '../../api/Api';
import { useQuery } from '../../hooks/useQuery';
import { CardType } from '../../model/CardType';
import DetailsFooter from '../customComponents/details/DetailsFooter';
import GenericDetails from '../customComponents/details/DetailsGenericContent';
import DetailsHeader from '../customComponents/details/DetailsHeader';
import PublicBuyerContent from '../customComponents/details/DetailsPublicBuyerContent';

type DetailsProps = {
  cardType: CardType;
};

export const Details: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();
  const query = useQuery();
  const initialState = location.state as { cardData: AnyCard } | null;
  const card: AnyCard = initialState?.cardData || JSON.parse(query.cardData);
  if (cardType.useApiV2) {
      
  }

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

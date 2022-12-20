import { Api } from 'api2/Api';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  AnyCard,
  isAcheteurPublic,
  isAide,
  isInvestisseur,
  isProjetAchat,
  isStartup
} from '../../api/Api';
import { useQuery } from '../../hooks/useQuery';
import { acheteurPublic, CardType, startups } from '../../model/CardType';
import DetailsFooter from '../customComponents/details/DetailsFooter';
import GenericDetails from '../customComponents/details/DetailsGenericContent';
import DetailsHeader from '../customComponents/details/DetailsHeader';
import PublicBuyerContent from '../customComponents/details/DetailsPublicBuyerContent';

type DetailsProps = {
  cardType: CardType;
};

export const Details: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();
  const { id, cardData } = useQuery();
  const initialState = location.state as { cardData: AnyCard } | null;
  const [card, setCard] = useState<AnyCard>(initialState?.cardData || JSON.parse(cardData));
  useEffect(() => {
    if (cardType.useApiV2 && id) {
      if (cardType.apiName == acheteurPublic.apiName) {
        console.log({ query: id });
        Api.getActeurPublic(id).then((x) => {
          console.log({ resp: x });
          setCard(x);
        });
      } else if (cardType.apiName == startups.apiName) {
        console.log({ query: id });
        Api.getStartup(id).then((x) => {
          console.log({ resp: x });
          setCard(x);
        });
      }
    }
  }, [id]);

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

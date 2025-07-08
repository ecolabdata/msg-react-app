import { useLocation } from 'react-router-dom';
import { CardType } from '../../../model/CardType';
import { useFetch } from 'apiv4/useFetch';
import { generateCardByIdFetchParams } from 'api5/servicesV5';
import { UnknownCard } from 'api5/interfaces/common';
import DetailsHeaderV5 from 'components/customComponents/V5/DetailsHeaderV5';
import DetailsBodyV5 from 'components/customComponents/V5/DetailsBodyV5';
import DetailsFooter from 'components/customComponents/details/DetailsFooter';
import DetailsPublicBuyer from 'components/customComponents/details/DetailsPublicBuyerContent';
import { PublicBuyerCard } from 'api5/interfaces/publicBuyer';

type DetailsProps = {
  cardType: CardType;
};

export const DetailsPageV5: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();

  const { url, method, headers } = generateCardByIdFetchParams(
    location.pathname.split('/')[3],
    cardType.apiName
  );

  const { data, error } = useFetch<UnknownCard>(url, { method, headers });

  if (!data) return <p>No data</p>;
  console.log(data);

  return (
    <>
      <DetailsHeaderV5 data={data} cardType={cardType} />
      {cardType.apiName === 'public_buyer_cards' ? (
        <DetailsPublicBuyer card={data as PublicBuyerCard} />
      ) : (
        <DetailsBodyV5 data={data} />
      )}
      <DetailsFooter cardType={cardType} />
    </>
  );
};

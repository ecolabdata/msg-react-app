import { useLocation } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import { useFetch } from 'apiv4/useFetch';
import { generateCardByIdFetchParams } from 'api5/servicesV5';
import { UnknownCard } from 'api5/interfaces/common';
import DetailsHeader from 'components/customComponents/DetailsHeader';
import DetailsCompany from 'components/customComponents/DetailsCompany';
import DetailsPublicBuyer from 'components/customComponents/details/DetailsPublicBuyerContent';
import { PublicBuyerCard } from 'api5/interfaces/publicBuyer';
import { CompanyCard } from 'api5/interfaces/company';
import { PublicPurchaseCard } from 'api5/interfaces/publicPurchase';
import { DetailsPublicPurchase } from 'components/customComponents/DetailsPublicPurchase';
import Container from 'components/Core/Container';

type DetailsProps = {
  cardType: CardType;
};

export const DetailsPage: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();

  const { url, method, headers } = generateCardByIdFetchParams(
    location.pathname.split('/')[3],
    cardType.apiName
  );

  const { data, error } = useFetch<UnknownCard>(url, { method, headers });
  const isLoading = !data && !error;

  if (isLoading) return <Container>Chargement en cours...</Container>;
  if (error) return <Container>Erreur</Container>;
  if (!data) return <Container>Aucune donnée</Container>;

  return (
    <>
      <DetailsHeader data={data} cardType={cardType} badge={data.labels || null} />
      {cardType.apiName === 'public_buyer_cards' && (
        <DetailsPublicBuyer card={data as PublicBuyerCard} />
      )}
      {cardType.apiName === 'company_cards' && <DetailsCompany data={data as CompanyCard} />}
      {cardType.apiName === 'public_procurement_cards' && (
        <DetailsPublicPurchase card={data as PublicPurchaseCard} />
      )}
    </>
  );
};

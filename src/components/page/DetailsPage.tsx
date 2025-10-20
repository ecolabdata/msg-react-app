import { useLocation } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import { useFetch } from 'api/useFetch';
import { generateCardByIdFetchParams } from 'api/services';
import { UnknownCard } from 'api/interfaces/common';
import DetailsHeader from 'components/customComponents/DetailsHeader';
import DetailsCompany from 'components/customComponents/DetailsCompany';
import { CompanyCard } from 'api/interfaces/company';
import { PublicPurchaseCard } from 'api/interfaces/publicPurchase';
import { DetailsPublicPurchase } from 'components/customComponents/DetailsPublicPurchase';
import Container from 'components/Core/Container';
import { AidCard } from 'api/interfaces/aid';
import { DetailsAid } from 'components/customComponents/DetailsAid';

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
  console.log(cardType.apiName);
  return (
    <>
      <DetailsHeader data={data} cardType={cardType} badge={data.labels || null} />
      {cardType.apiName === 'company_cards' && <DetailsCompany data={data as CompanyCard} />}
      {cardType.apiName === 'public_procurement_cards' && (
        <DetailsPublicPurchase card={data as PublicPurchaseCard} />
      )}
      {cardType.apiName === 'aid_cards' && (
        <DetailsAid card={data as AidCard} />
      )}
    </>
  );
};

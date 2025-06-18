import { useLocation } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import DetailsFooter from '../customComponents/details/DetailsFooter';
import GenericDetails from '../customComponents/details/DetailsGenericContent';
import DetailsHeader from '../customComponents/details/DetailsHeader';
import { useFetch } from 'apiv4/useFetch';
import { generateCardByIDFetchParameters } from 'apiv4/services';
import { isPublicBuyerResults } from 'apiv4/interfaces/typeguards';
import DetailsPublicBuyer from 'components/customComponents/details/DetailsPublicBuyerContent';
import {
  SearchResultItem,
  isAidV4,
  isCompanyV4,
  isInvestorV4,
  isPublicPurchaseV4
} from 'apiv4/interfaces/typeguards';

type DetailsProps = {
  cardType: CardType;
};
// V5 remove this
export const Details: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();

  const { url, method, headers } = generateCardByIDFetchParameters(
    location.pathname.split('/')[3],
    cardType.apiName
  );
  const { data, error } = useFetch<SearchResultItem>(url, { method, headers });

  if (!data) return <p>No data</p>;

  return (
    <>
      <DetailsHeader data={data} cardType={cardType} />
      {isPublicBuyerResults(data) && <DetailsPublicBuyer card={data._source} />}
      {(isCompanyV4(data) || isPublicPurchaseV4(data) || isAidV4(data) || isInvestorV4(data)) && (
        <GenericDetails data={data} />
      )}

      <DetailsFooter cardType={cardType} />
    </>
  );
};

import { useLocation } from 'react-router-dom';
import { CardType } from '../../../model/CardType';
import { useFetch } from 'apiv4/useFetch';
import { generateCompanyByIdFetchParams } from 'api5/servicesV5';
import { AllCards } from 'api5/interfaces/common';
import DetailsHeaderV5 from 'components/customComponents/V5/DetailsHeaderV5';
import DetailsBodyV5 from 'components/customComponents/V5/DetailsBodyV5';
import DetailsFooter from 'components/customComponents/details/DetailsFooter';

type DetailsProps = {
  cardType: CardType;
};

export const DetailsPageV5: React.FC<DetailsProps> = ({ cardType }) => {
  const location = useLocation();

  const { url, method, headers } = generateCompanyByIdFetchParams(location.pathname.split('/')[3]);

  const { data, error } = useFetch<AllCards>(url, { method, headers });

  if (!data) return <p>No data</p>;
  console.log(data);

  return (
    <>
      <DetailsHeaderV5 data={data} cardType={cardType} />
      <DetailsBodyV5 data={data} />
      <DetailsFooter cardType={cardType} />
    </>
  );
};

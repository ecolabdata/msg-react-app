import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { Link, useNavigate } from 'react-router-dom';
import { CardType, startups } from '../../../model/CardType';
import { tailwindColorUtility } from '../../../utils/utilityFunctions';

import {
  SearchResultItem,
  isAidV4,
  isCompanyV4,
  isInvestorV4,
  isPublicBuyerResults,
  isPublicPurchaseV4
} from 'apiv4/interfaces/typeguards';

interface DetailsHeaderProps {
  data: SearchResultItem;
  cardType: CardType;
}

// V5 remove this
const DetailsHeader: React.FC<DetailsHeaderProps> = ({ data, cardType }) => {
  const { subtitle, title } = normalizeHeaderProps(data);
  const borderColor = cardType?.color && tailwindColorUtility[cardType?.color].border;
  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Container customClasses="mb-12">
      <div className={`pb-12 mb-12 border-b ${borderColor}`}>
        <p
          className={`fr-badge fr-badge--sm `}
          style={{
            color:
              localStorage.getItem('scheme') === 'dark'
                ? cardType?.color
                : cardType.backgroundColor,
            backgroundColor:
              localStorage.getItem('scheme') === 'dark' ? cardType?.backgroundColor : cardType.color
          }}>
          {cardType?.name === 'sourcing-startup' ? 'start up' : cardType?.name}
        </p>
        <Heading align="left">{title}</Heading>
        {isInvestorV4(data) && data.card.logo && (
          <img src={data.card.logo} alt="" className="mt-4 h-10" />
        )}
        {isCompanyV4(data) && data.card.logo_url && (
          <img src={data.card.logo_url} alt="" className="mt-4 h-10" />
        )}
        {isCompanyV4(data) && data.card.logo_url && (
          <img src={data.card.logo_url} alt="" width="100" className="mt-4" />
        )}
        <p
          className={`${localStorage.getItem('scheme') === 'dark' && 'text-grey-625-active'} mt-4`}>
          {subtitle}
        </p>
      </div>
      <Link
        to={'..'}
        className="mt-8 fr-link fr-fi-arrow-left-line fr-link--icon-left w-fit"
        onClick={handleGoBack}>
        Retour à la liste
      </Link>
    </Container>
  );
};

export default DetailsHeader;

const normalizeHeaderProps = (data: SearchResultItem) => {
  if (isInvestorV4(data)) {
    return {
      title: data.card.name,
      subtitle: data.card.investment_policy
    };
  }

  if (isAidV4(data)) {
    return {
      title: data.card.name,
      subtitle: data.card.supports
    };
  }

  if (isPublicPurchaseV4(data)) {
    return {
      title: data.card.name,
      subtitle:
        data.card.departments &&
        data.card.departments.length > 0 &&
        `Périmètre géographique : ${data.card.departments.join(' ')}`
    };
  }
  if (isCompanyV4(data)) {
    return {
      title: data.card.name,
      subtitle: data.card.data_source?.greentech_innovation?.Thématique,
      cardType: startups
    };
  }

  if (isPublicBuyerResults(data)) {
    return {
      title: data._source.public_actor_nom
    };
  }
  return {
    title: '',
    subtitle: ''
  };
};

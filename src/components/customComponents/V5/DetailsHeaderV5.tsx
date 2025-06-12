import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { Link, useNavigate } from 'react-router-dom';
import { CardType } from '../../../model/CardType';
import { tailwindColorUtility } from '../../../utils/utilityFunctions';

import { AllCards } from 'api5/interfaces/common';

interface DetailsHeaderProps {
  data: AllCards;
  cardType: CardType;
}

const DetailsHeaderV5: React.FC<DetailsHeaderProps> = ({ data, cardType }) => {
  const borderColor = cardType?.color && tailwindColorUtility[cardType?.color].border;
  const navigate = useNavigate();
  const { cardTitle: title, cardSubtitle: subtitle, logoUrl } = data;
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
        {logoUrl && <img src={logoUrl} alt="" className="mt-4 h-10" />}

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

export default DetailsHeaderV5;

import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { Link, useNavigate } from 'react-router-dom';
import {
  AnyCard,
  isAcheteurPublic,
  isAide,
  isInvestisseur,
  isProjetAchat,
  isStartup
} from '../../../api/Api';
import { CardType, startups } from '../../../model/CardType';
import { getGreenTechData, tailwindColorUtility } from '../../../utils/utilityFunctions';

interface DetailsHeaderProps {
  card: AnyCard;
  cardType: CardType;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ card, cardType }) => {
  const { subtitle, title } = normalizeHeaderProps(card);
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
          style={{ color: cardType?.color, backgroundColor: cardType?.backgroundColor }}
        >
          {cardType?.name === 'sourcingSu' ? 'start up' : cardType?.name}
        </p>
        <Heading align="left">{title}</Heading>
        <p className="text-grey-625-active">{subtitle}</p>
      </div>
      <Link
        to={'..'}
        className="mt-8 fr-link fr-fi-arrow-left-line fr-link--icon-left w-fit"
        onClick={handleGoBack}
      >
        Retour à la liste
      </Link>
    </Container>
  );
};

export default DetailsHeader;

const normalizeHeaderProps = (card: AnyCard) => {
  if (isInvestisseur(card)) {
    return {
      title: card['Nom du fonds'],
      subtitle: card['Type de financement']
    };
  }

  if (isAide(card)) {
    return {
      title: card.name,
      subtitle: card.financers
    };
  }

  if (isAcheteurPublic(card)) {
    return {
      title: card.public_actor_nom,
      subtitle: ''
    };
  }
  if (isStartup(card)) {
    return {
      title: card['NOM'],
      subtitle: getGreenTechData(card)?.Thématique,
      cardType: startups
    };
  }

  if (isProjetAchat(card)) {
    return {
      title: card.label,
      subtitle: card.departments?.map((d) => d.department).join('|')
    };
  }
  return {
    title: '',
    subtitle: ''
  };
};

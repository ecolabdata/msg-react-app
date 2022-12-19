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
  const backgroundColor = cardType?.color && tailwindColorUtility[cardType?.color].lightBackground;
  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <section className={`pt-8 px-[10%] min-h-[200px] ${backgroundColor}`}>
        <p
          className={`fr-badge fr-badge--sm `}
          style={{ color: cardType?.color, backgroundColor: cardType?.backgroundColor }}>
          {cardType?.name === 'sourcingSu' ? 'start up' : cardType?.name}
        </p>
        <h1 className="my-4 w-full font-bold text-4xl">{title}</h1>
        <p className="">{subtitle}</p>
      </section>
      <Link
        to={'..'}
        className="mx-[10%] mt-8 fr-link fr-fi-arrow-left-line fr-link--icon-left w-fit"
        onClick={handleGoBack}>
        Revenir en arrière
      </Link>
    </>
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
    console.log(card);
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

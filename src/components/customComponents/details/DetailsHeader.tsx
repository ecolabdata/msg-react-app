import { Link, useNavigate } from 'react-router-dom';
import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup } from '../../../api/Api';
import { achatPrevi, acheteurPublic, startups } from '../../../model/CardType';
import { tailwindColorUtility } from '../../../utils/utilityFunctions';

interface DetailsHeaderProps {
  card: AnyCard;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ card }) => {
  const { subtitle, title, cardType } = normalizeHeaderProps(card);
  const backgroundColor = cardType?.color && tailwindColorUtility[cardType?.color].lightBackground;
  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <section className={`pt-8 px-[10%] min-h-[200px] mx-[-24px] ${backgroundColor}`}>
        <p
          className={`fr-badge fr-badge--sm `}
          style={{ color: cardType?.color, backgroundColor: cardType?.backgroundColor }}
        >
          {cardType?.name}
        </p>
        <h1 className="my-4 w-full font-bold text-4xl">{title}</h1>
        <p className="">{subtitle}</p>
      </section>
      <Link
        to={'..'}
        className="mx-[10%] mt-8 fr-link fr-fi-arrow-left-line fr-link--icon-left w-fit"
        onClick={handleGoBack}
      >
        Revenir en arrière
      </Link>
    </>
  );
};

export default DetailsHeader;

const normalizeHeaderProps = (card: AnyCard) => {
  if (isAcheteurPublic(card)) {
    return {
      title: card.nom,
      subtitle: '',
      cardType: acheteurPublic
    };
  }
  if (isStartup(card)) {
    return {
      title: card['Start-up'],
      subtitle: card.Thématique,
      cardType: startups
    };
  }

  if (isProjetAchat(card)) {
    return {
      title: card.label,
      subtitle: card.departments?.map((d) => d.department).join('|'),
      cardType: achatPrevi
    };
  }
  return {
    title: '',
    subtitle: ''
  };
};

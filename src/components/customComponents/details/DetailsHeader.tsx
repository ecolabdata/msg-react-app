import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup } from '../../../api/Api';
import { achatPrevi, acheteurPublic, startups } from '../../../model/CardType';
import { tailwindColorUtility } from '../../../utils/utilityFunctions';

interface DetailsHeaderProps {
  card: AnyCard;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ card }) => {
  const { subtitle, title, cardType } = normalizeHeaderProps(card);
  const backgroundColor = cardType?.color && tailwindColorUtility[cardType?.color].lightBackground;

  return (
    <section className={`pt-8 px-[10%] min-h-[200px] mx-[-24px] ${backgroundColor}`}>
      <p
        className={`fr-badge fr-badge--sm `}
        style={{ color: cardType?.color, backgroundColor: cardType?.backgroundColor }}>
        {cardType?.name}
      </p>
      <h1 className="my-4 w-full font-bold text-4xl">{title}</h1>
      <p className="">{subtitle}</p>
    </section>
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
      subtitle: card.departments?.join('|'),
      cardType: achatPrevi
    };
  }
  return {
    title: '',
    subtitle: ''
  };
};

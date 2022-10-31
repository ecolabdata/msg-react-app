import { CardType } from '../../../model/CardType';
import { tailwindColorUtility } from '../../../utils/utilityFunctions';

interface DetailsHeaderProps {
  title: string;
  subtitle: string;
  cardType?: CardType;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ title, subtitle, cardType }) => {
  const backgroundColor = cardType?.color && tailwindColorUtility[cardType?.color].lightBackground;

  return (
    <div className={`pt-8 px-[10%] min-h-[200px] mx-[-24px] ${backgroundColor}`}>
      <p
        className={`fr-badge fr-badge--sm `}
        style={{ color: cardType?.color, backgroundColor: cardType?.backgroundColor }}>
        {cardType?.name}
      </p>
      <h1 className="my-4 w-full font-bold text-4xl">{title}</h1>
      <p className="">{subtitle}</p>
    </div>
  );
};

export default DetailsHeader;

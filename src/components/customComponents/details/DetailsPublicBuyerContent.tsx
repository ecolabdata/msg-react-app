import { Collectivite } from '../../../api/Api';
import ContactArea from './ContactArea';

interface DetailsPublicBuyerContentProps {
  card: Collectivite;
}

const DetailsPublicBuyer: React.FC<DetailsPublicBuyerContentProps> = ({ card }) => {
  return (
    <div>
      <ContactArea card={card} />
    </div>
  );
};

export default DetailsPublicBuyer;

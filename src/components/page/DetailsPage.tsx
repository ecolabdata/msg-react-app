import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { startupPersona as allCardType } from '../../model/CardType';
import CtaBloc from '../customComponents/CtaBloc';
import LinksCard from '../customComponents/LinksCard';
import HomeCard from '../dsfrComponents/HomeCard';

interface DetailsPageProps {
  profile?: 'startup' | 'publicActor';
}

const DetailsPage: React.FC<DetailsPageProps> = ({ profile }) => {
  return (
    <>
      <section>details</section>
    </>
  );
};

export default DetailsPage;

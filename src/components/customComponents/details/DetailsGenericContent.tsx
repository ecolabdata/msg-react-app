import Container from 'components/Core/Container';
import {
  Aide,
  Investisseur,
  isAide,
  isInvestisseur,
  isProjetAchat,
  isStartup,
  ProjetAchat,
  Startup
} from '../../../api/Api';
import ContactArea from './ContactArea';
import { ForecastedBuyInformations } from './ForecastedBuyInformations';
import HelpPage from './HelpInformations';
import InvestorInformation from './InvestorInformations';
import { StartupInformations } from './StartupInformations';

interface DetailsGenericContentProps {
  card: Startup | ProjetAchat | Aide | Investisseur;
}

const DetailsGenericContent: React.FC<DetailsGenericContentProps> = ({ card }) => {
  return (
    <>
      <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {isStartup(card) && <StartupInformations card={card} className="sm:col-span-2" />}
        {isProjetAchat(card) && <ForecastedBuyInformations card={card} className="sm:col-span-2" />}
        {isAide(card) && <HelpPage className="sm:col-span-2" card={card} />}
        {isInvestisseur(card) && <InvestorInformation className="sm:col-span-2" card={card} />}
        <ContactArea card={card} />
      </Container>{' '}
    </>
  );
};

export default DetailsGenericContent;

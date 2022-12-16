import { Aide, isAide, isProjetAchat, isStartup, ProjetAchat, Startup } from '../../../api/Api';
import ContactArea from './ContactArea';
import { ForecastedBuyInformations } from './ForecastedBuyInformations';
import HelpPage from './HelpPageContent';
import { StartupInformations } from './StartupInformations';

interface DetailsGenericContentProps {
  card: Startup | ProjetAchat | Aide;
}

const DetailsGenericContent: React.FC<DetailsGenericContentProps> = ({ card }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        {isStartup(card) && <StartupInformations card={card} className="w-full sm:w-[70%]" />}
        {isProjetAchat(card) && (
          <ForecastedBuyInformations className="w-full sm:w-[70%]" card={card} />
        )}
        {isAide(card) && <HelpPage className="w-full sm:w-[70%]" card={card} />}
        <ContactArea className="w-full sm:w-[30%] ml-4" card={card} />
      </div>
    </>
  );
};

export default DetailsGenericContent;

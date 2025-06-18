import Container from 'components/Core/Container';
import ContactArea from './ContactArea';
import { ForecastedBuyInformations } from './ForecastedBuyInformations';
import HelpPage from './HelpInformations';
import InvestorInformation from './InvestorInformations';
import { StartupInformations } from './StartupInformations';
import {
  SearchResultItem,
  isAidV4,
  isCompanyV4,
  isInvestorV4,
  isPublicPurchaseV4
} from 'apiv4/interfaces/typeguards';

interface DetailsGenericContentProps {
  data: SearchResultItem;
}

// V5 remove this replaced by details body
const DetailsGenericContent: React.FC<DetailsGenericContentProps> = ({ data }) => {
  return (
    <>
      <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {isCompanyV4(data) && <StartupInformations card={data.card} className="sm:col-span-2" />}
        {isPublicPurchaseV4(data) && (
          <ForecastedBuyInformations card={data.card} className="sm:col-span-2" />
        )}
        {isAidV4(data) && <HelpPage className="sm:col-span-2" card={data.card} />}
        {isInvestorV4(data) && <InvestorInformation className="sm:col-span-2" card={data.card} />}
        <ContactArea data={data} />
      </Container>{' '}
    </>
  );
};

export default DetailsGenericContent;

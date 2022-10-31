import { Startup } from '../../../api/Api';
import ContactArea from './ContactArea';
import InformationItem from './InformationItem';

interface DetailsStartupContentProps {
  card: Startup;
}

const DetailsStartupContent: React.FC<DetailsStartupContentProps> = ({ card }) => {
  const {
    Pitch: pitch,
    'Références publiques': publicCustomers,
    Soutiens: helpers,
    Région: zone,
    Marché: markets,
    'Enjeux ODD': oddStakes
  } = card;

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-[30%]">
          {pitch && <InformationItem showDivider={false} label={'Pitch'} contents={pitch} />}
          {publicCustomers && (
            <InformationItem label={'Clients publics'} contents={publicCustomers.split(',')} />
          )}
          {helpers && (
            <InformationItem label={'Soutiens et supports'} contents={helpers.split(',')} />
          )}
        </div>
        <div className="w-full sm:w-[30%]">
          {zone && <InformationItem showDivider={false} label={'Région'} contents={zone} />}
          {markets && <InformationItem label={'Marchés'} contents={markets.split(',')} />}
          {!!(oddStakes.length > 0) && (
            <InformationItem label={'Enjeux ODD'} contents={oddStakes} />
          )}
        </div>
        <ContactArea className="w-full sm:w-[40%]" card={card} />
      </div>
    </>
  );
};

export default DetailsStartupContent;

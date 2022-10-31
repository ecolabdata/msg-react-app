import { Startup } from '../../../api/Api';
import ContactArea from './ContactArea';
import { InformationItem, InformationItemsWrapper } from './InformationItem';

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
    "L'entreprise": companyDescription,
    'Enjeux ODD': oddStakes
  } = card;

  return (
    <>
      <div className="flex flex-col sm:flex-row">
        <section className="w-full sm:w-[70%]">
          <InformationItemsWrapper>
            <>
              {pitch && <InformationItem showDivider={false} label={'Pitch'} contents={pitch} />}
              {publicCustomers && (
                <InformationItem label={'Clients publics'} contents={publicCustomers.split(',')} />
              )}
              {helpers && (
                <InformationItem label={'Soutiens et supports'} contents={helpers.split(',')} />
              )}
            </>
            <>
              {zone && <InformationItem showDivider={false} label={'Région'} contents={zone} />}
              {markets && <InformationItem label={'Marchés'} contents={markets.split(',')} />}
              {!!(oddStakes.length > 0) && (
                <InformationItem label={'Enjeux ODD'} contents={oddStakes} />
              )}
            </>
          </InformationItemsWrapper>
          <InformationItem
            showDivider={false}
            label={'Entreprise'}
            contents={companyDescription}
            className="mt-4"
          />
        </section>
        <ContactArea className="w-full sm:w-[30%] items-center" card={card} />
      </div>
    </>
  );
};

export default DetailsStartupContent;

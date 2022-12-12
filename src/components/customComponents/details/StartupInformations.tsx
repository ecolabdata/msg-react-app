import { Startup } from '../../../api/Api';
import { getGreenTechData } from '../../../utils/utilityFunctions';
import { InformationItem, InformationItemsWrapper } from './InformationItem';

interface StartupInformationsProps {
  card: Startup;
  className?: string;
}

export const StartupInformations: React.FC<StartupInformationsProps> = ({ card, className }) => {
  const greenTechData = getGreenTechData(card);

  if (!greenTechData) return <></>;

  const {
    Pitch: pitch,
    'Références publiques': publicCustomers,
    Soutiens: helpers,
    Région: zone,
    Marché: markets,
    "L'entreprise": companyDescription,
    'Enjeux ODD': oddStakes
  } = greenTechData;

  return (
    <section className={className}>
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
        className="mt-8"
      />
    </section>
  );
};

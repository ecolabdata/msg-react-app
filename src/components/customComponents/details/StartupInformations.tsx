import { Startup } from '../../../api/Api';
import { getGreenTechData } from '../../../utils/utilityFunctions';
import { InformationItem, InformationItemsWrapper } from './InformationItem';
import { LabelDetails } from './LabelDetails';

interface StartupInformationsProps {
  card: Startup;
  className?: string;
}

export type Label = 'GREEN20' | 'Solar Impulse' | 'GreenTech Innovation';

type SolutionWithLabel = {
  name: string;
  description: string;
  label: Label;
};

type Solution = {
  Pitch: string;
  Projet: string;
  'Solution name': string;
  public_short_description: string;
};

export const StartupInformations: React.FC<StartupInformationsProps> = ({ card, className }) => {
  const greenTechData = getGreenTechData(card);
  const labels = normalizeLabels(card);
  return (
    <section className={className}>
      {greenTechData ? <MainSection greenTechData={greenTechData} /> : null}
      <LabelSection labels={labels} />
    </section>
  );
};

type GreentechData = NonNullable<ReturnType<typeof getGreenTechData>>;

const MainSection: React.FC<{ greenTechData: GreentechData }> = ({ greenTechData }) => {
  const {
    Pitch: pitch,

    Marché: markets,
    "L'entreprise": companyDescription
  } = greenTechData;
  const zone = null;
  const publicCustomers = greenTechData && greenTechData['Références publiques'].filter((x) => x);
  const oddStakes = greenTechData && greenTechData['Enjeux ODD'].filter((x) => x);
  const helpers = greenTechData && greenTechData['Soutiens'].filter((x) => x);
  return (
    <>
      <InformationItemsWrapper>
        <>
          {pitch && <InformationItem showDivider={false} label={'Pitch'} contents={pitch} />}
          {publicCustomers && publicCustomers.length > 0 ? (
            <InformationItem label={'Clients publics'} contents={publicCustomers} />
          ) : null}
          {helpers && <InformationItem label={'Soutiens et supports'} contents={helpers} />}
        </>
        <>
          {zone && <InformationItem showDivider={false} label={'Région'} contents={zone} />}
          {markets && <InformationItem label={'Marchés'} contents={markets} />}
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
    </>
  );
};

type Labels = ReturnType<typeof normalizeLabels>;

const LabelSection: React.FC<{ labels: Labels }> = ({ labels }) => {
  return (
    <div className="mt-16">
      {labels?.length > 0 &&
        labels.map(({ label, name, description }, i) => (
          <LabelDetails
            key={i}
            label={label}
            solutionName={name}
            description={description}
            className="mb-8"
          />
        ))}
    </div>
  );
};

const normalizeLabels = (card: Startup) => {
  const solutions = card?.SOLUTIONS;
  const normalized = Object.keys(solutions).reduce((acc: SolutionWithLabel[], labelKey) => {
    solutions[labelKey as Label].forEach((s) => {
      if (labelKey === 'GreenTech Innovation') {
        acc.push({
          description: (s as unknown as Solution).Pitch,
          name: (s as unknown as Solution).Projet,
          label: labelKey
        });
      }
      if (labelKey === 'GREEN20') {
        acc.push({
          description: (s as unknown as Solution).Pitch,
          name: 'No solution name',
          label: labelKey
        });
      }

      if (labelKey === 'Solar Impulse') {
        acc.push({
          description: (s as unknown as Solution).public_short_description,
          name: (s as unknown as Solution)['Solution name'],
          label: labelKey
        });
      }
    });
    return acc;
  }, []);

  return normalized;
};

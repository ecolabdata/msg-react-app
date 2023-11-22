import { InformationItem, InformationItemsWrapper } from './InformationItem';
import { LabelDetails } from './LabelDetails';
import { CompanyCard, GreenTechInnovation } from 'apiv4/interfaces/company';

interface StartupInformationsProps {
  card: CompanyCard;
  className?: string;
}

export type Label = 'GREEN20' | 'Solar Impulse' | 'GreenTech Innovation';

type SolutionWithLabel = {
  name: string | null;
  description: string | null;
  label: Label;
};

export const StartupInformations: React.FC<StartupInformationsProps> = ({ card, className }) => {
  const greenTechData = card.data_source?.greentech_innovation;
  const labels = normalizeLabels(card);
  return (
    <section className={className}>
      {greenTechData ? <MainSection greenTechData={greenTechData} card={card} /> : null}
      <LabelSection labels={labels} />
    </section>
  );
};

const MainSection: React.FC<{ greenTechData: GreenTechInnovation; card: CompanyCard }> = ({
  greenTechData,
  card
}) => {
  const {
    Pitch: pitch,

    Marché: markets,
    "L'entreprise": companyDescription
  } = greenTechData;
  const {
    creation_date,
    headquarter_address,
    website_url,
    private_clients,
    public_clients,
    source_url
  } = card;
  const zone = greenTechData['Région'];
  const publicCustomers = greenTechData && greenTechData['Références publiques'];
  const oddStakes = greenTechData && greenTechData['Enjeux ODD'];
  const helpers = greenTechData && greenTechData['Soutiens'];
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
          {oddStakes && <InformationItem label={'Enjeux ODD'} contents={oddStakes} />}
        </>
      </InformationItemsWrapper>
      <InformationItem
        showDivider={false}
        label={"L'entreprise"}
        contents={companyDescription}
        className="mt-8"
      />
      <InformationItemsWrapper>
        {creation_date && <InformationItem label={'Date de création'} contents={creation_date} />}
        {headquarter_address && (
          <InformationItem
            label={'Adresse du siège social de l’entreprise'}
            contents={headquarter_address}
          />
        )}
      </InformationItemsWrapper>
      <InformationItemsWrapper>
        {public_clients && public_clients.length > 0 && (
          <InformationItem label={'Clients publics'} contents={public_clients} isHtml />
        )}
        {private_clients && private_clients.length > 0 && (
          <InformationItem label={'Clients privés'} contents={private_clients} isHtml />
        )}
      </InformationItemsWrapper>
      <InformationItemsWrapper>
        {website_url && (
          <InformationItem
            label={'Site web'}
            contents={`<a href=${website_url}>${website_url}</a>`}
            isHtml
          />
        )}
        {source_url && (
          <InformationItem
            label={'URL Source'}
            contents={`<a href=${source_url}>${source_url}</a>`}
            isHtml
          />
        )}
      </InformationItemsWrapper>
    </>
  );
};

type Labels = SolutionWithLabel[];

const LabelSection: React.FC<{ labels: Labels }> = ({ labels }) => {
  return (
    <div className="mt-16">
      {labels?.length > 0 &&
        labels.map(
          ({ label, name, description }, i) =>
            name && (
              <LabelDetails
                key={i}
                label={label}
                solutionName={name}
                description={description}
                className="mb-8"
              />
            )
        )}
    </div>
  );
};

const normalizeLabels = (card: CompanyCard) => {
  const dataSource = card.data_source;

  const normalized: SolutionWithLabel[] = [];
  if (dataSource.greentech_innovation) {
    normalized.push({
      description: dataSource.greentech_innovation.Pitch,
      name: dataSource.greentech_innovation?.Projet,
      label: 'GreenTech Innovation'
    });
  }
  if (dataSource.green20) {
    normalized.push({
      description: dataSource.green20.Pitch,
      name: dataSource.green20["Nom de l'entreprise"],
      label: 'GREEN20'
    });
    if (dataSource.solar_impulse) {
      normalized.push({
        description: dataSource.solar_impulse.public_short_description,
        name: dataSource.solar_impulse['Solution name'],
        label: 'Solar Impulse'
      });
    }
  }
  return normalized;
};

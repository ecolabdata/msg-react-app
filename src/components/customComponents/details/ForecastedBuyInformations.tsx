import { ProjetAchat } from '../../../api/Api';
import { getDaysBetweenDates, yesNotoBoolean } from '../../../utils/utilityFunctions';
import { InformationItem, InformationItemsWrapper } from './InformationItem';

interface ForecastedBuyInformationsProps {
  card: ProjetAchat;
  className?: string;
}

export const ForecastedBuyInformations: React.FC<ForecastedBuyInformationsProps> = ({
  card,
  className
}) => {
  const {
    status,
    departments,
    socialConsiderationsConcerned,
    environmentalConsiderationsConcerned,
    publicationTargetDate,
    CPVPrimary,
    description,
    marketMaxDuration,
    purchasingCategory
  } = card;

  const considerations = getConsiderations({
    socialConsiderationsConcerned,
    environmentalConsiderationsConcerned
  });

  const days = getDaysBetweenDates(new Date(Date.now()), new Date(publicationTargetDate));
  return (
    <section className={`${className}`}>
      <InformationItemsWrapper>
        <>
          {status && <InformationItem label={'Status'} contents={status} showDivider={false} />}
          {departments && (
            <InformationItem
              label={'Périmètre géographique'}
              contents={departments.map((d) => d.department)}
            />
          )}
          {!!(considerations.length > 0) && (
            <InformationItem label={'Considérations spéciales'} contents={considerations} />
          )}
        </>
        <>
          {publicationTargetDate && (
            <InformationItem
              label={'Date limite'}
              contents={getDateText(days)}
              showDivider={false}
            />
          )}
          {CPVPrimary && <InformationItem label={'Code CPV'} contents={CPVPrimary?.toString()} />}
        </>
      </InformationItemsWrapper>
      <InformationItem
        showDivider={false}
        label={'Description du projet'}
        contents={description}
        className="mt-8"
      />
      <InformationItemsWrapper>
        <>
          {marketMaxDuration && (
            <InformationItem
              label={'Durée de la prestation'}
              contents={marketMaxDuration.toString()}
            />
          )}
        </>
        <>
          {purchasingCategory && (
            <InformationItem label={"Catégorie d'achat"} contents={purchasingCategory} />
          )}
        </>
      </InformationItemsWrapper>
    </section>
  );
};

const getConsiderations = ({
  socialConsiderationsConcerned,
  environmentalConsiderationsConcerned
}: {
  socialConsiderationsConcerned: string;
  environmentalConsiderationsConcerned: string;
}) => {
  const social = yesNotoBoolean(socialConsiderationsConcerned) && 'Sociales';
  const environnement = yesNotoBoolean(environmentalConsiderationsConcerned) && 'Environnementales';
  const considerations = [social, environnement].filter(Boolean) as string[];

  return considerations;
};

const getDateText = (days: number) => {
  return days > 0
    ? `${days} jours restant jusqu'à la publication de l'appel d'offres
`
    : 'Achat cloturé';
};

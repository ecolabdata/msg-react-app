import { PublicPurchaseCard } from 'apiv4/interfaces/publicPurchase';
import { getDaysBetweenDates, yesNotoBoolean } from '../../../utils/utilityFunctions';
import { InformationItem, InformationItemsWrapper } from './InformationItem';

interface ForecastedBuyInformationsProps {
  card: PublicPurchaseCard;
  className?: string;
}

export const ForecastedBuyInformations: React.FC<ForecastedBuyInformationsProps> = ({
  card,
  className
}) => {
  const {
    status,
    social_considerations,
    environmental_considerations,
    reserved_public_markets,
    publication_date,
    cpv_code,
    description,
    duration_month,
    estimated_amount,
    procedure_type,
    category
  } = card;

  const considerations = getConsiderations({
    social_considerations,
    environmental_considerations
  });

  const days =
    publication_date && getDaysBetweenDates(new Date(Date.now()), new Date(publication_date));
  return (
    <div className={`${className}`}>
      <InformationItemsWrapper>
        <>
          {status && <InformationItem label={'Status'} contents={status} />}

          {!!(considerations.length > 0) && (
            <InformationItem label={'Considérations spéciales'} contents={considerations} />
          )}
        </>
        <>
          {publication_date && (
            <InformationItem label={'Date limite'} contents={getDateText(days)} />
          )}
          {cpv_code && <InformationItem label={'Code CPV'} contents={cpv_code.toString()} />}
        </>
      </InformationItemsWrapper>
      <InformationItem label={'Description du projet'} contents={description} />
      <InformationItemsWrapper>
        <>
          {duration_month && (
            <InformationItem
              label={'Durée de la prestation'}
              contents={`${duration_month.toString()} mois`}
            />
          )}
        </>
        <>{category && <InformationItem label={"Catégorie d'achat"} contents={category} />}</>
      </InformationItemsWrapper>
      <InformationItemsWrapper>
        {estimated_amount && (
          <InformationItem
            label={'Montant estimé du marché'}
            contents={`${estimated_amount.toLocaleString()}€`}
          />
        )}
        {procedure_type && (
          <InformationItem label={'Type de procédure'} contents={procedure_type} />
        )}
      </InformationItemsWrapper>
      {reserved_public_markets && reserved_public_markets?.length > 0 && (
        <InformationItem label={'Marché public réservé'} contents={reserved_public_markets} />
      )}
    </div>
  );
};

const getConsiderations = ({
  social_considerations,
  environmental_considerations
}: {
  social_considerations: string | null;
  environmental_considerations: string | null;
}) => {
  const social = yesNotoBoolean(social_considerations) && 'Sociales';
  const environnement = yesNotoBoolean(environmental_considerations) && 'Environnementales';
  const considerations = [social, environnement].filter(Boolean) as string[];

  return considerations;
};

const getDateText = (days: number | '' | null) => {
  if (!days) return;
  return days > 0
    ? `${days} jours restant jusqu'à la publication de l'appel d'offres
`
    : 'Achat cloturé';
};

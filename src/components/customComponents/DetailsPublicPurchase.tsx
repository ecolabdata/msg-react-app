import { PublicPurchaseCard } from 'api5/interfaces/publicPurchase';
import { InformationItem, InformationItemsWrapper } from './details/InformationItem';
import Container from 'components/Core/Container';

interface ForecastedBuyInformationsProps {
  card: PublicPurchaseCard;
}

export const DetailsPublicPurchase: React.FC<ForecastedBuyInformationsProps> = ({ card }) => {
  const {
    status,
    socialConsiderations,
    environmentalConsiderations,
    reservedPublicMarkets,
    publicationDate,
    cpvCode,
    description,
    durationMonth,
    estimatedAmount,
    procedureType,
    category,
    temporality,
    departments
  } = card;

  return (
    <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="sm:col-span-3">
        <InformationItemsWrapper>
          <>
            {status && <InformationItem label={'Status'} contents={status} />}
            {(socialConsiderations || environmentalConsiderations) && (
              <InformationItem
                label={'Considérations spéciales'}
                contents={[socialConsiderations || '', environmentalConsiderations || ''].filter(
                  Boolean
                )}
              />
            )}
          </>
          <>
            {temporality && <InformationItem label={'Temporalité'} contents={temporality} />}
            {cpvCode && <InformationItem label={'Code CPV'} contents={cpvCode.toString()} />}
          </>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {departments && <InformationItem label={'Départements'} contents={departments} />}
          {publicationDate && (
            <InformationItem
              label={'Date de publication'}
              contents={new Date(publicationDate).toLocaleDateString('fr-FR', {})}
            />
          )}
        </InformationItemsWrapper>
        <InformationItem label={'Description du projet'} contents={description} />
        <InformationItemsWrapper>
          <>
            {durationMonth && (
              <InformationItem
                label={'Durée de la prestation'}
                contents={`${durationMonth.toString()} mois`}
              />
            )}
          </>
          <>{category && <InformationItem label={"Catégorie d'achat"} contents={category} />}</>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {estimatedAmount && (
            <InformationItem
              label={'Montant estimé du marché'}
              contents={`${estimatedAmount.toLocaleString()}€`}
            />
          )}
          {procedureType && (
            <InformationItem label={'Type de procédure'} contents={procedureType} />
          )}
        </InformationItemsWrapper>
        {reservedPublicMarkets && reservedPublicMarkets?.length > 0 && (
          <InformationItem label={'Marché public réservé'} contents={reservedPublicMarkets} />
        )}
      </div>
    </Container>
  );
};

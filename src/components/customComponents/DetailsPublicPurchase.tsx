import { PublicPurchaseCard } from 'api/interfaces/publicPurchase';
import { InformationItem, InformationItemsWrapper } from './details/InformationItem';
import Container from 'components/Core/Container';

interface ForecastedBuyInformationsProps {
  card: PublicPurchaseCard;
}

export const DetailsPublicPurchase: React.FC<ForecastedBuyInformationsProps> = ({ card }) => {
  const {
    status,
    socialConsiderationsConcerned,
    environmentalConsiderationsConcerned,
    reservedPublicMarkets,
    publicationTargetDate,
    submissionDeadline,
    websiteUrl,
    cpvCode,
    marketMaxDuration,
    marketEstimatedAmount,
    procedureType,
    purchasingCategory,
    departments,
    description
  } = card;

  return (
    <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="sm:col-span-3">
        <InformationItem label={'Description du projet'} contents={description} />
        <InformationItemsWrapper>
          <>
            {status && <InformationItem label={'Status'} contents={status} />}
            {cpvCode && <InformationItem label={'Code CPV'} contents={cpvCode.toString()} />}
          </>
          <>
            {socialConsiderationsConcerned !== null && (
              <InformationItem
                label={'Considérations sociales'}
                contents={socialConsiderationsConcerned ? 'Oui' : 'Non'}
              />
            )}
            {environmentalConsiderationsConcerned !== null && (
              <InformationItem
                label={'Considérations environnementales'}
                contents={environmentalConsiderationsConcerned ? 'Oui' : 'Non'}
              />
            )}
          </>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {departments && <InformationItem label={'Départements'} contents={departments} />}
          {publicationTargetDate && (
            <InformationItem
              label={'Date de publication cible'}
              contents={new Date(publicationTargetDate).toLocaleDateString('fr-FR', {})}
            />
          )}
        </InformationItemsWrapper>
        {websiteUrl && (
          <InformationItem label={'Site web'} contents={websiteUrl} />
        )}
        {submissionDeadline && (
          <InformationItem
            label={'Date limite de soumission'}
            contents={new Date(submissionDeadline).toLocaleDateString('fr-FR', {})}
          />
        )}
        <InformationItemsWrapper>
          <>
            {marketMaxDuration && (
              <InformationItem
                label={'Durée maximale du marché'}
                contents={`${marketMaxDuration.toString()} mois`}
              />
            )}
          </>
          <>{purchasingCategory && <InformationItem label={"Catégorie d'achat"} contents={purchasingCategory} />}</>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {marketEstimatedAmount && (
            <InformationItem
              label={'Montant estimé du marché'}
              contents={`${marketEstimatedAmount.toLocaleString()}€`}
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

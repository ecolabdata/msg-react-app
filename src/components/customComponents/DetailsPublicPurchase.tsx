import { PublicPurchaseCard } from 'api/interfaces/publicPurchase';
import { InformationItem, InformationItemsWrapper } from './details/InformationItem';
import Container from 'components/Core/Container';
import { publicPurchaseStatusTitles } from 'contents/contentMaps';

interface ForecastedBuyInformationsProps {
  card: PublicPurchaseCard;
}

export const DetailsPublicPurchase: React.FC<ForecastedBuyInformationsProps> = ({ card }) => {
  const {
    status,
    social_considerations_concerned,
    environmental_considerations_concerned,
    reserved_public_markets,
    publication_target_date,
    submission_deadline,
    website_url,
    cpv_code,
    market_max_duration,
    market_estimated_amount,
    procedure_type,
    purchasing_category,
    departments,
    description
  } = card;

  return (
    <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div className="sm:col-span-3">
        <InformationItem label={'Description du projet'} contents={description} />
        <InformationItemsWrapper>
          <>
            {status && <InformationItem label={'Statut'} contents={publicPurchaseStatusTitles[status]} />}
            {cpv_code && <InformationItem label={'Code CPV'} contents={cpv_code.toString()} />}
          </>
          <>
            {social_considerations_concerned !== null && (
              <InformationItem
                label={'Considérations sociales'}
                contents={social_considerations_concerned ? 'Oui' : 'Non'}
              />
            )}
            {environmental_considerations_concerned !== null && (
              <InformationItem
                label={'Considérations environnementales'}
                contents={environmental_considerations_concerned ? 'Oui' : 'Non'}
              />
            )}
          </>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {departments && <InformationItem label={'Départements'} contents={departments} />}
          {publication_target_date && (
            <InformationItem
              label={'Date de publication cible'}
              contents={new Date(publication_target_date).toLocaleDateString('fr-FR', {})}
            />
          )}
        </InformationItemsWrapper>
        {website_url && (
          <InformationItem label={'Site web'} contents={website_url} />
        )}
        {submission_deadline && (
          <InformationItem
            label={'Date limite de soumission'}
            contents={new Date(submission_deadline).toLocaleDateString('fr-FR', {})}
          />
        )}
        <InformationItemsWrapper>
          <>
            {market_max_duration && (
              <InformationItem
                label={'Durée maximale du marché'}
                contents={`${market_max_duration.toString()} mois`}
              />
            )}
          </>
          <>{purchasing_category && <InformationItem label={"Catégorie d'achat"} contents={purchasing_category} />}</>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {market_estimated_amount && (
            <InformationItem
              label={'Montant estimé du marché'}
              contents={`${market_estimated_amount.toLocaleString()}€`}
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
    </Container>
  );
};

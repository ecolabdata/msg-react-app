import { InvestorCard } from 'apiv4/interfaces/investor';
import { InformationItemsWrapper, InformationItem } from './InformationItem';

interface InvestorInformationsContentProps {
  card: InvestorCard;
  className?: string;
}

const InvestorInformations: React.FC<InvestorInformationsContentProps> = ({ card, className }) => {
  const {
    zone,
    ticket_max_k_euro: max,
    ticket_min_k_euro: min,
    sectors,
    targeted_company_size_max_ca: maxIncomeTarget,
    targeted_company_size_min_ca: minIncomeTarget,
    description,
    investment_policy: investmentPolicy,
    main_investments,
    investments_on_ecological_transition: participationNb,
    source_url
  } = card;

  return (
    <section className={`${className}`}>
      <InformationItemsWrapper>
        {zone && (
          <InformationItem label={'Zone géographique ciblée'} contents={zone} showDivider={false} />
        )}
        {min || max ? (
          <InformationItem
            label={'Tickets'}
            contents={`Min: ${min}€; Max: ${max}€`}
            showDivider={false}
          />
        ) : null}
      </InformationItemsWrapper>
      {sectors && <InformationItem label={"Secteurs d'intervention"} contents={sectors} />}
      {(Number(maxIncomeTarget) > 0 || Number(minIncomeTarget) > 0) && (
        <InformationItem
          label={'Taille des entreprises ciblées en CA'}
          contents={`min: ${minIncomeTarget} max: ${maxIncomeTarget}`}
        />
      )}
      {description && <InformationItem label={'Présentation synthètique'} contents={description} />}
      {investmentPolicy && (
        <InformationItem label={"Politique d'investissement"} contents={investmentPolicy} />
      )}
      {participationNb && (
        <InformationItem
          label={'Participations sur les sujets de transition écologique'}
          contents={participationNb}
        />
      )}
      {main_investments && (
        <InformationItem
          label={'Principales participations du fond'}
          contents={main_investments.filter(Boolean)}
        />
      )}
      {source_url && (
        <InformationItem
          label={'URL Source'}
          contents={`<a href=${source_url}>${source_url}</a>`}
          isHtml
        />
      )}
    </section>
  );
};

export default InvestorInformations;

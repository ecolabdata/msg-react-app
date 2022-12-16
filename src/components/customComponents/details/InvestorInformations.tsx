import { Investisseur } from '../../../api/Api';
import { InformationItemsWrapper, InformationItem } from './InformationItem';

interface InvestorInformationsContentProps {
  card: Investisseur;
  className?: string;
}

const InvestorInformations: React.FC<InvestorInformationsContentProps> = ({ card, className }) => {
  const {
    'Zone géographqiue ciblée': zone,
    'Ticket max en K€': max,
    'Ticket min en K€': min,
    "Secteurs d'intervention": sectors,
    'Taille des entreprises ciblées en CA (max)': maxIncomeTarget,
    'Taille des entreprises ciblées en CA (min)': minIncomeTarget,
    'Présentation synthétique du fonds': description,
    "Présentation de la politique d'investissement": investmentPolicy,
    'Investissement emblématique n°1': investment1,
    'Investissement emblématique n°2': investment2,
    'Investissement emblématique n°3': investment3,
    'Nombre total de participations sur les sujets transition écologique et énergétique depuis la création':
      participationNb
  } = card;

  return (
    <section className={`${className}`}>
      <InformationItemsWrapper>
        {zone && (
          <InformationItem label={'Zone géographique ciblée'} contents={zone} showDivider={false} />
        )}
        {(min || max) && (
          <InformationItem
            label={'Tickets'}
            contents={`Min: ${min}€; Max: ${max}€`}
            showDivider={false}
          />
        )}
      </InformationItemsWrapper>
      {sectors && (
        <InformationItem label={"Secteurs d'intervention"} contents={sectors.split(';')} />
      )}
      {sectors && (
        <InformationItem
          label={'Taille des entreprises ciblées en CA'}
          contents={`min: ${minIncomeTarget} max: ${maxIncomeTarget}`}
        />
      )}
      {description && <InformationItem label={'Présentation synthètique'} contents={description} />}
      {investmentPolicy && (
        <InformationItem label={"Politique d'investissement"} contents={investmentPolicy} />
      )}
      {investmentPolicy && (
        <InformationItem label={"Politique d'investissement"} contents={investmentPolicy} />
      )}
      {participationNb && (
        <InformationItem
          label={'Participations sur les sujets de transition écologique'}
          contents={participationNb}
        />
      )}
      {(investment1 || investment2 || investment3) && (
        <InformationItem
          label={'Principales participations du fond'}
          contents={[investment1, investment2, investment3].filter(Boolean)}
        />
      )}
    </section>
  );
};

export default InvestorInformations;

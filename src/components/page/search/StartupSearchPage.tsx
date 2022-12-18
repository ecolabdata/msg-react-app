import { Startup } from 'api/Api';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import ResultCard from 'components/customComponents/ResultCard';
import { CardType, startups } from 'model/CardType';
import slugify from 'slugify';
import { getGreenTechData } from 'utils/utilityFunctions';
import { SearchPage } from '../SearchPage';

export const StartupSearchPage : React.FC<{cardType: CardType}> = ({cardType}) => {
  return (
    <SearchPage usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType}>
      {(card, i, isLoading) => (
        <StartupResultCard key={i} isLoading={isLoading} su={card as Startup} />
      )}
    </SearchPage>
  );
};

interface StartupResultCardProps {
  isLoading?: boolean;
  su: Startup;
}

export const StartupResultCard: React.FC<StartupResultCardProps> = ({ isLoading, su }) => {
  const slug = slugify(su.NOM);
  return (
    <ResultCard
      cardType={startups}
      name={su.NOM}
      toprow={getGreenTechData(su)?.Thématique ?? ''}
      linkData={su}
      slug={slug}
      isLoading={isLoading}>
      <p>{getGreenTechData(su)?.Pitch}</p>
    </ResultCard>
  );
};

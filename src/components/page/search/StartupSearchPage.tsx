import { Startup } from 'api/Api';
import { Api, HitStartup } from 'api2/Api';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import ResultCard from 'components/customComponents/ResultCard';
import { CardType, startups } from 'model/CardType';
import slugify from 'slugify';
import { getGreenTechData } from 'utils/utilityFunctions';
import { buildSearchPageV2 } from '../SearchPageV2';

const SearchPageV2 = buildSearchPageV2(Api.searchStartup)

export const StartupSearchPage : React.FC<{cardType: CardType}> = ({cardType}) => {
  return (
    <SearchPageV2 usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType}>
      {(hit, i, isLoading) => (
        <StartupResultCard key={i} isLoading={isLoading} hit={hit} />
      )}
    </SearchPageV2>
  );
};

interface StartupResultCardProps {
  isLoading?: boolean;
  hit: HitStartup;
}

export const StartupResultCard: React.FC<StartupResultCardProps> = ({ isLoading, hit }) => {
  const NOM =hit.fields.NOM[0]
  const slug = slugify(NOM);
  return (
    <ResultCard
      cardType={startups}
      name={NOM}
      toprow={'test'}//getGreenTechData(su)?.Thématique ?? ''}
      linkData={{}}
      slug={slug}
      isLoading={isLoading}>
      <p>test{/*getGreenTechData(su)?.Pitch*/}</p>
    </ResultCard>
  );
};

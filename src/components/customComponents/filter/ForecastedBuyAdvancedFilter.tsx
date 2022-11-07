import { ForecastedBuyFilters, publicationDates, zones } from '../../../hooks/useAdvancedFilters';
import { CardType } from '../../../model/CardType';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';

interface ForecastedBuyAdvancedFiltersProps {
  setFilters: (filterName: string, filterValue: string | boolean) => void;
  filters: ForecastedBuyFilters;
  cardType: CardType;
}

const ForecastedBuyAdvancedFilters: React.FC<ForecastedBuyAdvancedFiltersProps> = ({
  cardType,
  filters,
  setFilters
}) => {
  return (
    <>
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Date de publication"
        color={cardType.color}
        defaultOption={'Toutes'}
        optionsData={Object.keys(publicationDates)}
        onChange={(e) => {
          setFilters('publicationDate', e.currentTarget.value);
        }}
        selected={filters.publicationDate}
      />
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Zone"
        color={cardType.color}
        defaultOption={'Toutes'}
        optionsData={Object.keys(zones)}
        onChange={(e) => {
          setFilters('zone', e.currentTarget.value);
        }}
        selected={filters.zone}
      />
      <ToggleButton
        label={'Considération environnementale'}
        checked={filters.hasEcologicalConcern}
        color={cardType.color}
        onChange={(e) => {
          setFilters('hasEcologicalConcern', !filters.hasEcologicalConcern);
        }}
      />
    </>
  );
};

export default ForecastedBuyAdvancedFilters;

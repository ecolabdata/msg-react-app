import { AnyFilters, FilterDefinition } from '../../../hooks/useAdvancedFilters';
import { CardType } from '../../../model/CardType';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';

interface AdvancedFiltersProps {
  filtersValues: AnyFilters;
  cardType: CardType;
  filtersContent: FilterDefinition[];
  setFilters: (filterName: string, filterValue: string | boolean) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  cardType,
  filtersContent,
  filtersValues,
  setFilters
}) => {
  return (
    <>
      {filtersContent.map(({ label, defaultOption, options, filterId, type }) =>
        type === 'select' ? (
          <Select
            classes=" w-full lg:max-w-[202px] md:mr-8"
            selectClassName="bg-research-precision-container"
            label={label}
            color={cardType.color}
            defaultOption={defaultOption}
            optionsData={options ?? []}
            onChange={(e) => {
              setFilters(filterId, e.currentTarget.value);
            }}
            selected={filtersValues[filterId]}
          />
        ) : (
          <ToggleButton
            label={label}
            checked={filtersValues[filterId]}
            color={cardType.color}
            onChange={() => {
              setFilters(filterId, !filtersValues[filterId]);
            }}
          />
        )
      )}
    </>
  );
};

export default AdvancedFilters;

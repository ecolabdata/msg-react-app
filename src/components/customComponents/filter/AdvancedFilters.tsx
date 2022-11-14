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
    <div className="flex flex-col md:flex-row items-center">
      {filtersContent.map(({ label, defaultOption, options, id, type }) =>
        type === 'select' ? (
          <Select
            key={id}
            classes=" w-full lg:max-w-[202px] md:mr-8"
            selectClassName="bg-research-precision-container"
            label={label}
            color={cardType.color}
            defaultOption={defaultOption}
            optionsData={options ?? []}
            onChange={(e) => {
              setFilters(id, e.currentTarget.value);
            }}
            selected={filtersValues[id]}
          />
        ) : (
          <ToggleButton
            key={id}
            label={label}
            checked={filtersValues[id]}
            color={cardType.color}
            onChange={() => {
              setFilters(id, !filtersValues[id]);
            }}
          />
        )
      )}
    </div>
  );
};

export default AdvancedFilters;

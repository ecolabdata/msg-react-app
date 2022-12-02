import { AnyFilters } from './filters';
import { CardType } from '../../../model/CardType';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';
import { FilterDefinition } from './constants';
import InputNumber from '../InputNumber';

interface AdvancedFiltersProps {
  values: AnyFilters;
  cardType: CardType;
  filters: FilterDefinition[];
  setFilters: (filterName: string, filterValue: string | boolean) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  cardType,
  filters,
  values,
  setFilters
}) => {
  return (
    <fieldset className="flex flex-col md:flex-row items-center">
      <legend className="sr-only">Champs de recherche avancée</legend>

      {filters.map(({ label, defaultOption, options, id, type }) =>
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
            selected={values[id]}
          />
        ) : type === 'toggle' ? (
          <ToggleButton
            key={id}
            label={label}
            checked={values[id]}
            color={cardType.color}
            onChange={() => {
              setFilters(id, !values[id]);
            }}
          />
        ) : (
          <InputNumber
            label={label}
            color={cardType.color}
            value={values[id]}
            onChange={(e) => {
              setFilters(id, e.currentTarget.value);
            }}
          />
        )
      )}
    </fieldset>
  );
};

export default AdvancedFilters;

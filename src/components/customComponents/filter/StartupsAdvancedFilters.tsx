import { markets, StartupFilters, zones } from '../../../hooks/useAdvancedFilters';
import { CardType } from '../../../model/CardType';
import Select from '../../dsfrComponents/Select';

interface StartupsAdvancedFiltersProps {
  setFilters: (filterName: string, filterValue: string | boolean) => void;
  filters: StartupFilters;
  cardType: CardType;
}

const StartupsAdvancedFilters: React.FC<StartupsAdvancedFiltersProps> = ({
  cardType,
  filters,
  setFilters
}) => {
  return (
    <>
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Marchés"
        defaultOption={'Tous'}
        color={cardType.color}
        optionsData={Object.keys(markets)}
        onChange={(e) => {
          setFilters('market', e.currentTarget.value);
        }}
        selected={filters.market}
      />
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Zone"
        defaultOption={'Toutes'}
        color={cardType.color}
        optionsData={Object.keys(zones)}
        onChange={(e) => {
          setFilters('zone', e.currentTarget.value);
        }}
        selected={filters.zone}
      />
    </>
  );
};

export default StartupsAdvancedFilters;

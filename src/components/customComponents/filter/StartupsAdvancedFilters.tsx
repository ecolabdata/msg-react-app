import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { zones } from '../../../utils/utilityFunctions';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';

interface StartupsAdvancedFiltersProps {
  setFilters?: Dispatch<SetStateAction<any>>;
  filters: any;
}

const markets: Record<string, number> = {
  'B to C': 0,
  'B to B': 1,
  'B to A': 2
};

const StartupsAdvancedFilters: React.FC<StartupsAdvancedFiltersProps> = ({
  filters,
  setFilters
}) => {
  const updateFilters = (filterName: any, filterValue: any) => {
    setFilters &&
      setFilters({ ...filters, [filterName]: filterValue } as {
        market: string;
        zone: string;
      });
  };

  return (
    <>
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Marchés"
        defaultOption={'Tous'}
        optionsData={Object.keys(markets)}
        onChange={(e) => {
          updateFilters('market', e.currentTarget.value);
        }}
        selected={filters.market}
      />
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Zone"
        defaultOption={'Toutes'}
        optionsData={Object.keys(zones)}
        onChange={(e) => {
          updateFilters('zone', e.currentTarget.value);
        }}
        selected={filters.zone}
      />
    </>
  );
};

export default StartupsAdvancedFilters;

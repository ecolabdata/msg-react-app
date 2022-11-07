import { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import { zones } from '../../../utils/utilityFunctions';
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';

interface AdvancedSearchProps {
  setFilters?: Dispatch<
    SetStateAction<{ publicationDate: string; zone: string; hasEcologicalConcern: boolean }>
  >;
  filters: { publicationDate: string; zone: string; hasEcologicalConcern: boolean };
}

type PublicationDates = 'publié' | 'Moins de 6 mois' | '6 mois et plus';

const publicationDates: Record<PublicationDates, number> = {
  publié: 0,
  'Moins de 6 mois': 6,
  '6 mois et plus': 7
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ filters, setFilters }) => {
  const [publicationDate, setPublicationDate] = useState('');
  const [zone, setZone] = useState('');
  const [hasEcologicalConcern, setHasEcologicalConcern] = useState(true);

  const updateFilters = (filterName: any, filterValue: any) => {
    setFilters &&
      setFilters({ ...filters, [filterName]: filterValue } as {
        publicationDate: string;
        zone: string;
        hasEcologicalConcern: boolean;
      });
  };

  return (
    <>
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Date de publication"
        // color={cardType.color}
        defaultOption={'Toutes'}
        optionsData={Object.keys(publicationDates)}
        onChange={(e) => {
          setPublicationDate(e.currentTarget.value);
          updateFilters('publicationDate', e.currentTarget.value);
        }}
        selected={filters.publicationDate}
      />
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Zone"
        // color={cardType.color}
        defaultOption={'Toutes'}
        optionsData={Object.keys(zones)}
        onChange={(e) => {
          setZone(e.currentTarget.value);
          updateFilters('zone', e.currentTarget.value);
        }}
        selected={filters.zone}
      />
      <ToggleButton
        label={'Considération environnementale'}
        checked={filters.hasEcologicalConcern}
        color={'red'}
        onChange={(e) => {
          updateFilters('hasEcologicalConcern', !filters.hasEcologicalConcern);
        }}
      />
    </>
  );
};

export default AdvancedSearch;

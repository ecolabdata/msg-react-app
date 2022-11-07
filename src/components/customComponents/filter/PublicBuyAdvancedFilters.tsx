import { PublicBuyFilters } from '../../../hooks/useAdvancedFilters';
import { CardType } from '../../../model/CardType';
import { certifications, entities } from '../../../utils/utilityFunctions';
import Select from '../../dsfrComponents/Select';

interface PublicBuyAdvancedFiltersProps {
  setFilters: (filterName: string, filterValue: string | boolean) => void;
  filters: PublicBuyFilters;
  cardType: CardType;
}

const PublicBuyAdvancedFilters: React.FC<PublicBuyAdvancedFiltersProps> = ({
  cardType,
  filters,
  setFilters
}) => {
  return (
    <>
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Labels obtenus"
        color={cardType.color}
        defaultOption={'Tous'}
        optionsData={Object.keys(certifications)}
        onChange={(e) => {
          setFilters('certification', e.currentTarget.value);
        }}
        selected={filters.certification}
      />
      <Select
        classes=" w-full lg:max-w-[202px] md:mr-8"
        selectClassName="bg-research-precision-container"
        label="Entité"
        color={cardType.color}
        defaultOption={'Toutes'}
        optionsData={Object.keys(entities)}
        onChange={(e) => {
          setFilters('entity', e.currentTarget.value);
        }}
        selected={filters.entity}
      />
    </>
  );
};

export default PublicBuyAdvancedFilters;

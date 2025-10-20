import { SelectFilterData } from 'api/interfaces/common';
import Select from 'components/dsfrComponents/Select';
import { filtersTitles } from 'contents/contentMaps';
import { CardType } from 'model/CardType';

type AdvancedFiltersProps = {
    filters: SelectFilterData;
    cardType: CardType;
    onFilterChange: (filterKey: string, value: string) => void;
    selectedFilters: Record<string, string> | null;
};

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
    filters,
    cardType,
    onFilterChange,
    selectedFilters
}) => {
    return (
        <div className="flex flex-col md:flex-row">
            {Object.entries(filters).map(([key, value]) => (
                <Select
                    key={key}
                    classes="w-full lg:max-w-[202px] md:mr-8"
                    selectClassName={`${localStorage.getItem('scheme') === 'dark' && 'bg-research-precision-container'
                        }`}
                    label={filtersTitles[key as keyof typeof filtersTitles] || key}
                    color={cardType.color}
                    optionsData={value ?? []}
                    defaultOption={undefined}
                    onChange={(e) => {
                        onFilterChange(key, e.currentTarget.value);
                    }}
                    selected={selectedFilters?.[key]?.[0] || ''}
                />
            ))}
        </div>
    );
};
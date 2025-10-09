import { useLocation, useNavigate } from "react-router-dom";
import { useProjetFormContext } from "components/context/useProjectFormContext";
import { useEffect } from "react";

export const useSearchState = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { description, setDescription, error, advancedFilters, setAdvancedFilters } = useProjetFormContext();

    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query') || '';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const stepParam = parseInt(searchParams.get('step') || '0', 10);
    const filtersParam = searchParams.get('filters');
    let filtersFromUrl: Record<string, string> | null = null;
    if (filtersParam && filtersParam !== 'null') {
        try {
            filtersFromUrl = JSON.parse(filtersParam) as Record<string, string>;
        } catch (error) {
            console.warn('Failed to parse filters from URL:', error);
            filtersFromUrl = null;
        }
    }

    // Sync URL params to context on mount
    useEffect(() => {
        if (queryParam && queryParam !== description) {
            setDescription(queryParam);
        }

        if (filtersFromUrl && JSON.stringify(filtersFromUrl) !== JSON.stringify(advancedFilters)) {
            setAdvancedFilters(filtersFromUrl);
        }
    }, [location.search]);

    // Update URL when context changes
    const updateSearchParams = (newDescription?: string, newPage?: number, newStep?: number, advancedFilters?: Record<string, string> | null) => {
        const params = new URLSearchParams();

        if (newDescription !== undefined) {
            params.set('query', newDescription);
        }

        if (newPage !== undefined) {
            params.set('page', newPage.toString());
        }
        if (newStep !== undefined) {
            params.set('step', newStep.toString());
        }

        if (advancedFilters) {
            // Add all filters inside a filter key
            params.set('filters', JSON.stringify(advancedFilters));

        }

        navigate(`${location.pathname}?${params.toString()}`, {
            state: { search: { description: newDescription || description }, page: newPage || pageParam }
        });
    };

    // Handle filter changes
    const handleFilterChange = (filterKey: string, value: string) => {
        const newFilters = {
            ...advancedFilters,
            [filterKey]: value ? value : ""
        };
        setAdvancedFilters(newFilters);
    };

    // Reset filters
    const resetFilters = () => {
        setAdvancedFilters(null);
    };

    return {
        description,
        setDescription,
        error,
        currentPage: pageParam,
        currentStep: stepParam,
        advancedFilters,
        handleFilterChange,
        resetFilters,
        updateSearchParams
    };
};
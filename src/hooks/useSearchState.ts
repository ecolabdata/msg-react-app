import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProjetFormContext } from "components/context/useProjectFormContext";
import { ThematicsEnum } from "model/ThematicsEnum";

export const useSearchState = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { description, setDescription, thematics, handleThematicsChange, error } = useProjetFormContext();

    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query') || '';
    const thematicsParam = searchParams.get('thematics');
    const thematicsFromUrl = thematicsParam ? thematicsParam.split(',') as ThematicsEnum[] : [];
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    const stepParam = parseInt(searchParams.get('step') || '0', 10);

    // Sync URL params to context on mount
    useEffect(() => {
        if (queryParam && queryParam !== description) {
            setDescription(queryParam);
        }
        if (thematicsFromUrl.length > 0 && JSON.stringify(thematicsFromUrl) !== JSON.stringify(thematics)) {
            handleThematicsChange(thematicsFromUrl);
        }
    }, [location.search]);

    // Update URL when context changes
    const updateSearchParams = (newDescription?: string, newThematics?: ThematicsEnum[], newPage?: number, newStep?: number) => {
        const params = new URLSearchParams(location.search);

        if (newDescription !== undefined) {
            params.set('query', newDescription);
        }
        if (newThematics !== undefined) {
            params.set('thematics', newThematics.join(','));
        }
        if (newPage !== undefined) {
            params.set('page', newPage.toString());
        }
        if (newStep !== undefined) {
            params.set('step', newStep.toString());
        }

        // Use replace: false for step changes to create proper browser history
        // Use replace: true for other changes to avoid cluttering history
        const isStepChange = newStep !== undefined && newStep !== stepParam;

        navigate(`${location.pathname}?${params.toString()}`, {
            replace: !isStepChange,
            state: { search: { description: newDescription || description, thematics: newThematics || thematics }, page: newPage || pageParam }
        });
    };

    return {
        description,
        setDescription,
        thematics,
        handleThematicsChange,
        error,
        currentPage: pageParam,
        currentStep: stepParam,
        updateSearchParams
    };
};
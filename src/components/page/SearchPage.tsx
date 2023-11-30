import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardTypeName } from '../../api/Api';
import { CardType } from '../../model/CardType';
import { SearchState } from '../../utils/InitialState';
import SearchResults from '../customComponents/SearchResults';
import Pagination from '../dsfrComponents/Pagination';
import { useProjetFormContext } from 'components/context/useProjectFormContext';
import {
  getCompanies,
  getCompanyAids,
  getInvestors,
  getPublicBuyerAids,
  getPublicBuyersV2,
  getPublicPurchases
} from 'apiv4/services';
import { useFetch } from 'apiv4/useFetch';
import { SearchResultItem } from 'apiv4/interfaces/typeguards';
import { PublicBuyerHit, PublicBuyerResults } from 'apiv4/interfaces/publicBuyer';
import SelectInputOptions from 'components/customComponents/SelectInputOptions';
import TextAreaInput from 'components/customComponents/TextAreaInput';
import { ThematicsEnum } from 'model/ThematicsEnum';
import SearchFieldWrapper from 'components/customComponents/SearchFieldWrapper';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import AdvancedFilters from 'components/customComponents/filter/AdvancedFilters';
import { getExtendedThematics } from 'helpers/searchTypeHelpers';
import { normalizeSearchPageResults } from 'utils/normalizeSearchPageResults';

type Props = {
  cardType: CardType;
};

export const SearchPage: React.FC<Props> = ({ cardType }) => {
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const { initialValues, handleFilter, filters } = useAdvancedFilters(cardType.name);
  const [filtersValues, setFiltersValues] = useState(initialValues);
  const [filteredResultsCount, setFilteredResultsCount] = useState(0);
  const thematicsValues = Object.values(ThematicsEnum);

  const navigate = useNavigate();

  const location = useLocation();
  const initialState = location.state as SearchState | null;
  const currentPage = initialState?.page ?? 1;

  const { description, handleDescriptionChange, thematics, setThematics, error } =
    useProjetFormContext();

  const fetcher = getFetcher(cardType.apiName);
  const { url } = fetcher(
    buildQueryString(initialState?.search.description, initialState?.search.thematics) ?? ''
  );

  const pageChunkSize = 20;
  const { data: cards, error: apiError } = useFetch<SearchResultItem[] | PublicBuyerResults>(url);
  const isLoading = !cards && !apiError;

  const results = cards && normalizeSearchPageResults(cards)

  const [filteredData, setFilteredData] = useState<
    SearchResultItem[] | PublicBuyerHit[] | undefined
  >(results);

  const pageNumber = Math.ceil(filteredResultsCount / pageChunkSize);

  useEffect(() => {
    if (!location.state) {
      setFilteredData([])
      setFilteredResultsCount(0)
      return
    }
    const filteredResults =
      results && isAdvancedSearchOpen ? handleFilter(results, filtersValues as any) : results;
    filteredResults &&
      setFilteredData(
        filteredResults.slice((currentPage - 1) * pageChunkSize, currentPage * pageChunkSize)
      );
    filteredResults && setFilteredResultsCount(filteredResults?.length);

    if (pageNumber <= 1) {
      navigate(location.pathname, {
        replace: true,
        state: {
          ...initialState,
          page: 1
        }
      });
    }
  }, [filtersValues, cards, isAdvancedSearchOpen, pageChunkSize, currentPage, pageNumber]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(location.pathname, {
      state: {
        ...initialState,
        search: {
          ...initialState?.search,
          description,
          thematics
        }
      }
    });
  };

  const handleToggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };

  const handleUpdateFilter = (filterName: string, filterValue: string | boolean) => {
    setFiltersValues({ ...filtersValues, [filterName]: filterValue });
  };

  const handleResetForm = () => {
    handleDescriptionChange('');
    setThematics([]);
    setFiltersValues(initialValues);
    navigate(location.pathname, {
      state: null
    });
  };

  return (
    <Container>
      <div className="cardTitleAndLogo p-2 text-base">
        <Heading level={2} customClasses="w-fit md:flex md:items-center " align="left">
          <div className="flex items-center ">
            <cardType.SVGLogo
              width="80"
              height="80"
              style={{ color: cardType.color }}
              aria-hidden={true}
            />
            &nbsp;
            {cardType.title} &nbsp;{' '}
          </div>
          <span className="bg-yellow md:text-3xl font-light">{`(${filteredResultsCount} résultats)`}</span>
        </Heading>

        {cardType.description && <p className="mt-2 text-base">{cardType.description}</p>}
      </div>

      <form
        onSubmit={handleSubmit}
        id="projectForm"
        className="my-8 flex flex-col justify-around flex-wrap h-fit w-full">
        <fieldset>
          <legend className="sr-only">Champs de recherche principaux</legend>
          <div className="flex flex-col md:flex-row h-full">
            <SearchFieldWrapper
              label="Votre recherche"
              usedInListPage={true}
              className={`w-full'md:w-[55%]`}>
              <TextAreaInput
                value={description}
                onValueChange={handleDescriptionChange}
                error={error}
                label={cardType?.searchText ?? ''}
                formId="projectForm"
                required
                color={cardType?.color}
              />
            </SearchFieldWrapper>
            <SearchFieldWrapper
              label="La thématique"
              usedInListPage={true}
              className="w-full md:w-[45%]">
              <SelectInputOptions
                className="mb-auto"
                optionsData={thematicsValues}
                secteurs={thematics}
                setSecteurs={setThematics}
                color={cardType?.color}
              />
            </SearchFieldWrapper>
          </div>
        </fieldset>
        {filters?.length > 0 && (
          <div className="flex flex-col mt-4">
            <button
              aria-expanded={isAdvancedSearchOpen}
              type="button"
              className="ml-auto underline"
              onClick={handleToggleAdvancedSearch}>
              Recherche avancée
            </button>
            {isAdvancedSearchOpen && (
              <AdvancedFilters
                cardType={cardType}
                filters={filters}
                setFilters={handleUpdateFilter}
                values={filtersValues}
              />
            )}
          </div>
        )}
      </form>

      <div className="container mt-8 w-full flex flex-col items-center justify-center">
        <button
          form="projectForm"
          disabled={isLoading || error}
          className="mx-3 fr-btn fr-btn--primary  fr-btn--lg">
          <span className={`mx-auto`}>{isLoading ? 'Chargement...' : 'Valider et rechercher'}</span>
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={handleResetForm}
          className="mt-4 underline">
          Réinitialiser
        </button>
      </div>
      {apiError && <p>Erreur</p>}
      {filteredData && (
        <>
          <SearchResults
            hitCount={filteredResultsCount}
            isLoading={isLoading}
            results={filteredData}
            cardType={cardType}
          />

          <Pagination
            isLoading={isLoading && pageNumber > 0}
            currentPageNo={currentPage || 1}
            baseUrl={cardType.searchLink}
            nbPage={pageNumber}
            initialState={initialState}
          />
        </>
      )}
    </Container>
  );
};

const getFetcher = (type: CardTypeName) => {
  switch (type) {
    case 'projets_achats': {
      return getPublicPurchases;
    }
    case 'aides_innovation': {
      return getCompanyAids;
    }
    case 'aides_clients': {
      return getPublicBuyerAids;
    }
    case 'investisseurs': {
      return getInvestors;
    }
    case 'startups': {
      return getCompanies;
    }
    case 'collectivites': {
      return getPublicBuyersV2;
    }
    default:
      return () => ({ url: undefined, options: undefined });
  }
};

const buildQueryString = (
  description: string | undefined,
  thematics: ThematicsEnum[] | undefined
) => {
  if (!thematics) return description;
  const extendedThematics = getExtendedThematics(thematics);
  return [description, ...extendedThematics].join(';');
};

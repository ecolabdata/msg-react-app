import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import TextAreaInput from 'components/customComponents/TextAreaInput';
import SearchFieldWrapper from 'components/customComponents/SearchFieldWrapper';
import { StartupSubTitle } from 'components/customComponents/details/StartupSubtitle';
import { baseApiUrl, generateFetchParams } from 'api/services';
import { CardsSearchResult, SelectFilterData } from 'api/interfaces/common';
import SearchResults from 'components/customComponents/SearchResults';
import Pagination from './Pagination';
import { useFetch } from 'api/useFetch';
import { useSearchState } from 'hooks/useSearchState';
import { AdvancedFilters } from './AdvancedFilters';

type Props = {
  cardType: CardType;
};

export const SearchPage: React.FC<Props> = ({ cardType }) => {
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const filters = useFetch<SelectFilterData>(`${baseApiUrl}/v5/${cardType.apiName}/filters/`)
  const location = useLocation();

  const {
    description,
    setDescription,
    error,
    currentPage,
    advancedFilters,
    handleFilterChange,
    resetFilters,
    updateSearchParams
  } = useSearchState();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';
  const filterQuery = searchParams.get('filters');
  const parsedFilterQuery = JSON.parse(filterQuery || 'null');
  const fetchParams = generateFetchParams(
    {
      query: searchQuery,
      filters: parsedFilterQuery || null,
      page: currentPage,
      page_size: 20
    },
    cardType.apiName
  );
  const { url, options } = fetchParams;
  const urlWithParams = useMemo(() => {
    if (!url) return '';
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('page', String(currentPage));
    urlObj.searchParams.set('query', searchQuery);
    urlObj.searchParams.set('filters', filterQuery || 'null');
    return urlObj.toString();
  }, [url, currentPage, searchQuery, parsedFilterQuery]);

  const { data, error: apiError } = useFetch<CardsSearchResult>(urlWithParams, options);
  const isLoading = !data && !apiError;
  const cards = data?.results;
  const cardsCount = data?.total_count || 0;
  const pageCount = Math.ceil(cardsCount / (data?.page_size || 20));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParams(description, 1, undefined, advancedFilters);
  };
  const handleToggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };

  const handleResetForm = () => {
    setDescription('');
    resetFilters();
    updateSearchParams('', 1);
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
          <span className="bg-yellow md:text-3xl font-light">{isLoading ? 'Chargement...' : `(${cardsCount} résultats)`}</span>
        </Heading>
        {cardType.description && <p className="mt-2 text-base">{cardType.description}</p>}
        {cardType.apiName === 'company_cards' && <StartupSubTitle />}
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
                onValueChange={setDescription}
                error={error}
                label={cardType?.searchText ?? ''}
                formId="projectForm"
                required
                color={cardType?.color}
              />
            </SearchFieldWrapper>
          </div>
        </fieldset>
        {filters?.data && (
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
                filters={filters.data}
                cardType={cardType}
                onFilterChange={handleFilterChange}
                selectedFilters={advancedFilters}
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
      {cards && (
        <>
          <SearchResults
            hitCount={cardsCount}
            isLoading={isLoading}
            results={cards}
            cardType={cardType}
            url={urlWithParams}
          />
          <Pagination
            isLoading={isLoading && currentPage > 0}
            currentPageNo={currentPage || 1}
            baseUrl={location.pathname}
            nbPage={pageCount}
          />
        </>
      )}
    </Container>
  );
};

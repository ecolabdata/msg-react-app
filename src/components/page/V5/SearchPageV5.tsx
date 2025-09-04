import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardType } from '../../../model/CardType';
import SelectInputOptions from 'components/customComponents/SelectInputOptions';
import TextAreaInput from 'components/customComponents/TextAreaInput';
import { ThematicsEnum } from 'model/ThematicsEnum';
import SearchFieldWrapper from 'components/customComponents/SearchFieldWrapper';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import AdvancedFilters from 'components/customComponents/filter/AdvancedFilters';
import { StartupSubTitle } from 'components/customComponents/details/StartupSubtitle';
import { generateFetchParams } from 'api5/servicesV5';
import { CardsSearchResult } from 'api5/interfaces/common';
import SearchResultsV5 from 'components/customComponents/V5/SearchResultsV5';
import PaginationV5 from './PaginationV5';
import { useFetch } from 'apiv4/useFetch';
import { useSearchState } from 'hooks/useSearchState';

type Props = {
  cardType: CardType;
};

export const SearchPageV5: React.FC<Props> = ({ cardType }) => {
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const { initialValues, filters } = useAdvancedFilters(cardType.name);
  const [filtersValues, setFiltersValues] = useState(initialValues);
  const thematicsValues = Object.values(ThematicsEnum);

  const location = useLocation();

  const {
    description,
    setDescription,
    thematics,
    handleThematicsChange,
    error,
    currentPage,
    updateSearchParams
  } = useSearchState();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';

  const fetchParams = generateFetchParams(
    {
      query: searchQuery,
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
    return urlObj.toString();
  }, [url, currentPage, searchQuery]);

  const { data, error: apiError } = useFetch<CardsSearchResult>(urlWithParams, options);
  const isLoading = !data && !apiError;

  const cards = data?.results;
  const cardsCount = data?.total_count || 0;
  const pageCount = Math.ceil(cardsCount / (data?.page_size || 20));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSearchParams(description, thematics, 1);
  };
  const handleToggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };

  const handleUpdateFilter = (filterName: string, filterValue: string | boolean) => {
    setFiltersValues({ ...filtersValues, [filterName]: filterValue });
  };

  const handleResetForm = () => {
    setDescription('');
    handleThematicsChange([]);
    setFiltersValues(initialValues);
    updateSearchParams('', [], 1);
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
            <SearchFieldWrapper
              label="La thématique"
              usedInListPage={true}
              className="w-full md:w-[45%]">
              <SelectInputOptions
                className="mb-auto"
                optionsData={thematicsValues}
                secteurs={thematics}
                setSecteurs={handleThematicsChange}
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
      {cards && (
        <>
          <SearchResultsV5
            hitCount={cardsCount}
            isLoading={isLoading}
            results={cards}
            cardType={cardType}
            url={urlWithParams}
          />
          <PaginationV5
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

import { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AidesQuery, AnyCard, Search } from '../../api/Api';
import { ApplicationContext } from '../../App';
import { useAdvancedFilters } from '../customComponents/filter/filters';
import { CardType } from '../../model/CardType';
import { InitialState } from '../../utils/InitialState';
import AdvancedFilters from '../customComponents/filter/AdvancedFilters';

import SearchForm from '../customComponents/SearchForm';
import Pagination from '../dsfrComponents/Pagination';
import SearchResults from '../customComponents/SearchResults';

type Props = {
  cardType: CardType;
};

export const SearchPage: React.FC<Props> = ({ cardType }) => {
  const { initialValues, searchByType, handleFilter, filters } = useAdvancedFilters(cardType.name);

  const { usedNextScrollTarget } = useContext(ApplicationContext);
  const [, setNextScrollTarget] = usedNextScrollTarget;
  const location = useLocation();
  const initialState = location.state as
    | (InitialState & { page?: number; montantMin: number })
    | null;
  const initialQuery = initialState?.search.query as AidesQuery | null;
  const initialSearchResults = initialState?.results || [];

  const pageNo = initialState?.page || 1;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [description, setDescription] = useState(initialQuery?.description || '');
  const [secteurs, setSecteurs] = useState<string[]>(initialQuery?.secteurs || []);
  const [errorTxt, setErrorTxt] = useState('');
  const pageChunkSize = 20;
  const [cards, setCards] = useState<AnyCard[]>(initialSearchResults);
  const [filtersValues, setFiltersValues] = useState(initialValues);

  const nbPage = Math.ceil(cards.length / pageChunkSize);
  const cardsSlice = useMemo(
    () => cards.slice((pageNo - 1) * pageChunkSize, pageNo * pageChunkSize),
    [cards, pageChunkSize, pageNo]
  );

  const handleToggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };

  const handleResetFilters = () => {
    setDescription('');
    setSecteurs([]);
    setFiltersValues(initialValues);
  };

  const handleUpdateFilter = (filterName: string, filterValue: string | boolean) => {
    setFiltersValues({ ...filtersValues, [filterName]: filterValue });
  };

  const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (description.length > 0) {
      setIsLoading(true);
      setErrorTxt('');
      searchByType({ description, secteurs, filters: filtersValues }).then((search) => {
        setIsLoading(false);
        const filteredCards = handleFilter(search as Search, filtersValues as any);
        setCards(filteredCards);
        return navigate(cardType.searchLink, {
          replace: true,
          state: { search, results: filteredCards }
        });
      });
    } else {
      document?.getElementById('keywordsForm-Décrivez votre projet en quelques lignes.')?.focus();
      setErrorTxt("Erreur: la description de l'entreprise est obligatoire");
    }
  };

  return (
    <div className="md:mx-16 md:mt-8">
      <div
        className="headContainer  container mb-20 mx-auto max-w-headerSize
            xl:mx-auto
            "
      >
        <div className="cardTitleAndLogo p-2 text-base">
          <h2 className="w-fit font-bold text-2xl md:text-4xl md:flex md:items-center ">
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
            <span className="bg-yellow md:text-3xl font-light">{`(${cards.length} résultats)`}</span>
          </h2>

          <p className="mt-2 text-base">{cardType.description}</p>
        </div>

        <div className="flex flex-col items-center w-full px-4 md:px-0">
          <form
            onSubmit={(event) => handleOnSubmitForm(event)}
            id="keywordsForm"
            className="researchContainer m-auto flex flex-col justify-around flex-wrap h-fit w-full"
          >
            <fieldset>
              <legend className="sr-only">Votre projet</legend>
              <SearchForm
                usedDescription={[description, setDescription]}
                usedSecteurs={[secteurs, setSecteurs]}
                usedErrorTextDescription={[errorTxt, setErrorTxt]}
                usedInListPage={true}
                color={cardType.color}
                showThematicField={cardType.name !== 'acheteurs-publics'}
              />
            </fieldset>
            {filters?.length > 0 && (
              <div className="flex flex-col mt-4">
                <button
                  aria-expanded={isAdvancedSearchOpen}
                  type="button"
                  className="ml-auto underline"
                  onClick={handleToggleAdvancedSearch}
                >
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

          <div className="researchButtonsContainer mt-8 w-full flex flex-col items-center justify-center">
            <button
              form="keywordsForm"
              disabled={isLoading}
              className="mx-3 fr-btn fr-btn--primary  fr-btn--lg"
            >
              <span className={`mx-auto`}>
                {isLoading ? 'Chargement...' : 'Valider et rechercher'}
              </span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleResetFilters}
              className="mt-4 underline"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
      {initialState && (
        <>
          <SearchResults cards={cardsSlice} cardType={cardType} isLoading={isLoading} />
          <Pagination
            isLoading={isLoading && nbPage > 0}
            onClick={() => {
              const element = document.getElementById('cardsContainer');
              if (element)
                setNextScrollTarget({
                  behavior: 'smooth',
                  top: element.offsetTop - window.innerHeight * 0.2
                });
            }}
            currentPageNo={pageNo}
            baseUrl={cardType.searchLink}
            nbPage={nbPage}
            initialState={initialState}
          />
        </>
      )}
    </div>
  );
};

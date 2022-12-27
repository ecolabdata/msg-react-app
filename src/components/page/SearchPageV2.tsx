import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import { ApplicationContext } from '../../App';
import { CardType } from '../../model/CardType';
import AdvancedFilters from '../customComponents/filter/AdvancedFilters';
import { FilterProperties } from '../customComponents/filter/filters';

import { Api, HitPublicBuyer, SearchPublicBuyer, SearchStartup } from 'api2/Api';
import SearchForm from '../customComponents/SearchForm';
import SearchResults from '../customComponents/SearchResults';
import Pagination from '../dsfrComponents/Pagination';
import Container from 'components/Core/Container';

type Props<SearchType extends SearchPublicBuyer | SearchStartup> = {
  cardType: CardType;
  children: (hit: SearchType['hits'][number], i: number, isLoading: boolean) => React.ReactNode;
  usedAdvancedFilter: FilterProperties;
};

export function buildSearchPageV2<SearchType extends SearchPublicBuyer | SearchStartup>(
  searchApi: (description: string, from : number) => Promise<SearchType>
) {
  return ({ cardType, children, usedAdvancedFilter }: Props<SearchType>) => {
    const { initialValues, searchByType, handleFilter, filters } = usedAdvancedFilter;
    const { usedNextScrollTarget } = useContext(ApplicationContext);
    const [, setNextScrollTarget] = usedNextScrollTarget;
    const navigate = useNavigate();
    const loc = useLocation();
    const queryParam = new URLSearchParams(loc.search)
    const q = queryParam.get('q');
    let page =  Number(queryParam.get('page'));
    if (isNaN(page) || page === 0 ) page = 1

    const [isLoading, setIsLoading] = useState(false);
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [description, setDescription] = useState(q || '');
    const [secteurs, setSecteurs] = useState<string[]>([]);
    const [errorTxt, setErrorTxt] = useState('');
    const pageChunkSize = 20;
    const [resp, setResp] = useState<SearchType | null>(null);
    const [filtersValues, setFiltersValues] = useState(initialValues);

    const nbPage = resp ? Math.ceil(resp.total.value / pageChunkSize) : 0;
    const handleResetFilters = () => {
      setDescription('');
      setSecteurs([]);
      setFiltersValues(initialValues);
    };

    const handleUpdateFilter = (filterName: string, filterValue: string | boolean) => {
      setFiltersValues({ ...filtersValues, [filterName]: filterValue });
    };

    useEffect(() => {
      if (description.length > 0) {
        console.log('Fetching data');
        setIsLoading(true);
        //The API return 100 result max
        searchApi(description, (page - 1) * 100).then((json) => {
          setResp(json);
          setIsLoading(false);
        });
      } else {
        setResp(null);
      }
    }, [q, page]);

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (description.length > 0) {
        setErrorTxt('');
        let searchQuery = `?q=${description}`
        if (page > 0) searchQuery += `&page=${page}`
        navigate({search: searchQuery},{
          preventScrollReset: true,
        });
      } else {
        document?.getElementById('keywordsForm-Décrivez votre projet en quelques lignes.')?.focus();
        setErrorTxt("Erreur: la description de l'entreprise est obligatoire");
      }
    };

    return (
      <>
        <Container>
          <div className="cardTitleAndLogo p-2 text-base">
            <h2 className="w-fit font-bold text-2xl md:text-4xl">
              <div className="flex items-center ">
                <cardType.SVGLogo
                  width="80"
                  height="80"
                  style={{ color: cardType.color }}
                  aria-hidden={true}
                />
                &nbsp;
                {cardType.title} &nbsp;{' '}
                <span className="bg-yellow md:text-3xl font-light">{`(${
                  resp?.total.value || 0
                } résultats)`}</span>
              </div>
            </h2>

            {cardType.description && <p className="mt-2 text-base">{cardType.description}</p>}
          </div>

          <div className="flex flex-col items-center w-full px-4 md:px-0">
            <form
              onSubmit={(event) => handleOnSubmitForm(event)}
              id="keywordsForm"
              className="my-8 flex flex-col justify-around flex-wrap h-fit w-full">
              <fieldset>
                <legend className="sr-only">Champs de recherche principaux</legend>
                <SearchForm
                  usedDescription={[description, setDescription]}
                  usedSecteurs={[secteurs, setSecteurs]}
                  usedErrorTextDescription={[errorTxt, setErrorTxt]}
                  usedInListPage={true}
                  cardType={cardType}
                  showThematicField={
                    cardType.name !== 'acheteurs-publics' && cardType.name !== 'retex'
                  }
                />
              </fieldset>
              {/* Waiting for SearchPage & SearchPageV2 to be merged and use useAdvancedFilters*/}
              {/* <div className="flex flex-col mt-4">
                <button
                  aria-expanded={isAdvancedSearchOpen}
                  type="button"
                  className="ml-auto underline"
                  onClick={() => console.log("TODO")}
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
              </div> */}
            </form>

            <div className="container mt-8 w-full flex flex-col items-center justify-center">
              <button
                form="keywordsForm"
                disabled={isLoading}
                className="mx-3 fr-btn fr-btn--primary  fr-btn--lg">
                <span className={`mx-auto`}>
                  {isLoading ? 'Chargement...' : 'Valider et rechercher'}
                </span>
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleResetFilters}
                className="mt-4 underline">
                Réinitialiser
              </button>
            </div>
          </div>
        </Container>
        {
          <Container>
            <SearchResults hitCount={resp?.total.value || 0} isLoading={isLoading}>
              {resp?.hits.map((hit, i) => children(hit, i, isLoading))}
            </SearchResults>
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
              currentPageNo={page}
              baseUrl={pageno => cardType.searchLink + `?q=${description}&page=${pageno}`}
              nbPage={nbPage}
            />
          </Container>
        }
      </>
    );
  };
}

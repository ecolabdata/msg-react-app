import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AidesQuery, AnyCard, Search } from '../../api/Api';
import { ApplicationContext } from '../../App';
import { useAdvancedFilters } from '../customComponents/filter/filters';
import { useTitle } from '../../hooks/useTitle';
import {
  achatPrevi,
  achatProg,
  acheteurPublic,
  aideClient,
  aideFin,
  aideInno,
  CardType,
  investisseur,
  retex,
  sourcingSu,
  startups
} from '../../model/CardType';
import { InitialState } from '../../utils/InitialState';
import AdvancedFilters from '../customComponents/filter/AdvancedFilters';

import ResultCard from '../customComponents/ResultCard';
import ScreenReaderOnlyText from '../customComponents/ScreenReaderOnlyText';
import SearchForm from '../customComponents/SearchForm';
import Pagination from '../dsfrComponents/Pagination';

type Props = {
  cardType: CardType;
};

const SearchPage: React.FC<Props> = ({ cardType }) => {
  const { initialValues, searchByType, handleFilter, filters } = useAdvancedFilters(cardType.name);

  const { usedNextScrollTarget } = useContext(ApplicationContext);
  const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget;
  const location = useLocation();
  const initialState = location.state as
    | (InitialState & { page?: number; montantMin: number })
    | null;
  const initialQuery = initialState?.search.query as AidesQuery | null;

  const pageNo = initialState?.page || 1;
  const navigate = useNavigate();
  useTitle(`Recherche détaillé ${cardType.title}`);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [description, setDescription] = useState(initialQuery?.description || '');
  const [secteurs, setSecteurs] = useState<string[]>(initialQuery?.secteurs || []);
  const [errorTxt, setErrorTxt] = useState('');
  const pageChunkSize = 20;
  const [cards, setCards] = useState<AnyCard[]>([]);
  const [filtersValues, setFiltersValues] = useState(initialValues);

  const filteredCards: JSX.Element[] | undefined = cards.map((card, i) => (
    <ResultCard
      isLoading={isLoading}
      cardType={cardType}
      cardData={card}
      pageList={false}
      key={i}
    />
  ));

  const nbPage = Math.ceil(filteredCards.length / pageChunkSize);
  const cardsSlice = filteredCards.slice((pageNo - 1) * pageChunkSize, pageNo * pageChunkSize);

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
        const element = document.getElementById('cardsContainer');
        if (element)
          setNextScrollTarget({
            behavior: 'smooth',
            top: element.offsetTop - window.innerHeight * 0.2
          });
        return navigate(cardType.searchLink, {
          replace: true,
          state: { search }
        });
      });
    } else {
      setErrorTxt("Erreur: la description de l'entreprise est obligatoire");
    }
  };

  return (
    <>
      <div
        className="headContainer  container mt-10 mb-20 mx-auto max-w-headerSize
            xl:mx-auto
            ">
        <div className="cardTitleAndLogo mt-10 p-2 text-base">
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
              <span className="bg-yellow md:text-3xl font-light">{`(${filteredCards.length} résultats)`}</span>
            </div>
          </h2>

          <p className="mt-2 text-base">{cardType.description}</p>
        </div>

        <div className="flex flex-col items-center w-full px-4 md:px-0">
          <form
            onSubmit={(event) => handleOnSubmitForm(event)}
            id="keywordsForm"
            className="researchContainer m-auto flex flex-col justify-around flex-wrap h-fit w-full">
            <fieldset>
              <legend className="sr-only">Champs de formulaire principaux</legend>
              <SearchForm
                usedDescription={[description, setDescription]}
                usedSecteurs={[secteurs, setSecteurs]}
                usedErrorTextDescription={[errorTxt, setErrorTxt]}
                usedInListPage={true}
                color={cardType.color}
              />
            </fieldset>
            <fieldset className="flex flex-col mt-4">
              <legend className="sr-only">Champs de recherche avancée</legend>
              <button
                aria-pressed={isAdvancedSearchOpen}
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
            </fieldset>
          </form>

          <div className="researchButtonsContainer mt-8 w-full flex flex-col items-center justify-center">
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
      </div>
      {isLoading && <ScreenReaderOnlyText content={'Chargement en cours'} aria-live="polite" />}
      {!isLoading && cardsSlice.length ? (
        <ScreenReaderOnlyText
          content={`il y'a ${cardsSlice.length} résultats`}
          aria-live="polite"
        />
      ) : null}
      {!isLoading && cardsSlice && cardsSlice.length === 0 && initialState && (
        <ScreenReaderOnlyText content={`Aucun résultat trouvé`} aria-live="polite" />
      )}
      {cardsSlice.length > 0 ? (
        <div className="fr-container max-w-full" id="cardsContainer">
          <span className="flex justify-end font-bold mb-4">{`(${filteredCards.length} résultats)`}</span>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {' '}
            {cardsSlice}
          </ul>
        </div>
      ) : initialState ? (
        'Aucun résultat trouvé'
      ) : null}

      {initialState && (
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
      )}
    </>
  );
};

/*Persona: Startup*/
export const SearchPageAidesClient = () => <SearchPage cardType={aideClient} />;
export const SearchPageAidesInno = () => <SearchPage cardType={aideInno} />;
export const SearchPageInvestisseur = () => <SearchPage cardType={investisseur} />;
export const SearchPageStartups = () => <SearchPage cardType={startups} />;
export const SearchPageAcheteurPublic = () => <SearchPage cardType={acheteurPublic} />;
export const SearchPageAchatPrevi = () => <SearchPage cardType={achatPrevi} />;

/*Persona: Acteur public*/
export const SearchPageAidesFin = () => <SearchPage cardType={aideFin} />;
export const SearchPageSourcingSu = () => <SearchPage cardType={sourcingSu} />;
export const SearchPageRetex = () => <SearchPage cardType={retex} />;
export const SearchPageAchatProg = () => <SearchPage cardType={achatProg} />;

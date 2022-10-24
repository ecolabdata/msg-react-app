import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AidesQuery } from '../../api/Api';
import { ApplicationContext } from '../../App';
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
import { AideRequestFilter } from '../customComponents/filter/AideRequestFilter';
import { ForecastedBuyRequestFilter } from '../customComponents/filter/ForecastedBuyRequestFilter';
import { InvestisseurRequestFilter } from '../customComponents/filter/InvestisseurRequestFilter';
import { NoRequestFilter } from '../customComponents/filter/NoRequestFilter';
import { ProjetAchatRequestFilter } from '../customComponents/filter/ProjetAchatRequestFilter';
import { PublicBuyRequestFilter } from '../customComponents/filter/PublicBuyRequestFilter';
import { RequestFilter } from '../customComponents/filter/RequestFIlter';
import { StartupRequestFilter } from '../customComponents/filter/StartupRequestFilter';

import ResultCard from '../customComponents/ResultCard';
import ScreenReaderOnlyText from '../customComponents/ScreenReaderOnlyText';
import SearchForm from '../customComponents/SearchForm';
import Pagination from '../dsfrComponents/Pagination';

type Props = {
  cardType: CardType;
  requestFilterBuilder: (initialState: unknown) => RequestFilter;
};

const SearchPage: React.FC<Props> = ({ cardType, requestFilterBuilder }) => {
  const { usedNextScrollTarget } = useContext(ApplicationContext);
  const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget;
  const location = useLocation();
  const requestFilter = requestFilterBuilder(location.state);
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

  const filteredCards: JSX.Element[] | undefined = requestFilter.cards.map((card) => (
    <ResultCard
      isLoading={isLoading}
      cardType={cardType}
      cardData={card}
      pageList={false}
      key={card.id}
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
    requestFilter?.reset?.();
  };

  const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (description.length > 0) {
      setIsLoading(true);
      setErrorTxt('');
      requestFilter.search(description, [], secteurs).then((search) => {
        setIsLoading(false);
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
              <legend className="hidden">Champs de formulaire principaux</legend>
              <SearchForm
                usedDescription={[description, setDescription]}
                usedSecteurs={[secteurs, setSecteurs]}
                usedErrorTextDescription={[errorTxt, setErrorTxt]}
                usedInListPage={true}
                color={cardType.color}
              />
            </fieldset>
            <fieldset className="flex flex-col mt-4">
              <legend className="hidden">Champs de recherche avancée</legend>
              <button
                aria-pressed={isAdvancedSearchOpen}
                type="button"
                className="ml-auto"
                onClick={handleToggleAdvancedSearch}>
                Recherche avancée
              </button>
              {isAdvancedSearchOpen && (
                <div className="flex flex-col md:flex-row items-center">
                  <requestFilter.Component />
                </div>
              )}
            </fieldset>
          </form>

          <div className="researchButtonsContainer mt-4 w-full flex flex-col items-center justify-center">
            <button
              form="keywordsForm"
              disabled={isLoading}
              className="mx-3 fr-btn fr-btn--sm fr-btn--primary 
                        ">
              <span className={`mx-auto`}>
                {isLoading ? 'Chargement...' : 'Valider et rechercher'}
              </span>
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleResetFilters}
              className="mt-4 fr-btn--tertiary-no-outline">
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
export const SearchPageAidesClient = () => (
  <SearchPage
    cardType={aideClient}
    requestFilterBuilder={(initState) => new AideRequestFilter(initState as any, aideClient)}
  />
);
export const SearchPageAidesInno = () => (
  <SearchPage
    cardType={aideInno}
    requestFilterBuilder={(initState) => new AideRequestFilter(initState as any, aideInno)}
  />
);
export const SearchPageInvestisseur = () => (
  <SearchPage
    cardType={investisseur}
    requestFilterBuilder={(initState) =>
      new InvestisseurRequestFilter(initState as any, investisseur)
    }
  />
);
export const SearchPageStartups = () => (
  <SearchPage
    cardType={startups}
    requestFilterBuilder={(initState) => new StartupRequestFilter(initState as any, startups)}
  />
);
export const SearchPageAcheteurPublic = () => (
  <SearchPage
    cardType={acheteurPublic}
    requestFilterBuilder={(initState) =>
      new PublicBuyRequestFilter(initState as any, acheteurPublic)
    }
  />
);
export const SearchPageAchatPrevi = () => (
  <SearchPage
    cardType={achatPrevi}
    requestFilterBuilder={(initState) =>
      new ForecastedBuyRequestFilter(initState as any, achatPrevi)
    }
  />
);

/*Persona: Acteur public*/
export const SearchPageAidesFin = () => (
  <SearchPage
    cardType={aideFin}
    requestFilterBuilder={(initState) => new AideRequestFilter(initState as any, aideFin)}
  />
);
export const SearchPageSourcingSu = () => (
  <SearchPage
    cardType={sourcingSu}
    requestFilterBuilder={(initState) => new NoRequestFilter(initState as any, sourcingSu)}
  />
);
export const SearchPageRetex = () => (
  <SearchPage
    cardType={retex}
    requestFilterBuilder={(initState) => new NoRequestFilter(initState as any, retex)}
  />
);
export const SearchPageAchatProg = () => (
  <SearchPage
    cardType={achatProg}
    requestFilterBuilder={(initState) => new ProjetAchatRequestFilter(initState as any, achatProg)}
  />
);

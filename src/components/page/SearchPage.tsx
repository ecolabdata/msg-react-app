import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AidesQuery, AnyCard, CardTypeName, Search } from '../../api/Api';
import { ApplicationContext } from '../../App';
import { CardType } from '../../model/CardType';
import { InitialState } from '../../utils/InitialState';
import AdvancedFilters from '../customComponents/filter/AdvancedFilters';
import { FilterProperties } from '../customComponents/filter/filters';
import SearchForm from '../customComponents/SearchForm';
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
import { SearchResultItem, isPublicBuyerResultList } from 'apiv4/interfaces/typeguards';
import { PublicBuyerResults } from 'apiv4/interfaces/publicBuyer';

type Props = {
  cardType: CardType;
  usedAdvancedFilter: FilterProperties;
};

export const SearchPage: React.FC<Props> = ({ cardType, usedAdvancedFilter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  const [errorTxt, setErrorTxt] = useState('');
  const pageChunkSize = 20;
  // const [cards, setCards] = useState<AnyCard[]>([]);
  const {
    description,
    setDescription,
    thematics: secteurs,
    setThematics: setSecteurs
  } = useProjetFormContext();

  const fetcher = getFetcher(cardType.apiName);
  const { url, ...options } = fetcher(description);
  const { data: cards, error } = useFetch<SearchResultItem[] | PublicBuyerResults>(url);

  return (
    <Container>
      {/* <div> */}
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
          <span className="bg-yellow md:text-3xl font-light">{`(${
            cards && isPublicBuyerResultList(cards) ? cards.hits.length : cards?.length
          } résultats)`}</span>
        </Heading>

        {cardType.description && <p className="mt-2 text-base">{cardType.description}</p>}
      </div>

      {/* <div className="flex flex-col items-center w-full px-4 md:px-0">
          <form
            onSubmit={(event) => handleOnSubmitForm(event)}
            id="keywordsForm"
            className="my-8 flex flex-col justify-around flex-wrap h-fit w-full"
          >
            <fieldset>
              <legend className="sr-only">Champs de recherche principaux</legend>
              <SearchForm
                usedDescription={[description, setDescription]}
                usedSecteurs={[secteurs, setSecteurs]}
                usedErrorTextDescription={[errorTxt, setErrorTxt]}
                usedInListPage={true}
                cardType={cardType}
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

          <div className="container mt-8 w-full flex flex-col items-center justify-center">
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
      </div> */}
      {cards && (
        <>
          <SearchResults
            hitCount={cards && isPublicBuyerResultList(cards) ? cards.hits.length : cards?.length}
            isLoading={isLoading}
            results={cards && isPublicBuyerResultList(cards) ? cards.hits : cards}
            cardType={cardType}
          />

          {/* <Pagination
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
        /> */}
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

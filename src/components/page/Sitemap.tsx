import { useEffect, useState } from 'react';
import reactRouterToArray from 'react-router-to-array';
import { search } from '../../api/Api';
import routes from '../../model/routes';
import { Link } from 'react-router-dom';
import formatSlugForBreadCumb, {
  getGoodAttributForSlugInDetailsCard
} from '../../utils/formatSlugForBreadcrumb';

const Sitemap = () => {
  const [allCards, setAllCards] = useState<any>();
  const [allRoutes, setAllRoutes] = useState<any>();

  useEffect(() => {
    search({
      description: '',
      secteurs: [],
      motsclefs: []
    }).then((res) => setAllCards(res.cards));

    setAllRoutes(reactRouterToArray(routes));
  }, []);

  if (!allRoutes || !allCards) {
    return <p>Chargement ...</p>;
  }

  const cardsDetailsData = Object.values(allCards)
    .flat()
    .map((card: any) => {
      if (!card.slug) {
        return undefined;
      }

      const linkTo = `/${card.cardTypeName}/details/${card.slug}?cardData=${encodeURIComponent(
        JSON.stringify(card)
      )}`;

      return {
        slugToDisplay: getGoodAttributForSlugInDetailsCard(card),
        urlToRedirect: linkTo
      };
    })
    .filter(Boolean);

  const titou = allRoutes.map((route: string) => {
    return formatSlugForBreadCumb(route, route);
  });

  const allRoutesAndCards = [...titou, ...cardsDetailsData];

  const keys = allRoutes.map((str: string) => {
    const middle = str.slice(str.indexOf('/') + 1, str.lastIndexOf('/'));

    return middle;
  });

  const filteredArray = keys
    .filter(function (ele: string, pos: number) {
      return keys.indexOf(ele) == pos;
    })
    .filter(Boolean)
    .filter((route: string) => !route.includes('/'));

  const toto = filteredArray.map((bla: string) => {
    const filterInRoutes = allRoutesAndCards.filter((route: any) =>
      route?.urlToRedirect?.includes(bla)
    );

    return filterInRoutes;
  });

  return (
    <>
      <h1 className="mt-4 w-full font-bold text-3xl text-center">Plan du site</h1>
      <ul>
        {toto.map((routes: any[], index: number) => {
          return (
            <li className="fr-highlight mb-6" key={index}>
              {typeof routes !== 'string' &&
                routes.map((route: any, index: number) => {
                  if (index === 0) {
                    return (
                      <li key={route.urlToRedirect}>
                        {' '}
                        <Link className="self-end text-md" to={route.urlToRedirect}>
                          {route === '/' ? 'Accueil' : route.slugToDisplay}

                          {/* <p className="text-xs">{route.urlToRedirect}</p> */}
                        </Link>
                      </li>
                    );
                  }

                  console.log(
                    'route.urlToRedirect.includes("/details")',
                    route.urlToRedirect.includes('/details')
                  );

                  if (route.urlToRedirect.includes('/details')) {
                    return (
                      <li key={route.urlToRedirect} className="ml-8">
                        <Link className="self-end text-md" to={route.urlToRedirect}>
                          {route === '/' ? 'Accueil' : route.slugToDisplay}

                          {/* <p className="text-xs">{route.urlToRedirect}</p> */}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={route} className="ml-4">
                      <Link className="self-end text-md" to={route.urlToRedirect}>
                        {route === '/' ? 'Accueil' : route.slugToDisplay}

                        {/* <p className="text-xs">{route.urlToRedirect}</p> */}
                      </Link>
                    </li>
                  );
                })}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Sitemap;

import { useEffect, useState } from 'react';
import { Link, Location } from 'react-router-dom';
import reactRouterToArray from 'react-router-to-array';
import { useQuery } from '../../hooks/useQuery';
import routes from '../../model/routes';
import formatSlugForBreadCumb from '../../utils/formatSlugForBreadcrumb';

type FormatedRoute =
  | {
      urlToRedirect: string;
      slugToDisplay: string;
    }
  | undefined;

const Sitemap = () => {
  const [allRoutes, setAllRoutes] = useState<string[]>();

  const query = useQuery();

  useEffect(() => {
    setAllRoutes(reactRouterToArray(routes));
  }, []);

  if (!allRoutes) {
    return <p>Chargement ...</p>;
  }

  const allFormatedRoutes = allRoutes
    .filter((route: string) => !route.includes('/search'))
    .map((route: string) => {
      return formatSlugForBreadCumb(query, { pathname: route } as Location, route);
    });

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

  const allRoutesFiltered = filteredArray.map((stringRoute: string) => {
    const filterInRoutes = allFormatedRoutes.filter((route: FormatedRoute) =>
      route?.urlToRedirect?.includes(stringRoute)
    );

    return filterInRoutes;
  });

  return (
    <div className="fr-container">
      <h1 className="my-8 w-full font-bold text-3xl text-center">Plan du site</h1>
      <ul>
        <li key={'/'}>
          {' '}
          <Link className="self-end text-md" to={'/'}>
            Accueil
          </Link>
        </li>

        {allRoutesFiltered.map((routes: FormatedRoute[]) => {
          if (!routes[0]) return;

          if (routes.length === 1) {
            return (
              <li key={routes[0].urlToRedirect}>
                <Link className="self-end text-md" to={routes[0].urlToRedirect}>
                  {routes[0].slugToDisplay}
                </Link>
              </li>
            );
          }

          return (
            <ul key={routes[0].urlToRedirect}>
              {typeof routes !== 'string' &&
                routes.map((route: FormatedRoute, index: number) => {
                  if (!route) return;

                  if (index === 0) {
                    return (
                      <li key={route.urlToRedirect}>
                        <Link className="self-end text-md" to={route.urlToRedirect}>
                          {route.slugToDisplay}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={route.urlToRedirect} className="ml-4">
                      <Link className="self-end text-md" to={route.urlToRedirect}>
                        {route.urlToRedirect === '/' ? 'Accueil' : route.slugToDisplay}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          );
        })}
      </ul>
    </div>
  );
};

export default Sitemap;

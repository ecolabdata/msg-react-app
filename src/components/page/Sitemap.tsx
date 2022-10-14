import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reactRouterToArray from 'react-router-to-array';
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

  useEffect(() => {
    setAllRoutes(reactRouterToArray(routes));
  }, []);

  if (!allRoutes) {
    return <p>Chargement ...</p>;
  }

  const allFormatedRoutes = allRoutes
    .filter((route: string) => !route.includes('/search'))
    .map((route: string) => {
      return formatSlugForBreadCumb(route, route);
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
    <>
      <h1 className="mt-4 w-full font-bold text-3xl text-center">Plan du site</h1>
      <ul>
        <li key={'/'}>
          {' '}
          <Link className="self-end text-md" to={'/'}>
            Accueil
          </Link>
        </li>

        {allRoutesFiltered.map((routes: FormatedRoute[], key: number) => {
          return (
            <li key={key}>
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
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Sitemap;

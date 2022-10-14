import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import formatSlugForBreadCumb from '../../utils/formatSlugForBreadcrumb';

const BreadCumb: React.FC = () => {
  const [navHistory, setNavHistory] = useState<{ urlToRedirect: string; slugToDisplay: string }[]>(
    []
  );

  const createSlugForBreadCumb = () => {
    const location = useLocation();

    const pageData = formatSlugForBreadCumb(window.location.pathname, location.pathname);

    if (!pageData) return;

    const pathNameAlreadyPresentInNavigationHistory = navHistory.find(
      (pageDataObject) => pageDataObject.slugToDisplay === pageData?.slugToDisplay
    );

    if (pageData && pathNameAlreadyPresentInNavigationHistory === undefined) {
      setNavHistory([...navHistory, pageData]);
    }

    return pageData.slugToDisplay;
  };

  useEffect(() => {
    window.addEventListener('popstate', (event) => {
      navHistory.pop();
      setNavHistory(navHistory);
    });

    if (window.location.pathname === '/') {
      setNavHistory([]);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    console.log('window.history A CHANGE :>> ', window.history);
  }, [window.history]);

  return (
    <nav
      role="navigation"
      className="fr-breadcrumb !max-w-headerSize mx-auto"
      aria-label="vous êtes ici :"
    >
      <button className="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb-1">
        Voir le fil d’Ariane
      </button>
      <div className="fr-collapse" id="breadcrumb-1">
        <ol className="fr-breadcrumb__list">
          {navHistory.length > 0 && (
            <li>
              <a className="fr-breadcrumb__link" href="/">
                Accueil
              </a>
            </li>
          )}

          {navHistory.length > 1 &&
            navHistory.map((visitedPageDataObject, visitedPageDataObjectIndex) => {
              if (visitedPageDataObjectIndex < navHistory.length - 1) {
                console.log(
                  'visitedPageDataObject.urlToRedirect :>> ',
                  visitedPageDataObject.urlToRedirect
                );
                return (
                  <li key={visitedPageDataObject.slugToDisplay}>
                    <a className="fr-breadcrumb__link" href={visitedPageDataObject.urlToRedirect}>
                      {' '}
                      {visitedPageDataObject.slugToDisplay}
                    </a>
                  </li>
                );
              }
              return;
            })}

          <li>
            <a className="fr-breadcrumb__link" aria-current="page">
              {createSlugForBreadCumb()}
            </a>
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default BreadCumb;

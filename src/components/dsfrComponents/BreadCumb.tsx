import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { useQuery } from '../../hooks/useQuery';
import formatSlugForBreadCumb from '../../utils/formatSlugForBreadcrumb';
import { FormatedRoute } from '../page/Sitemap';

const BreadCumb: React.FC = () => {
  const [navHistory, setNavHistory] = useState<FormatedRoute[]>([]);
  const query = useQuery();
  const location = useLocation();

  const isMobile = useCheckMobileScreen();

  const createSlugForBreadCumb = () => {
    const pageData = formatSlugForBreadCumb(query, location, location.pathname);

    if (!pageData) return;

    const pathNameAlreadyPresentInNavigationHistory = navHistory.find(
      (pageDataObject) => pageDataObject?.slugToDisplay === pageData?.slugToDisplay
    );

    if (pageData && pathNameAlreadyPresentInNavigationHistory === undefined) {
      setNavHistory([...navHistory, pageData]);
    }

    return pageData.slugToDisplay;
  };

  useEffect(() => {
    window.addEventListener('popstate', () => {
      navHistory.pop();
      setNavHistory(navHistory);
    });

    if (window.location.pathname === '/') {
      setNavHistory([]);
    }
  }, [window.location.pathname]);

  return (
    <nav
      role="navigation"
      className="fr-breadcrumb  h-full fr-container max-w-headerSize mx-auto  !mb-0 mt-8 "
      aria-label="vous êtes ici :"
    >
      {isMobile && navHistory.length > 0 && (
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb-1"
        >
          Voir le fil d’Ariane
        </button>
      )}
      <div className="fr-collapse" id="breadcrumb-1">
        <ol className="fr-breadcrumb__list truncate w-80">
          {navHistory.length > 0 && (
            <li>
              <a className="fr-breadcrumb__link" href="/">
                Accueil
              </a>
            </li>
          )}

          {navHistory.length > 1 &&
            navHistory.map((visitedPageDataObject, visitedPageDataObjectIndex) => {
              if (!visitedPageDataObject) return;
              if (visitedPageDataObjectIndex < navHistory.length - 1) {
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

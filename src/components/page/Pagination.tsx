import { Link, NavLink, useLocation } from 'react-router-dom';

interface PaginationProps {
  baseUrl: string;
  currentPageNo: number;
  nbPage: number;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ baseUrl, currentPageNo, nbPage, isLoading }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const generatedPageNos = Array(nbPage)
    .fill(1)
    .map((x, idx) => x + idx);

  if (generatedPageNos.length === 1) {
    return <></>;
  }

  // Helper function to build URL with preserved parameters
  const buildPageUrl = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    return baseUrl + '?' + newSearchParams.toString();
  };

  return (
    <nav
      role="navigation"
      className="fr-pagination mx-auto w-fit mt-10 transition-opacity duration-200"
      aria-label="Pagination"
      style={{ opacity: isLoading ? 0 : 1 }}>
      <ul className="fr-pagination__list">
        <li>
          {currentPageNo - 1 <= 0 ? (
            <a
              className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
              aria-disabled="true"
              role="link">
              Précédent
            </a>
          ) : (
            <Link
              preventScrollReset={true}
              to={buildPageUrl(currentPageNo - 1)}
              className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
              role="link">
              Précédent
            </Link>
          )}
        </li>

        {generatedPageNos.map((generatedPageNo) => (
          <li key={`Page ${generatedPageNo}`}>
            <NavLink
              preventScrollReset={true}
              to={buildPageUrl(generatedPageNo)}
              className="fr-pagination__link rounded-full"
              role="link"
              title={`Page ${generatedPageNo}`}
              aria-current={generatedPageNo === currentPageNo ? 'page' : 'false'}>
              {generatedPageNo}
            </NavLink>
          </li>
        ))}

        <li>
          {currentPageNo >= nbPage ? (
            <a
              className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
              aria-disabled="true"
              role="link">
              Suivant
            </a>
          ) : (
            <Link
              preventScrollReset={true}
              to={buildPageUrl(currentPageNo + 1)}
              className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
              role="link">
              Suivant
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
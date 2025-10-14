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

  // Generate smart pagination numbers
  const generatePaginationNumbers = () => {
    if (nbPage <= 1) return [];

    const pages = [];
    const firstPage = 1;
    const lastPage = nbPage;

    // Always show first page
    pages.push(firstPage);

    if (nbPage <= 7) {
      // If 7 or fewer pages, show all (no ellipsis needed)
      for (let i = 2; i <= nbPage; i++) {
        pages.push(i);
      }
    } else {
      // Advanced pagination logic
      const startRange = Math.max(2, currentPageNo - 2);
      const endRange = Math.min(nbPage - 1, currentPageNo + 2);

      // Check if we need ellipsis after first page
      const needsEllipsisAfterFirst = startRange > 2;

      // Check if we need ellipsis before last page
      const needsEllipsisBeforeLast = endRange < nbPage - 1;

      // Add ellipsis after first page if needed
      if (needsEllipsisAfterFirst) {
        pages.push('...');
      }

      // Add the range around current page
      for (let i = startRange; i <= endRange; i++) {
        if (i !== firstPage && i !== lastPage) {
          pages.push(i);
        }
      }

      // Add ellipsis before last page if needed
      if (needsEllipsisBeforeLast) {
        pages.push('...');
      }

      // Always show last page
      pages.push(lastPage);
    }

    return pages;
  };

  const paginationNumbers = generatePaginationNumbers();

  if (paginationNumbers.length === 0) {
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

        {paginationNumbers.map((pageNumber, index) => (
          <li key={`Page ${pageNumber}-${index}`}>
            {pageNumber === '...' ? (
              <span className="fr-pagination__link rounded-full" aria-hidden="true">
                …
              </span>
            ) : (
              <NavLink
                preventScrollReset={true}
                to={buildPageUrl(pageNumber as number)}
                className="fr-pagination__link rounded-full"
                role="link"
                title={`Page ${pageNumber}`}
                aria-current={pageNumber === currentPageNo ? 'page' : 'false'}>
                {pageNumber}
              </NavLink>
            )}
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
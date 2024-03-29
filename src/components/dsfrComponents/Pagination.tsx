import { Link, NavLink } from 'react-router-dom';
import { SearchState } from '../../utils/InitialState';
interface PaginationProps {
  baseUrl: string;
  currentPageNo: number;
  nbPage: number;
  initialState: SearchState | null;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  baseUrl,
  currentPageNo,
  nbPage,
  initialState,
  onClick,
  isLoading
}) => {
  const generatedPageNos = Array(nbPage)
    .fill(1)
    .map((x, idx) => x + idx);

  if (generatedPageNos.length === 1) {
    return <></>;
  }

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
              onClick={onClick}
              preventScrollReset={true}
              to={baseUrl}
              state={{ ...initialState, page: currentPageNo - 1 }}
              className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
              role="link"
              replace={true}>
              Précédent
            </Link>
          )}
        </li>

        {generatedPageNos.map((generatedPageNo) => (
          <li key={`Page ${generatedPageNo}`}>
            <NavLink
              onClick={onClick}
              preventScrollReset={true}
              to={baseUrl}
              className="fr-pagination__link rounded-full"
              role="link"
              title={`Page ${generatedPageNo}`}
              replace={true}
              state={{ ...initialState, page: generatedPageNo }}
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
              onClick={onClick}
              preventScrollReset={true}
              to={baseUrl}
              state={{ ...initialState, page: currentPageNo + 1 }}
              className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
              role="link"
              replace={true}>
              Suivant
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

interface GenericPaginationProps {
  pageNumber: number;
  numberOfPages: number;
  setPageNumber: (page: number) => void;
  title: string;
  className?: string;
}
const GenericPagination: React.FC<GenericPaginationProps> = ({
  numberOfPages,
  pageNumber,
  setPageNumber,
  className,
  title
}) => {
  return (
    <nav
      title={title}
      role="navigation"
      className={`fr-pagination ${className}`}
      aria-label={title}
    >
      <ul className="fr-pagination__list">
        <li>
          <button
            onClick={() => setPageNumber(0)}
            className="fr-pagination__link fr-pagination__link--first"
          >
            Première page
          </button>
        </li>
        <li>
          <button
            disabled={pageNumber === 0}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
            aria-disabled={pageNumber === 0}
          >
            Page précédente
          </button>
        </li>
        <li>
          <p
            className="fr-pagination__link rounded-full"
            aria-current="page"
            title={`Page ${pageNumber + 1}`}
          >
            {pageNumber + 1}
          </p>
        </li>

        <li>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
            aria-disabled={pageNumber === numberOfPages - 1}
            disabled={pageNumber === numberOfPages - 1}
          >
            Page suivante
          </button>
        </li>
        <li>
          <button
            onClick={() => setPageNumber(numberOfPages - 1)}
            className="fr-pagination__link fr-pagination__link--last"
          >
            Dernière page
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default GenericPagination;

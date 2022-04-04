import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Chevron from './../../assets/icons/chevron.svg'
interface PaginationProps {
    baseUrl: string
    currentPageNo: number,
    nbPage: number
}

const Pagination: React.FC<PaginationProps> = ({ baseUrl, currentPageNo, nbPage }) => {
    const generatedPageNos = Array(nbPage).fill(1).map((x, idx) => x + idx)
    console.log({ baseUrl, currentPageNo, nbPage, generatedPageNos })
    return <nav role="navigation" className="fr-pagination mx-auto w-fit mt-10" aria-label="Pagination">
        <ul className="fr-pagination__list">
            <li>
                {currentPageNo - 1 <= 0 ?
                    <a
                        className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
                        aria-disabled="true"
                        role="link"
                    >
                        Précédent
                    </a> :
                    <Link
                        to={baseUrl + "/" + (currentPageNo - 1)}
                        className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
                        role="link"
                    >
                        Précédent
                    </Link>
                }
            </li>

            {generatedPageNos.map(generatedPageNo => <li>
                <NavLink
                    to={baseUrl + "/" + (generatedPageNo)}
                    className="fr-pagination__link rounded-full"
                    role="link"
                    title={`Page ${generatedPageNo}`}
                >
                    {generatedPageNo}
                </NavLink>
            </li>)}


            <li>
                {currentPageNo >= nbPage ?
                    <a
                        className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
                        aria-disabled="true"
                        role="link"
                    >
                        Suivant
                    </a> : <Link
                        to={baseUrl + "/" + (currentPageNo + 1)}
                        className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
                        role="link"
                    >
                        Suivant
                    </Link>
                }
            </li>

        </ul>
    </nav>
};

export default Pagination;
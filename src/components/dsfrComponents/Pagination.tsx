import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { InitialState } from '../../utils/InitialState';
import Chevron from './../../assets/icons/chevron.svg'
interface PaginationProps {
    baseUrl: string
    currentPageNo: number,
    nbPage: number
    initialState: InitialState,
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}

const Pagination: React.FC<PaginationProps> = ({ baseUrl, currentPageNo, nbPage, initialState, onClick }) => {
    const generatedPageNos = Array(nbPage).fill(1).map((x, idx) => x + idx)
    console.log({ baseUrl, currentPageNo, nbPage, generatedPageNos })
    return <nav role="navigation" className="fr-pagination mx-auto w-fit mt-10" aria-label="Pagination">
        <ul className="fr-pagination__list">
            <li>
                {currentPageNo - 1 <= 0 ?
                    <a
                    onClick={onClick}
                        className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
                        aria-disabled="true"
                        role="link"
                    >
                        Précédent
                    </a> :
                    <Link
                        onClick={onClick}
                        to={baseUrl}
                        state={{...initialState, page: (currentPageNo - 1)}}
                        className="fr-pagination__link rounded-full fr-pagination__link--prev fr-pagination__link--lg-label"
                        role="link"
                        replace={true}
                    >
                        Précédent
                    </Link>
                }
            </li>

            {generatedPageNos.map(generatedPageNo => <li>
                <NavLink
                    onClick={onClick}
                    to={baseUrl}
                    className="fr-pagination__link rounded-full"
                    role="link"
                    title={`Page ${generatedPageNo}`}
                    replace={true}
                    state={{...initialState, page: generatedPageNo}}
                    aria-current={generatedPageNo === currentPageNo ? "page" : "false"}
                >
                    {generatedPageNo}
                </NavLink>
            </li>)}


            <li>
                {currentPageNo >= nbPage ?
                    <a
                        onClick={onClick}
                        className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
                        aria-disabled="true"
                        role="link"
                    >
                        Suivant
                    </a> : <Link
                        onClick={onClick}
                        to={baseUrl}
                        className="fr-pagination__link rounded-full fr-pagination__link--next fr-pagination__link--lg-label"
                        role="link" replace={true}
                        state={{...initialState, page: (currentPageNo + 1)}}
                    >
                        Suivant
                    </Link>
                }
            </li>

        </ul>
    </nav>
};

export default Pagination;
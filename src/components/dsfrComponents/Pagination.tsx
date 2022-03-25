interface PaginationProps { 
    cursor1: string
    cursor2: string
    cursor3: string
    cursor4: string

} 

const Pagination: React.FC<PaginationProps> = ({cursor1, cursor2, cursor3, cursor4}) => { 

    return (

        <>

            <nav role="navigation" className="fr-pagination" aria-label="Pagination">
                <ul className="fr-pagination__list">

                    <li>
                        <a href="#" className="fr-pagination__link fr-pagination__link--first" aria-disabled="true" role="link">
                            Première page
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label" aria-disabled="true" role="link">
                            Page précédente
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link" aria-current="page" title="Page 1">
                            {cursor1}
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link" aria-current="page" title="Page 1">
                            {cursor2}
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link" aria-current="page" title="Page 1">
                            {cursor3}
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link" aria-current="page" title="Page 1">
                            {cursor4}
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label">
                            Page suivante
                        </a>
                    </li>

                    <li>
                        <a href="#" className="fr-pagination__link fr-pagination__link--last">
                            Dernière page
                        </a>
                    </li>
                    
                </ul>
            </nav>  

        </>
    ) 
}; 

export default Pagination;
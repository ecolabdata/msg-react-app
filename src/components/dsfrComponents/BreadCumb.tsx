import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

interface BreadCumbProps { 

} 

const BreadCumb: React.FC = () => {

    const [navHistory, setNavHistory] = useState<{urlToRedirect:string, slugToDisplay:string}[]>([]) 
    const location = useLocation();

    const createSlugForBreadCumb = () => {

        const pageLocationWithoutSpecialCharacters = window.location.pathname.replace(/[^a-zA-Z]/g, " ");
        const pageLocationFirstLetterUppercase = pageLocationWithoutSpecialCharacters.charAt(1).toUpperCase() + pageLocationWithoutSpecialCharacters.slice(2);
        const pathNameAlreadyPresentInNavigationHistory = navHistory.find(pageDataObject =>  pageDataObject.slugToDisplay === pageLocationFirstLetterUppercase );
        const pageData = {
            urlToRedirect : location.pathname, 
            slugToDisplay: pageLocationFirstLetterUppercase 
        };

        if(pageLocationFirstLetterUppercase.length > 1 && pathNameAlreadyPresentInNavigationHistory === undefined  ){

            setNavHistory([...navHistory,pageData]);

        }

        return pageLocationFirstLetterUppercase;    
    };

    //? Manage the return browser button layout ( need to refresh to get the right layout after a go back)
    // window.addEventListener('popstate', event => { 

    //     setNavHistory(navHistory.splice(-3))
    // });

    // useEffect(() => {

    //     if (location.pathname !== "/" ) {
    //         createSlugForBreadCumb();
    //     }
        
    // },[window.location.pathname, navHistory]);

    useEffect(() => {
        console.log('window.history A CHANGE :>> ', window.history);
    },[window.history])

    return (

        <nav role="navigation" className="fr-breadcrumb !max-w-headerSize mx-auto" aria-label="vous êtes ici :">
            <button className="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb-1">Voir le fil d’Ariane</button>
            <div className="fr-collapse" id="breadcrumb-1">
                <ol className="fr-breadcrumb__list">
                    <li>
                        <a className="fr-breadcrumb__link" href="/">Accueil</a>
                    </li>

                    {navHistory.length > 1 &&  navHistory.map( (visitedPageDataObject, visitedPageDataObjectIndex) => {

                        if (visitedPageDataObjectIndex < navHistory.length -1) {
                            console.log('visitedPageDataObject.urlToRedirect :>> ', visitedPageDataObject.urlToRedirect);
                            return(
                                <li>
                                    <a className="fr-breadcrumb__link" href={visitedPageDataObject.urlToRedirect}> {visitedPageDataObject.slugToDisplay}</a>
                                </li>
                            )
    
                        }
                        return;
                    })}

                    <li>
                        <a className="fr-breadcrumb__link" aria-current="page">{createSlugForBreadCumb()}</a>
                    </li>


                </ol>
            </div>
        </nav>
    ) 
}; 

export default BreadCumb;
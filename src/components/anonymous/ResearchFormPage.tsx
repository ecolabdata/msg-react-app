
import { useState } from 'react';
import { Search, useNavigate, useParams } from 'react-router-dom';
import { ApiResponse, getSearch, searchByQuery } from '../../api/Api';
import { investisseur } from '../../model/CardType';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';
import Scrollable from '../customComponents/Scrollable';


const ResearchForm: React.FC = (props) => {


    const { searchId } = useParams();
    const navigate = useNavigate();
    const initialSearch = searchId ? getSearch(searchId) : null
    console.log({ initialSearch })
    const [description, setDescription] = useState(initialSearch?.query.description || "")

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (description.length > 0) {
            searchByQuery({ description/**/ }).then((search) => navigate(`/recherche/${search.id}`))
        }
    };

    return (
        <>
            <div className="formContainer flex flex-col items-center">

                <h1 className="w-3/5 font-bold text-3xl text-center mx-auto"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>

                <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm" className="mt-8 rounded-md w-form h-form flex flex-col items-center bg-background-form">

                    <h2 className="mt-3 w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</h2>

                    <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                        className="rounded-t-sm mt-4 w-11/12 h-32 addBorder-b border-3 border-gray-300 p-4 bg-background-inputs" placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”"></textarea>

                    <button className="addBorder-b border-b self-start ml-5 mt-2 text-sm "> Affiner par mots clés</button>


                    <div className="keyWordsContainer">

                    </div>
                </form>

                <button form="keywordsForm" className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">rechercher !</span> </button>

            </div>

            <div className="researchResultContainer ml-28">
                <ResultResearchPreviewCard cardType={investisseur}>
                    {initialSearch?.resp.cards.investisseurs.map(x => <ResultPreviewCard cardData={x} />)}
                </ResultResearchPreviewCard>
            </div>
        </>
    )
};

export default ResearchForm;
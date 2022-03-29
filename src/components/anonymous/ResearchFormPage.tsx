
import { useSelector, useDispatch } from 'react-redux';

import { appActions } from '../../_actions/app.actions';
import { RootState } from '../../_reducers/root.reducer';
import { useEffect, useState } from 'react';
import { userActions } from '../../_actions/user.actions';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';
import { Signal, Calendar, Euro, Rocket, Eye } from '../../assets/Icons';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import sha1 from 'sha1';

const ResearchForm: React.FC = (props) => {

    const dispatch = useDispatch();
    // const { textAreaInput } = useSelector((state: RootState) => state.appState);
    // const { keyWordsList } = useSelector((state: RootState) => state.userState);
    const { searchId } = useParams();
    const savedDescription = localStorage.getItem(`search-${searchId}-description`) || ""
    const savedResults = localStorage.getItem(`search-${searchId}-results`) || ""
    const [description, setDescription] = useState(savedDescription)

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (description.length > 0) {
            //Will work when the API will be connected
            //dispatch(userActions.recordUserKeyWordsResearch(userKeyWordsList));
            const searchId = sha1(description).slice(0, 8);
            localStorage.setItem(searchId, description);
            window.history.pushState(window.history.state, "", `/recherche/${searchId}`)
        }
    };

    // useEffect(() => {
    // }, [textAreaInput, keyWordsList])

    return (
        <>
            <div className="formContainer flex flex-col items-center">

                <h1 className="w-3/5 font-bold text-3xl text-center mx-auto"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                
                <form  onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm" className="mt-8 rounded-md w-form h-form flex flex-col items-center bg-background-form">
                    
                    <h2 className="mt-3 w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</h2>
                    
                    <textarea onChange = {e => setDescription(e.target.value)} value={description} form="keywordsForm"
                    className="rounded-t-sm mt-4 w-11/12 h-32 addBorder-b border-3 border-gray-300 p-4 bg-background-inputs" placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”"></textarea>
                    
                    <button className="addBorder-b border-b self-start ml-5 mt-2 text-sm "> Affiner par mots clés</button>
                    

                    <div className="keyWordsContainer">

                    </div>
                </form>

                <button form="keywordsForm" className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">rechercher !</span> </button>

            </div>

            <div className="researchResultContainer ml-28">
                <>
                    <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats" />
                    <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats" />
                    <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats" />
                    <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats" />
                    <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats" />
                </>
            </div>
        </>
    )
};

export default ResearchForm;
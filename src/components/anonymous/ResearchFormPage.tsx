
import { useSelector, useDispatch } from 'react-redux';
import {appActions} from '../../_actions/app.actions';
import {RootState} from '../../_reducers/root.reducer';
import { useEffect } from 'react';
import { userActions } from '../../_actions/user.actions';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';
import {Signal, Calendar, Euro, Rocket, Eye} from '../../assets/Icons';

const ResearchForm: React.FC = () => {

    const dispatch = useDispatch();
    const { textAreaInput } = useSelector((state:RootState) => state.appState);
    const { keyWordsList } = useSelector((state:RootState) => state.userState);
    
    const SVGSignalLogo = () => {
        return (
            <>
            
                {Signal({color:"#F95C5E", viewBox:"0 0 14 14", height:"32", width:"32"})}
            
            </>
        )
    };

    const SVGCalendarLogo = () => {
        return (
            <>
            
                {Calendar({color:"#D8C634", viewBox:"0 0 24 24", width:"24", height:"24"})}
            
            </>
        )
    };

    const SVGEuroLogo = () => {
        return (
            <>
            
                {Euro({color:"#68A532", viewBox:"0 0 14 14", height:"42", width:"42"})}
            
            </>
        )
    };

    const SVGRocketLogo = () => {
        return (
            <>
            
                {Rocket({color:"#8585F6", viewBox:"0 0 14 14", height:"20", width:"20"})}
            
            </>
        )
    };

    const SVGEyeLogo = () => {
        return (
            <>
            
                {Eye({color:"#A558A0",  viewBox:"0 0 16 14", height:"24", width:"24"})}
            
            </>
        )
    };
    
    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(textAreaInput.length > 0){

            const userKeyWordsList = textAreaInput.split(' ');
            //Will work when the API will be connected
            dispatch(userActions.recordUserKeyWordsResearch(userKeyWordsList));
        
        }else{

            // event.preventDefault();
        }
    };

    const handleOnChangeInput = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(appActions.updateStateProperty(event.target.value, 'textAreaInput'))
    };
    
    useEffect( () => {
    },[textAreaInput, keyWordsList])

    return (
        <>
            <div className="formContainer flex flex-col items-center">
                
                <h1 className="w-3/5 font-bold text-3xl text-center mx-auto"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                
                <form  onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm" className="mt-8 w-form h-form flex flex-col items-center p-4 bg-slate-300">
                    <h2 className=" mt-3 w-content text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</h2>
                    <textarea onChange = { (event) => handleOnChangeInput(event)} name={textAreaInput} value={textAreaInput} form="keywordsForm"
                    className="mt-4 w-11/12 h-32 p-2 addBorder border-2 bg-slate-200" placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”"></textarea>
                    <button className=" border-b self-start ml-5 mt-2 text-sm text-blue-france "> Affiner par mots clés</button>
                    
                    <div className="keyWordsContainer">

                    </div>
                </form>
                
                <button form="keywordsForm" className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">rechercher !</span> </button>

            </div>

            <div className="researchResultContainer ml-28">
                
                {textAreaInput !== undefined  && 
                    <>
                        <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats"   />
                        <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats"  />
                        <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats"  />
                        <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats"  />
                        <ResultResearchPreviewCard investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." emetor="Pexe" cardTitle="Arts et métiers business angels" redirectionButton="/liste-resultats"  />
                    </>
                }

            </div>
        </>
    ) 
}; 

export default ResearchForm;
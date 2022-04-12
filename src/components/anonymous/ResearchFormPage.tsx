import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnyCard, searchByQuery } from '../../api/Api';
import { all as allCardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';

const allSecteur = [
    "Numérique éco-responsable",
    "Alimentation et agriculture durables",
    "Eau, biodiversité et biomimétisme",
    "Économie circulaire",
    "Santé environnement",
    "Energies renouvelables et décarbonées",
    "Innovations maritimes et écosystèmes marins",
    "Prévention des risques",
    "Bâtiments et villes durables",
    "Décarbonation de l'industrie",
    "Mobilité durable"
]

const ResearchForm: React.FC = (props) => {
    const { usedCorbeille } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille

    const navigate = useNavigate();
    const location = useLocation();
    const initialState = location.state as InitialState | null;
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialState?.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.secteurs || [])

    useEffect(() => {
        setIsLoading(false)  
    }, [initialState])

    useEffect(() => {
        const element = document.getElementById('previews')
        if (!element) return;
        window.scrollTo({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
    }, [isLoading]);

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        if (description.length > 0) {
            searchByQuery({type: "general", description/*, keywords*/, secteurs }).then((search) => {
                return navigate(`/recherche`, {state: {
                    description,
                    secteurs,
                    cardsById: search.cardsById
                }})
            })
        }
    };
    
    const previews = initialState?.cardsById != undefined && allCardType.map(cardType => {
        const results: AnyCard[] = Object.values(initialState?.cardsById != undefined && initialState.cardsById).filter(x => x.cardTypeName == cardType.name);
        if (!results || results.length === 0) return null;
        console.log(cardType.name)
        return (
            <ResultResearchPreviewCard cardType={cardType} initialState={initialState} resultCount={results.length}>
                {results.filter(x => !isInCorbeille(x)).map(x => <div className="ml-6">
                    <ResultPreviewCard cardData={x} cardType={cardType}/>
                </div>
                )}
            </ResultResearchPreviewCard>
        )
    })

    return (
        <>
            <div className="formContainer flex flex-col items-center">

                <h1 className="w-3/5 font-bold text-4xl text-center mx-auto max-w-4xl"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                <div className="mt-8 rounded-md bg-background-form">
                    <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm" className="w-[900px] flex items-center m-8">
                        <div className='flex flex-col w-[500px]'>
                            <h2 className="w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</h2>

                            <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                                className="cursor-text rounded-t-sm mt-4 w-11/12 h-56 addBorder-b border-3 border-gray-300 p-4 bg-background-inputs" placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”"></textarea>
                        </div>
                        {/* <button className="addBorder-b border-b self-start ml-5 mt-2 text-sm ">Affiner par mots clés</button> */}
                        <div className='flex flex-wrap w-[400px] h-[300px] flex-col'>
                            {allSecteur.map(secteur => <div className="fr-checkbox-group fr-checkbox-group--sm w-[180px]">
                                <input type="checkbox" id={secteur} name={secteur} checked={secteurs.includes(secteur)} onChange={e => {
                                    e.currentTarget.checked ? setSecteurs([...secteurs, secteur]) : setSecteurs(secteurs.filter(x => x != secteur))
                                }} />
                                <label className="fr-label text-xs" htmlFor={secteur}>{secteur}</label>
                            </div>)}
                        </div>
                        <div className="keyWordsContainer">
                                
                        </div>
                    </form>
                </div>
                <button form="keywordsForm" className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">rechercher !</span> </button>

            </div>

            {previews && !isLoading && <div id="previews" className="researwchResultContainer mt-4">
                {previews}
            </div>}
            {isLoading && <div className='mx-auto'>Ca charge</div>}
        </>
    )
};

export default ResearchForm;
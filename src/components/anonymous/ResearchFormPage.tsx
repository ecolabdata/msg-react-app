import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnyCard, search } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { all as allCardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import ResultResearchPreviewCard from '../customComponents/ResultResearchPreviewCard';
import KeyWordsLabel from '../dsfrComponents/KeyWordsLabel';
import Select from '../dsfrComponents/Select';
import RocketLogo from './../../assets/icons/Rockett.svg';
import KeywordsLogo from './../../assets/icons/Keywords.svg';
import ThematicsLogo from './../../assets/icons/Thematics.svg';
import { ThematicsEnum } from '../../model/ThematicsEnum';


const ResearchForm: React.FC<{alpha: boolean}> = ({alpha}) => {
    
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const navigate = useNavigate();
    const location = useLocation();
    useTitle(`Explorer `)
    const initialState = location.state as InitialState | null;
    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialState?.search.query.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.search.query.secteurs || [])
    const [motsclefs, setMotsclef] = useState<string[]>(initialState?.search.query.motsclefs || [])
    const [errorTxt, setErrorTxt] = useState(<></>)
    const thematicsValues = Object.values(ThematicsEnum);

    const handleOnSubmitForm = (ctrlPress:boolean) => {
        if (description.length > 0) {
            setIsLoading(true)
            setErrorTxt(<></>)
            search({description, motsclefs, secteurs }).then((search) => {
                setIsLoading(false)
                const element = document.getElementById('previews')
                if (element) setNextScrolTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
                navigate(ctrlPress ? `/explorer-alpha` : `/explorer`, {state: {search}})
            })
        } else {
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    const previews = allCardType.filter(x => alpha || x.version === "beta").map(cardType => {
        if (!initialState) return null;
        const results : AnyCard[] = initialState.search.cards[cardType.apiName];
        if (results.length === 0) return null;

        return (
            <ResultResearchPreviewCard cardType={cardType} initialState={initialState} resultCount={results.length}>
                {results.filter(x => !isInCorbeille(x)).map(x => <div className="ml-6">
                    <ResultPreviewCard cardData={x} cardType={cardType} />
                </div>
                )}
            </ResultResearchPreviewCard>
        )
    })

    return (
        <>
            <div className="formContainer flex flex-col items-center">

                <h1 className="w-3/5 font-bold text-4xl text-center mx-auto max-w-4xl"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                   
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        handleOnSubmitForm(false)
                    }} id="keywordsForm" className="m-8 w-[80%] p-4 flex justify-around">

                        <div className='leftSideForm max-w-[48%] max-h-[400px] p-4 projectContainer flex flex-col items-around justify-center items-center bg-background-form '>
                            
                            <div className="tilteContainer relative bottom-4 w-fit flex">
                                <img src={RocketLogo} alt="Logo" />
                                <h2 className="italic text-dark-text-action text-3xl  font-[Spectral]">1. Votre projet</h2>
                            </div>

                            <p className="w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</p>
                            <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                                className="cursor-text my-8 min-h-[225px] rounded-t-sm mt-4 w-11/12 addBorder-b border-3 border-gray-300 p-4 bg-background-inputs" 
                                placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”">

                            </textarea>

                        </div>

                        <div className="rightSideForm min-w-[48%] w-1/4 max-h-[400px] flex flex-col items-center">

                            <div className='thematicsContainer h-[200px] w-full flex flex-col items-center  bg-background-form'>

                                <div className="tilteContainer spectral relative bottom-4 w-fit flex">
                                    <img src={ThematicsLogo} alt="Logo" />
                                    <h2 className="italic text-dark-text-action text-3xl font-[Spectral]"> 2. La thématique</h2>
                                </div>

                                <Select classes="w-[80%] my-4"label="Thématique du projet" optionsData={thematicsValues} onChange={e => {
                                    console.log("Setting secteur to ", [e.currentTarget.value])
                                    setSecteurs([e.currentTarget.value])
                                }}/>

                            </div>

                            <div className="keyWordsContainer mt-8 h-[200px] w-full flex flex-col items-center p-2  bg-background-form">

                                <div className="tilteContainer relative w-fit flex">
                                    <img src={KeywordsLogo} alt="Logo" />
                                    <h2 className="italic text-dark-text-action text-3xl font-[Spectral]"> 3. Les mots clés</h2>
                                </div>

                                <p className="w-fit -ml-10 text-sm text-white
                                2xl:text-base">Ajoutez des mots clés représentatifs de votre activité (facultatif)</p>
                                <p className="italic text-xs font-bold">délimitez vos mots clés par une virgule</p>
                                <textarea
                                    onChange={e => {

                                        const motsclefs = e.target.value.split(",").map(x => x.trim())

                                    
                                        console.log({ motsclefs })
                                        setMotsclef(motsclefs)
                                    }}
                                    className="cursor-text rounded-t-sm mt-4 h-15 w-[80%] addBorder-b border-3 border-gray-300 p-4 bg-background-inputs"
                                >
                                    {motsclefs.join(", ")}
                                </textarea>
                                    
                                    <ul className="keyWordsList h-full w-full mt-2 p-2 flex flex-wrap ">

                                        {motsclefs.map( word => { 
                                            console.log('word :>> ', word);
                                            return <li> <KeyWordsLabel keyWord={word}/> </li>
                                            
                                        })}

                                    </ul>

                            </div>

                        </div>

                    </form>

                <div className='h-12 w-full flex justify-center items-center color'>
                    {errorTxt}
                </div>
                
                <div className='buttonsContainer w-[450px] flex justify-around'>
                    
                    <button className="w-48 h-14 text-base  underline capitalize" > Réinitialiser </button>
                    <button onClick={(event) => {
                        event.preventDefault()
                        handleOnSubmitForm(event.ctrlKey)
                    }} form="keywordsForm" disabled={isLoading} className="w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">{isLoading ? "Chargement..." : "rechercher !"}</span> </button>

                </div>

            </div>

            {previews && !isLoading && <div id="previews" className="researwchResultContainer mt-4">
                {previews}
            </div>}
            {isLoading && <div className='mx-auto'>Ca charge</div>}
        </>
    )
};

export default ResearchForm;
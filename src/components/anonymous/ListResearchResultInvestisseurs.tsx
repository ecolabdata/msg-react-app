import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnyCard, InvestisseurQuery, Search, searchInvestisseur } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { CardType, investisseur } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import Pagination from '../dsfrComponents/Pagination';
// import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

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
    "Mobilité durable",
    "Finance durable & RSE"
]

const ListResearchResultInvestisseurs = () => {
    const cardType = investisseur
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const location = useLocation();
    const initialState = location.state as (InitialState & { page?: number, montantMin: number }) | null;


    const pageNo = initialState?.page || 1
    const navigate = useNavigate()
    useTitle(`Recherche détaillé ${cardType.title}`)

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialState?.search.query.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.search.query.secteurs || [])
    const [montantMin, setMontantMin] = useState<number>((initialState?.search.query as (InvestisseurQuery | undefined))?.montantMin || 0)
    const [motsclefs, setMotsclef] = useState<string[]>(initialState?.search.query.motsclefs || [])
    const [errorTxt, setErrorTxt] = useState(<></>)


    let displayCards: JSX.Element[] | undefined;
    let allCards: Search['cards']['investisseurs']  = []
    let nbPage: number | undefined;
    if (initialState) {
        allCards =  initialState.search.cards.investisseurs
        const pageChunkSize = 20;
        nbPage = Math.ceil(allCards.length / pageChunkSize)
        displayCards = allCards.filter(x => !isInCorbeille(x))
            .slice(
                (pageNo - 1) * pageChunkSize,
                pageNo * pageChunkSize
            ).map((card) => <ResultPreviewCard cardType={cardType} cardData={card} />);
    }
    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (description.length > 0) {
            setIsLoading(true)
            setErrorTxt(<></>)
            searchInvestisseur({
                type: "investisseur",
                description,
                motsclefs,
                secteurs,
                montantMin
            }).then((search) => {
                setIsLoading(false)
                return navigate(`${cardType.searchLink}/search`, {
                    replace: true,
                    state: {search}
                })
            })
        } else {
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    return (

        <>

            <div className="headContainer
            mt-10 mx-auto max-w-[1240px]
            xl:mx-auto
            ">

                <div className="flex">
                    <button onClick={() => window.history.back()} className="ml-4 text-dark-text-action flex mt-4 rm-link-underline "> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>
                </div>

                <div className="cardTitle mt-10 ml-4 p-2 text-base">

                    <h2 className="w-fit font-bold text-4xl">

                        <div className="flex items-center">
                            <cardType.SVGLogo width="30" height="30" style={{ color: cardType.color }} /> &nbsp;
                            {cardType.title} &nbsp; <span className="bg-yellow text-3xl font-light">{`(${allCards.length})`}</span>
                        </div>

                    </h2>

                    <p className="mt-2 text-base">{cardType.description}</p>
                </div>


                <div className=" flex flex-col items-center w-full">
                    <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm">
                        <div className="formContainer flex flex-col items-center">
                            <div className="mt-8 rounded-md bg-background-form">
                                <div className="w-[900px] flex items-center m-8 flex-wrap">
                                    <div className='flex flex-col w-[500px]'>
                                        <h2 className="w-11/12 text-base text-center">Décrivez en quelques lignes votre projet (thématique, technologie, cible, apports... ) pour obtenir des pistes pertinentes.</h2>

                                        <textarea onChange={e => setDescription(e.target.value)} value={description} form="keywordsForm"
                                            className="cursor-text rounded-t-sm mt-4 w-11/12 h-[300px] addBorder-b border-3 border-gray-300 p-4 bg-background-inputs" placeholder="Expl. : “start-up de méthanisation” ou “nous sommes une startup spécialisée dans le processus biologique de dégradation des matières organiques...”"></textarea>
                                    </div>
                                    {/* <button className="addBorder-b border-b self-start ml-5 mt-2 text-sm ">Affiner par mots clés</button> */}
                                    <div>
                                        <h2 className="mb-8 w-11/12 text-base">Thématiques</h2>
                                        <div className='flex flex-wrap w-[400px] h-[300px] flex-col'>
                                            {allSecteur.map(secteur => <div className="fr-checkbox-group fr-checkbox-group--sm w-[180px]">
                                                <input type="checkbox" id={secteur} name={secteur} checked={secteurs.includes(secteur)} onChange={e => {
                                                    e.currentTarget.checked ? setSecteurs([...secteurs, secteur]) : setSecteurs(secteurs.filter(x => x != secteur))
                                                }} />
                                                <label className="fr-label text-xs" htmlFor={secteur}>{secteur}</label>
                                            </div>)}
                                        </div>
                                        <div className="keyWordsContaine w-full">
                                            <h2 className="mt-8 w-11/12 text-base">Mots-clefs</h2>
                                            <textarea
                                                onChange={e => {
                                                    const motsclefs = e.target.value.split(",").map(x => x.trim())
                                                    console.log({ motsclefs })
                                                    setMotsclef(motsclefs)
                                                }}
                                                className="cursor-text rounded-t-sm mt-4 h-15 w-full addBorder-b border-3 border-gray-300 p-4 bg-background-inputs"
                                            >
                                                {motsclefs.join(", ")}
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-12 w-full flex justify-center items-center color'>
                                {errorTxt}
                            </div>

                        </div>
                        <div className="researchContainer max-w-[1240px] w-full p-6 flex flex-col bg-research-precision-container items-center  lg:p-1">

                            <h2 className=" bold text-xl text-center mt-4" style={{ color: cardType.color }}>Preciser la recherche </h2>


                            <div className="inputsContainer p-4 flex justify-center items-middle
                            lg:justify-between lg:items-end
                            xl:justify-center">
                                <div className="my-2 flex flex-col items-center lg:flex-row lg:mb-6">
                                    <div className="inputNumber mr-6 flex flex-col font-light ">
                                        <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                                        <input
                                            className={`text-white rounded-t-md w-64 h-10 addBorder-b border-2 bg-input-background`}
                                            style={{ borderColor: cardType.color }} type="number" id="montantKEuro"
                                            defaultValue={montantMin.toString()}
                                            onChange={e => setMontantMin(Number.parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>

                                {/* <div className="toggleButtons w-fit flex flex-col
                        lg:flex-row lg:mb-6">
                            {Object.keys(toggles).map(x => <ToggleButton label={x} checked={toggles[x]} color={cardType.color} onChange={e => setToggles({ ...toggles, [x]: !toggles[x] })} />)}
                        </div> */}
                            </div>
                        </div>
                    </form>
                    <button form="keywordsForm" disabled={isLoading} className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">{isLoading ? "Chargement..." : "rechercher !"}</span> </button>
                </div>
            </div>

            {!isLoading && <div id="cardsContainer" className="cardsContainer mt-10 mx-auto max-w-[80%] flex flex-wrap justify-evenly bg 
            xl:mx-auto
            ">
                {displayCards}
            </div>}

            {initialState && nbPage && !isLoading && <Pagination onClick={() => {
                const element = document.getElementById('cardsContainer')
                if (element) setNextScrolTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
            }} currentPageNo={pageNo} baseUrl={cardType.searchLink} nbPage={nbPage} initialState={initialState} />}

        </>
    )
};

export default ListResearchResultInvestisseurs;
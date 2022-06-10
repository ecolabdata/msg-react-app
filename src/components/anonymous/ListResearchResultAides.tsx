import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AidesClientQuery, AidesQuery, AnyCard, Search, searchAidesClient, searchAidesInno, searchInvestisseur } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { aideClient, aideInno, CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import ToggleButton from '../dsfrComponents/ToggleButton';
import Pagination from '../dsfrComponents/Pagination';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import all_aides_types from "../../api/aide-types.json"
import Select from '../dsfrComponents/Select';
import { PitchThematicsKeywords } from '../PitchThematicsKeywords';

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

const echeances: Record<string, number> = {
    "Moins d'1 mois": 1,
    "Moins de 3 mois": 3,
    "Moins de 6 mois": 6
}

const ListResearchResultAides: React.FC<{ cardType: CardType }> = ({ cardType }) => {
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const location = useLocation();
    const initialState = location.state as (InitialState & { page?: number, montantMin: number }) | null;
    const initialQuery = initialState?.search.query as (AidesQuery | null)

    const pageNo = initialState?.page || 1
    const navigate = useNavigate()
    useTitle(`Recherche détaillé ${cardType.title}`)

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialQuery?.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialQuery?.secteurs || [])
    const [motsclefs, setMotsclef] = useState<string[]>(initialQuery?.motsclefs || [])
    const [errorTxt, setErrorTxt] = useState(<></>)
    const [toggles, setToggles] = useState({
        "Afficher les aides permanentes": (initialQuery && initialQuery["Afficher les aides permanentes"] != undefined) ? initialQuery["Afficher les aides permanentes"] : true
    })
    const [aid_type, setAid_type] = useState(initialQuery?.aid_type || "")
    const [echeance, setEcheance] = useState(initialQuery?.echeance || "")
    const toggleKeys = Object.keys(toggles) as (keyof typeof toggles)[]
    const pageChunkSize = 20;
    const filteredCards: JSX.Element[] | undefined = useMemo(() => {
        console.log("Running use memo")
        if (initialState?.search.cards) {
            let allCards: AnyCard[] = cardType.name === "aides-innovations" ? initialState.search.cards.aides_innovation : initialState.search.cards.aides_clients
            allCards = allCards.filter(x => !isInCorbeille(x))
            if (aid_type) allCards = allCards.filter(x => x.aid_types?.includes(aid_type))
            if (echeance) {
                allCards = allCards.filter(card => {
                    if (card.name === "Réaliser des projets de solidarité internationale d'accès à l'eau") debugger;
                    if (card.submission_deadline) {
                        const Xmonth = echeances[echeance]
                        const XmonthLater = new Date()
                        XmonthLater.setMonth(XmonthLater.getMonth() + Xmonth)
                        const deadline = new Date(card.submission_deadline)
                        return deadline < XmonthLater
                    } else {
                        return toggles["Afficher les aides permanentes"]
                    }
                })
            }
            if (!toggles["Afficher les aides permanentes"]) allCards = allCards.filter(card => card.submission_deadline)
            return allCards
        } else {
            return []
        }
    }, [initialState]).map((card) => <ResultPreviewCard isLoading={isLoading} cardType={cardType} cardData={card} />);

    const nbPage = Math.ceil(filteredCards.length / pageChunkSize)
    const cardsSlice = filteredCards.slice(
        (pageNo - 1) * pageChunkSize,
        pageNo * pageChunkSize
    )

    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (description.length > 0) {
            setIsLoading(true)
            setErrorTxt(<></>)
            if (cardType.name === "aides-clients") {
                searchAidesClient({
                    description,
                    motsclefs,
                    secteurs,
                    "Afficher les aides permanentes": toggles["Afficher les aides permanentes"],
                    aid_type,
                    echeance

                }).then((search) => {
                    setIsLoading(false)
                    return navigate(cardType.searchLink+'/search', {
                        replace: true,
                        state: { search }
                    })
                })
            } else if (cardType.name === "aides-innovations") {
                searchAidesInno({
                    description,
                    motsclefs,
                    secteurs,
                    "Afficher les aides permanentes": toggles["Afficher les aides permanentes"],
                    aid_type,
                    echeance

                }).then((search) => {
                    setIsLoading(false)
                    return navigate(cardType.searchLink+'/search', {
                        replace: true,
                        state: { search }
                    })
                })
            }
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

                    <h2 className="w-fit font-bold  text-2xl md:text-4xl">

                        <div className="flex items-center">
                            <cardType.SVGLogo width="30" height="30" style={{ color: cardType.color }} /> &nbsp;
                            {cardType.title} &nbsp; <span className="bg-yellow md:text-3xl font-light">{`(${filteredCards.length})`}</span>
                        </div>

                    </h2>

                    <p className="mt-2 text-base">{cardType.description}</p>
                </div>


                <div className=" flex flex-col items-center w-full">
                    <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm">
                        <div className="m-auto flex justify-around mt-8 flex-wrap">
                            <PitchThematicsKeywords
                                usedDescription={[description, setDescription]}
                                usedMotsClef={[motsclefs, setMotsclef]}
                                usedSecteurs={[secteurs, setSecteurs]}
                            />
                        </div>
                        <div className="researchContainer max-w-[1240px] w-full p-6 flex flex-col bg-research-precision-container items-center  lg:p-1">

                            <h2 className=" bold text-xl text-center mt-4" style={{ color: cardType.color }}>Preciser la recherche </h2>


                            <div className="inputsContainer p-4 flex justify-center items-middle
                            lg:justify-between lg:items-end
                            xl:justify-center flex-wrap">
                                {/* <div className="my-2 flex flex-col items-center lg:flex-row lg:mb-6">
                                    <div className="inputNumber mr-6 flex flex-col font-light ">
                                        <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                                        <input
                                            className={`text-white rounded-t-md w-64 h-10 addBorder-b border-2 bg-input-background`}
                                            style={{ borderColor: cardType.color }} type="number" id="montantKEuro"
                                            defaultValue={montantMin.toString()}
                                            onChange={e => setMontantMin(Number.parseInt(e.target.value))}
                                        />
                                    </div>
                                </div> */}

                                <Select classes="my-4" label="Nature de l'aide"
                                    color={cardType.color}
                                    defaultOption={"Toutes"}
                                    optionsData={all_aides_types.results.map(x => x.name)} onChange={e => {
                                        setAid_type(e.currentTarget.value)
                                    }} />
                                &nbsp;&nbsp;&nbsp;
                                <Select classes="my-4" label="Echéance"
                                    color={cardType.color}
                                    defaultOption={"Toutes"}
                                    optionsData={Object.keys(echeances)} onChange={e => {
                                        setEcheance(e.currentTarget.value)
                                    }} />
                                <div className="toggleButtons w-fit flex flex-col
                        lg:flex-row lg:mb-6">
                                    {toggleKeys.map(x => <ToggleButton label={x} checked={toggles[x]} color={cardType.color} onChange={e => setToggles({ ...toggles, [x]: !toggles[x] })} />)}
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='h-12 w-full flex justify-center items-center color'>
                        {errorTxt}
                    </div>
                    <button form="keywordsForm" disabled={isLoading} className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">{isLoading ? "Chargement..." : "rechercher !"}</span> </button>
                </div>
            </div>

            {cardsSlice.length > 0 ? <div id="cardsContainer" className="cardsContainer mt-10 mx-auto max-w-[80%] flex flex-wrap justify-evenly bg 
            xl:mx-auto
            ">
                {cardsSlice}
            </div> : initialState ? "Aucun résultat trouvé" : null}

            {initialState && <Pagination isLoading={isLoading && nbPage > 0} onClick={() => {
                const element = document.getElementById('cardsContainer')
                if (element) setNextScrolTarget({ behavior: "smooth", top: element.offsetTop - window.innerHeight * 0.20 })
            }} currentPageNo={pageNo} baseUrl={cardType.searchLink} nbPage={nbPage} initialState={initialState} />}

        </>
    )
};

export const ListResearchResultAidesInno = () => <ListResearchResultAides cardType={aideInno} />
export const ListResearchResultAidesClient = () => <ListResearchResultAides cardType={aideClient} />
import { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ACard, AidesClientQuery, AidesQuery, AnyCard, Search, searchAidesClient, searchAidesInno, searchInvestisseur } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { aideClient, aideInno, Any as AnyCardType, CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import Pagination from '../dsfrComponents/Pagination';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import { Filtrer } from '../../assets/Icons';


import { PitchThematicsKeywords } from '../PitchThematicsKeywords';
import { AnyFiltersConfig } from '../customComponents/filter/FiltersConfig';

const ListResearchResult: React.FC<{ cardType: AnyCardType, filtersConfig : AnyFiltersConfig }> =  ({ cardType, filtersConfig }) => {
    const { color } = cardType;
    console.log('typeof color :>> ', typeof color);
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext);
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille;
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget;
    const location = useLocation();
    const initialState = location.state as (InitialState & { page?: number, montantMin: number }) | null;
    const initialQuery = initialState?.search.query as (AidesQuery | null);

    const pageNo = initialState?.page || 1;
    const navigate = useNavigate();
    useTitle(`Recherche détaillé ${cardType.title}`);

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialQuery?.description || "");
    const [secteurs, setSecteurs] = useState<string[]>(initialQuery?.secteurs || []);
    const [motsclefs, setMotsclef] = useState<string[]>(initialQuery?.motsclefs || []);
    const [errorTxt, setErrorTxt] = useState(<></>)
    const pageChunkSize = 20;

    const filteredCards: JSX.Element[] | undefined = useMemo(() : AnyCard[]  => {
        
        console.log("Running use memo")
        if (initialState?.search.cards) {
            let allCards: AnyCard[] = cardType.name === "aides-innovations" ? initialState.search.cards.aides_innovation : initialState.search.cards.aides_clients
            return filtersConfig.filterCards(, allCards).filter( x => !isInCorbeille(x));
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
            
            switch (cardType.name) {
                
                case "aides-clients":
                    return searchAidesClient({
                        description,
                        motsclefs,
                        secteurs,
                        "Afficher les aides permanentes": toggles["Afficher les aides permanentes"],
                        aid_type,
                        echeance
    
                    }).then((search) => {
                        setIsLoading(false)
                        return navigate(cardType.searchLink, {
                            replace: true,
                            state: { search }
                        })
                    })

                case "aides-innovations":
                    return searchAidesInno({
                        description,
                        motsclefs,
                        secteurs,
                        "Afficher les aides permanentes": toggles["Afficher les aides permanentes"],
                        aid_type,
                        echeance
    
                    }).then((search) => {
                        setIsLoading(false)
                        return navigate(cardType.searchLink, {
                            replace: true,
                            state: { search }
                        })
                    })

                default : 
                    return Promise.reject("Unknown card type")
            }

        } else {
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    return (
        <>
            <div className="headContainer  container mt-10 mx-auto max-w-headerSize
            xl:mx-auto
            ">

                <button onClick={() => window.history.back()} className="text-dark-text-action flex mt-4 rm-link-underline "> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>

                <div className="cardTitleAndLogo mt-10 p-2 text-base">

                    <h2 className="w-fit font-bold text-2xl md:text-4xl">

                        <div className="flex items-center ">
                            <cardType.SVGLogo width="30" height="30" style={{ color: cardType.color }} /> &nbsp;
                            {cardType.title} &nbsp; <span className="bg-yellow md:text-3xl font-light">{`(${filteredCards.length})`}</span>
                        </div>

                    </h2>

                    <p className="mt-2 text-base">{cardType.description}</p>
                </div>


                <div className="flex flex-col items-center w-full">
                    
                    <form onSubmit={(event) => handleOnSubmitForm(event)} id="keywordsForm" className="h-fit w-full">
                        
                        <div className="researchContainer m-auto flex justify-around flex-wrap">

                            <PitchThematicsKeywords
                                usedDescription={[description, setDescription]}
                                usedMotsClef={[motsclefs, setMotsclef]}
                                usedSecteurs={[secteurs, setSecteurs]}
                                usedInListPage={true}
                            />

                        </div>
                        
                        <div className="specifyResearchContainer mt-2 min-h-[160px] max-w-headerSize w-full flex flex-col items-center justify-center  bg-research-precision-container
                        lg:mt-2 lg:justify-center">
                            
                            <div className="specifyAndLogoContainer w-full ">

                                <h2 className={`mt-4 bold text-xl text-[${cardType.color}] flex justify-center items-center`}>
                                    <Filtrer className="mr-6" width="20" height="20"/> 
                                    Préciser la recherche 
                                </h2>

                            </div>

                            <div className="inputsAndToggleContainer self-end flex items-end  justify-around w-full mt-2
                            ">

                                <div className="inputsContainer w-full mt-2 flex flex-col items-center justify-center   
                                lg:h-fit lg:w-[85%] lg:flex-row">

                                   

                                </div>

                            </div>

                        </div>

                    </form>
                    
                    <div className='h-12 w-full flex justify-center items-center color'>
                        {errorTxt}
                    </div>

                    <div className="researchButtonsContainer mt-4 w-full flex justify-center">
                        <button type="button" disabled={isLoading} className="mx-3 fr-btn fr-btn--sm underline fr-btn--tertiary-no-outline   
                        "> <span className={`mx-auto`}>Réinitialiser</span> </button>

                        <button form="keywordsForm" disabled={isLoading} className="mx-3 fr-btn fr-btn--sm fr-btn--primary 
                        "> <span className={`mx-auto`}>{isLoading ? "Chargement..." : "Valider et rechercher"}</span> </button>


                    </div>


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

export const ListResearchResultAidesInno = () => <ListResearchResult cardType={aideInno} />
export const ListResearchResultAidesClient = () => <ListResearchResult cardType={aideClient} />
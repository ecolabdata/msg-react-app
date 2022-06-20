import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AidesQuery } from '../../api/Api';
import { Filtrer } from '../../assets/Icons';
import { useTitle } from '../../hooks/useTitle';
import { aideClient, aideInno, startups, CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import { AideRequestFilter } from '../customComponents/filter/AideRequestFilter';
import { RequestFilter } from '../customComponents/filter/RequestFIlter';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import Pagination from '../dsfrComponents/Pagination';
import { PitchThematicsKeywords } from '../PitchThematicsKeywords';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

type Props = {
    cardType : CardType,
    requestFilterBuilder : (initialState : unknown) => RequestFilter
}

const ListResearchResult : React.FC<Props> = ({ cardType, requestFilterBuilder}) => {

    const { color } = cardType;
    console.log('typeof color :>> ', typeof color);
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext);
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille;
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget;
    const location = useLocation();
    console.log({state: location.state})
    const requestFilter = requestFilterBuilder(location.state)
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

    const filteredCards: JSX.Element[] | undefined = requestFilter.cards.map((card) => <ResultPreviewCard isLoading={isLoading} cardType={cardType} cardData={card} pageList={false} />);

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
            requestFilter.search(description, motsclefs, secteurs).then((search) => {
                setIsLoading(false)
                return navigate(cardType.searchLink, {
                    replace: true,
                    state: { search }
                })
            })
        } else {
            setErrorTxt(<p style={{ color: "hsla(0, 100%, 65%, 0.9)" }}>La description de l'entreprise est obligatoire</p>)
        }
    };

    return (
        <>
            <div className="headContainer  container mt-10 mx-auto max-w-headerSize
            xl:mx-auto bg-blue-500
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
                                openPitchContainerFromStart={true}
                            />

                        </div>

                        <div className="specifyResearchContainer mt-2 min-h-[160px] max-w-headerSize w-full flex flex-col items-center justify-center  bg-research-precision-container
                        lg:mt-2 lg:justify-center">

                            <div className="specifyAndLogoContainer w-full ">

                                <h2 className={`mt-4 bold text-xl text-[${cardType.color}] flex justify-center items-center`}>
                                    <Filtrer className="mr-6" width="20" height="20" />
                                    Préciser la recherche
                                </h2>

                            </div>

                            <div className="inputsAndToggleContainer self-end flex items-end  justify-around w-full mt-2
                            ">

                                <div className="inputsContainer w-full mt-2 flex flex-col items-center justify-center   
                                lg:h-fit lg:w-[85%] lg:flex-row">

                                    <requestFilter.Component />

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


export const ListResearchResultAidesClient = () => <ListResearchResult cardType={aideClient} requestFilterBuilder={initState => new AideRequestFilter(initState as any, aideClient)}/>
export const ListResearchResultAidesInno = () => <ListResearchResult cardType={aideInno} requestFilterBuilder={initState => new AideRequestFilter(initState as any, aideInno)}/>
export const ListResearchResultStartups = () => <ListResearchResult cardType={startups} requestFilterBuilder={initState => new AideRequestFilter(initState as any, startups)}/>

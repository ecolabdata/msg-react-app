import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnyCard, getSearch, InvestisseurQuery, searchByQuery, searchInvestisseurByQuery } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { InitialState } from '../../utils/InitialState';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import Pagination from '../dsfrComponents/Pagination';
// import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

interface ListResearchResultProps {
    cardType: CardType
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({ cardType }) => {
    const { usedCorbeille } = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const location = useLocation();
    const initialState = location.state as (InitialState & { page?: number, montantMin: number }) | null;


    const pageNo = initialState?.page || 1
    console.log(pageNo)
    const navigate = useNavigate()
    useTitle(`Recherche détaillé ${cardType.title}`)

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(initialState?.description || "")
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.secteur || [])
    const [montantMin, setMontantMin] = useState<number>(initialState?.montantMin || 0)

    //Not available with current vesion of API
    // const [toggles, setToggles] = useState<Record<string, boolean>>({
    //     'Venture Capital': false,
    //     'Business Angel': false,
    //     'Corporate': false
    // });


    useEffect(() => {
        const element = document.getElementById('cardsContainer')
        if (!element) return;
        console.log(element?.offsetTop, window.scrollY)
        if (element?.offsetTop < window.scrollY) {
            window.scrollTo({ behavior: "smooth", top: element?.offsetTop - window.innerHeight * 0.15 })
        }
    }, [initialState]);

    let displayCards: JSX.Element[] | undefined;
    let allCards: AnyCard[] = []
    let nbPage : number | undefined;
    if (initialState) {
        allCards = Object.values(initialState?.cardsById != undefined && initialState.cardsById).filter(x => x.cardTypeName === cardType.name);
        const pageChunkSize = 20;
        nbPage = Math.ceil(allCards.length / pageChunkSize)
        displayCards = initialState?.cardsById && allCards.filter(x => !isInCorbeille(x))
            .slice(
                (pageNo - 1) * pageChunkSize,
                pageNo * pageChunkSize
            ).map((card) => <ResultPreviewCard cardType={cardType} cardData={card}/>);
    }
    const handleOnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchInvestisseurByQuery({
            type: "investisseur",
            description,
            /*keywords,*/
            secteurs,
            montantMin
        }).then((search) => {
            console.log({ navigateTo: `/investisseurs}` })
            return navigate(`/investisseurs`, {
                replace: true,
                state: {
                    description,
                    secteurs,
                    montantMin,
                    cardsById: search.cardsById
                }
            })
        })
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
                    <div className="researchContainer max-w-[1240px] w-full p-6 flex flex-col bg-research-precision-container items-center
                lg:p-1">

                        <h2 className=" bold text-xl text-center mt-4" style={{ color: cardType.color }}>Preciser la recherche </h2>


                        <form id="keywordsForm" onSubmit={e => handleOnSubmitForm(e)} className="inputsContainer p-4 flex justify-center items-middle
                            lg:justify-between lg:items-end
                            xl:justify-center">

                            <div className="my-2 flex flex-col items-center
                        lg:flex-row lg:mb-6">

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
                        </form>
                    </div>
                    <button form="keywordsForm" className="mt-8 w-48 h-14 text-xl fr-btn fr-btn--primary capitalize" > <span className="mx-auto">rechercher !</span> </button>
                </div>

            </div>

            <div id="cardsContainer" className="cardsContainer mt-10 mx-auto max-w-[80%] flex flex-wrap justify-evenly bg 
            xl:mx-auto
            ">
                {displayCards}
            </div>

            {initialState && nbPage && <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink} nbPage={nbPage} initialState={initialState}/>}

        </>
    )
};

export default ListResearchResult;
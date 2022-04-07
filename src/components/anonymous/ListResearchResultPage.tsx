import { useContext, useEffect, useState } from 'react';
import { Navigate  } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyCard, getSearch } from '../../api/Api';
import { useTitle } from '../../hooks/useTitle';
import { all, CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import DropDown from '../dsfrComponents/DropDown';
import Pagination from '../dsfrComponents/Pagination';
import ToggleButton from '../dsfrComponents/ToggleButton';
// import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

interface ListResearchResultProps {
    cardType: CardType
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({ cardType }) => {
    const {usedCorbeille} = useContext(ApplicationContext)
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille

    const { searchId, page } = useParams();
    const redirect = <Navigate  to={`${cardType.searchLink}/${searchId}/1`} replace={true}/>
    const pageNo = page ? parseInt(page) : 1
    console.log(pageNo)
    const navigate = useNavigate()
    useTitle(`Recherche détaillé ${cardType.title}`)

    if (!searchId) throw new Error("searchId param is mandatory")

    const initialSearch = getSearch(searchId)

    if (!initialSearch) throw new Error("initialSearch is mandatory")

    const [toggles, setToggles] = useState<Record<string, boolean>>({
        'Venture Capital': false,
        'Business Angel': false,
        'Corporate': false
    });

    console.log({ initialSearch })

    useEffect(() => {
        if (!page) {
            window.scrollTo(0, 0)
        } else {
            const element = document.getElementById('cardsContainer')
            if (!element) return;
            if (element?.offsetTop < window.scrollY) {
                window.scrollTo({ behavior: "smooth", top: element?.offsetTop - 100 })
            }
        }
    }, [page]);

    console.log(initialSearch.resp.cards[cardType.apiName])
    const allCards : AnyCard[] = initialSearch.cards[cardType.apiName]
    const pageChunkSize = 20;
    const nbPage = Math.ceil(allCards.length / pageChunkSize)
    console.log({ allCardsLength: allCards.length, nbPage })
    const displayCards = allCards.filter(x => !isInCorbeille(x))
        .slice(
            (pageNo - 1) * pageChunkSize,
            pageNo * pageChunkSize
        ).map((card) => <ResultPreviewCard cardType={cardType} cardData={card} />);

    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    }

    if (!page) return redirect;
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

                <div className="researchContainer max-w-[1240px] p-6 flex flex-col bg-research-precision-container
                lg:p-1">

                    <h2 className=" bold text-xl text-center mt-4" style={{color: cardType.color}}>Preciser la recherche </h2>

                    <form onSubmit={() => handleOnSubmit} className="inputsContainer p-4 flex justify-center items-middle
                    lg:justify-between lg:items-end
                    xl:justify-center">

                        <div className="my-2 flex flex-col items-center
                        lg:flex-row lg:mb-6">

                            <div className="inputNumber mr-6 flex flex-col font-light ">
                                <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                                <input className={`text-white rounded-t-md w-64 h-10 addBorder-b border-2 bg-input-background`} style={{borderColor: cardType.color}} type="number" id="montantKEuro" />
                            </div>

                            <div className="-ml-5">
                                <DropDown borderColor={cardType.color} />

                            </div>

                        </div>

                        <div className="toggleButtons w-fit flex flex-col
                        lg:flex-row lg:mb-6">
                            {Object.keys(toggles).map(x => <ToggleButton label={x} checked={toggles[x]} color={cardType.color} onChange={e => setToggles({ ...toggles, [x]: !toggles[x] })} />)}
                        </div>

                    </form>

                </div>

            </div>

            <div id="cardsContainer" className="cardsContainer mt-10 mx-auto max-w-[80%] flex flex-wrap justify-evenly bg 
            xl:mx-auto
            ">
                {displayCards}
            </div>

            <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink + "/" + searchId} nbPage={nbPage} />

        </>
    )
};

export default ListResearchResult;
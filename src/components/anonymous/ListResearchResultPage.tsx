import DropDown from '../dsfrComponents/DropDown';
import Pagination from '../dsfrComponents/Pagination';
// import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers/root.reducer';
import { userActions } from '../../_actions/user.actions';
import { CardType } from '../../model/CardType';
import { useParams } from 'react-router-dom';
import { AnyCard, getSearch } from '../../api/Api';
import { NavLink } from 'react-router-dom';
import ToggleButton from '../dsfrComponents/ToggleButton';

interface ListResearchResultProps {
    cardType: CardType
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({ cardType }) => {
    const { searchId } = useParams();
    if (!searchId) throw new Error("searchId param is mandatory")
    const initialSearch = getSearch(searchId)
    if (!initialSearch) throw new Error("initialSearch is mandatory")
    const [toggles, setToggles] = useState<Record<string, boolean>>({
        'Venture Capital': false,
        'Business Angel': false,
        'Corporate': false
    });
    console.log({ initialSearch })

    const { currentPage, cardsPerPage, cardsInRangeOfTwenty, } = useSelector((state: RootState) => state.userState);

    const pagesVisited = currentPage * cardsPerPage;
    console.log(cardType.getCards(initialSearch.resp))
    const allCards = cardType.getCards(initialSearch.resp)
    const displayCards = allCards
        .slice(pagesVisited, pagesVisited + cardsPerPage)
        .map((card) => <ResultPreviewCard cardType={cardType} cardData={card} />);


    useEffect(() => {

        console.log('cardsPerPage :>> ', cardsPerPage);
        console.log('currentPage :>> ', currentPage);
        console.log('pagesVisited :>> ', pagesVisited);


    }, [cardsInRangeOfTwenty])

    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    }

    return (

        <>

            <div className="headContainer mx-auto  max-w-[1920px]">
                <div className="flex">
                    <button onClick={() => window.history.back()} className="ml-4 text-dark-text-action flex mt-4 rm-link-underline "> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retourner aux résultats </button>
                </div>
                <div className="cardTitle  mt-10 ml-4 p-2 text-base">
                    <h2 className="w-fit font-bold text-4xl">
                        <div className="flex items-center">
                            <cardType.SVGLogo width="30" height="30" style={{ color: cardType.color }} /> &nbsp;
                            {cardType.title} &nbsp; <span className="bg-yellow text-3xl font-light">{`(${allCards.length})`}</span>
                        </div>
                    </h2>
                    <p className="mt-2 text-base">{cardType.description}</p>
                </div>

                <div className="researchContainer ml-4 p-6 flex flex-col  bg-research-precision-container">

                    <h2 className=" bold text-xl text-center text-light-accent-green">Preciser la recherche </h2>

                    <form onSubmit={() => handleOnSubmit} className="inputsContainer flex justify-evenly flex-wrap">
                        <div className="flex justify-evenly basis-[50%]  flex-wrap">
                            <div className="inputNumber mr-6 flex flex-col font-light ml-6 ">
                                <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                                <input className="text-white rounded-t-md w-64 h-10 addBorder-b border-2 border-light-accent-green bg-input-background " type="number" id="montantKEuro" />
                            </div>
                            <DropDown borderColor="private-investors" />
                        </div>
                        <div className="flex basis-[50%]">
                            <div className="toggleButtons flex justify-evenly w-full mx-4 flex-wrap">
                                {Object.keys(toggles).map(x => <ToggleButton label={x} checked={toggles[x]} color={cardType.color} onChange={e => setToggles({ ...toggles, [x]: !toggles[x] })} />)}
                            </div>
                        </div>
                    </form>

                </div>

            </div>

            <div className="cardContainer flex flex-wrap justify-center mx-auto  max-w-[1920px]">
                {displayCards}
            </div>

            <Pagination cursor1='1' cursor2='2' cursor3='3' cursor4='4' currentPage='1' nextPage='2' previousPage='0' />

        </>
    )
};

export default ListResearchResult;
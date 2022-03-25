import DropDown from '../dsfrComponents/DropDown';
import Pagination from '../dsfrComponents/Pagination';
import ToggleButton from '../dsfrComponents/ToggleButton';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import JsonData from '../../utils/mockCardsData.json'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers/root.reducer';
import { userActions } from '../../_actions/user.actions';

interface ListResearchResultProps {
    investor?: string;
    numberOfResultsFound?: number
    investorPrecisions?: string,
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({investor, numberOfResultsFound, investorPrecisions,}) => { 
    
    const dispatch = useDispatch();
    
    const {pageNumber, cardsPerPage} = useSelector((state:RootState) => state.userState);
    
    const pagesVisited = pageNumber * cardsPerPage;

    useEffect( () => {
        dispatch(userActions.cardsDisplayedDesiredRange(JsonData));
    })

    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    }

    return (

        <>
        
            <div className="headContainer mx-auto w-11/12 bg-red-400">
                
                <button className="ml-4 text-dark-text-action flex mt-4"> <img className="mr-2" src={ArrowDark} alt="Icone flèche"/> Retourner aux résultats </button>

                <div className="cardTitle  mt-10 ml-4 p-2 text-base">
                    {/* <img src={Euro({color:"#68A532", viewBox:"0 0 14 14", height:"42", width:"42"})} alt="Logo Euro"/> */}
                    <h2 className="w-fit font-bold text-4xl">
                        {investor} <span className="bg-yellow text-3xl font-light">{`(${numberOfResultsFound})`}</span>
                    </h2> 
                    <p className="mt-2 text-base">{investorPrecisions}</p>
                </div>
                
                <div className="researchContainer ml-4 p-6 flex flex-col  bg-research-precision-container">
                    
                    <h2 className=" bold text-xl text-center text-light-accent-green">Preciser la recherche </h2>
                   
                    <form onSubmit={() => handleOnSubmit} className="inputsContainer flex justify-center">

                        <div className="inputNumber mr-6 flex flex-col font-light ml-6 ">
                            <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                            <input className="text-white rounded-t-md w-64 h-10 addBorder-b border-2 border-light-accent-green bg-input-background " type="number" id="montantKEuro"  />
                        </div>

                        <DropDown/>

                        <div className="toggleButtons flex justify-evenly w-full ml-4">
                            
                            <ToggleButton label='Venture Capital'/>
                            <ToggleButton label='Business Angel'/>
                            <ToggleButton label='Corporate'/>

                        </div>
                    </form>

                </div>

            </div>

            <div className="cardContainer flex flex-wrap mx-auto w-11/12 bg-green-200">
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />
                    <ResultPreviewCard emetor={"Pexe"} cardTitle={"Arts et métiers business angels"} redirectionButton={"#"} />

            </div>

            <Pagination/>

        </>
    ) 
}; 

export default ListResearchResult;
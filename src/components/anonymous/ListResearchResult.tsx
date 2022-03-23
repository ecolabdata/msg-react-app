import DropDown from '../dsfrComponents/DropDown';
import ToggleButton from '../dsfrComponents/ToggleButton';

interface ListResearchResultProps {
    investor?: string;
    numberOfResultsFound?: number
    investorPrecisions?: string,
}

const ListResearchResult: React.FC<ListResearchResultProps> = ({investor, numberOfResultsFound, investorPrecisions,}) => { 

    return (

        <>
        
            <div className="headContainer">
                <button> Retourner aux résultats </button>

                <div className="cardTitle p-2">
                    {/* <img src={Euro({color:"#68A532", viewBox:"0 0 14 14", height:"42", width:"42"})} alt="Logo Euro"/> */}
                    <h2 className="w-fit font-bold text-2xl">
                        {investor} <span className="bg-yellow text-lg">{`(${numberOfResultsFound})`}</span>
                    </h2> 
                    <p className="mt-2 text-base">{investorPrecisions}</p>
                </div>
                
                <div className="researchContainer flex flex-col p-6 bg-research-precision-container">
                    <h2 className=" bold text-xl text-center text-private-investors">Preciser la recherche </h2>
                    <form className="inputsContainer flex">

                        <div className="inputNumber flex flex-col font-light mr-6 ">
                            <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                            <input className="text-white rounded-t-md w-64 h-10 addBorder-b border-2 border-private-investors bg-input-background " type="number" id="montantKEuro"  />
                        </div>

                        <DropDown/>
                        <ToggleButton/>
                    </form>
                </div>
                
            </div>

        </>
    ) 
}; 

export default ListResearchResult;
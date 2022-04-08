import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import DropDown from '../dsfrComponents/DropDown'
import Scrollable from '../customComponents/Scrollable';
import Pagination from '../dsfrComponents/Pagination';
import { useCorbeille } from '../../utils/categoris';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import { ApplicationContext } from '../../Router';
import { useContext, useState } from 'react';
import { all, byName, dropdownValues } from '../../model/CardType';

const WasteBin = () => {
    const {usedCorbeille} = useContext(ApplicationContext)
    const [idc1, idc2, corbeille] = usedCorbeille
    const [selectedCardTypeName, setSelectedCardTypeName] = useState("all")
    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    };

    return (
        <>
            <div className="headContainer mx-auto w-3/4 ">

                <button onClick={() => window.history.back()} className="ml-4 text-dark-text-action flex mt-4 rm-link-underline "> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>

                <div className="cardTitle  my-10 ml-4 text-base flex justify-between items-center">

                    <h2 className="w-fit font-bold text-xl
                    lg:text-4xl">
                        <div className="flex items-center">
                            Ma Corbeille <span className="mt-1 mx-2 text-sm
                            font-extralight
                            lg:text-xl">{`(${Object.keys(corbeille).length})`}</span>
                        </div>
                    </h2>

                    <div className="actionButtonsContainer w-1/2 ml-15 flex justify-end items-center">

                        <button className="fr-btn fr-btn--sm fr-btn--primary mr-2 h-[40px]
                        md:h-[40%]
                        ">
                            Tout restaurer
                        </button>
                        
                    </div>

                </div>

                <div className="researchContainer my-10 ml-4 p-6 flex flex-col  bg-research-precision-container">

                    <p className=" bold text-xl text-center text-blue-france-main">Filtrer </p>

                    <form onSubmit={() => handleOnSubmit()} className="inputsContainer flex">
                        <DropDown borderColor="blue-france-main" title='Type de piste' usedState={[selectedCardTypeName, setSelectedCardTypeName]} values={{"all": "Toutes", ...dropdownValues}}/>
                    </form>

                </div>

            </div>

            <div className="cardsContainer mx-auto w-3/4 justify-center flex flex-wrap">
                {Object.values(corbeille).filter(x => selectedCardTypeName === "all" || selectedCardTypeName === x.cardTypeName).map((card) => <ResultPreviewCard cardType={byName[card.cardTypeName]} cardData={card} searchId={null} />)}
            </div>

            {/* <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink + "/" + searchId} nbPage={nbPage}/> */}
        </>
    )
}

export default WasteBin;
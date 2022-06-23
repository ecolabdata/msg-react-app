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
    const { usedCorbeille } = useContext(ApplicationContext)
    const [idc1, idc2, corbeille, setCorbeille] = usedCorbeille
    const [selectedCardTypeName, setSelectedCardTypeName] = useState("all")
    const [areYouSure, setAreYouSure] = useState(false);
    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    };

    const top  = areYouSure ?  'top-[0em]' : 'top-[4em]'

    return (
        <>
            <div className="headContainer mx-auto w-3/4 ">


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
                        <div className='relative overflow-hidden'>
                            <div>
                                <p>&nbsp;</p>
                                <button onClick={() => setAreYouSure(true)} className="fr-btn fr-btn--sm fr-btn--primary mr-2 h-[40px]
                                    md:h-[40%]
                                    ">
                                    Tout restaurer
                                </button>
                            </div>
                            <div className={`absolute ${top} left-0`}>
                                Etes vous sur ?
                            <button onClick={() => {
                                setAreYouSure(false)
                                setCorbeille({})
                            }} className="fr-btn fr-btn--sm fr-btn--primary mr-2 h-[40px]
                                md:h-[40%]
                                px-14">
                                Oui
                            </button>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="researchContainer my-10 ml-4 p-6 flex flex-col  bg-research-precision-container">

                    <p className=" bold text-xl text-center text-blue-france-main">Filtrer </p>

                    <form onSubmit={() => handleOnSubmit()} className="inputsContainer flex">
                        <DropDown borderColor="blue-france-main" title='Type de piste' usedState={[selectedCardTypeName, setSelectedCardTypeName]} values={{ "all": "Toutes", ...dropdownValues }} />
                    </form>

                </div>

            </div>

            <div className="cardsContainer mx-auto w-3/4 justify-center flex flex-wrap">
                {Object.values(corbeille).filter(x => selectedCardTypeName === "all" || selectedCardTypeName === x.cardTypeName).map((card) => <ResultPreviewCard pageList={true} cardType={byName[card.cardTypeName]} cardData={card} />)}
            </div>

            {/* <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink + "/" + searchId} nbPage={nbPage}/> */}
        </>
    )
}

export default WasteBin;
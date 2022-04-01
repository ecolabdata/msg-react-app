import { CardData } from '../../model/CardData';
import { CardType } from '../../model/CardType';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

interface CardDetailsProps { 
    cardType: CardType,
    cardData: CardData,
} 

const CardDetails: React.FC<CardDetailsProps> = (props) => { 

    return (

        <>
            <div className="headContainer mx-auto w-3/4 ">

                <button className="ml-4 text-dark-text-action flex mt-4"> <a href="/" ><img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </a></button>

                <div className="cardTitle  my-10 ml-4 text-base flex justify-between items-center">

                    <h2 className="w-fit font-bold text-xl
                    lg:text-4xl">
                        <div className="flex items-center">
                            Ma Corbeille <span className="mt-1 mx-2 text-sm
                            font-extralight
                            lg:text-xl">{`(TODO)`}</span>
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

            </div>
        </>
    ) 
}; 

export default CardDetails;
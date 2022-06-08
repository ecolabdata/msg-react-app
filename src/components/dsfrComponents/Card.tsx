import { CardType } from "./../../model/CardType";
import Panda from "./../../assets/images/panda.jpg";
import { ExplorerTypeCard } from '../anonymous/HomePage';

interface CardTypeProps  {
    cardTypeData: CardType | ExplorerTypeCard
    explorerCard?:boolean
};

const Card: React.FC<CardTypeProps> = (props) => {
    const isExplorerCard = props.explorerCard ?? false;
    const { SVGLogo, title, description, color, searchLink } =  props.cardTypeData;
    
    return (
        <>

            <div className={`${isExplorerCard && 'bg-blue-france-main text-blue-france before:bg-blue-france'}
                before:bottom-2 before:right-2
                fr-card fr-enlarge-link p-4 
                max-w-[282px] max-h-[207px] m-3`}>
                <div className="fr-card__body -mt-4 mb- p-0">
                    <div className="fr-card__content">
                        <h4 className="fr-card__title">
                            <a href={searchLink} className={`${isExplorerCard && 'text-blue-france'}
                                text-lg`}>{title}</a>
                        </h4>
                        <p className="fr-card__desc text-base">{description}</p>
                    </div>
                </div>
                <div className="fr-card__header">
                    <div className="fr-card__img ">
                         <SVGLogo height="20" width="20" style={{color:color}}/>
                    </div>
                </div>
            </div>
        </>
    ) 
}; 

export default Card;

  
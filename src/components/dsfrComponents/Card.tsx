import { CardType } from "./../../model/CardType";
import Panda from "./../../assets/images/panda.jpg";
import { ExplorerTypeCard } from '../anonymous/HomePage';

interface CardTypeProps  {
    cardTypeData: CardType | ExplorerTypeCard
    explorerCard?:boolean
};

const Card: React.FC<CardTypeProps> = (props) => {
    const isExplorerCard = props.explorerCard ?? false;
    const { SVGLogo, title, description, color, searchLink, version, name } =   props.cardTypeData;
    const isAlpha = version === "alpha";
    const alphaCardStyle = "after:text-sm after:px-4 after:py-1 after:rounded-2xl after:absolute after:bottom-2 after:right-2 after:content-['Bientôt'] ";

    return (
        <>
            <div className={`fr-card ${isExplorerCard && 'bg-blue-france-main text-blue-france before:bg-blue-france hover:text-white before:hover:bg-white '}
                ${!isExplorerCard && isAlpha ? alphaCardStyle   : "fr-enlarge-link"} 
                ${name === "investisseurs" && isAlpha && "after:bg-investisseurs"}
                ${name === "aides-innovations" && isAlpha && "after:bg-aides-innovations after:text-black"}
                ${name === "acheteurs-publics" && isAlpha && "after:bg-acheteurs-publics"}
                before:bottom-2 before:right-2
                relative m-3 max-w-[282px] max-h-[215px] p-4 
                `}>
                <div className="fr-card__body -mt-4 mb- p-0">
                    <div className="fr-card__content">
                        <h4 className="fr-card__title">
                            <a href={searchLink} className={`${isExplorerCard && 'text-blue-france hover:text-white'}
                                text-lg`}>{title}</a>
                        </h4>
                        <p className="fr-card__desc text-base ">{description}</p>
                    </div>
                </div>
                <div 
                className="fr-card__header ">
                    <div className="fr-card__img">
                        { !isExplorerCard ?

                            <SVGLogo height="25" width="25"  style={{color: color}}/>
                            :
                            <SVGLogo width="25" height="25" />
                           
                        }
                    </div>
                </div>
            </div>
        </>
    ) 
}; 

export default Card;

  
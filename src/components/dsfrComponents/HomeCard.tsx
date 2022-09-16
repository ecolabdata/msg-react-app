import { CardType } from "../../model/CardType";
import Panda from "./../../assets/images/panda.jpg";
import { ExplorerTypeCard } from '../page/HomePageStartup';

interface CardTypeProps  {
    cardTypeData: CardType | ExplorerTypeCard
    explorerCard?:boolean
};

const HomeCard: React.FC<CardTypeProps> = (props) => {
    const isExplorerCard = props.explorerCard ?? false;
    const { SVGLogo, title, description, color, searchLink, version, name } =   props.cardTypeData;
    const isAlpha = version === "alpha";
    const alphaCardStyle = "after:text-sm after:px-4 after:py-1 after:rounded-2xl after:absolute after:bottom-2 after:right-2 after:content-['Bientôt'] ";
    return (
        <>
            <div className={`fr-card ${isExplorerCard && 'bg-blue-france-main text-blue-france before:bg-blue-france hover:bg-blue-france-main-hover'}
                ${!isExplorerCard && isAlpha ? alphaCardStyle   : "fr-enlarge-link"} }
                 m-[1em]
                `}
                style={{width: isExplorerCard ? "calc(361px * 2 + 2em)" : 361}}>
                <div className="fr-card__body">
                    <div className="fr-card__content">
                        <h4 className="fr-card__title">
                            {!isAlpha ?
                                <a href={searchLink} className={`${isExplorerCard && 'text-blue-france '}
                                    text-lg`}>{title}</a>
                                :
                                <p  className="text-lg">{title}</p>
                            }
                        </h4>
                        <p className="fr-card__desc text-base ">{description}</p>
                    </div>
                </div>
                <div className="fr-card__header">
                    <div className="fr-card__img  p-[2rem] pb-[0]">
                        { !isExplorerCard ?

                            <SVGLogo height="80" width="80"  style={{color: color}}/>
                            :
                            <SVGLogo width="80" height="80" />
                           
                        }
                    </div>
                </div>
            </div>
        </>
    ) 
}; 

export default HomeCard;

  
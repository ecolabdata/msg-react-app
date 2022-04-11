import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnyCard } from '../../api/Api';
import { ArrowRight } from '../../assets/Icons';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import {Star, Trash} from '../../assets/Icons'
 
interface ResultPreviewCardProps {
    cardData: AnyCard
    cardType: CardType
    searchId: string | null
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({ cardData, cardType, searchId }) => {
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille

    const params = useParams()
    const navigate = useNavigate();
    const currentPageURL = window.location.pathname.split('/');
    const userIsOnResearchPage = currentPageURL[1] === "recherche" ? true : false;
    const [toggle, setToggle] = useState(true)
    //const achivedStyle = isInCorbeille(cardData) ? {"opacity": 0.3, "filter": "grayscale(50%)" } : {}
    const detailsRoute = searchId ? `/${cardType.name}/${searchId}/${cardData.id}/details` : `/${cardType.name}/${cardData.id}/details`
    return <div className={`cardContainer group rounded-r -6 ml-6 min-w-282 max-w-[282px]  p-4 flex flex-col
                    addBorder-l border-l-3 
                    hover:shadow-xl
                    card-animation
                    bg-research-card-preview relative`
    }
        style={{ borderColor: cardType.color }}>

        <div className="emetor-row flex">
            <p className="text-xs flex-1" style={{ color: cardType.color }}> Pexe ???</p>
            <div className="mb-2 opacity-0 flex flex-1 justify-end transition-opacity duration-200 group-hover:opacity-100" >
                <div className="flex justify-between w-[43px]">
                    <button className="cursor-pointer" style={{ color: isFavori(cardData) ? "yellow" : undefined }} onClick={() => toggleFavori(cardData)}>
                        <Star />
                    </button>
                    <button className="cursor-pointer" style={{ color: isInCorbeille(cardData) ? "red" : undefined }} onClick={() => toggleInCorbeille(cardData)}>
                        <Trash />
                    </button>
                </div>
            </div>
        </div>

        <h4 className="clamp mt-2 w-4/5 font-bold text-xl" title={cardData.nom || cardData.titre_aide}>{cardData.nom || cardData.titre_aide}</h4>
        <p className="uppercase opacity-0 mt-8 text-xs text-white transition-opacity duration-200 group-hover:opacity-100"> {cardData.type_investissements}</p>


        <Link to={detailsRoute} className="absolute bottom-[15px] right-[15px] rm-link-underline" style={{ color: cardType.color }}>
            <ArrowRight />
        </Link>

    </div>
};

export default ResultPreviewCard;
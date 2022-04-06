import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyCard } from '../../api/Api';
import { Star, Trash } from '../../assets/Icons';
import { useFavoris } from '../../favoris';
import { CardType } from '../../model/CardType';

interface ResultPreviewCardProps {
    cardData : AnyCard
    cardType : CardType
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({cardData, cardType}) => {
    
    const params = useParams()
    const navigate = useNavigate();
    const [toggleFavori, isFavori] = useFavoris()
    const currentPageURL = window.location.pathname.split('/');
    const userIsOnResearchPage = currentPageURL[1] === "recherche" ? true : false;
    const [toggle, setToggle] = useState(true)
    return <div className={`cardContainer group rounded-r -6 ml-6 min-w-282 max-w-[282px]  p-4 flex flex-col
                    addBorder-l border-l-3 
                    hover:shadow-xl
                    card-animation
                    bg-research-card-preview`
                }
                style={{borderColor: cardType.color}}>

            <div className="emetor-row flex">
                <p className="text-xs flex-1" style={{color: cardType.color}}> Pexe ???</p>
                <div className="mb-2 opacity-0 flex flex-1 justify-end transition-opacity duration-200 group-hover:opacity-100" >
                    <div className="flex justify-between w-[43px]">
                        <button className="cursor-pointer" style={{color: isFavori(cardData) ?"yellow":undefined}} onClick={() => toggleFavori(cardData)}>
                            <Star/>
                        </button>
                        <button className="cursor-pointer" style={{color: toggle?"red":undefined}} onClick={() => setToggle(!toggle)}>
                            <Trash />
                        </button>
                    </div>
                </div>
            </div>

        <h4 className="clamp mt-2 w-4/5 font-bold text-xl" title={cardData.nom || cardData.titre_aide}>{cardData.nom || cardData.titre_aide}</h4>
        
        {userIsOnResearchPage &&
            <p className="uppercase opacity-0 mt-8
            text-xs text-white transition-opacity duration-200 group-hover:opacity-100"> {cardData.type_investissements}</p>
        }
    
    {/* 
        <button onClick={() => navigate('/liste-resultats')} className="self-end">
            <Link to={redirectionButton}>
                <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
            </Link>
        </button> */}

    </div>
};

export default ResultPreviewCard;
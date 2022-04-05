
;import { useNavigate, useParams } from 'react-router-dom';
import { AnyCard } from '../../api/Api';
import { CardType } from '../../model/CardType';
import Star from './../../assets/icons/star-fill.svg';
import Trash from './../../assets/icons/trash-fill.svg';

interface ResultPreviewCardProps {
    cardData : AnyCard
    cardType : CardType
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({cardData, cardType}) => {
    
    const params = useParams()
    const navigate = useNavigate();

    const currentPageURL = window.location.pathname.split('/');
    const userIsOnResearchPage = currentPageURL[1] === "recherche" ? true : false;

    return <div className={`cardContainer group rounded-r -6 ml-6 min-w-282 max-w-[282px]  p-4 flex flex-col
                    addBorder-l border-l-3 
                    hover:shadow-xl
                    card-animation
                    bg-research-card-preview`
                }
                style={{borderColor: cardType.color}}>

            <div className="emetor-row flex">

                <p className="text-xs" style={{color: cardType.color}}> Pexe ???</p>
                <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100" >
                    <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
                    <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
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
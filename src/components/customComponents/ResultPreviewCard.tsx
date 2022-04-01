import { useNavigate } from 'react-router-dom';
import { AnyCard } from '../../api/Api';
import { CardType } from '../../model/CardType';
import Star from './../../assets/icons/star-fill.svg';
import Trash from './../../assets/icons/trash-fill.svg';

interface ResultPreviewCardProps {
    cardData : AnyCard
    cardType : CardType
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({cardData, cardType}) => {

    const navigate = useNavigate();

    return <div className="cardContainer rounded-r ml-6 t-4 min-w-282 h-181 p-4 flex flex-col
                    addBorder-l border-l-3 
                    hover:scale-y-115 hover:shadow-2xl
                    transform transition ease-out duration-200 
                    group
                    bg-research-card-preview
                " style={{borderColor: cardType.color}}>
        <div className="emetor-row flex">

            <p className="text-xs" style={{color: cardType.color}}> Pexe ???</p>
            <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100" >
                <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
                <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
            </div>

        </div>

        <h4 className="clamp mt-10 w-4/5 fixed text-white font-bold text-xl " title={cardData.nom || cardData.titre_aide}>{cardData.nom || cardData.titre_aide}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100"> {cardData.type_investissements}</p>
{/* 
        <button onClick={() => navigate('/liste-resultats')} className="self-end">
            <Link to={redirectionButton}>
                <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
            </Link>
        </button> */}

    </div>
};

export default ResultPreviewCard;
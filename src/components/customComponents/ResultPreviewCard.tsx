import { useNavigate, useParams, Link } from 'react-router-dom';
import Trash from './../../assets/icons/trash-fill.svg';
import Star from './../../assets/icons/star-fill.svg';
import ArrowInvestors from './../../assets/icons/arrow-private-investors.svg';
import { Aide, Collectivite, Investisseur, Marche } from '../../api/Api';
import { CardType } from '../../model/CardType';

interface ResultPreviewCardProps {
    cardData : Partial<Aide> & Partial<Marche> & Partial<Collectivite> & Partial<Investisseur> 
    cardType : CardType
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({cardData, cardType}) => {
    
    const params = useParams()
    const navigate = useNavigate();

    const currentPageURL = window.location.pathname.split('/');
    const userIsOnResearchPage = currentPageURL[1] === "recherche" ? true : false;
    const animation = "transition-all ease-out duration-[400ms] hover:h-[240px] hover:shadow-xl";

    return <div className={`cardContainer group rounded-r mt-4 min-w-282 max-w-[282px] h-181 p-4 flex flex-col
                    addBorder-l border-l-3 
                   ${userIsOnResearchPage ? animation : ""}
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

        <h4 className="clamp mt-10 w-4/5 font-bold text-xl" title={cardData.nom || cardData.titre_aide}>{cardData.nom || cardData.titre_aide}</h4>
        
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
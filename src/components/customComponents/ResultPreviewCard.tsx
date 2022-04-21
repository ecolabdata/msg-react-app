import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnyCard } from '../../api/Api';
import { ArrowRight } from '../../assets/Icons';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { Star, Trash } from '../../assets/Icons'

interface ResultPreviewCardProps {
    cardData: AnyCard
    cardType: CardType
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({ cardData, cardType }) => {
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille

    const params = useParams()
    const navigate = useNavigate();
    const currentPageURL = window.location.pathname.split('/');
    const userIsOnResearchPage = currentPageURL[1] === "recherche" ? true : false;
    const [toggle, setToggle] = useState(true)
    const displayableFinancers = cardData.financers?.join(" | ") || ""
    const financersFontSize = (2 / (displayableFinancers.length ** 0.30)) + "em"
    const d = cardData.submission_deadline ? new Date(cardData.submission_deadline) : null
    const displayabeSubmissionDeadLine = ("0" + d?.getUTCDate()).slice(-2) + "/" + ("0" + ((d?.getUTCMonth() || 0) + 1)).slice(-2) + "/" + d?.getUTCFullYear()
    //const achivedStyle = isInCorbeille(cardData) ? {"opacity": 0.3, "filter": "grayscale(50%)" } : {}
    // if (cardType.name === "aides-innovations") debugger;
    return <div className={`cardContainer group rounded-r ml-6 min-w-282  p-4 flex flex-col
                    addBorder-l border-l-3 
                    hover:shadow-xl
                    card-animation
                    bg-research-card-preview relative overflow-hidden`
    }
        style={{ borderColor: cardType.color }}>

        <div className="emetor-row flex">
            <p className="text-xs flex-1 grow-[10] clamp-2" style={{ color: cardType.color }} title={displayableFinancers}>{displayableFinancers}</p>
            <div className="opacity-0 flex flex-1 justify-end transition-opacity duration-200 group-hover:opacity-100" >
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

        <Link to={`/${cardType.name}/details`} state={{ cardData }} className="rm-link-underline">
            <h4 className="clamp mt-2 w-4/5 font-bold text-xl" title={cardData.nom || cardData.name}>{cardData.nom || cardData.name}</h4>
            {/* <p className="uppercase opacity-0 mt-8 text-xs text-white transition-opacity duration-200 group-hover:opacity-100 w-[225px]">
                <br />

            </p>
            <p className="uppercase">
                
            </p> */}
            <div className='
                    w-[225px] h-[100px] my-[10px]
                    opacity-0 transition-opacity duration-200 group-hover:opacity-100
                    text-xs text-white font-light
                    flex flex-col justify-evenly'>
                {cardData.submission_deadline && <div data-org-value={cardData.submission_deadline}>Date de clôture: {displayabeSubmissionDeadLine}</div>}
                {cardData.aid_types && <div style={{ color: cardType.color }}>{cardData.aid_types.join(" | ")}</div>}
            </div>
            {/* <NavLink to={cardType.searchLink} state={initialState} NavLink/> */}
            <div className="card-arrow absolute bottom-[var(--arrow-bottom)]  right-[var(--arrow-right)] rm-link-underline" style={{ color: cardType.color }}>
                <ArrowRight />
            </div>
        </Link>
    </div>
};

export default ResultPreviewCard;
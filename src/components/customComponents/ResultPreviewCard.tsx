import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AnyCard } from '../../api/Api';
import { ArrowRight } from '../../assets/Icons';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import { Star, Trash } from '../../assets/Icons'
import slugify from 'slugify'

interface ResultPreviewCardProps {
    cardData: AnyCard
    cardType: CardType
    isLoading?: boolean
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({ cardData, cardType, isLoading}) => {
    const { usedFavoris, usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget

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
    const slug = slugify(
        cardData.nom || //collectivites, investisseurs
        cardData.slug || //aides_clients, aides_innovation
        cardData['Start-up'] || //startup
        'unknown-slug'
    )
    return <div className={`cardContainer group rounded-r ml-6 w-[282px]  p-4 flex flex-col
                    addBorder-l border-l-3 
                    hover:shadow-xl
                    card-animation
                    bg-research-card-preview relative overflow-hidden`
    }
        style={{ borderColor: cardType.color, opacity: isLoading ? 0 : 1 }}>

        <div className="emetor-row flex">
            <p className="text-xs flex-1 grow-[10] clamp-2" style={{ color: cardType.color }} title={displayableFinancers}>{displayableFinancers || cardData['Thématique'] || cardData['Vous êtes']}</p>
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

        <Link onClick={() => {
            console.log("Onclick triggered")
            setNextScrolTarget({ top: 0 })
        }} to={`/${cardType.name}/details/${slug}?cardData=${encodeURIComponent(JSON.stringify(cardData))}`} state={{ cardData }} className="rm-link-underline">
            <h4 className="clamp mt-2 font-bold text-lg" title={cardData.nom || cardData.name || cardData['Start-up'] || cardData['Nom du fonds']}>{cardData.nom || cardData.name || cardData['Start-up'] || cardData['Nom du fonds']}</h4>
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
                { ["aides-innovations", "aides-clients"].includes(cardType.name) && <div data-org-value={cardData.submission_deadline}> {cardData.submission_deadline ? `Date de clôture: ${displayabeSubmissionDeadLine}` : "Aide permanente"}</div>}
                {cardData['Pitch'] && <div>{cardData['Pitch']}</div>}
                {cardData.aid_types && <div style={{ color: cardType.color }}>{cardData.aid_types.join(" | ")}</div>}
                { ["investisseurs"].includes(cardType.name) && <div>{cardData['Ticket min en K€']}K€ - {cardData['Ticket max en K€']}K€</div>}
                {cardData["Présentation de la politique d'investissement"] && <div className='h-[3em] truncate' title={cardData["Présentation de la politique d'investissement"]}>{cardData["Présentation de la politique d'investissement"].split(";").join(" | ")}</div>}
                {cardData["Type de financement"] && <div className="truncate" style={{ color: cardType.color }} title={cardData["Type de financement"]}>{cardData["Type de financement"]}</div>}

            </div>
            {/* <NavLink to={cardType.searchLink} state={initialState} NavLink/> */}
            <div className="card-arrow absolute bottom-[var(--arrow-bottom)]  right-[var(--arrow-right)] rm-link-underline" style={{ color: cardType.color }}>
                <ArrowRight />
            </div>
        </Link>
    </div>
};

export default ResultPreviewCard;
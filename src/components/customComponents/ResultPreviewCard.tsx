import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import slugify from 'slugify';
import { AnyCard, applyCard, isAcheteurPublic, isAide, isInvestisseur, isProjetAchat, isStartup } from '../../api/Api';
import { ArrowRight, Star, Trash } from '../../assets/Icons';
import { CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';

interface ResultPreviewCardProps {
    cardData: AnyCard
    cardType: CardType
    isLoading?: boolean,
    pageList: boolean,
}

const ResultPreviewCard: React.FC<ResultPreviewCardProps> = ({ cardData, cardType, isLoading, pageList }) => {
    const { usedFavoris, usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget

    const params = useParams()
    const navigate = useNavigate();
    const currentPageURL = window.location.pathname.split('/');
    const userIsOnResearchPage = currentPageURL[1] === "recherche" ? true : false;
    const [toggle, setToggle] = useState(true)
    let displayableFinancers = ""
    let displayabeSubmissionDeadLine = ""
    if (isAide(cardData)) {
        displayableFinancers = cardData.financers?.join(" | ") || ""
        const financersFontSize = (2 / (displayableFinancers.length ** 0.30)) + "em"
        const d = cardData.submission_deadline ? new Date(cardData.submission_deadline) : null
        displayabeSubmissionDeadLine = ("0" + d?.getUTCDate()).slice(-2) + "/" + ("0" + ((d?.getUTCMonth() || 0) + 1)).slice(-2) + "/" + d?.getUTCFullYear()
    }
    let targetDate = ""
    if (isProjetAchat(cardData)) {
        const d = new Date(cardData.publicationTargetDate)
        targetDate = ("0" + d?.getUTCDate()).slice(-2) + "/" + ("0" + ((d?.getUTCMonth() || 0) + 1)).slice(-2) + "/" + d?.getUTCFullYear()
    }
    const cardSlug = applyCard(cardData,
        ap => ap.nom,
        pa => pa.label,
        i => i['Nom du fonds'],
        a => a.slug,
        su => su['Start-up'],
        () => 'unknown-slug'
    )
    let slug = slugify(cardSlug);
    const name = applyCard(cardData,
        ap => ap.nom,
        pa => pa.label,
        i => i['Nom du fonds'],
        a => a.name,
        su => su['Start-up'],
        () => 'unknown-slug')
    let linkTo = `/${cardType.name}/details/${slug}?cardData=${encodeURIComponent(JSON.stringify(cardData))}`;

    if (linkTo.length > 8192) {
        linkTo = `/${cardType.name}/details/${slug}`;
    }

    const toprow = isAide(cardData) ? displayableFinancers :
        isStartup(cardData) ? cardData['Thématique'] :
            isInvestisseur(cardData) ? cardData['Vous êtes'] :
                isAcheteurPublic(cardData) ? 'Ville / Région' :
                    isProjetAchat(cardData) ? cardData.purchasingEntity.label :
                        ""

    //const achivedStyle = isInCorbeille(cardData) ? {"opacity": 0.3, "filter": "grayscale(50%)" } : {}
    // if (cardType.name === "aides-innovations") debugger;
    return <div className={`cardContainer ${!pageList && 'ml-6'}
            group rounded-r w-[282px] p-4 flex flex-col
            addBorder-l border-l-3 
            hover:shadow-xl
            card-animation
            bg-research-card-preview relative overflow-hidden`
    }
        style={{ borderColor: cardType.color, opacity: isLoading ? 0 : 1 }}
        onMouseEnter={() => console.log(cardData)}
    >

        <div className="emetor-row flex">
            <p className="text-xs flex-1 grow-[10] clamp-2" style={{ color: cardType.color }} title={toprow}>
                {toprow}
            </p>
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
            setNextScrolTarget({ top: 0 })
        }} to={linkTo} state={{ cardData }} className="rm-link-underline">
            <h4 className="clamp mt-2 font-bold text-lg" title={name}>{name}</h4>
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
                {
                    applyCard(cardData,
                        ap => ap.Startups != "0" ? <div>Ils ont travaillés avec:<br />{ap.Startups.split(",").join(', ')}</div> : null,
                        pa => <div>Date visée de publication:  {targetDate}</div>,
                        i => <>
                            <div>{i['Ticket min en K€']}K€ - {i['Ticket max en K€']}K€</div>
                            <div className='h-[3em] truncate' title={i["Présentation de la politique d'investissement"]}>{i["Présentation de la politique d'investissement"].split(";").join(" | ")}</div>
                            <div className="truncate" style={{ color: cardType.color }} title={i["Type de financement"]}>{i["Type de financement"]}</div>
                        </>,
                        a => <>
                            <div data-org-value={a.submission_deadline}> {a.submission_deadline ? `Date de clôture: ${displayabeSubmissionDeadLine}` : "Aide permanente"}</div>
                            <div style={{ color: cardType.color }}>{a.aid_types.join(" | ")}</div>
                        </>,
                        su => <div>{su['Pitch']}</div>,
                        () => <></>
                    )
                }
            </div>
            {/* <NavLink to={cardType.searchLink} state={initialState} NavLink/> */}
            <div className="card-arrow absolute bottom-[var(--arrow-bottom)]  right-[var(--arrow-right)] rm-link-underline" style={{ color: cardType.color }}>
                <ArrowRight />
            </div>
        </Link>
    </div >
};

export default ResultPreviewCard;
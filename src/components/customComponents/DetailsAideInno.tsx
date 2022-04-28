import { CardData } from '../../model/CardData';
import { aideInno, CardType } from '../../model/CardType';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import { Rocket } from '../../assets/Icons';
import { Star, Trash } from '../../assets/Icons'
import { Aide } from '../../api/Api';
import { ReactNode, useContext, useState } from 'react';
import { ApplicationContext } from '../../Router';


const CardDetailsInno = (props: { cardData: Aide }) => {
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [toggleFavori, isFavori] = usedFavoris
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille

    const cardData = Object.assign({ id: "TODO", cardTypeName: "" }, props.cardData)
    const cardType = aideInno

    const displayableFinancers = cardData.financers?.join(" | ") || ""
    const d = cardData.submission_deadline ? new Date(cardData.submission_deadline) : null
    const displayabeSubmissionDeadLine = ("0" + d?.getUTCDate()).slice(-2) + "/" + ("0" + ((d?.getUTCMonth() || 0) + 1)).slice(-2) + "/" + d?.getUTCFullYear()
    const subvention = handleSubventionDisplay(
        cardData["subvention_rate_lower_bound"],
        cardData["subvention_rate_upper_bound"]
    )
    return (
        <>
            <div style={{ marginLeft: "calc(max(10% - 100px, 0px))", marginRight: "calc(max(10% - 100px, min(8vw, 50px)))" }} className="headContainer">
                <button
                    onClick={() => window.history.back()}
                    className="ml-4 text-dark-text-action flex mt-4 rm-link-underline ">
                    <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>

                <div style={{ color: cardType.color }} className="categoryName mt-10 min-w-40 flex">
                    <div>
                        <cardType.SVGLogo className="mt-1.5 mr-2 text-sm" style={{ color: cardType.color }} width="11" height="11" />
                    </div>
                    <p>{cardType.title}</p>
                    &nbsp;
                </div>

                <div className="cardTitle my-10 text-base   mx-auto">

                    <div className="flex justify-between">
                        <h2 className="font-bold text-xl
                        lg:text-4xl">
                            {cardData.name}
                        </h2>
                        <div className="w-fit flex justify-end">
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
                    <div className='flex  w-2/3'>
                        <div className='flex justify-start flex-1 w-1/2'>
                            <p style={{ color: cardType.color }} className="mt-6 w-fit text-base">{displayableFinancers}</p>
                        </div>
                        <div className='flex justify-end flex-1 w-1/2'>
                            <p style={{ opacity: 0.6 }} className="mt-6 w-fit text-base font-thin">
                                Source: <a href={"https://aides-territoires.beta.gouv.fr" + cardData["url"]} target="_blank">Aides territoires</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div style={{ marginRight: "calc(max(10% - 100px, 0px))", marginLeft: "calc(max(10% - 100px, 0px))" }} className='flex justify-around flex-wrap flex-row-reverse'>
                <div style={{ flex: "0 0 380px" }} className="contactCard h-fit rounded addBorder border-2 p-6 border-dark-text-action flex flex-col items-start">


                    <h2 className="text-[22px] font-bold text-dark-text-action ">Contact</h2>

                    <p className="text-base w-[280px]"> <span dangerouslySetInnerHTML={{ __html: cardData["contact"] + "" }}></span></p>

                    <a
                        href={cardData["origin_url"]}
                        className="
                            fr-btn fr-btn--primary
                            w-fit px-4 h-3 py-2
                            hover:bg-claire-bf__hover
                            mt-6 
                            "
                        target="_blank"
                    >
                        <span className="fr-fi-phone-fill w-3 h-3 mb-[10px]" aria-hidden="true" />
                        <span className="mt-1 ml-4 text-base">Liens vers l'aide originale</span>
                    </a>

                    {cardData["application_url"] && <a
                        href={cardData["application_url"]}
                        className="
                            fr-btn fr-btn--secondary
                            w-fit px-4 h-3 py-2
                            hover:bg-claire-bf__hover
                            my-6
                            ">
                        <span className="fr-fi-external-link-line w-3 h-3 mb-[10px]" aria-hidden="true" />
                        <span className="mt-1 ml-4 text-base">Lien vers la démarche en ligne</span>
                    </a>}

                </div>
                <div style={{ flex: "1 1 350px" }} className="contentContainer flex flex-wrap justify-left mx-[5vw]" >
                    <SmallFields color={cardType.color} fieldname={"Calendrier"}>
                        Date de clôture: {cardData.submission_deadline ? `${displayabeSubmissionDeadLine}` : "Aide permanente"}
                    </SmallFields>
                    <SmallFields color={cardType.color} fieldname={"Bénéficiaires"}>
                        <ul>
                            {cardData.targeted_audiences.map(x => <li>{x}</li>)}
                        </ul>
                    </SmallFields>
                    <SmallFields color={cardType.color} fieldname={"Zone géographique couverte"}>
                        {cardData["perimeter"]}
                    </SmallFields>
                    <BigFields color={cardType.color} fieldname="Critères d’éligibilité">
                        <span className='dangerouslySetInnerHTML' dangerouslySetInnerHTML={{ __html: cardData["eligibility"] + "" }}></span>
                    </BigFields>
                    <BigFields color={cardType.color} fieldname="Description">
                        <span className='dangerouslySetInnerHTML' dangerouslySetInnerHTML={{ __html: cardData["description"] + "" }}></span>
                    </BigFields>
                    <SmallFields color={cardType.color} fieldname={"Nature de l’aide"}>
                        {cardData.aid_types.join(" | ")}
                    </SmallFields>
                    {subvention.display && <SmallFields color={cardType.color} fieldname={"Taux de subvention"}>
                        {subvention.txt}
                    </SmallFields>}
                </div>
            </div>
        </>
    )
};

function handleSubventionDisplay(min?: number | null, max?: number | null) {
    const minMax = []
    min && minMax.push(`Min: ${min}`)
    max && minMax.push(`Min: ${max}`)
    return {
        display: minMax.length || undefined,
        txt: minMax.map(x => <>{x}</>).reduce((a, b) => <><a /><br /><b /></>, <></>)
    }
}

const SmallFields: React.FC<{ color: string, fieldname: ReactNode }> = ({ color, fieldname, children }) => <div style={{ flex: "1 1 auto" }} className='short-field mr-[5vw] mt-8'>
    <div style={{ color }} className="font-[700] text-[22px]">{fieldname}</div>
    <div className="mt-2">{children}</div>
    <div className="mt-6" style={{ width: "74px", borderTop: "1px solid rgba(206, 206, 206, 0.2)" }}></div>
</div>

const BigFields: React.FC<{ color: string, fieldname: ReactNode }> = ({ color, fieldname, children }) => {
    const [showAll, setShowAll] = useState(false)
    const maxHeight = showAll ? "" : "max-h-[13.8em]"
    return <div
        style={{ flex: "1 1 100%", background: "#353434", }}
        className='short-field p-[18px] mt-8'
    >
        <div style={{ color }} className="font-[700] text-[22px]">{fieldname}</div>
        <div className={`mt-2 ${maxHeight} overflow-hidden relative transition-all ease`}>
            {children}
            {!showAll && <div className='absolute top-1 left-0 h-full w-full' style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, #353434 90%)" }}></div>}
        </div>
        <button className="fr-btn fr-btn--secondary mt-2" onClick={
            () => setShowAll(!showAll)
        }>
            {showAll ? "Réduire" : "Voir plus"}
        </button>
    </div>
}


export default CardDetailsInno;
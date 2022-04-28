import { CardData } from '../../model/CardData';
import { aideInno, CardType } from '../../model/CardType';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
import { Rocket } from '../../assets/Icons';
import Trash from './../../assets/icons/trash-fill.svg';
import Star from './../../assets/icons/star-fill.svg';
import { Aide } from '../../api/Api';
import { ReactNode } from 'react';


const CardDetailsInno = (props: { cardData: Aide }) => {
    const { cardData } = props
    const cardType = aideInno

    const displayableFinancers = cardData.financers?.join(" | ") || ""
    const d = cardData.submission_deadline ? new Date(cardData.submission_deadline) : null
    const displayabeSubmissionDeadLine = ("0" + d?.getUTCDate()).slice(-2) + "/" + ("0" + ((d?.getUTCMonth() || 0) + 1)).slice(-2) + "/" + d?.getUTCFullYear()

    return (
        <>
            <div  style={{marginLeft: "calc(max(10% - 100px, 0px))", marginRight: "calc(max(10% - 100px, 50px))"}} className="headContainer">

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
                        <div className="w-[49%] flex justify-end">
                            <img src={Star} alt="Icône d'étoile" className="mr-4 w-6 h-6 cursor-pointer" />
                            <img src={Trash} alt="Icône de poubelle" className="w-6 h-6 cursor-pointer" />
                        </div>
                    </div>

                    <p style={{ color: cardType.color }} className="mt-6 w-full text-base">{displayableFinancers}</p>

                </div>

            </div>
            <div style={{marginRight: "calc(max(10% - 100px, 0px))", marginLeft: "calc(max(10% - 100px, 0px))"}} className='flex justify-around flex-wrap'>
                <div style={{flex: "1 1 350px"}} className="contentContainer flex flex-wrap justify-left m-4" >
                    <SmallFields color={cardType.color} fieldname={"Calendrier"}>
                        Date de clôture: {cardData.submission_deadline ? `${displayabeSubmissionDeadLine}` : "Aide permanente"}
                    </SmallFields>
                    <SmallFields color={cardType.color} fieldname={"Bénéficiaires"}>
                        Date de clôture: {cardData.submission_deadline ? `${displayabeSubmissionDeadLine}` : "Aide permanente"}
                    </SmallFields>
                    <SmallFields color={cardType.color} fieldname={"Zone géographique couverte"}>
                        Date de clôture: {cardData.submission_deadline ? `${displayabeSubmissionDeadLine}` : "Aide permanente"}
                    </SmallFields>
                </div>
                <div style={{flex: "0 0 380px"}} className="contactCard h-fit rounded addBorder border-2 p-6 border-dark-text-action flex flex-col items-start">


                    <h2 className="text-[22px] font-bold text-dark-text-action ">Contact</h2>

                    <p className="text-base w-[280px]">{cardData.contact}</p>

                    <a
                        href={cardData["origin_url"]}
                        className="
                                fr-btn fr-btn--primary
                                w-fit px-4 h-3 py-2
                                hover:bg-claire-bf__hover
                                mt-6 
                                ">
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
                        <span className="mt-1 ml-4 text-base">Consulter la source de l'aide</span>
                    </a>}

                </div>
            </div>
        </>
    )
};

const SmallFields : React.FC<{color: string, fieldname : ReactNode}> = ({color, fieldname, children}) => <div style={{flex: "1 1 auto"}} className='short-field mr-20 mt-8'>
    <div style={{color}} className="font-[700] text-[22px]">{fieldname}</div>
    <div className="mt-2">{children}</div>
    <div className="mt-6" style={{ width: "74px", borderTop: "1px solid rgba(206, 206, 206, 0.2)" }}></div>
</div>

export default CardDetailsInno;
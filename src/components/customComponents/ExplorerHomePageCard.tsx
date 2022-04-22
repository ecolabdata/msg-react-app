import { ReactElement, useContext } from "react";
import { CardType } from "../../model/CardType";
import { SpeechBubble } from '../../assets/Icons';
import FillButton from "../dsfrComponents/FillButton";
import { ApplicationContext } from "../../Router";
import { useNavigate } from "react-router-dom";

const ExplorerHomePageCard = () => {
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext)
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const navigate = useNavigate();

    const { SVGLogo, title, description, color, version } = {
        SVGLogo: SpeechBubble,
        title: "Explorer",
        color: "rgba(0, 0, 145, 1)",
        version: null,
        description: "Découvrez tous les leviers proposés par Mes Services Greentech !"
    }
    const opacity = undefined;

    const Button = () => <button
        onClick={() => {
            setNextScrolTarget({ top: 0 })
            navigate('/formulaire-recherche-de-solutions')
        }}
        className="
        fr-btn fr-btn--primary
        my-2 mx-3 py-0 h-full
        hover:bg-claire-bf__hover flex justify-between"
        style={{ border: "1px solid var(--text-inverted-blue-france)" }}
    >
        <span>Découvrir</span>
        <span className="fr-fi-arrow-right-line ml-1 mt-1" aria-hidden="true"></span>
    </button>
    return (
        <div style={{ flex: "1 1 33.33333%"}} className="flex flex-col items-center relative">
            <div style={{
                width: "300px", height: "238px",
                backgroundColor: "var(--background-action-high-blue-france)",
                color: "var(--text-inverted-blue-france)"
            }} className="
                    card-container
                    h-content
                    p-5 rounded-[3px]
                    flex flex-col items-center relative
                ">

                <div style={{ color, opacity }}>
                    <SVGLogo width="25" height="25" />
                </div>
                <div className={`card-title-container
                       w-227
                       p-43
                       flex flex-col items-center
                    `}>
                    <h3 style={{ opacity, color: "var(--text-inverted-blue-france)" }} className="block mt-4 max-w-fit text-center text-xl font-bold">{title}</h3>
                    <p style={{ opacity }} className="mt-2 w-[245px] text-center text-base">{description}</p>
                    <Button/>
                </div>
            </div>
        </div>
    )

}

export default ExplorerHomePageCard;



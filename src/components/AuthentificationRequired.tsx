import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { JwtState, useJwtState } from "../jwt"
import LogoMSG from './../assets/msg-icon.svg';


const template = (bigTitle: string, smallTitle: string) => <div className="flex flex-col items-center justify-center w-[800px]">
    <div className="fr-header__brand fr-enlarge-link">
        <div className="fr-header__service flex">
            <img className="h-12 mt-1 mr-2" src={LogoMSG} alt="Icône d'indication, version beta " />
            <p className="fr-header__service-title capitalize
                                     after:rounded-sm after:content-['beta'] after:ml-2 after:relative after:bottom-1 after:w-content after:h-content after:px-1 
                                     after:text-center after:text-xs after:font-bold after:bg-beta">mes services<br /> greentech</p>
        </div>
    </div>
    <h1 className="fr-h3 mt-8 text-center font-thin">
        {bigTitle}
    </h1>
    <p>
        {smallTitle}
    </p>
    <a
        href="https://airtable.com/shrBDPDWDKVqRnHhf"
        target="_blank"
        className="
                fr-btn fr-btn--primary mt-8
                hover:bg-claire-bf__hover flex justify-between" 
    >
        <span>Je demande un accès</span>
    </a>
</div>

const messages: Record<JwtState["name"], ReactElement | null> = {
    notoken: template("La plateforme Mes Services Greentech est pour l’instant disponible en accès limité.", "Contactez-nous et recevez un lien magique de connexion !"),
    badtoken: template("Le lien magique dont vous disposez est faux ou expiré.", "Contactez-nous pour recevoir un nouveau lien magique !"),
    checking: <></>,
    valid: null
}

export const AuthentificationRequired = () => {
    const jwtState = useJwtState();
    if (jwtState?.name === "valid") {
        return <Outlet />
    } else {
        const message = jwtState ? messages[jwtState.name] : messages["notoken"]
        return (
            <>
                <div className="
                    h-[100vh] p-2
                    flex items-center justify-center">
                    {message}
                </div>
            </>
        );
    }
}
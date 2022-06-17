import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { JsxElement } from "typescript";
import { JwtState, useJwtState } from "../jwt"

const messages: Record<JwtState["name"], ReactElement | null> = {
    notoken: <h2 className="fr-text--md  mt-8 text-center w-[85%] xl:w-55 font-thin">
        Contactez nous pour avoir un accès anticipé
    </h2>,
    badtoken: <h2 className="fr-text--md  mt-8 text-center w-[85%] xl:w-55 font-thin">
        Votre session a expiré ou votre token est invalide. Contactez nous pour avoir un accès anticipé
    </h2>,
    checking: <h2 className="fr-text--md  mt-8 text-center w-[85%] xl:w-55 font-thin">
        Vérification du token
    </h2>,
    expiredToken: <h2 className="fr-text--md  mt-8 text-center w-[85%] xl:w-55 font-thin">
        Votre session a expiré ou votre token est invalide. Contactez nous pour avoir un accès anticipé
    </h2>,
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
                    mx-auto w-93 p-2 h-[60vh]
                    flex flex-col items-center">
                    {message}
                </div>
            </>
        );
    }
}
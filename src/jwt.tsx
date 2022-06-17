import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "./hooks/useQuery";
import * as jose from 'jose'

const jwk = {
    "kty": "RSA",
    "e": "AQAB",
    "kid": "5c92b1e0-9fa9-4909-a73e-1ffa6ae54c67",
    "n": "xCbHYTy3ngktFla6rIPEPo73wUoKv7Jgy1tT8r5-g1dkp0XyTJ7EyGYdGYOz_EsZpy_VdlL7IuJdK5oGa3GeXUesWQuSM_h5kd973FhuwUuw3eo33T6W670cbiOrx53GvWHzc8PcJU_oKmKArznh2Jb0II4ZIk8GF1JNdFkW-76t03yDBVs7R_fViGNCm6JYNv6MXm6C9a-Iq5blZ5m9JP66oSWzzPAX8c8AqA2tFChAUZcZR-AoaV7TXIUke6v0vS27rdTNLhIxmExFz16CL-DwtUZCF8ppyGRskA892edN46yn7ocoHtWSdSAkiwbMaDbJ7qxLuIUbAIxmra9GdOuNLWQNk8JuwjWdGS8nIDRf_kr9S4SH5LjS8cauXoWSpkHerHLoJonFPH4prbk_hHdvgzuI4gVL23t6aBhLDDFEX1lzYu1tIZvWELIexFhPA3_QsGzv3K--0j9V1Il53aJUq0nSQ_cIQZJws75vuTgm06v4gprtRJBQ4ITBcGRLZ6ZZBZiTCt6gCIrpHN3Skktg_loWNEM9y9_nNBQ2mMnnweiZFY0XUX4xm17yAhnkVKhKSIglPoGs9WE_8nP1rodNqqCtwsJJrNQWQeAyAYKJvkgHskRmAFBkXJCOezZ6IyIp7q3HYekXF8KCMMwvwnbnQfTn1TLCK62uzxpPJoE"
}


export interface JwtPayload extends jose.JWTPayload {
    name: string
}

export const JwtPayloadContext = createContext<JwtPayload | null>(null);

type Props = {
    children: React.ReactNode
}
export const JwtAuth: React.FC<Props> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [authMsg, setAuthMsg] = useState<React.ReactElement>(<CheckingAuth />)
    
    let jwt = searchParams.get("jwt")
    searchParams.delete("jwt")
    if (!jwt) jwt = localStorage.jwt;
    if (!jwt) setAuthMsg(<NoAuth />)

    useEffect(() => {
        if (!jwt) return;
        jose.importJWK(jwk, 'RS256').then(publicKey => {
            if (!jwt) {
                setAuthMsg(<NoAuth />)
            } else {
                jose.jwtVerify(jwt, publicKey)
                    .then(verifiedJwt => {
                        localStorage.jwt = jwt;
                        const msgJwtPayload = verifiedJwt.payload as JwtPayload;
                        setAuthMsg(<JwtPayloadContext.Provider value={msgJwtPayload}>
                            {children}
                        </JwtPayloadContext.Provider>)
                    })
                    .catch(e => {
                        console.log(e)
                        delete localStorage.jwt
                        setAuthMsg(<BadToken />)
                    })
            }
        })
    }, [jwt])

    return authMsg
}

const NoAuth: React.FC = () => {
    return <div>No Jwt token TODO: Page ask for a token</div>
}

const CheckingAuth: React.FC = () => {
    return <div>Verifying authentification</div>
}

const BadToken: React.FC = () => {
    return <div>Bad token</div>
}   
import React, { createContext, useEffect, useState } from "react";
import { Outlet, useHref, useNavigate, useSearchParams } from "react-router-dom";
import * as jose from 'jose'
import jwk from './msg-RS256.key.pub.json'

export interface JwtPayload extends jose.JWTPayload {
    name?: string
    userTestCampaign?: string
}

const useJwtAuth = (noToken: () => void, invalidToken: () => void, validToken: (payload: JwtPayload) => void) => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("jwt")) {
        localStorage.jwt = url.searchParams.get("jwt");
        url.searchParams.delete("jwt");
        window.location.href = url.href
    }
    let jwt = localStorage.jwt
    console.log({useJwtAuth: jwt})
    useEffect(() => {
        if (!jwt) {
            console.log({noToken: jwt})
            noToken()
        } else {
            console.log({tokenPresent: jwt})
            jose.importJWK(jwk, 'RS256').then(publicKey => {
                console.log({importJWK: jwt})
                jose.jwtVerify(jwt, publicKey)
                    .then(verifiedJwt => {
                        console.log({jwtVerify: jwt})
                        localStorage.jwt = jwt;
                        console.log({ verifiedJwt })
                        const msgJwtPayload = verifiedJwt.payload as JwtPayload;
                        validToken(msgJwtPayload)
                    })
                    .catch(e => {
                        try {
                            console.log({ badJwt: jose.decodeJwt(jwt) })
                        } catch (e) {
                        } finally {
                            console.log(e)
                            invalidToken()
                        }
                    })
            })
        }
    }, [jwt])
}

export type JwtState = { name: "checking" } | { name: "notoken" } | { name: "badtoken" }  | { name: "valid", payload: JwtPayload }
export const JwtStateContext = createContext<JwtState | null>(null);

type Props = {
    children: React.ReactNode
}
export const JwtAuthProvider = ({ children }: Props) => {
    const [authMsg, setAuthMsg] = useState<React.ReactElement>(<JwtStateContext.Provider value={{ name: "checking" }}>
        {children}
    </JwtStateContext.Provider>)
    const provideState = (state: JwtState) => setAuthMsg(<JwtStateContext.Provider value={state}>
        {children}
    </JwtStateContext.Provider>)
    useJwtAuth(
        () => provideState({ name: "notoken" }),
        () => provideState({ name: "badtoken" }),
        payload =>  provideState({ name: "valid", payload }) 
    )
    return authMsg
}

export function useJwtState() {
    return React.useContext(JwtStateContext);
}

export function useJwtPayload() {
    const state = useJwtState()
    if (state?.name === "valid") {
        return state.payload
    }
    return null;
}
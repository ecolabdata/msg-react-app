import { useEffect, useMemo, useState } from "react";


const TestApiV2 = ({ }) => {
    const [query, setQuery] = useState("")
    const [resp, setResp ] = useState<any>()
    let timeoutHandle : number | null = null;
    useEffect(() => {
        if (query) {
            fetch('https://api-v2.msg.greentechinnovation.fr/acteur_public/search?' + new URLSearchParams({
                q: query,
            }))
            .then((resp) => resp.json())
            .then((json) => setResp(json))
        } else {
            setResp(null)
        }
    }, [query])

    const respHtml = useMemo(() => {
        if (!resp) return null
        return resp.hits.map((hit : any) => {
            const nomHtml = hit.fields["public_actor_nom"][0]
            const glHtml = Object.keys(hit.highlight).map (fieldname => <div key={fieldname} >
                <div className="brightness-75">{fieldname} :</div>
                <p style={{width: "50%"}} dangerouslySetInnerHTML={{__html: replaceHlTxt(hit.highlight[fieldname][0])}}></p>
            </div>)
            return <div className={"mt-10"} key={nomHtml}>
                <h1>{nomHtml}</h1>
                <div>{glHtml}</div>
            </div>
        })
    },[resp])

    function delaySetQuery(query : string) {
        if (timeoutHandle) window.clearTimeout(timeoutHandle)
        timeoutHandle = window.setTimeout(() => setQuery(query), 800)
    }
    console.log({respHtml})
    return <div>
        <input
            size={100}
            style={{"border": "1px solid white"}} type={"text"}
            onChange={e => delaySetQuery(e.target.value)}
            placeholder="Recherche par nom, siren, code CPV"
        />
        <div>
            {respHtml || "Pas de réponses"}
        </div>
    </div>
}

const openingTag = "@msg-highlighted-field@"
const closingTag = '@/msg-highlighted-field@'

function replaceHlTxt(txt : string) {
    console.log({txt})
    return txt.replaceAll("@msg-highlighted-field@", '<b style="color: green">').replaceAll('@/msg-highlighted-field@', '</b>')
}

export default TestApiV2;
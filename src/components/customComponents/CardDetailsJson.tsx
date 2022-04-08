import { ReactElement, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnyCard, CardTypeName, getSearch } from '../../api/Api';
import { Rocket } from '../../assets/Icons';
import { CardData } from '../../model/CardData';
import { byName, CardType } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';
interface CardDetailsProps {
    cardType: CardType,
    cardData: CardData,
}

function browseObject(obj: any,
    onLeaf: (prefix: string[], key: string, value: any) => void, prefix: string[] = []) {
    console.log("browseObject", obj);
    for (const [key, value] of Object.entries(obj)) {
        if (value != null && typeof value === 'object') {
            prefix.push(key)
            browseObject(value, onLeaf, prefix);
            prefix.pop()
        } else {
            onLeaf(prefix, key, value)
        }
    }
}


export const thematiqueToFieldsConf: Record<CardTypeName, Record<string, string | boolean>> = {
    "aides": {
        titre_aide: "Nom",
        funding_source_url: "Url source",
        aide_detail: "Détails de l'aide",
        contact: "Qui contacter ?"
    },
    "marches": {},
    // "marché": {
    //     libelle: "Nom",
    //     groupe_marchandise_nom: "Groupe Marchandise",
    //     duree_mois: "Durée (en mois)",
    //     annee: "Année",
    //     depense_annualisee: "Dépense annualisée",
    //     acheteur: "Acheteur",
    //     entite_porteuse: "Entité Porteuse",
    //     contexte: "Contexte"
    // },
    "collectivites": {
        nom: "Nom"
    },
    "investisseurs": {
        "nom": "Nom",
        "mail": "Email",
        "fonction": "Fonction",
        "telephone": "Telephone",
        "type_investissements": "Types d'investissements",
        "secteurs": "Secteurs",
        "montant_min": "Investissement minimum (€)",
        "montant_max": "Investissement maximum (€)"
    }  
};

const CardDetailsJson = () => {
    const { usedFavoris, usedCorbeille } = useContext(ApplicationContext)
    const [toggleFavori, isFavori, favoris] = usedFavoris
    const [toggleInCorbeille, isInCorbeille, corbeille] = usedCorbeille

    useEffect(() => {
        window.scrollTo(0,0)
    })
    const { searchId, cardId } = useParams();
    if (!cardId) throw new Error("cardId mandatory")
    const initialSearch = searchId ? getSearch(searchId) : null
    const data = initialSearch?.cardsById[cardId] || favoris[cardId] || corbeille[cardId]
    const devMode = true;
    const toDisplay: ReactElement[] = [];
    const cardType = byName[data.cardTypeName]
    const fieldsConf = thematiqueToFieldsConf[cardType.apiName]
    browseObject(data, (prefix, key, value) => {
        const fullname = [...prefix, key].join("/")
        if (value) {
            const humanReadableName = fieldsConf[fullname]
            if (humanReadableName) {
                const devTitle = (devMode && humanReadableName) ? <span style={{ filter: "opacity(25%)" }}>({fullname})</span> : null
                toDisplay.push(<div key={key} style={{ margin: "20px" }}>
                    <div style={{ margin: "20px 0px", color: cardType.color }}>{humanReadableName || fullname} {devTitle}</div>
                    <div style={{ margin: "20px 0px" }} dangerouslySetInnerHTML={{ __html: value + "" }}></div>
                    <div style={{ width: "200px", border: "0.5px solid rgba(206, 206, 206, 0.2)" }}></div>
                </div>)
            } else if (devMode) {
                toDisplay.push(<div key={key} style={{ margin: "20px", filter: "opacity(25%)" }}>
                    <div style={{ margin: "20px 0px", color: cardType.color }}>{humanReadableName || fullname}</div>
                    <div style={{ margin: "20px 0px" }} dangerouslySetInnerHTML={{ __html: value + "" }}></div>
                    <div style={{ width: "200px", border: "0.5px solid rgba(206, 206, 206, 0.2)" }}></div>
                </div>)
            }
        }
    })
    return <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {toDisplay}
            {/* <div style={{ width: "800px", border: `2px solid ${thematiqueUI.color}` }}>
            <SyntaxHighlighter language="javascript" style={style}>
                {JSON.stringify(data, null, " ")}
            </SyntaxHighlighter>
        </div> */}
        </div>
    </div>
    return (
        <>
            <div className='flex justify-around'>
                <div className="contentContainer  w-1/2" >

                    <pre> 
                        {JSON.stringify(data, null, "  ")}
                    </pre>
                    
                </div>
            </div>
        </>
    )
};

export default CardDetailsJson;
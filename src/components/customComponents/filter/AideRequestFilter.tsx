import { useState } from "react";
import all_aides_types from "../../../api/aide-types.json";
import { AidesQuery, AnyCard, searchAidesClient, searchAidesInno } from "../../../api/Api";
import { CardType } from "../../../model/CardType";
import { InitialState } from "../../../utils/InitialState";
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';
import { RequestFilter } from "./RequestFIlter";

const echeances: Record<string, number> = {
    "Moins d'1 mois": 1,
    "Moins de 3 mois": 3,
    "Moins de 6 mois": 6
}


export class AideRequestFilter implements RequestFilter {
    displayAidePermanente: boolean = true
    aid_type: string = ""
    echeance: string = ""
    allCards: AnyCard[] = []
    cardType : CardType

    constructor(initialState : (InitialState & { page?: number, montantMin: number }) | null, cardType : CardType) {
        this.cardType = cardType
        if (initialState?.search.cards) {
            const initialQuery = initialState?.search.query as (AidesQuery | null);
            this.displayAidePermanente = initialQuery ? initialQuery.displayAidePermanente : true
            this.aid_type = initialQuery?.aid_type || ""
            this.echeance = initialQuery?.echeance || ""
            this.allCards = this.filter(cardType.name === "aides-innovations" ? initialState.search.cards.aides_innovation : initialState.search.cards.aides_clients)
        }
    }

    filter(cards: AnyCard[]) {
        const {displayAidePermanente, aid_type, echeance} = this
        if (aid_type) cards = cards.filter(x => x.aid_types?.includes(aid_type))
    
        if (echeance) {
            cards = cards.filter(card => {
                if (card.name === "Réaliser des projets de solidarité internationale d'accès à l'eau") debugger;
                if (card.submission_deadline) {
                    const Xmonth = echeances[echeance]
                    const XmonthLater = new Date()
                    XmonthLater.setMonth(XmonthLater.getMonth() + Xmonth)
                    const deadline = new Date(card.submission_deadline)
                    return deadline < XmonthLater
                } else {
                    return displayAidePermanente
                }
            })
        }
    
        if (!displayAidePermanente) cards = cards.filter(card => card.submission_deadline)
    
        return cards
    }

    get cards() {
        return this.allCards
    }

    search(description: string, motsclefs: string[], secteurs: string[]) {
        const {cardType, aid_type, echeance, displayAidePermanente} = this;
        switch (cardType.name) {
            case "aides-clients":
                return searchAidesClient({
                    description,
                    motsclefs,
                    secteurs,
                    displayAidePermanente,
                    aid_type,
                    echeance

                })
            case "aides-innovations":
                return searchAidesInno({
                    description,
                    motsclefs,
                    secteurs,
                    displayAidePermanente,
                    aid_type,
                    echeance
                })
            default : 
                return Promise.reject("Unknown card type")
        }
    }

    Component = ({}) => {
        const {cardType} = this;
        const [displayAidePermanente, setDisplayAidePermanente] = useState(this.displayAidePermanente);
        const [aid_type, setAid_type] = useState(this.aid_type);
        const [echeance, setEcheance] = useState(this.echeance);
    
        return <>
            <Select classes=" w-[93%] 
                                    lg:mx-2 lg:max-w-[202px]" label="Nature de l'aide"
                color={cardType.color}
                defaultOption={"Toutes"}
                optionsData={all_aides_types.results.map(x => x.name)} onChange={e => {
                    this.aid_type = e.currentTarget.value
                    setAid_type(e.currentTarget.value)
                }}
                selected={aid_type}/>
    
            {/* <Select classes=" w-[93%]
                                    lg:mx-2 lg:max-w-[202px]" label="Zone géographique ciblée"
                color={cardType.color}
                defaultOption={"Toutes"}
                optionsData={Object.keys(echeances)} onChange={e => {
                    this.echeance = e.currentTarget.value
                    setEcheance(e.currentTarget.value)
                }}
                selected={echeance}/> */}
    
            <Select classes=" w-[93%]
                                    lg:mx-2 lg:max-w-[202px]" label="Echéance"
                color={cardType.color}
                defaultOption={"Toutes"}
                optionsData={Object.keys(echeances)} onChange={e => {
                    this.echeance = e.currentTarget.value
                    setEcheance(e.currentTarget.value)
                }}
                selected={echeance}/>
    
            <div className="toggleButtonsContainer w-[93%] flex flex-col grow
                                    lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
                <ToggleButton label={"Afficher les aides permanentes"} checked={displayAidePermanente} color={cardType.color} onChange={e => {
                    this.displayAidePermanente = !displayAidePermanente
                    setDisplayAidePermanente(!displayAidePermanente)
                }}
                />
            </div>
        </>
    }

}

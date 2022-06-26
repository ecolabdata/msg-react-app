import { useState } from "react";
import { AnyCard, Investisseur, InvestisseurQuery, search, searchInvestisseur } from "../../../api/Api";
import { CardType } from "../../../model/CardType";
import { InitialState } from "../../../utils/InitialState";
import { RequestFilter } from "./RequestFIlter";

export class InvestisseurRequestFilter implements RequestFilter {

    //Montant min
    //Votre chiffre d'affaire
    //Type de financement
    //Zone géographique
    allCards: Investisseur[] = []
    cardType: CardType
    montantMin: number;

    constructor(initialState: (InitialState & { page?: number, montantMin: number }) | null, cardType: CardType) {
        this.cardType = cardType
        const initialQuery = initialState?.search.query as (InvestisseurQuery | null);
        this.montantMin = initialQuery?.montantMin || 0;
    
        if (initialState?.search.cards) {
            // this.displayAidePermanente = initialQuery ? initialQuery.displayAidePermanente : true
            // this.aid_type = initialQuery?.aid_type || ""
            // this.echeance = initialQuery?.echeance || ""
            // this.allCards = this.filter(cardType.name === "aides-innovations" ? initialState.search.cards.aides_innovation : initialState.search.cards.aides_clients)
        }
    }

    filter(cards: AnyCard[]) {
        return cards
    }

    get cards() {
        return this.allCards
    }

    search(description: string, motsclefs: string[], secteurs: string[]) {
        return searchInvestisseur({
            type: "investisseur",
            description,
            motsclefs,
            secteurs,
            montantMin: this.montantMin
        })
    }

    Component = ({ }) => {
        <></>
        // const {cardType} = this;
        // const [displayAidePermanente, setDisplayAidePermanente] = useState(this.displayAidePermanente);
        // const [aid_type, setAid_type] = useState(this.aid_type);
        // const [echeance, setEcheance] = useState(this.echeance);
        const [montantMin, setMontantMin] = useState<number>(this.montantMin)
        return <>
            <div className="my-2 flex flex-col items-center lg:flex-row lg:mb-6">
                <div className="inputNumber mr-6 flex flex-col font-light ">
                    <label className="mb-1 text-white text-base" htmlFor="montantKEuro">Montant min. en K€</label>
                    <input
                        className={`text-white rounded-t-md w-64 h-10 addBorder-b border-2 bg-input-background`}
                        style={{ borderColor: this.cardType.color }} type="number" id="montantKEuro"
                        defaultValue={this.montantMin.toString()}
                        onChange={e => {
                            const parsed = Number.parseInt(e.target.value);
                            this.montantMin = parsed
                            setMontantMin(parsed)
                        }}
                    />
                </div>
            </div>
        </>
    }

}

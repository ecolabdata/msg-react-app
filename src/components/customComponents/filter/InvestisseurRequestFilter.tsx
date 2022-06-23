import { AnyCard, Investisseur, search } from "../../../api/Api";
import { CardType } from "../../../model/CardType";
import { InitialState } from "../../../utils/InitialState";
import { RequestFilter } from "./RequestFIlter";

export class InvestisseurRequestFilter implements RequestFilter {
    
    //Montant min
    //Votre chiffre d'affaire
    //Type de financement
    //Zone géographique
    allCards: Investisseur[''] = []
    cardType : CardType

    constructor(initialState : (InitialState & { page?: number, montantMin: number }) | null, cardType : CardType) {
        this.cardType = cardType
        if (initialState?.search.cards) {
            // const initialQuery = initialState?.search.query as (Startup | null);
            // this.displayAidePermanente = initialQuery ? initialQuery.displayAidePermanente : true
            // this.aid_type = initialQuery?.aid_type || ""
            // this.echeance = initialQuery?.echeance || ""
            // this.allCards = this.filter(cardType.name === "aides-innovations" ? initialState.search.cards.aides_innovation : initialState.search.cards.aides_clients)
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
     console.log('ICI =>',search({description, motsclefs, secteurs}));
     search({description, motsclefs, secteurs}).then(response => {
        console.log('response :>> ', response);
     });
     return search({description, motsclefs, secteurs});
    }

    Component = ({}) => {
        <></>
        // const {cardType} = this;
        // const [displayAidePermanente, setDisplayAidePermanente] = useState(this.displayAidePermanente);
        // const [aid_type, setAid_type] = useState(this.aid_type);
        // const [echeance, setEcheance] = useState(this.echeance);
    
        return <>
            {/* <Select classes=" w-[93%] 
                lg:mx-2 lg:max-w-[202px]" label="Région"
                color={cardType.color}
                defaultOption={"Toutes"}
                optionsData={all_aides_types.results.map(x => x.name)} onChange={e => {
                    this.aid_type = e.currentTarget.value
                    setAid_type(e.currentTarget.value)
                }}
                selected={aid_type}/> */}
    
            {/* <Select classes=" w-[93%]
                lg:mx-2 lg:max-w-[202px]" label="Zone géographique ciblée"
                color={cardType.color}
                defaultOption={"Marurité"}
                optionsData={Object.keys(echeances)} onChange={e => {
                    this.echeance = e.currentTarget.value
                    setEcheance(e.currentTarget.value)
                }}
                selected={echeance}/>
    
            <Select classes=" w-[93%]
                
                lg:mx-2 lg:max-w-[202px]" label="Echéance"
                color={cardType.color}
                defaultOption={"Marché"}
                optionsData={Object.keys(echeances)} onChange={e => {
                    this.echeance = e.currentTarget.value
                    setEcheance(e.currentTarget.value)
                }}
                selected={echeance}/> */}
    
        </>
    }

}

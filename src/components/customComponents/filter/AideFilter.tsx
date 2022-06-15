import { useState } from "react"
import { Aide } from "../../../api/Api"
import { aideClient, aideInno, Any as AnyCardType } from "../../../model/CardType"
import { FilterComponentParam, SearchFilterConfig } from "./FiltersConfig"
import Select from '../../dsfrComponents/Select';
import all_aides_types from "../../../api/aide-types.json"
import ToggleButton from '../../dsfrComponents/ToggleButton';

const echeances: Record<string, number> = {
    "Moins d'1 mois": 1,
    "Moins de 3 mois": 3,
    "Moins de 6 mois": 6
}

export type AideFilterValues = { displayAidePermanente: boolean, aid_type: string, echeance: string }
export type AideFilterConfig = SearchFilterConfig<AideFilterValues, Aide>

const aideFilterCards: AideFilterConfig["filterCards"] = ({ displayAidePermanente, aid_type, echeance }, cards) => {
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

type AideComponentParam = FilterComponentParam<AideFilterValues>
const aideComponent :  (cardType: AnyCardType) => React.FC<AideComponentParam> = (cardType) => ({ initialValues, onFilterChange}) => {
    const [displayAidePermanente, setDisplayAidePermanente] = useState(initialValues.displayAidePermanente);
    const [aid_type, setAid_type] = useState(initialValues.aid_type);
    const [echeance, setEcheance] = useState(initialValues.echeance);

    return <>
        <Select classes=" w-[93%] 
                                lg:mx-2 lg:max-w-[202px]" label="Nature de l'aide"
            color={cardType.color}
            defaultOption={"Toutes"}
            optionsData={all_aides_types.results.map(x => x.name)} onChange={e => {
                setAid_type(e.currentTarget.value)
            }} />

        <Select classes=" w-[93%]
                                lg:mx-2 lg:max-w-[202px]" label="Zone géographique ciblée"
            color={cardType.color}
            defaultOption={"Toutes"}
            //? Value muste be changed 
            optionsData={Object.keys(echeances)} onChange={e => {
                setEcheance(e.currentTarget.value)
            }} />

        <Select classes=" w-[93%]
                                lg:mx-2 lg:max-w-[202px]" label="Echéance"
            color={cardType.color}
            defaultOption={"Toutes"}
            optionsData={Object.keys(echeances)} onChange={e => {
                setEcheance(e.currentTarget.value)
            }} />

        <div className="toggleButtonsContainer w-[93%] flex flex-col grow
                                lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
            <ToggleButton label={"Afficher les aides permanentes"} checked={displayAidePermanente} color={cardType.color} onChange={e => setDisplayAidePermanente(!displayAidePermanente)} />
        </div>
    </>
}

export const aideClientFilters : AideFilterConfig = {
    filterCards: aideFilterCards,
    Component: aideComponent(aideClient)
}

export const aideInnoFilters : AideFilterConfig = {
    filterCards: aideFilterCards,
    Component: aideComponent(aideInno)
}
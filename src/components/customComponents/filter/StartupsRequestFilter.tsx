import { useState } from "react";
import all_aides_types from "../../../api/aide-types.json";
import { Startup, AnyCard, search, searchStartups, Query } from "../../../api/Api";
import { CardType } from "../../../model/CardType";
import { InitialState } from "../../../utils/InitialState";
import Select from '../../dsfrComponents/Select';
import ToggleButton from '../../dsfrComponents/ToggleButton';
import { RequestFilter } from "./RequestFIlter";


export class StartupsRequestFilter implements RequestFilter {
    

    allCards: Startup[] = []
    cardType : CardType

    constructor(initialState : (InitialState & { page?: number, montantMin: number }) | null, cardType : CardType) {
        this.cardType = cardType

        if (initialState?.search.cards) {
            const initialQuery = initialState?.search.query as Query;
            this.allCards = initialState.search.cards.startups
        }
    }

    get cards() {
        return this.allCards
    }

    search(description: string, motsclefs: string[], secteurs: string[]) {
     return search({description, motsclefs, secteurs});
    }

    Component = () => <></>

}

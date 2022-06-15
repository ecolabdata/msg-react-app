import { useState } from "react"
import { Aide } from "../../../api/Api"
import { aideClientFilters, AideFilterConfig } from "./AideFilter"

type OnFilterChange<FilterValues> = (values: FilterValues) => void

export type FilterComponentParam<FilterValues> = { onFilterChange:  OnFilterChange<FilterValues>, initialValues: FilterValues}
export type SearchFilterConfig<FilterValues, ApiType> = {
    filterCards: (values: FilterValues, cards: ApiType[]) => ApiType[]
    Component: React.FC<FilterComponentParam<FilterValues>>
}



export type AnyFiltersConfig = AideFilterConfig | SearchFilterConfig<{filterName: string}, Aide>
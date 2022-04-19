import { AnyCard } from "../api/Api";

export type InitialState = {
    secteurs?: string[],
    description?: string,
    cardsById?: Record<string, AnyCard>
    motsclefs?: string[]
}
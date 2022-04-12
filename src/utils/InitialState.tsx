import { AnyCard } from "../api/Api";

export type InitialState = {secteur?: string[], description?: string, cardsById?: Record<string, AnyCard>}
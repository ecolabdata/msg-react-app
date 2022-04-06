import { AnyCard } from "../api/Api";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const buildUseCategorie = (categorie : string) => () : [(card: AnyCard) => void, (card: AnyCard) => boolean, Record<string, AnyCard>, (x: Record<string, AnyCard>) => void] => {
    const [cardCategorie, setCardCategorie] = useLocalStorage<Record<string, AnyCard>>(categorie, {})
    const toggleCategorie = (card: AnyCard) => {
        if (!cardCategorie[card.id]) {
            setCardCategorie(Object.assign({}, cardCategorie, { [card.id]: card }))
        } else {
            delete cardCategorie[card.id]
            setCardCategorie(Object.assign({}, cardCategorie))
        }
    }
    const isCategorie = (card: AnyCard) => {
        return cardCategorie[card.id] != undefined
    }
    return [toggleCategorie, isCategorie, cardCategorie, setCardCategorie]
}

export const useFavoris = buildUseCategorie("favori")
export const useCorbeille= buildUseCategorie("corbeille")

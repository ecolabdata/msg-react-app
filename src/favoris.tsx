import { AnyCard } from "./api/Api";
import { useLocalStorage } from "./hooks/useLocalStorage";


export const useFavoris = () : [(card: AnyCard) => void, (card: AnyCard) => boolean, Record<string, AnyCard>, (x: Record<string, AnyCard>) => void] => {
    const [favoris, setFavoris] = useLocalStorage<Record<string, AnyCard>>("favoris", {})
    const toggleFavori = (card: AnyCard) => {
        if (!favoris[card.id]) {
            setFavoris(Object.assign({}, favoris, { [card.id]: card }))
        } else {
            delete favoris[card.id]
            setFavoris(Object.assign({}, favoris))
        }
    }
    const isFavori = (card: AnyCard) => {
        return favoris[card.id] != undefined
    }
    return [toggleFavori, isFavori, favoris, setFavoris]
}
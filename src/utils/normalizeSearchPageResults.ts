import { SearchResultItem } from "apiv4/interfaces/typeguards"
import { PublicBuyerResults } from "apiv4/interfaces/publicBuyer"
import { isPublicBuyerResultList, isCompanyCardList } from "apiv4/interfaces/typeguards"

export const normalizeSearchPageResults = (cards: SearchResultItem[] | PublicBuyerResults) => {
  if (!cards) return
  if (isPublicBuyerResultList(cards)) {
    return cards.hits
  }
  if (!cards.length) return
  if (isCompanyCardList(cards)) {
    return cards.filter((data) => !(data.card.data_source.green20?.Pitch)) //this is because green20 does not exist anymore and should not even be returned by api
  }
  return cards
}
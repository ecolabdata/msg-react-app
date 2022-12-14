import { ProjetAchat } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { achatPrevi, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const ProjetAchatSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(achatPrevi.name)} cardType={achatPrevi}>
        {(card, i, isLoading) => <ProjetAchatResultCard cardType={achatPrevi} key={i} isLoading={isLoading} su={card as ProjetAchat} />}
    </SearchPage>
}

interface ProjetAchatResultCardProps {
    isLoading: boolean,
    pa: ProjetAchat,
    cardType: CardType
}

export const ProjetAchatResultCard: React.FC<ProjetAchatResultCardProps> = ({ isLoading, pa, cardType }) => {
    const slug = slugify(pa.label);
    const d = new Date(pa.publicationTargetDate);
    const targetDate =
      ('0' + d?.getUTCDate()).slice(-2) +
      '/' +
      ('0' + ((d?.getUTCMonth() || 0) + 1)).slice(-2) +
      '/' +
      d?.getUTCFullYear();
    return <ResultCard cardType={cardType} name={pa.label} toprow={pa.purchasingEntity.label} linkData={pa} slug={slug} isLoading={isLoading}>
         <p>Date visée de publication: {targetDate}</p>
    </ResultCard >
}
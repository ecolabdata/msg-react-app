import { ProjetAchat } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { achatPrevi, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const ProjetAchatSearchPage : React.FC<{cardType: CardType}> = ({cardType}) => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType}>
        {(card, i, isLoading) => <ProjetAchatResultCard key={i} isLoading={isLoading} pa={card as ProjetAchat} />}
    </SearchPage>
}

interface ProjetAchatResultCardProps {
    isLoading?: boolean,
    pa: ProjetAchat,
}

export const ProjetAchatResultCard: React.FC<ProjetAchatResultCardProps> = ({ isLoading, pa }) => {
    const slug = slugify(pa.label);
    const d = new Date(pa.publicationTargetDate);
    const targetDate =
      ('0' + d?.getUTCDate()).slice(-2) +
      '/' +
      ('0' + ((d?.getUTCMonth() || 0) + 1)).slice(-2) +
      '/' +
      d?.getUTCFullYear();
    return <ResultCard cardType={achatPrevi} name={pa.label} toprow={pa.purchasingEntity.label} linkData={pa} slug={slug} isLoading={isLoading}>
         <p>Date visée de publication: {targetDate}</p>
    </ResultCard >
}
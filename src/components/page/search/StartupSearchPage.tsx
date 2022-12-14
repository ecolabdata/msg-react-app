import { Collectivite, Startup } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { startups, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const StartupSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(startups.name)} cardType={startups}>
        {(card, i, isLoading) => <StartupResultCard cardType={startups} key={i} isLoading={isLoading} su={card as Startup} />}
    </SearchPage>
}

interface StartupResultCardProps {
    isLoading: boolean,
    su: Startup,
    cardType: CardType
}

export const StartupResultCard: React.FC<StartupResultCardProps> = ({ isLoading, su, cardType }) => {
    const slug = slugify(su['Start-up']);
    return <ResultCard cardType={cardType} name={su['Start-up']} toprow={su['Thématique']} linkData={su} slug={slug} isLoading={isLoading}>
        <p>{su['Pitch']}</p>
    </ResultCard >
}
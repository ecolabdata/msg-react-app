import { Collectivite } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { acheteurPublic, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const ActeurPublicSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(acheteurPublic.name)} cardType={acheteurPublic}>
        {(card, i, isLoading) => <ActeurPublicResultCard cardType={acheteurPublic} key={i} isLoading={isLoading} ap={card as Collectivite} />}
    </SearchPage>
}

interface ActeurPublicResultCardProps {
    isLoading: boolean,
    ap: Collectivite,
    cardType: CardType
}

export const ActeurPublicResultCard: React.FC<ActeurPublicResultCardProps> = ({ isLoading, ap, cardType }) => {
    const slug = slugify(ap.public_actor_nom);
    return <ResultCard cardType={cardType} name={ap.public_actor_nom} toprow={'Ville / Région'} linkData={ap} slug={slug} isLoading={isLoading}>
        {
            ap.labelled_startups?.length > 0 ? (
                <p>
                    Ils ont travaillés avec:
                    <br />
                    {ap.labelled_startups
                        .map((startup) => startup.nom)
                        .filter(Boolean)
                        .join(', ')}
                </p>
            ) : null
        }
    </ResultCard >
}
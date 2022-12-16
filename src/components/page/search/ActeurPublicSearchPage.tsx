import { Collectivite } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { acheteurPublic, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const ActeurPublicSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(acheteurPublic.name)} cardType={acheteurPublic}>
        {(card, i, isLoading) => <ActeurPublicResultCard key={i} isLoading={isLoading} ap={card as Collectivite} />}
    </SearchPage>
}

interface ActeurPublicResultCardProps {
    isLoading?: boolean,
    ap: Collectivite,
}

export const ActeurPublicResultCard: React.FC<ActeurPublicResultCardProps> = ({ isLoading, ap }) => {
    const slug = slugify(ap.nom);
    return <ResultCard cardType={acheteurPublic} name={ap.nom} toprow={'Ville / Région'} linkData={ap} slug={slug} isLoading={isLoading}>
      {ap.Startups != '0' ? (
        <p>
          Ils ont travaillés avec:
          <br />
          {ap.Startups.split(',').join(', ')}
        </p>
      ) : null}
    </ResultCard >
}
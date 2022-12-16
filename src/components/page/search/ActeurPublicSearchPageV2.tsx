import { Collectivite } from "api/Api"
import { Hit } from "api2/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { acheteurPublic, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPageV2"

export const ActeurPublicSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(acheteurPublic.name)} cardType={acheteurPublic}>
        {(hit, i, isLoading) => <ActeurPublicResultCard key={i} isLoading={isLoading} ap={hit} />}
    </SearchPage>
}

interface ActeurPublicResultCardProps {
    isLoading?: boolean,
    ap: Hit,
}

export const ActeurPublicResultCard: React.FC<ActeurPublicResultCardProps> = ({ isLoading, ap }) => {
    const slug = slugify(ap.fields.public_actor_nom[0]);

    const nomHtml = ap.fields["public_actor_nom"][0]
    const glHtml = Object.keys(ap.highlight).map(fieldname => <div key={fieldname} >
        {(ap as any).highlight[fieldname].length} {fieldname} contiennent des mots de votre recherche
        {/* <div className="brightness-75">{fieldname} :</div> */}
        {/* <p style={{ width: "50%" }} dangerouslySetInnerHTML={{ __html: replaceHlTxt((ap as any).highlight[fieldname]) }}></p> */}
    </div>)

    return <ResultCard cardType={acheteurPublic} name={ap.fields.public_actor_nom[0]} toprow={'Ville / Région'} linkData={{}} slug={slug} isLoading={isLoading}>
        <div>{ap._score}</div>
        <div>{glHtml}</div>
    </ResultCard >
}

const openingTag = "@msg-highlighted-field@"
const closingTag = '@/msg-highlighted-field@'

function replaceHlTxt(txt : string) {
    console.log({txt})
    return txt.replaceAll("@msg-highlighted-field@", '<b style="color: green">').replaceAll('@/msg-highlighted-field@', '</b>')
}
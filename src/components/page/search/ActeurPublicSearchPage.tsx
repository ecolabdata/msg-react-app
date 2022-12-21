import { Api, HitPublicBuyer } from "api2/Api"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { acheteurPublic, CardType } from "model/CardType"
import slugify from "slugify"
import { buildSearchPageV2 } from "../SearchPageV2"

const SearchPageV2 = buildSearchPageV2(Api.searchActeurPublic)

export const ActeurPublicSearchPage: React.FC<{ cardType: CardType }> = ({ cardType }) => {
    return <SearchPageV2 usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType}>
        {(hit, i, isLoading) => <ActeurPublicResultCard key={i} isLoading={isLoading} ap={hit} cardType={cardType} />}
    </SearchPageV2>
}

interface ActeurPublicResultCardProps {
    isLoading?: boolean,
    ap: HitPublicBuyer,
    cardType: CardType
}

export const ActeurPublicResultCard: React.FC<ActeurPublicResultCardProps> = ({ isLoading, ap, cardType }) => {
    const slug = slugify(ap.fields.public_actor_nom[0]);
    const public_actor_id = ap.fields.public_actor_id[0]
    const public_actor_id_siren = ap.fields.public_actor_id_siren[0]
    const startups = [...(ap.fields['labelled_startups.nom'] || []), ...(ap.fields['public_references_startups.nom'] || [])]
    const decpFirst = Object.keys(ap.highlight).filter(key => key.startsWith("decp."))[0]
    const approchFirst = Object.keys(ap.highlight).filter(key => key.startsWith("approch_content."))[0]
    const hl = ap.highlight as Record<string, string[] | undefined>
    const countDecp = hl[decpFirst]?.length || 0
    const countApproch = hl[approchFirst]?.length || 0
    //debugger;
    const public_actor_nom = ap.fields.public_actor_nom[0]
    const hlPublic_actor_nom = ap.highlight.public_actor_nom
        ? <p dangerouslySetInnerHTML={{ __html: replaceHlTxt(ap.highlight.public_actor_nom[0], cardType.color) }}></p>
        : undefined

    return <ResultCard id={public_actor_id} cardType={acheteurPublic} name={public_actor_nom} nameElem={hlPublic_actor_nom} toprow={'Ville / Région'} linkData={{}} slug={slug} isLoading={isLoading}>
        {/* <div>{ap._score}</div>
        <div>{public_actor_id}</div>
        <div>{public_actor_id_siren}</div> */}
        {startups?.length ? <div>Ils ont travaillé avec {startups?.join(',')}</div> : null}
        { countDecp ? <><b style={{ color: cardType.color }}>{countDecp}</b> Marchés passés</> : null}
        {(countDecp && countApproch) ? " et " : null}
        {countApproch ? <><b style={{ color: cardType.color }}>{countApproch}</b> Achats programmés</> : null}
        {(countDecp || countApproch) ? <div>contiennent des mots de votre recherche</div> : null}
    </ResultCard >
}

const openingTag = "@msg-highlighted-field@"
const closingTag = '@/msg-highlighted-field@'

function replaceHlTxt(txt: string, cssColor: string) {
    console.log({ txt })
    return txt.replaceAll(openingTag, `<b style="color: ${cssColor}">`).replaceAll(closingTag, '</b>')
}
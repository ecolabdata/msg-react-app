import { Investisseur } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { investisseur, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const InvestisseurSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(investisseur.name)} cardType={investisseur}>
        {(card, i, isLoading) => <InvestisseurResultCard key={i} isLoading={isLoading} invest={card as Investisseur} />}
    </SearchPage>
}

interface InvestisseurResultCardProps {
    isLoading: boolean,
    invest: Investisseur,
}

export const InvestisseurResultCard: React.FC<InvestisseurResultCardProps> = ({ isLoading, invest }) => {
    const slug = slugify(invest['Nom du fonds']);
    return <ResultCard cardType={investisseur} name={invest['Nom du fonds']} toprow={invest['Vous êtes']} linkData={invest} slug={slug} isLoading={isLoading}>
        <p>
            {invest['Ticket min en K€']}K€ - {invest['Ticket max en K€']}K€
        </p>
        <p className="h-[3em] truncate" title={invest["Présentation de la politique d'investissement"]}>
            {invest["Présentation de la politique d'investissement"].split(';').join(' | ')}
        </p>
        <DetailBadges contents={invest['Type de financement'].split(';')} />
    </ResultCard >
}
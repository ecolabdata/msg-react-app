import { Aide } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import { aideClient, aideInno, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "../SearchPage"

export const AideInnoSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(aideInno.name)} cardType={aideInno}>
        {(card, i, isLoading) => <AideResultCard cardType={aideInno} key={i} isLoading={isLoading} aide={card as Aide} />}
    </SearchPage>
}

export const AideClientSearchPage = () => {
    return <SearchPage usedAdvancedFilter={useAdvancedFilters(aideClient.name)} cardType={aideClient}>
        {(card, i, isLoading) => <AideResultCard cardType={aideClient} key={i} isLoading={isLoading} aide={card as Aide} />}
    </SearchPage>
}

interface AideResultCardProps {
    isLoading: boolean,
    aide: Aide,
    cardType: CardType
}

export const AideResultCard: React.FC<AideResultCardProps> = ({ isLoading, aide, cardType }) => {
    const displayableFinancers = aide.financers?.join(' | ') || '';
    const slug = slugify(aide['slug']);
    let displayabeSubmissionDeadLine = '';
    const d = aide.submission_deadline ? new Date(aide.submission_deadline) : null;
    displayabeSubmissionDeadLine =
        ('0' + d?.getUTCDate()).slice(-2) +
        '/' +
        ('0' + ((d?.getUTCMonth() || 0) + 1)).slice(-2) +
        '/' +
        d?.getUTCFullYear();
    return <ResultCard
        cardType={cardType} name={aide.name} toprow={displayableFinancers} linkData={aide} slug={slug} isLoading={isLoading}>
        <div data-org-value={aide.submission_deadline}>
            {' '}
            {aide.submission_deadline
                ? `Date de clôture: ${displayabeSubmissionDeadLine}`
                : 'Aide permanente'}
        </div>
        <DetailBadges contents={aide.aid_types} />
    </ResultCard >
}
import { Aide } from "api/Api"
import DetailBadges from "components/customComponents/DetailBadges"
import { FilterProperties, useAdvancedFilters } from "components/customComponents/filter/filters"
import ResultCard from "components/customComponents/ResultCard"
import SearchResults from "components/customComponents/SearchResults"
import { aideClient, aideInno, CardType } from "model/CardType"
import slugify from "slugify"
import { SearchPage } from "./SearchPage"

const AideInnoSearchPage = () => {
    return <AideSearchPage usedAdvancedFilter={useAdvancedFilters(aideInno.name)} cardType={aideInno} />
}

const AideClientSearchPage = () => {
    return <AideSearchPage usedAdvancedFilter={useAdvancedFilters(aideClient.name)} cardType={aideClient} />
}

interface AideSearchPageProps {
    usedAdvancedFilter: FilterProperties,
    cardType: CardType
}

const AideSearchPage: React.FC<AideSearchPageProps> = ({ usedAdvancedFilter, cardType }) => {
    return <SearchPage cardType={cardType} usedAdvancedFilter={usedAdvancedFilter} >
        {
            (isLoading, cardSlice) => <SearchResults cards={cardSlice} isLoading={isLoading}>
                {cardSlice.map((card, i) => <AideResultCard cardType={cardType} key={i} isLoading={isLoading} aide={card as Aide} />)}
            </SearchResults>
        }
    </SearchPage >
}

interface AideResultCardProps {
    isLoading: boolean,
    aide: Aide,
    cardType : CardType
}

const AideResultCard: React.FC<AideResultCardProps> = ({ isLoading, aide, cardType }) => {
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
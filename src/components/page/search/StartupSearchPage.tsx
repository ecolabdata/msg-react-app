import { Startup } from 'api/Api';
import { Api, HitStartup } from 'api2/Api';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import ResultCard from 'components/customComponents/ResultCard';
import { CardType, startups } from 'model/CardType';
import slugify from 'slugify';
import { getGreenTechData } from 'utils/utilityFunctions';
import { buildSearchPageV2 } from '../SearchPageV2';

const SearchPageV2 = buildSearchPageV2(Api.searchStartup)

export const StartupSearchPage: React.FC<{ cardType: CardType }> = ({ cardType }) => {
  return (
    <SearchPageV2 usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType}>
      {(hit, i, isLoading) => (
        <StartupResultCard cardType={cardType} key={i} isLoading={isLoading} hit={hit} />
      )}
    </SearchPageV2>
  );
};

interface StartupResultCardProps {
  isLoading?: boolean;
  hit: HitStartup;
  cardType: CardType;
}

export const StartupResultCard: React.FC<StartupResultCardProps> = ({ isLoading, hit, cardType }) => {
  const NOM = hit.fields.NOM[0]
  const hlNOM = hit.highlight.NOM
    ? <p dangerouslySetInnerHTML={{ __html: replaceHlTxt(hit.highlight.NOM[0], cardType.color) }}></p>
    : undefined
  const thematiqueGI = hit.fields['SOLUTIONS.GreenTech Innovation.Thématique'] && hit.fields['SOLUTIONS.GreenTech Innovation.Thématique'][0]
  const thematiqueG20 = hit.fields['SOLUTIONS.GREEN20.Secteurs d\'activité'] && hit.fields['SOLUTIONS.GREEN20.Secteurs d\'activité'][0]
  const thematique = thematiqueGI || thematiqueG20 || 'N/A'

  const slug = slugify(hit.fields.NOM[0])

  const hl = hit.highlight as Record<string, string[]>

  const firstHlKey = Object.keys(hit.highlight).filter(key => key !== 'NOM')[0]
  const hlHtml = firstHlKey ? <div key={firstHlKey}>
    <p dangerouslySetInnerHTML={{ __html: replaceHlTxt(hl[firstHlKey][0], cardType.color)}}></p>
  </div> : firstHlKey


  return (
  <ResultCard
    cardType={cardType}
    name={NOM}
    nameElem={hlNOM}
    toprow={thematique}
    linkData={{}}
    slug={slug}
    isLoading={isLoading}>
    <p>{hlHtml}</p>
  </ResultCard>
);
};

const openingTag = "@msg-highlighted-field@"
const closingTag = '@/msg-highlighted-field@'

function replaceHlTxt(txt: string, cssColor: string) {
  console.log({ txt })
  return txt.replaceAll(openingTag, `<b style="color: ${cssColor}">`).replaceAll(closingTag, '</b>')
}
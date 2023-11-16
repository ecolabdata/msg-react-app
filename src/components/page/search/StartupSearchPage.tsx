import { Startup } from 'api/Api';
import { Api, HitStartup } from 'api2/Api';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import ResultCard from 'components/customComponents/ResultCard';
import { debug } from 'console';
import { CardType, startups } from 'model/CardType';
import React from 'react';
import slugify from 'slugify';
import { getGreenTechData } from 'utils/utilityFunctions';
import { buildSearchPageV2 } from '../SearchPageV2';

const SearchPageV2 = buildSearchPageV2(Api.searchStartup);

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

export const StartupResultCard: React.FC<StartupResultCardProps> = ({
  isLoading,
  hit,
  cardType
}) => {
  const NOM = hit.fields.NOM[0];
  const hlNOM = hit.highlight.NOM ? (
    <p>{replaceHlTxt(hit.highlight.NOM[0], cardType.color)}</p>
  ) : undefined;
  const thematiqueGI =
    hit.fields['SOLUTIONS.GreenTech Innovation.Thématique'] &&
    hit.fields['SOLUTIONS.GreenTech Innovation.Thématique'][0];
  const thematiqueG20 =
    hit.fields["SOLUTIONS.GREEN20.Secteurs d'activité"] &&
    hit.fields["SOLUTIONS.GREEN20.Secteurs d'activité"][0];
  const thematique = thematiqueGI || thematiqueG20 || 'N/A';

  const slug = slugify(hit.fields.NOM[0]);

  const hl = hit.highlight as Record<string, string[]>;

  const firstHlKey = Object.keys(hit.highlight).filter((key) => key !== 'NOM')[0];
  const hlHtml = firstHlKey ? (
    <div key={firstHlKey}>
      <div>{replaceHlTxt(hl[firstHlKey][0], cardType.color)}</div>
    </div>
  ) : (
    firstHlKey
  );

  return (
    <ResultCard
      cardType={cardType}
      name={NOM}
      nameElem={hlNOM}
      toprow={thematique}
      linkData={{}}
      slug={slug}
      isLoading={isLoading}
    >
      <p>{hlHtml}</p>
    </ResultCard>
  );
};

const openingTag = '@msg-highlighted-field@';
const closingTag = '@/msg-highlighted-field@';

function replaceHlTxt(txt: string, cssColor: string) {
  return parseHighlights(txt, ({ children }) => <b style={{ color: cssColor }}>{children}</b>, 80);
}

function parseHighlights(
  highlightField: string,
  element: React.FunctionComponent<{}>,
  contextLength: number
): JSX.Element {
  // Split the highlight field into an array of substrings
  const substrings = highlightField.split(/(@msg-highlighted-field@|@\/msg-highlighted-field@)/);

  //[<>, "asd", </>, <>, "sdf", </>]
  //["", <>, asd </>, "", <>, "sdf", </>, ""]
  const completeWithEmptyStr = (substrings: string[]) =>
    substrings.flatMap((e, i) => {
      if (i === 0 && e === '@msg-highlighted-field@') return ['', e];
      else if (i === substrings.length - 1 && e === '@/msg-highlighted-field@') return [e, ''];
      else if (e === '@msg-highlighted-field@' && substrings[i - 1] === '@/msg-highlighted-field@')
        return ['', e];
      else return [e];
    });
  return <>{parseNextHighlightsChunk(completeWithEmptyStr(substrings), element, contextLength)}</>;
}

function parseNextHighlightsChunk(
  substrings: string[],
  element: React.FunctionComponent<{}>,
  contextLength: number
): JSX.Element | string | null {
  if (substrings.length === 1) {
    return null;
  } else {
    const [before, oTag, content, cTag, after] = substrings;

    const beforeContextLength = Math.max(before.length - contextLength, 0);
    const afterContextLength = Math.min(contextLength, after.length);

    let beforeTrunc = before.slice(beforeContextLength);
    if (before.length > beforeTrunc.length) {
      beforeTrunc = '...' + beforeTrunc;
    }

    let afterTrunc = after.slice(0, afterContextLength);
    if (after.length > afterTrunc.length) {
      afterTrunc = afterTrunc + '...';
    }

    const jsxElement = React.createElement(element, {}, content);
    substrings[4] = substrings[4].slice(afterTrunc.length);
    return (
      <>
        {beforeTrunc}
        {jsxElement}
        {afterTrunc}
        {parseNextHighlightsChunk(substrings.slice(4), element, contextLength)}
      </>
    );
  }
}

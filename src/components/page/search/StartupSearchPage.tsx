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
    <p>
      {replaceHlTxt(hit.highlight.NOM[0], cardType.color)}
    </p>
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
  return parseHighlights(txt,
    ({ children }) => <b style={{ color: cssColor }}>{children}</b>,
    40
  )
}

function replaceTagsWithElement(txt: string, openTag: string, closeTag: string, element: React.FunctionComponent<{}>, contextLength?: number): JSX.Element | string {
  // Find the index of the opening tag and the closing tag
  const openIndex = txt.indexOf(openTag);
  const closeIndex = txt.indexOf(closeTag);

  if (openIndex === -1) return txt;

  // Extract the content between the tags
  const content = txt.substring(openIndex + openTag.length, closeIndex);

  // Create the JSX element using the element function and the extracted content
  const jsxElement = React.createElement(element, {}, content);

  // Determine the number of characters to include before and after the tags
  const startIndex = contextLength ? Math.max(0, openIndex - contextLength) : 0;
  const endIndex = contextLength ? Math.min(txt.length, closeIndex + contextLength) : txt.length;

  // Truncate the text as necessary and add ellipses if needed
  let before = txt.substring(startIndex, openIndex);
  if (startIndex > 0) {
    before = '...' + before;
  }
  const afterStr = txt.substring(closeIndex + closeTag.length);
  let after = replaceTagsWithElement(afterStr, openTag, closeTag, element, contextLength);
  if (typeof after === 'string') {
    after = after.substring(0, endIndex)
    if (endIndex < txt.length) {
      after = after + '...';
    }
  }
  // Create the final JSX element by combining the truncated text before and after the tags with the JSX element
  return (<>
    {before}
    {jsxElement}
    {after}
  </>);
}

//ICIIIII

function parseHighlights(highlightField: string, element: React.FunctionComponent<{}>, contextLength: number): JSX.Element {

  // Split the highlight field into an array of substrings
  const substrings = highlightField.split(/(@msg-highlighted-field@|@\/msg-highlighted-field@)/);

  //[<>, "asd", </>, <>, "sdf", </>]
  //["", <>, asd </>, "", <>, "sdf", </>, ""]
  const completeWithEmptyStr = (substrings: string[]) => substrings.flatMap((e, i) => {
    if (i === 0 && e === '@msg-highlighted-field@') return ["", e]
    else if (i === (substrings.length - 1) && e === '@/msg-highlighted-field@') return [e, ""]
    else if (e === '@msg-highlighted-field@' && substrings[i - 1] === '@/msg-highlighted-field@') return ["", e]
    else return [e]
  });
  return <>
    {parseNextHighlightsChunk(completeWithEmptyStr(substrings), element, contextLength)}
  </>
  
}

function parseNextHighlightsChunk(substrings: string[], element: React.FunctionComponent<{}>, contextLength: number): JSX.Element | string | null {
  //debugger;
  if (substrings.length === 1) {
    return null
  } else {
    // Iterate over the substrings and create JSX elements as needed
    const [before, oTag, content, cTag, after] = substrings; 
    let beforeTrunc = before.slice(Math.max(before.length - contextLength, 0))
    if (before.length > beforeTrunc.length) {
      beforeTrunc = "..." + beforeTrunc
    }

    let afterTrunc = after.slice(0, Math.min(contextLength, after.length))
    if (after.length > afterTrunc.length) {
      afterTrunc = afterTrunc + "..."
    }

    const jsxElement = React.createElement(element, {}, content)
    substrings[4] = substrings[4].slice(afterTrunc.length)
    return <>
      {beforeTrunc}
      {jsxElement}
      {afterTrunc}
      {parseNextHighlightsChunk(substrings.slice(4), element, contextLength)}
    </>
  }
}

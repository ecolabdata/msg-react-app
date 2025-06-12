import { PropsWithChildren, useEffect, useRef } from 'react';

import ScreenReaderOnlyText from '../../Core/ScreenReaderOnlyText';
import { CardType } from 'model/CardType';
import { AllCards } from 'api5/interfaces/common';
import ResultCardV5 from './ResultCardV5';

type Props = {
  hitCount?: number;
  isLoading: boolean;
  results: AllCards[];
  cardType: CardType;
  url: string;
};

const SearchResultsV5: React.FC<PropsWithChildren<Props>> = ({
  hitCount,
  isLoading,
  results,
  cardType,
  url
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      //time out is used for accessibility purpose (we wait juste a little to have results before focusing list results)
      if (ref?.current && !isLoading) {
        ref.current.focus({ preventScroll: true });
        ref.current.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 500);
  }, [isLoading, url]);

  return (
    <>
      {isLoading && <ScreenReaderOnlyText content={'Chargement en cours'} aria-live="polite" />}
      {!isLoading && hitCount ? (
        <ScreenReaderOnlyText content={`il y'a ${hitCount} résultats`} aria-live="polite" />
      ) : null}
      {!isLoading && hitCount === 0 && (
        <ScreenReaderOnlyText content={`Aucun résultat trouvé`} aria-live="polite" />
      )}
      {hitCount && hitCount > 0 ? (
        <section tabIndex={0} ref={ref} className="my-8" id="cardsContainer">
          <span
            className="flex justify-end font-bold mb-4 text-xl"
            aria-hidden={true}>{`(${hitCount} résultats)`}</span>
          <ScreenReaderOnlyText content={`il y'a ${hitCount} résultats`} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((card, index) => {
              return (
                <ResultCardV5
                  key={card.id + index}
                  id={card.id}
                  toprow={card.labels}
                  cardType={cardType}
                  isLoading={isLoading}
                  content={card.shortDescription}
                  name={card.cardTitle}
                  logo={card.logoUrl}
                />
              );
            })}
          </ul>
        </section>
      ) : (
        'Aucun résultat trouvé'
      )}
    </>
  );
};

export default SearchResultsV5;

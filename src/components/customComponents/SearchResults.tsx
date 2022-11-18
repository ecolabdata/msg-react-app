import { useEffect, useRef } from 'react';
import { AnyCard } from '../../api/Api';
import { CardType } from '../../model/CardType';

import ResultCard from './ResultCard';
import ScreenReaderOnlyText from './ScreenReaderOnlyText';

type Props = {
  cards: AnyCard[];
  isLoading: boolean;
  cardType: CardType;
};

const SearchResults: React.FC<Props> = ({ cards, isLoading, cardType }) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref?.current) {
        ref.current.focus();
      }
    }, 2000);
  }, [isLoading]);

  return (
    <>
      {isLoading && <ScreenReaderOnlyText content={'Chargement en cours'} aria-live="polite" />}
      {!isLoading && cards.length ? (
        <ScreenReaderOnlyText content={`il y'a ${cards.length} résultats`} aria-live="polite" />
      ) : null}
      {!isLoading && cards && cards.length === 0 && (
        <ScreenReaderOnlyText content={`Aucun résultat trouvé`} aria-live="polite" />
      )}
      {cards.length > 0 ? (
        <div className="fr-container max-w-full" id="cardsContainer">
          <span className="flex justify-end font-bold mb-4">{`(${cards.length} résultats)`}</span>
          <ul
            tabIndex={0}
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, i) => (
              <ResultCard
                isLoading={isLoading}
                cardType={cardType}
                cardData={card}
                pageList={false}
                key={i}
              />
            ))}
          </ul>
        </div>
      ) : (
        'Aucun résultat trouvé'
      )}
    </>
  );
};

export default SearchResults;

import { PropsWithChildren, useEffect, useRef } from 'react';

import ScreenReaderOnlyText from '../Core/ScreenReaderOnlyText';

type Props = {
  hitCount: number;
  isLoading: boolean;
};

const SearchResults: React.FC<PropsWithChildren<Props>> = ({ hitCount, isLoading, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      //time out is used for accessibility purpose (we wait juste a little to have results before focusing list results)
      if (ref?.current && !isLoading) {
        ref.current.focus();
        ref.current.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 500);
  }, [isLoading]);

  return (
    <>
      {isLoading && <ScreenReaderOnlyText content={'Chargement en cours'} aria-live="polite" />}
      {!isLoading && hitCount ? (
        <ScreenReaderOnlyText content={`il y'a ${hitCount} résultats`} aria-live="polite" />
      ) : null}
      {!isLoading && hitCount === 0 && (
        <ScreenReaderOnlyText content={`Aucun résultat trouvé`} aria-live="polite" />
      )}
      {hitCount > 0 ? (
        <section tabIndex={0} ref={ref} className="my-8" id="cardsContainer">
          <span
            className="flex justify-end font-bold mb-4 text-xl"
            aria-hidden={true}
          >{`(${hitCount} résultats)`}</span>
          <ScreenReaderOnlyText content={`il y'a ${hitCount} résultats`} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
          </ul>
        </section>
      ) : (
        'Aucun résultat trouvé'
      )}
    </>
  );
};

export default SearchResults;

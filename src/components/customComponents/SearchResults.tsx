import { PropsWithChildren, useContext, useEffect, useRef } from 'react';
import { ApplicationContext } from '../../App';

import ScreenReaderOnlyText from './ScreenReaderOnlyText';

type Props = {
  hitCount: number;
  isLoading: boolean;
};

const SearchResults: React.FC<PropsWithChildren<Props>> = ({ hitCount, isLoading, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { usedNextScrollTarget } = useContext(ApplicationContext);
  const [, setNextScrollTarget] = usedNextScrollTarget;

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (ref?.current) {
  //       ref.current.focus();
  //       const element = document.getElementById('cardsContainer');
  //       if (element)
  //         setNextScrollTarget({
  //           behavior: 'smooth',
  //           top: element.offsetTop - window.innerHeight * 0.2
  //         });
  //     }
  //   }, 1000);
  // }, [isLoading]);

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
        <div tabIndex={0} ref={ref} className="fr-container max-w-full" id="cardsContainer">
          <span
            className="flex justify-end font-bold mb-4"
            aria-hidden={true}
          >{`(${hitCount} résultats)`}</span>
          <ScreenReaderOnlyText content={`il y'a ${hitCount} résultats`} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
          </ul>
        </div>
      ) : (
        'Aucun résultat trouvé'
      )
      }
    </>
  );
};

export default SearchResults;

import { useContext, useEffect, useRef } from 'react';
import { AnyCard } from 'api/Api';
import { ApplicationContext } from 'App';
import { CardType } from 'model/CardType';
import mockApiResponse from 'api2/resp.json';
type Resp = typeof mockApiResponse

import ResultCard from './ResultCardV2';
import ScreenReaderOnlyText from './ScreenReaderOnlyText';

type Props = {
  resp: Resp;
  isLoading: boolean;
};

const SearchResults: React.FC<Props> = ({ resp, isLoading}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { usedNextScrollTarget } = useContext(ApplicationContext);
  const [, setNextScrollTarget] = usedNextScrollTarget;
  useEffect(() => {
    setTimeout(() => {
      if (ref?.current) {
        ref.current.focus();
        const element = document.getElementById('cardsContainer');
        if (element)
          setNextScrollTarget({
            behavior: 'smooth',
            top: element.offsetTop - window.innerHeight * 0.2
          });
      }
    }, 1000);
  }, [isLoading]);

  return (
    <>
      {isLoading && <ScreenReaderOnlyText content={'Chargement en cours'} aria-live="polite" />}
      {!isLoading && resp.hits.length ? (
        <ScreenReaderOnlyText content={`il y'a ${resp.hits.length} résultats`} aria-live="polite" />
      ) : null}
      {!isLoading && resp && resp.hits.length === 0 && (
        <ScreenReaderOnlyText content={`Aucun résultat trouvé`} aria-live="polite" />
      )}
      {resp.hits.length > 0 ? (
        <div tabIndex={0} ref={ref} className="fr-container max-w-full" id="cardsContainer">
          <span
            className="flex justify-end font-bold mb-4"
            aria-hidden={true}
          >{`(${resp.hits.length} résultats)`}</span>
          <ScreenReaderOnlyText content={`il y'a ${resp.hits.length} résultats`} />
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {resp.hits.map((hits, i) => (
              <ResultCard
                isLoading={isLoading}
                hit={hit}
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

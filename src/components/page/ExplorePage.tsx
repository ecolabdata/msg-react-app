/* eslint-disable react/display-name */
import { useContext, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnyCard, search } from '../../api/Api';
import { ApplicationContext } from '../../App';
import { FillMagnifying, Magnifying } from '../../assets/Icons';
import { useTitle } from '../../hooks/useTitle';
import { CardType, publicActorPersona, startupPersona } from '../../model/CardType';
import { InitialState } from '../../utils/InitialState';
import { PitchThematicsKeywords } from '../customComponents/PitchThematicsKeywords';
import ResultCard from '../customComponents/ResultCard';
import ResultCardsPreview from '../customComponents/ResultCardsPreview';
import ScreenReaderOnlyText from '../customComponents/ScreenReaderOnlyText';

const buildExplorePage: (
  cardsToDisplay: CardType[],
  personaUrlPart: string
) => React.FC<{ alpha: boolean }> =
  (cardsToDisplay, personaUrlPart) =>
  ({ alpha }) => {
    const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext);
    const [toggleInCorbeille, isInCorbeille] = usedCorbeille;
    const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget;
    const navigate = useNavigate();
    const location = useLocation();
    useTitle(`Explorer `);
    const initialState = location.state as InitialState | null;
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState(initialState?.search.query.description || '');
    const [secteurs, setSecteurs] = useState<string[]>(initialState?.search.query.secteurs || []);
    const [motsclefs, setMotsclef] = useState<string[]>(initialState?.search.query.motsclefs || []);
    const [errorTxt, setErrorTxt] = useState('');

    const handleOnSubmitForm = (ctrlPress: boolean) => {
      if (description.length > 0) {
        setIsLoading(true);
        setErrorTxt('');
        search({ description, motsclefs, secteurs })
          .then((search) => {
            setIsLoading(false);
            //? Scroll
            const element = document.getElementById('previews');
            if (element)
              setNextScrollTarget({
                behavior: 'smooth',
                top: element.offsetTop - window.innerHeight * 0.2
              });
            navigate(ctrlPress ? `/explorer-alpha` : `/${personaUrlPart}/explorer/search`, {
              state: { search }
            });
          })
          .catch((e) => {
            setIsLoading(false);
            console.log(e);
            setErrorTxt('Une erreur serveur inconnue est survenue');
          });
      } else {
        setErrorTxt("Erreur: la description de l'entreprise est obligatoire");
      }
    };

    const previews = cardsToDisplay
      .filter((x) => alpha || x.version === 'beta')
      .map((cardType, key) => {
        if (!initialState) return null;

        const results: AnyCard[] = initialState.search.cards[cardType.apiName];
        if (results.length === 0) return null;
        const cardSliceSize = Math.max(Math.floor((window.innerWidth - 60) / 330) * 2 - 1, 3);

        return (
          <li key={key}>
            <ResultCardsPreview
              cardType={cardType}
              initialState={initialState}
              resultCount={results.length}>
              {results
                .filter((x) => !isInCorbeille(x))
                .slice(0, cardSliceSize)
                .map((x, i) => (
                  <ResultCard key={i} pageList={false} cardData={x} cardType={cardType} />
                ))}
            </ResultCardsPreview>
          </li>
        );
      });

    return (
      <>
        <h1
          className="font-bold my-2 mx-auto max-w-headerSize text-xl flex text-center justify-center items-center w-[90%]
            md:my-8 md:text-[30px] leading-5">
          {' '}
          <Magnifying width="31px" height="31px" className="mr-4" aria-hidden={true} /> Formulaire
          de recherche en 3 étapes !{' '}
        </h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleOnSubmitForm(false);
          }}
          id="keywordsForm"
          className="h-fit mx-auto max-w-headerSize
            ">
          <PitchThematicsKeywords
            usedDescription={[description, setDescription, errorTxt]}
            usedMotsClef={[motsclefs, setMotsclef]}
            usedSecteurs={[secteurs, setSecteurs]}
            usedInListPage={false}
            openPitchContainerFromStart={false}
          />
        </form>

        <div className="buttonsContainer mx-auto max-w-headerSize flex justify-center flex-wrap">
          <button
            className="w-48 h-14 text-base underline capitalize"
            onClick={() => {
              setDescription('');
              setSecteurs([]);
              setMotsclef([]);
            }}>
            {' '}
            réinitialiser{' '}
          </button>

          <button
            onClick={(event) => {
              event.preventDefault();
              handleOnSubmitForm(event.ctrlKey);
            }}
            form="keywordsForm"
            disabled={isLoading}
            className="fr-btn fr-btn--lg fr-btn--primary capitalize">
            <span className="mx-auto flex items-center">
              {!isLoading && (
                <FillMagnifying
                  fill="true"
                  width="20px"
                  height="20px"
                  className="mr-2"
                  aria-hidden={true}
                />
              )}

              <span>{isLoading ? 'chargement...' : 'rechercher !'}</span>
            </span>
          </button>
        </div>

        {previews && !isLoading && (
          <ul id="previews" className="researwchResultContainer mt-4 ">
            {previews}
          </ul>
        )}
        {isLoading && <ScreenReaderOnlyText content={'Chargement en cours'} aria-live="polite" />}

        {!isLoading && previews.length && (
          <ScreenReaderOnlyText
            content={`il y'a ${previews.length} catégories de résultats`}
            aria-live="polite"
          />
        )}

        {isLoading && <div className="mx-auto">Chargement...</div>}
      </>
    );
  };

export const ExplorePageStartUp = buildExplorePage(startupPersona, 'startup');
export const ExplorePagePublicActor = buildExplorePage(publicActorPersona, 'acteurs-publics');

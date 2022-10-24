import { useState } from 'react';
import SearchForm from './SearchForm';

type PitchThematicsKeywordsParams = {
  usedDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  usedErrorTextDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  usedInListPage: boolean;
  openPitchContainerFromStart: boolean | null;
};

export const PitchThematicsKeywords: React.FC<PitchThematicsKeywordsParams> = ({
  usedDescription,
  usedErrorTextDescription,
  usedSecteurs,
  usedInListPage,
  openPitchContainerFromStart
}) => {
  const [openPitchContainer, setOpenPitchContainer] = useState(openPitchContainerFromStart);

  return (
    <div
      className={`globalFormContainer ${
        usedInListPage
          ? 'addBorder border border-dark-text-action bg-background-form lg:flex-row'
          : 'justify-around lg:flex-row'
      }
        ${
          usedInListPage && !openPitchContainer
            ? 'h-10 justify-center items-center'
            : 'lg:h-[408px]'
        }
         relative container min-w-full flex flex-col items-end         
         transition-all duration-700`}>
      {/* PAGE : ListAidesxxx ---- Open Formular Style  */}

      {usedInListPage && openPitchContainer && (
        <>
          {usedInListPage && (
            <button
              type="button"
              onClick={() => {
                setOpenPitchContainer(!openPitchContainer);
              }}
              className="text-dark-text-action absolute top-0 right-10 m-2 w-[7%] flex justify-around items-center">
              <span className="underline">Fermer</span>
              <span className="rotate-45 block ml-2 text-3xl">+</span>
            </button>
          )}
          <SearchForm
            usedInListPage={usedInListPage}
            usedDescription={usedDescription}
            usedSecteurs={usedSecteurs}
            usedErrorTextDescription={usedErrorTextDescription}
          />
        </>
      )}

      {/* PAGE : ListAidesxxx ---- Collapse Formular Style  */}
      {usedInListPage && !openPitchContainer && (
        <button
          type="button"
          onClick={() => setOpenPitchContainer(!openPitchContainer)}
          className="w-full text-dark-text-action flex justify-center items-center">
          Modifier la recherche <span className="ml-2">+</span>
        </button>
      )}

      {/* PAGE : Explorer ---- Formular Style  */}
      {!usedInListPage && (
        <>
          <SearchForm
            usedInListPage={usedInListPage}
            usedDescription={usedDescription}
            usedSecteurs={usedSecteurs}
            usedErrorTextDescription={usedErrorTextDescription}
          />{' '}
        </>
      )}
    </div>
  );
};

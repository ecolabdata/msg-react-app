import { useState } from 'react';
import SelectInputOptions from './SelectInputOptions';
import { ThematicsEnum } from '../../model/ThematicsEnum';
import KeyWordsLabel from '../dsfrComponents/KeyWordsLabel';
import TextAreaInput from './TextAreaInput';

type PitchThematicsKeywordsParams = {
  usedDescription: [string, React.Dispatch<React.SetStateAction<string>>, string];
  usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  usedMotsClef: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  usedInListPage: boolean;
  openPitchContainerFromStart: boolean | null;
};

const OverlappingTitle: React.FC<{ txt: string; usedInListPage: boolean; number: number }> = ({
  txt,
  usedInListPage,
  number
}) => {
  return (
    <>
      <div
        className={`titleContainer ${
          !usedInListPage && 'absolute h-0 -top-5 left-4 overflow-visible'
        }`}>
        <div className="flex w-fit">
          <h2
            className="text-xl italic text-dark-text-action font-[Spectral] flex items-baseline
                md:text-3xl">
            {number} <span className="mx-2 elipsis"></span> {txt}
          </h2>
        </div>
      </div>
    </>
  );
};

export const PitchThematicsKeywords: React.FC<PitchThematicsKeywordsParams> = ({
  usedDescription,
  usedSecteurs,
  usedMotsClef,
  usedInListPage,
  openPitchContainerFromStart
}) => {
  const [description, setDescription, descriptionError] = usedDescription;
  const [secteurs, setSecteurs] = usedSecteurs;
  const [motsclefs, setMotsclef] = usedMotsClef;
  const thematicsValues = Object.values(ThematicsEnum);
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
          <div
            className={`leftSideForm ${
              !usedInListPage
                ? 'bg-background-form  h-[83%] lg:w-1/2 xl:max-w-[588px] '
                : ' lg:w-1/2'
            } 
                        mb-8 h-[75%] w-full flex justify-center rounded-md  
                        `}>
            <div
              className={`projectContainer ${
                usedInListPage ? 'mt-8 h-fit' : 'h-[150px] items-center w-full -- lg:h-full'
              }
                        relative  w-[92%] flex flex-col justify-center 
                        lg:mt-0`}>
              <OverlappingTitle usedInListPage={usedInListPage} number={1} txt="Le projet" />

              <div
                className={`fieldsContainer mt-2 flex flex-col w-full   ${
                  !usedInListPage && 'mt-8'
                }`}>
                <TextAreaInput
                  value={description}
                  onValueChange={setDescription}
                  errorText={descriptionError}
                  label="Décrivez votre projet en quelques lignes."
                  formId="keywordsForm"
                  required
                />
              </div>
            </div>
          </div>
          <div
            className={`rightSideForm ${
              !usedInListPage ? 'h-[83%] justify-around xl:max-w-[588px]' : ' bg-background-form '
            }
                        mb-8 h-[75%] w-full flex flex-col items-center justify-between
                        lg:w-1/2
                        `}>
            <div
              className={`thematicsContainer rounded-md relative h-[50%] ${
                !usedInListPage
                  ? 'max-h-[129px] min-h-[129px] w-full flex flex-col items-center bg-background-form '
                  : 'w-[92%]'
              }`}>
              <OverlappingTitle usedInListPage={usedInListPage} number={2} txt="La thématique" />

              <div className={` ${!usedInListPage && 'w-[92%]'} w-full h-fit my-auto `}>
                <div className="fieldsContainer mt-2 flex flex-col">
                  <SelectInputOptions
                    optionsData={thematicsValues}
                    secteurs={secteurs}
                    setSecteurs={setSecteurs}
                  />
                </div>
              </div>
            </div>

            <div
              className={`keyWordsContainer ${
                !usedInListPage
                  ? 'w-full h-full flex flex-col items-center bg-background-form'
                  : 'w-[92%] items-end'
              }
                        rounded-md relative mt-8
                        lg:mt-6  g-background-form`}>
              <OverlappingTitle usedInListPage={usedInListPage} number={3} txt="Les mots clés" />

              <div className={`${!usedInListPage && 'w-[92%]'} w-full h-fit my-auto `}>
                <p className="mt-4 text-base">
                  Ajoutez des mots clés représentatifs de votre activité. (facultatif)
                </p>

                <textarea
                  onChange={(e) => {
                    const motsclefs = e.target.value
                      .split(',')
                      .map((x) => x.trim())
                      .filter((x) => x);
                    setMotsclef(motsclefs);
                  }}
                  className="cursor-text rounded-t-sm h-10 mt-2 w-full p-2 addBorder-b border-3 border-white overflow-hidden bg-background-inputs "
                  defaultValue={motsclefs.join(', ')}></textarea>

                <ul className="keyWordsList max-h-[40px] mt-2 overflow-auto flex flex-wrap">
                  {motsclefs.map((word) => (
                    <li key={word}>
                      {' '}
                      <KeyWordsLabel keyWord={word} />{' '}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
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
          <div
            className={`leftSideForm ${
              !usedInListPage
                ? 'bg-background-form mt-8 h-[83%] lg:w-1/2 xl:max-w-[588px] '
                : ' lg:w-1/2'
            } 
                        mb-8 h-[75%] w-full flex justify-center rounded-md  
                        `}>
            <div
              className={`projectContainer ${
                usedInListPage ? 'mt-8 h-fit' : 'h-[150px] items-center w-full -- lg:h-full'
              }
                        relative  w-[92%] flex flex-col justify-center 
                        lg:mt-0`}>
              <OverlappingTitle usedInListPage={usedInListPage} number={1} txt="Le projet" />

              <div
                className={`fieldsContainer mt-2 flex flex-col w-full   ${
                  !usedInListPage && 'mt-8'
                }`}>
                <TextAreaInput
                  value={description}
                  onValueChange={setDescription}
                  errorText={descriptionError}
                  label="Décrivez votre projet en quelques lignes."
                  formId="keywordsForm"
                  required
                />
              </div>
            </div>
          </div>

          <div
            className={`rightSideForm ${
              !usedInListPage ? 'h-[83%] justify-around xl:max-w-[588px]' : ' bg-background-form '
            }
                        mb-8 h-[75%] w-full flex flex-col items-center justify-between
                        lg:w-1/2
                        `}>
            <div
              className={`thematicsContainer rounded-md relative h-[50%] ${
                !usedInListPage
                  ? 'max-h-[129px] min-h-[129px] w-full flex flex-col items-center bg-background-form '
                  : 'w-[92%]'
              }`}>
              <OverlappingTitle usedInListPage={usedInListPage} number={2} txt="La thématique" />

              <div className={` ${!usedInListPage && 'w-[92%]'} w-full h-fit my-auto `}>
                <div className="fieldsContainer mt-2 flex flex-col">
                  <SelectInputOptions
                    optionsData={thematicsValues}
                    secteurs={secteurs}
                    setSecteurs={setSecteurs}
                  />
                </div>
              </div>
            </div>

            <div
              className={`keyWordsContainer ${
                !usedInListPage
                  ? 'w-full h-full flex flex-col items-center bg-background-form'
                  : 'w-[92%] items-end'
              }
                        rounded-md relative mt-8
                        lg:mt-6  g-background-form`}>
              <OverlappingTitle usedInListPage={usedInListPage} number={3} txt="Les mots clés" />

              <div className={`${!usedInListPage && 'w-[92%]'} w-full h-fit my-auto `}>
                <p className="mt-4 text-base">
                  Ajoutez des mots clés représentatifs de votre activité. (facultatif)
                </p>

                <textarea
                  onChange={(e) => {
                    const motsclefs = e.target.value
                      .split(',')
                      .map((x) => x.trim())
                      .filter((x) => x);
                    setMotsclef(motsclefs);
                  }}
                  className="cursor-text rounded-t-sm h-10 mt-2 w-full p-2 addBorder-b border-3 border-white overflow-hidden bg-background-inputs "
                  defaultValue={motsclefs.join(', ')}></textarea>

                <ul className="keyWordsList max-h-[40px] mt-2 overflow-auto flex flex-wrap">
                  {motsclefs.map((word) => (
                    <li key={word}>
                      {' '}
                      <KeyWordsLabel keyWord={word} />{' '}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

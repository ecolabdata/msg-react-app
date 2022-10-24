import { useState } from 'react';
import { ThematicsEnum } from '../../model/ThematicsEnum';
import { OverlappingTitle } from './OverlappingTitle';
import SelectInputOptions from './SelectInputOptions';
import TextAreaInput from './TextAreaInput';

interface SearchFormProps {
  usedInListPage: boolean;
  usedDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  usedErrorTextDescription: [string, React.Dispatch<React.SetStateAction<string>>];
}

const SearchForm: React.FC<SearchFormProps> = ({
  usedInListPage,
  usedSecteurs,
  usedDescription,
  usedErrorTextDescription
}) => {
  const [description, setDescription] = usedDescription;
  const [descriptionError, setDescriptionError] = usedErrorTextDescription;
  const [secteurs, setSecteurs] = usedSecteurs;
  const thematicsValues = Object.values(ThematicsEnum);

  return (
    <>
      <div
        className={`SearchForm ${
          !usedInListPage ? 'bg-background-form  h-[83%] lg:w-1/2 xl:max-w-[588px] ' : ' lg:w-1/2'
        } 
                mb-8 h-[75%] w-full flex justify-center rounded-md  
                `}
      >
        <div
          className={`projectContainer ${
            usedInListPage ? 'mt-8 h-fit' : 'h-[150px] items-center w-full -- lg:h-full'
          }
                relative  w-[92%] flex flex-col justify-center 
                lg:mt-0`}
        >
          <OverlappingTitle usedInListPage={usedInListPage} number={1} txt="Le projet" />

          <div
            className={`fieldsContainer mt-2 flex flex-col w-full   ${!usedInListPage && 'mt-8'}`}
          >
            <TextAreaInput
              value={description}
              onValueChange={setDescription}
              errorText={descriptionError}
              label="Décrivez votre projet en quelques lignes."
              formId="keywordsForm"
              required
              className="lg:min-h-[212px]"
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
                          `}
      >
        <div
          className={`thematicsContainer rounded-md relative h-[50%] ${
            !usedInListPage
              ? 'max-h-[129px] min-h-[129px] w-full flex flex-col items-center bg-background-form '
              : 'w-[92%]'
          }`}
        >
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
      </div>
    </>
  );
};

export default SearchForm;

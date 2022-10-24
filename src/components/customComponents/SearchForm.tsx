import { useState } from 'react';
import { ThematicsEnum } from '../../model/ThematicsEnum';
import { OverlappingTitle } from './OverlappingTitle';
import SearchFieldWrapper from './SearchFieldWrapper';
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
    <div className="flex flex-col md:flex-row ">
      <SearchFieldWrapper label="Votre recherche" usedInListPage={usedInListPage} step={1}>
        <TextAreaInput
          value={description}
          onValueChange={setDescription}
          errorText={descriptionError}
          label="Décrivez votre projet en quelques lignes."
          formId="keywordsForm"
          required
        />
      </SearchFieldWrapper>
      <SearchFieldWrapper label="La thématique" usedInListPage={usedInListPage} step={2}>
        <SelectInputOptions
          optionsData={thematicsValues}
          secteurs={secteurs}
          setSecteurs={setSecteurs}
        />
      </SearchFieldWrapper>
    </div>
  );
};

export default SearchForm;

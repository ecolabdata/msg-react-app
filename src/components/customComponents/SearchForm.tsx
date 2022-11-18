import { ThematicsEnum } from '../../model/ThematicsEnum';
import SearchFieldWrapper from './SearchFieldWrapper';
import SelectInputOptions from './SelectInputOptions';
import TextAreaInput from './TextAreaInput';

interface SearchFormProps {
  usedInListPage: boolean;
  usedDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  usedErrorTextDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  color?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  usedInListPage,
  usedSecteurs,
  usedDescription,
  usedErrorTextDescription,
  color
}) => {
  const [description, setDescription] = usedDescription;
  const [descriptionError] = usedErrorTextDescription;
  const [secteurs, setSecteurs] = usedSecteurs;
  const thematicsValues = Object.values(ThematicsEnum);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <SearchFieldWrapper
        label="Votre recherche"
        usedInListPage={usedInListPage}
        className="w-full md:w-[55%]"
      >
        <TextAreaInput
          value={description}
          onValueChange={setDescription}
          errorText={descriptionError}
          label="Décrivez votre projet en quelques lignes."
          formId="keywordsForm"
          required
          color={color}
        />
      </SearchFieldWrapper>
      <SearchFieldWrapper
        label="La thématique"
        usedInListPage={usedInListPage}
        className="w-full md:w-[45%]"
      >
        <SelectInputOptions
          className="mb-auto"
          optionsData={thematicsValues}
          secteurs={secteurs}
          setSecteurs={setSecteurs}
          color={color}
        />
      </SearchFieldWrapper>
    </div>
  );
};

export default SearchForm;

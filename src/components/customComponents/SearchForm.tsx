import { CardType } from 'model/CardType';
import { ThematicsEnum } from '../../model/ThematicsEnum';
import SearchFieldWrapper from './SearchFieldWrapper';
import SelectInputOptions from './SelectInputOptions';
import TextAreaInput from './TextAreaInput';

interface SearchFormProps {
  usedInListPage: boolean;
  usedDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  usedSecteurs: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  usedErrorTextDescription: [string, React.Dispatch<React.SetStateAction<string>>];
  cardType?: CardType;
  showThematicField?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  usedInListPage,
  usedSecteurs,
  usedDescription,
  usedErrorTextDescription,
  showThematicField = true,
  cardType
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
        className={`w-full ${showThematicField && 'md:w-[55%]'}`}>
        <TextAreaInput
          value={description}
          onValueChange={setDescription}
          errorText={descriptionError}
          label={cardType?.searchText ?? ''}
          formId="keywordsForm"
          required
          color={cardType?.color}
        />
      </SearchFieldWrapper>
      {showThematicField && (
        <SearchFieldWrapper
          label="La thématique"
          usedInListPage={usedInListPage}
          className="w-full md:w-[45%]">
          <SelectInputOptions
            className="mb-auto"
            optionsData={thematicsValues}
            secteurs={secteurs}
            setSecteurs={setSecteurs}
            color={cardType?.color}
          />
        </SearchFieldWrapper>
      )}
    </div>
  );
};

export default SearchForm;

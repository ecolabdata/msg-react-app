import Container from 'components/Core/Container';
import { useProjetFormContext } from 'components/context/useProjectFormContext';
import SelectInputOptions from 'components/customComponents/SelectInputOptions';
import TextAreaInput from 'components/customComponents/TextAreaInput';
import { acheteurPublic, publicActorPersona, startupPersona } from 'model/CardType';
import { ThematicsEnum } from 'model/ThematicsEnum';
import { useState } from 'react';
import React from 'react';
import HomeCard from 'components/dsfrComponents/HomeCard';

interface SingleSearchPageProps {
  profile: 'startup' | 'publicActor';
}

const content = {
  startup: {
    title: 'Start-up greentech, trouvez des leviers pour booster votre développement ! ',
    cards: startupPersona
  },
  publicActor: {
    title: 'Acteur public sourcez des entreprises éco-innovantes',
    cards: publicActorPersona
  }
};

const SingleSearchPage: React.FC<SingleSearchPageProps> = ({ profile }) => {
  const { title, cards } = content[profile];

  const handleSubmit = () => {
    setStep(1);
  };
  const thematicsValues = Object.values(ThematicsEnum);
  const [descriptionError] = useState('');

  const cardType = acheteurPublic;
  const { description, setDescription, thematics, setThematics } = useProjetFormContext();
  const [step, setStep] = React.useState(0);
  return (
    <>
      <Container isFlexCol>
        <h1
          className="m-0 w-full font-bold text-4xl text-center 
                md:max-w-3/5
                ">
          {title}
        </h1>

        {step === 0 && (
          <form
            onSubmit={() => handleSubmit()}
            id="projectForm"
            className="my-8 flex flex-col justify-around flex-wrap h-fit w-full">
            <fieldset>
              <legend className="sr-only">Champs de recherche principaux</legend>
              <TextAreaInput
                value={description}
                onValueChange={setDescription}
                // errorText={descriptionError}
                label={cardType?.searchText ?? ''}
                formId="keywordsForm"
                required
                color={cardType?.color}
              />
              <SelectInputOptions
                className="mb-auto"
                optionsData={thematicsValues}
                secteurs={thematics}
                setSecteurs={setThematics}
                color={cardType?.color}
              />
            </fieldset>
            <button className="mx-3 fr-btn fr-btn--primary  fr-btn--lg">
              <span className={`mx-auto`}>{'Suivant'}</span>
            </button>
          </form>
        )}
        {step === 1 && (
          //FIXME: this should probably be a radio button list part of the form
          <Container as="ul" customClasses="flex flex-wrap justify-center w-full 2XL:!w-1/2">
            {cards.map((card, index) => (
              <HomeCard cardTypeData={card} key={index} />
            ))}
          </Container>
        )}
      </Container>
    </>
  );
};

export default SingleSearchPage;

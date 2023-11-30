import Container from 'components/Core/Container';
import { useProjetFormContext } from 'components/context/useProjectFormContext';
import SelectInputOptions from 'components/customComponents/SelectInputOptions';
import TextAreaInput from 'components/customComponents/TextAreaInput';
import { acheteurPublic, publicActorPersona, startupPersona, startups } from 'model/CardType';
import { ThematicsEnum } from 'model/ThematicsEnum';
import React, { FormEvent, useEffect } from 'react';
import HomeCard from 'components/dsfrComponents/HomeCard';
import { useLocation, useNavigate } from 'react-router-dom';

interface SingleSearchPageProps {
  profile: 'startup' | 'publicActor';
}

const content = {
  startup: {
    title: 'Start-up greentech, trouvez des leviers pour booster votre développement ! ',
    cards: startupPersona,
    color: startups.color
  },
  publicActor: {
    title: 'Acteur public sourcez des entreprises éco-innovantes',
    cards: publicActorPersona,
    color: acheteurPublic.color
  }
};

const SingleSearchPage: React.FC<SingleSearchPageProps> = ({ profile }) => {
  const { title, cards, color } = content[profile];
  const location = useLocation()
  const navigate = useNavigate()
  const thematicsValues = Object.values(ThematicsEnum);
  const {
    description,
    handleDescriptionChange,
    thematics,
    setThematics,
    error,
    setSearchFormStep: setStep,
    searchFormStep: step
  } = useProjetFormContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description) {
      handleDescriptionChange("")
      return
    }
    navigate(location.pathname, { state: "cardPick" })
  };

  useEffect(() => {
    location.state === null && setStep(0)
    location.state === "cardPick" && setStep(1)
  }, [location])

  return (
    <div className="mt-16">
      <Container isFlexCol>
        <h1
          className="m-0 w-full font-bold text-4xl text-center 
                md:max-w-3/5
                ">
          {title}
        </h1>

        {step === 0 && (
          <Container as="div" customClasses="md:max-w-4/5">
            <form
              onSubmit={(e) => handleSubmit(e)}
              id="projectForm"
              className="my-8 flex flex-col justify-around flex-wrap h-fit w-full">
              <fieldset>
                <legend className="sr-only">Décrivez votre projet</legend>
                <div
                  className={`container py-8 px-6 mr-0 ${localStorage.getItem('scheme') === 'dark' && 'bg-research-precision-container'
                    } justify-start flex flex-col lg:mt-0`}>
                  <TextAreaInput
                    value={description}
                    onValueChange={handleDescriptionChange}
                    error={error}
                    label={'Décrivez votre projet'}
                    formId="keywordsForm"
                    required
                    color={color}
                  />
                </div>
                <div
                  className={`container py-8 px-6 mr-0 ${localStorage.getItem('scheme') === 'dark' && 'bg-research-precision-container'
                    } justify-start flex flex-col lg:mt-0`}>
                  <SelectInputOptions
                    className="mb-auto"
                    optionsData={thematicsValues}
                    secteurs={thematics}
                    setSecteurs={setThematics}
                    color={color}
                  />
                </div>
              </fieldset>
              <div className="flex justify-center my-8">
                <button disabled={error} className=" fr-btn fr-btn--primary  fr-btn--lg">
                  <span className={`mx-auto`}>{'Suivant'}</span>
                </button>
              </div>
            </form>
          </Container>
        )}
        {step === 1 && (
          //FIXME: this should probably be a radio button list part of the form
          <Container
            as="ul"
            customClasses="flex flex-wrap justify-center w-full 2xl:w-3/4 4xl:w-1/2">
            {cards.map((card, index) => (
              <HomeCard
                cardTypeData={card}
                key={index}
                state={{ search: { description, thematics }, page: 1 }}
              />
            ))}
            <div className="container mt-8 w-full flex flex-col items-center justify-center">
              {(description || thematics?.length > 0) && (
                <button type="button" onClick={() => setStep(0)} className="mt-4 underline">
                  Modifier mon projet
                </button>
              )}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default SingleSearchPage;

import Container from 'components/Core/Container';
import SelectInputOptions from 'components/customComponents/SelectInputOptions';
import TextAreaInput from 'components/customComponents/TextAreaInput';
import { acheteurPublic, publicActorPersona, startupPersona, startups } from 'model/CardType';
import { ThematicsEnum } from 'model/ThematicsEnum';
import React, { FormEvent } from 'react';
import HomeCard from 'components/dsfrComponents/HomeCard';
import { useLocation } from 'react-router-dom';
import HomeCardPreview from 'components/dsfrComponents/HomeCardPreview';
import { useSearchState } from 'hooks/useSearchState';

interface SingleSearchPageProps {
  profile: 'startup' | 'publicActor';
}

const content = {
  startup: {
    title: 'Start-up greentech, trouvez des leviers pour booster votre développement ! ',
    cards: startupPersona,
    color: startups.color,
    subtitle: null
  },
  publicActor: {
    title:
      'Acteurs publics, retrouvez des outils pour favoriser les innovations durables dans vos marchés publics',
    cards: publicActorPersona,
    color: acheteurPublic.color,
    subtitle:
      'Mes Services Greentech repose sur le principe du « Moteur de recherche ». En décrivant votre projet par le biais de mots clés et en sélectionnant une thématique, vous accèderez aux résultats des différents blocs outils, dédiés à votre recherche'
  }
};

const SingleSearchPage: React.FC<SingleSearchPageProps> = ({ profile }) => {
  const { title, cards, color, subtitle } = content[profile];
  const location = useLocation();
  const thematicsValues = Object.values(ThematicsEnum);


  const {
    description,
    setDescription,
    error,
    currentStep,
    updateSearchParams
  } = useSearchState();

  const searchParams = new URLSearchParams(location.search);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSearchParams(description, 1, 1);
  };


  return (
    <div className="mt-16">
      <Container isFlexCol>
        <h1
          className="m-0 w-full font-bold text-4xl text-center 
                md:max-w-3/5
                ">
          {title}
        </h1>
        {subtitle && (
          <Container as="div" customClasses="text-center">
            {subtitle}
          </Container>
        )}
        {currentStep === 0 && (
          <>
            <ul className="flex flex-wrap justify-center gap-4 md:max-w-4/5 mt-4">
              {cards.map((card) => {
                return <HomeCardPreview key={card.name} cardTypeData={card} />;
              })}
            </ul>
            <Container as="div" customClasses="md:max-w-4/5">
              <form
                onSubmit={(e) => handleSubmit(e)}
                id="projectForm"
                className="my-8 flex flex-col justify-around flex-wrap h-fit w-full">
                <fieldset>
                  <legend className="sr-only">Décrivez votre besoin en quelques mots clés</legend>
                  <div
                    className={`container py-8 px-6 mr-0 ${localStorage.getItem('scheme') === 'dark' && 'bg-research-precision-container'
                      } justify-start flex flex-col lg:mt-0`}>
                    <TextAreaInput
                      value={description}
                      onValueChange={setDescription}
                      label={'Décrivez votre besoin en quelques mots clés'}
                      formId="keywordsForm"
                      color={color}
                      placeholder="Ex : panneaux solaires toit école"
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
          </>
        )}
        {currentStep === 1 && (
          //FIXME: this should probably be a radio button list part of the form
          <Container
            as="ul"
            customClasses="flex flex-wrap justify-center w-full 2xl:w-3/4 4xl:w-1/2">
            {cards.map((card, index) => (
              <HomeCard
                cardTypeData={card}
                key={index}
                state={{ search: { description }, page: 1 }}
                params={searchParams.toString()}
              />
            ))}
            <div className="container mt-8 w-full flex flex-col items-center justify-center">
              {description && (
                <button
                  type="button"
                  onClick={() => {
                    updateSearchParams('', 1, 0);
                  }}
                  className="mt-4 underline">
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

import { Link } from 'react-router-dom';
import homePageContent from '../../contents/homepage';
import CtaBloc from '../customComponents/CtaBloc';
import LinksCard from '../customComponents/LinksCard';
import HomeCard from '../dsfrComponents/HomeCard';

interface HomeByProfileProps {
  profile: 'startup' | 'publicActor';
}

const HomeByProfile: React.FC<HomeByProfileProps> = ({ profile }) => {
  const pageContent = homePageContent[profile];
  return (
    <>
      <section>
        <div
          className="container-title container max-w-headerSize mx-auto p-2 
                flex flex-col items-center">
          <h1
            className="m-0 w-full font-bold text-4xl text-center 
                md:max-w-3/5
                ">
            {pageContent.mainContent.title}
          </h1>
          <h2
            className="mt-8 text-center w-8/12 leading-7 
                lg:max-w-3/5
                ">
            {pageContent.mainContent.description}
          </h2>
        </div>

        <ul className="cardsContainer mx-auto flex flex-wrap justify-center w-full lg:max-w-5/6 xl:max-w-4/5 2xl:max-w-3/4">
          {pageContent.cards.map((card, index) => (
            <HomeCard cardTypeData={card} key={index} />
          ))}
        </ul>
      </section>
      {!!pageContent.ctaBlocs?.length && (
        <div className="container flex flex-col my-8 mx-auto justify-center max-w-headerSize md:max-w-4/5  md:flex-row">
          {pageContent.ctaBlocs.map(({ title, description, links, cta }) => (
            <section key={title} className="w-full mb:w-1/2 max-w-2xl p-8 mb:p-16">
              <CtaBloc title={title} description={description} links={links} cta={cta} />
            </section>
          ))}
        </div>
      )}
      <section
        className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center">
        <h2 className="my-8 w-full font-bold text-3xl text-center md:max-w-8/12">
          Cela peut aussi vous intéresser
        </h2>
        <div className="fr-container">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pageContent.suggestions.map(({ title, description, links }) => (
              <li key={title}>
                <LinksCard title={title} description={description} links={links} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {profile === 'startup' && (
        <section
          className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center">
          {' '}
          <h2 className="my-8 w-full font-bold text-3xl text-center md:max-w-8/12">
            {pageContent.secondaryContent.title}
          </h2>
          {pageContent.secondaryContent.description && (
            <p
              className="text-center w-7/12 leading-7 
                lg:max-w-8/12
                ">
              {pageContent.secondaryContent.description}
            </p>
          )}
        </section>
      )}
      <div
        className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center">
        <Link
          className="w-fit h-9 text-base my-8 text-dark-text-action p-1 rm-link-underline flex justify-center text-xl"
          onClick={() => window.scrollTo(0, 0)}
          to={pageContent.secondaryContent.extraUrl}>
          {pageContent.secondaryContent.extraLink}
        </Link>
      </div>
    </>
  );
};

export default HomeByProfile;

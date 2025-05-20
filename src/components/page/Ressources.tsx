import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import { Link } from 'react-router-dom';
import CtaBloc from '../customComponents/CtaBloc';
import LinksCard from '../customComponents/LinksCard';
import ressourcesContent from '../../contents/RessourcesByProfileContent';

export const Ressources: React.FC<{ profile: 'startup' | 'publicActor' }> = ({ profile }) => {
  const pageContent = ressourcesContent[profile];

  return (
    <>
      <Container>
        <h1 className="m-0 w-full font-bold text-4xl text-center mt-100">
          {pageContent.pageTitle}
        </h1>
      </Container>
      {!!pageContent.ctaBlocs?.length && (
        <Container customClasses="flex flex-col my-8 mx-auto justify-center  md:max-w-4/5  md:flex-row">
          {pageContent.ctaBlocs.map(({ title, description, links, cta }) => (
            <section key={title} className="w-full mb:w-1/2 max-w-2xl p-8 mb:p-16">
              <CtaBloc title={title} description={description} links={links} cta={cta} />
            </section>
          ))}
        </Container>
      )}
      <Container isFlexCol>
        <Container
          as="ul"
          customClasses={`grid grid-cols-1 sm:grid-cols-2 ${
            pageContent.suggestions.length > 2
              ? 'md:grid-cols-3 md:max-w-5/6 2XL:max-w-2/3'
              : 'md:grid-cols-2 md:max-w-5/6 2XL:max-w-1/2'
          } gap-8 flex justify-center `}>
          {pageContent.suggestions.map(({ title, description, links }) => (
            <li key={title}>
              <LinksCard title={title} description={description} links={links} />
            </li>
          ))}
        </Container>
      </Container>
      {profile === 'startup' && (
        <Container isFlexCol>
          {' '}
          <Heading level={2} inSmallContainer>
            {pageContent.secondaryContent.title}
          </Heading>
          {pageContent.secondaryContent.description && (
            <p
              className="text-center w-7/12 leading-7 
                lg:max-w-8/12
                ">
              {pageContent.secondaryContent.description}
            </p>
          )}
        </Container>
      )}
      <Container isFlexCol>
        <Link
          className="w-fit h-9 text-base my-8 text-dark-text-action p-1 rm-link-underline flex justify-center text-xl"
          onClick={() => window.scrollTo(0, 0)}
          to={pageContent.secondaryContent.extraUrl}>
          {pageContent.secondaryContent.extraLink}
        </Link>
      </Container>
    </>
  );
};

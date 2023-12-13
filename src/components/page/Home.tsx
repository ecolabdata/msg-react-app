import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import homePageContent from '../../contents/homepageContent';
import ProfileCard, { ProfileCardProps } from '../customComponents/ProfileCard';

const Home: React.FC = () => {
  return (
    <>
      <Container isFlexCol>
        <div className='flex justify-center mt-8 mb-4 gap-2'>
          <p className='italic'>{homePageContent.warning}</p>
          <span className="fr-badge fr-badge--sm fr-badge--green-emeraude">BÊTA</span>
        </div>
        <Heading level={1}>{homePageContent.heading2}</Heading>
        <p
          className="mt-8 text-center w-[65%]
                lg:max-w-[62%]
                ">
          {homePageContent.subtitle}
        </p>
      </Container>
      <ul className="flex flex-col md:flex-row justify-center mb-16">
        {homePageContent.cards.map((card) => (
          <ProfileCard {...(card as ProfileCardProps)} key={card.type} />
        ))}
      </ul>
    </>
  );
};

export default Home;

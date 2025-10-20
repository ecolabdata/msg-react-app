import Container from 'components/Core/Container';
import Heading from 'components/Core/Heading';
import homePageContent from '../../contents/homepageContent';
import ProfileCard, { ProfileCardProps } from '../customComponents/ProfileCard';

const Home: React.FC = () => {
  return (
    <>
      <Container isFlexCol>
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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PictoExplorer } from '../../assets/Icons';
import { useTitle } from '../../hooks/useTitle';
import { startupPersona as allCardType } from '../../model/CardType';
import HomeCard from '../dsfrComponents/HomeCard';

export interface ExplorerTypeCard {
  SVGLogo: ({ ...other }: { [x: string]: any }) => JSX.Element;
  title: string;
  color: string;
  description: string;
  searchLink: string;
  version: string;
  name: string;
}

const HomeStartup = () => {
  const explorerCard: ExplorerTypeCard = {
    SVGLogo: PictoExplorer,
    title: 'Rechercher les leviers dans toutes les thématiques',
    color: 'rgba(0, 0, 145, 1)',
    description:
      'Découvrez tous les leviers proposés par Mes Services Greentech : aides à l’innovation, aide pour vos clients, achats publics à venir, investisseurs, start-up greentech.',
    searchLink: '/startup/explorer',
    version: 'no',
    name: 'explorer'
  };

  useTitle('Accueil ');
  const cardWidth = 393;
  const [cardContainerWidth, setCardContainerWidth] = useState<number | 'auto'>(
    Math.floor((Math.min(window.innerWidth, 1920) - 60) / cardWidth) * cardWidth
  );
  const handleResize = () => {
    const width = Math.floor((Math.min(window.innerWidth, 1920) - 60) / cardWidth) * cardWidth;
    if (width < cardWidth) {
      setCardContainerWidth('auto');
    } else {
      setCardContainerWidth(width);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
  return (
    <>
      <div
        className="container-title container max-w-headerSize mx-auto p-2 
                flex flex-col items-center"
      >
        <Link className="self-end text-xs" to="/acteurs-publics">
          Vous n'êtes pas une startup mais un <b>acteur public </b>?
        </Link>
        <h1
          className="mt-4 w-full font-bold text-3xl text-center 
                md:max-w-[70%]
                "
        >
          {' '}
          Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !{' '}
        </h1>
        <h2
          className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%]
                "
        >
          {' '}
          A partir de la description de votre activité ou de votre solution, nous vous proposons des
          pistes de leviers autour des axes suivants :
        </h2>
      </div>

      <div
        role="list"
        className="cardsContainer mx-auto flex flex-wrap justify-start"
        style={{ width: cardContainerWidth }}
      >
        <HomeCard explorerCard={true} cardTypeData={explorerCard} />
        {allCardType.map((card, index) => (
          <HomeCard cardTypeData={card} key={index} />
        ))}
      </div>
    </>
  );
};

export default HomeStartup;

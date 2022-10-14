import { PictoExplorer } from '../../assets/Icons';
import { useTitle } from '../../hooks/useTitle';
import { publicActorPersona as publicActorCardType } from '../../model/CardType';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

const HomePagePublicActor = () => {
  const explorerCard: ExplorerTypeCard = {
    SVGLogo: PictoExplorer,
    title: 'Rechercher les leviers dans toutes les thématiques',
    color: 'rgba(0, 0, 145, 1)',
    description:
      "Découvrez tous les leviers proposés par Mes Services Greentech : aides financières, sourcing, retour d'expériences, achats publics programmés",
    searchLink: '/acteurs-publics/explorer',
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
        <Link className="self-end text-xs" to="/startup">
          Vous n'êtes pas un acteur public mais une <b>startup</b>?
        </Link>
        <h1
          className="mt-4 w-full font-bold text-3xl text-center 
                md:max-w-[70%]
                "
        >
          {' '}
          Acteurs publics, sourcez des entreprises éco-innovantes et financez vos achats verts
        </h1>
        <h2
          className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%]
                "
        >
          A partir de la description de votre besoin, nous vous proposons des pistes de leviers
          autour des axes suivants :
        </h2>
      </div>

      <div
        role="list"
        className="cardsContainer mx-auto flex flex-wrap justify-start"
        style={{ width: cardContainerWidth }}
      >
        <HomeCard explorerCard={true} cardTypeData={explorerCard} />
        {publicActorCardType.map((card, i) => (
          <HomeCard cardTypeData={card} key={i} />
        ))}
      </div>
    </>
  );
};

export default HomePagePublicActor;

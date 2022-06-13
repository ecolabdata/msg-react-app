    import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import Button from '../dsfrComponents/Button';
import FillButton from '../dsfrComponents/FillButton';
import { CardType, all as allCardType } from "../../model/CardType";
import { SpeechBubble } from '../../assets/Icons';

import HomePageCard from '../customComponents/HomePageCard';
import { useContext } from 'react';
import { ApplicationContext } from '../../Router';
import ExplorerHomePageCard from '../customComponents/ExplorerHomePageCard';
import Card from '../dsfrComponents/Card';

export interface ExplorerTypeCard  {
    SVGLogo: ({ ...other}: { [x: string]: any; }) => JSX.Element,
    title: "Explorer",
    color: "rgba(0, 0, 145, 1)",
    description: "Découvrez tous les leviers proposés par Mes Services Greentech !",
    searchLink: "explorer",
};


const Home = () => {
       const explorerCard:ExplorerTypeCard = {
        SVGLogo: SpeechBubble,
        title: "Explorer",
        color: "rgba(0, 0, 145, 1)",
        description: "Découvrez tous les leviers proposés par Mes Services Greentech !",
        searchLink: "explorer",
    };
    useTitle("Accueil ")
    const { usedCorbeille, usedNextScrollTarget} = useContext(ApplicationContext)
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const navigate = useNavigate();

    return (
        <>
            
            <div className="container-title mx-auto w-[66%] p-2
                flex flex-col items-center">
                <h1 className="
                mt-4 w-[85%] font-bold text-3xl text-center
                xl:w-[885px]
                "> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                <h2 className="
                    fr-text--md  mt-8 text-center w-[85%]
                    xl:w-55 font-thin"> A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes <br /> de leviers autour des 5 axes suivants :</h2>
            </div>
            
            <div className="cardsContainer mx-auto max-w-headerSize w-headerSize flex flex-wrap justify-center
            xl:justify-start
                ">
                {allCardType.map((card) =>
                    <Card cardTypeData={card} />
                )}
                    <Card explorerCard={true} cardTypeData={explorerCard} />

            </div>
        </>
    );
};

export default Home


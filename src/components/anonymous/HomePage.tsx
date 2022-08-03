import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { all as allCardType } from "../../model/CardType";
import { PictoExplorer } from '../../assets/Icons';

import { useContext } from 'react';
import { ApplicationContext } from '../../Router';
import Card from '../dsfrComponents/Card';
export interface ExplorerTypeCard  {
    SVGLogo: ({...other}: {[x : string]: any; }) => JSX.Element,
    title: string,
    color: string,
    description: string,
    searchLink: string,
    version: string,
    name: string
};

const Home = () => {

    const explorerCard:ExplorerTypeCard = {
        SVGLogo: PictoExplorer,
        title: "Rechercher les leviers dans toutes les thématiques",
        color: "rgba(0, 0, 145, 1)",
        description: "Découvrez tous les leviers proposés par Mes Services Greentech : aides à l’innovation, aide pour vos clients, achats publics à venir, investisseurs, start-up greentech.",
        searchLink: "explorer",
        version: "no",
        name: "explorer"
    };

    useTitle("Accueil ")

    return (
        <>
            
            <div className="container-title container max-w-headerSize mx-auto p-2 
                flex flex-col items-center">
               
                <h1 className="mt-4 w-full font-bold text-3xl text-center 
                md:max-w-[70%]
                "> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                
                <h2 className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%]
                "> A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes de leviers autour des 5 axes suivants :</h2>
            </div>
            
            <div
                className="cardsContainer mx-auto flex flex-wrap justify-start"
                style={{width: Math.floor((window.innerWidth - 60) / 393) * 393}}
            >
                <Card explorerCard={true} cardTypeData={explorerCard} />
                {allCardType.map((card) =>
                    <Card cardTypeData={card} />
                )}
            </div>
        </>
    );
};

export default Home


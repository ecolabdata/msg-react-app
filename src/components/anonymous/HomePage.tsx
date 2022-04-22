import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import Button from '../dsfrComponents/Button';
import FillButton from '../dsfrComponents/FillButton';
import { CardType, all as allCardType } from "../../model/CardType";


import HomePageCard from '../customComponents/HomePageCard';
import { useContext } from 'react';
import { ApplicationContext } from '../../Router';
import ExplorerHomePageCard from '../customComponents/ExplorerHomePageCard';

const Separator = () => <div className='w-[0px] overflow-visible'><div className='h-[130px] w-[2px] bg-[#E1E1E1] opacity-30'></div></div>



const Home = () => {
    useTitle("Accueil")
    const { usedCorbeille, usedNextScrollTarget} = useContext(ApplicationContext)
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    const navigate = useNavigate();

    return (
        <>
            <div className="container-title
                mx-auto w-93 p-2
                flex flex-col items-center">
                <h1 className="
                mt-4 w-[85%] font-bold text-3xl text-center
                xl:w-[885px]
                "> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                <h2 className="
                    fr-text--md  mt-8 text-center w-[85%]
                    xl:w-55 font-thin"> A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes <br /> de leviers autour des 5 axes suivants :</h2>
            </div>

            <div className="container-content overflow-hidden 
                mx-auto
                flex flex-wrap justify-center
                overflow-y-hidden
                2xl:w-[55%] lg:w-[90%] items-center
                ">
                {allCardType.map((card) =>
                    <HomePageCard cardTypeData={card} />).map(x => [x]).reduce((a,b) => a.concat([<Separator/>, ...b])
                )}
                <ExplorerHomePageCard />
            </div>
        </>
    );
};

export default Home


import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import Button from '../dsfrComponents/Button';
import FillButton from '../dsfrComponents/FillButton';
import { CardType, all as allCardType } from "../../model/CardType";


import HomePageCard from '../customComponents/HomePageCard';

const Home = () => {
    useTitle("Accueil")
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

            <div className="container-content overflow-y-scroll 
                mx-auto h-[400px]
                flex flex-wrap justify-center
                lg:w-[90%] lg:overflow-y-hidden
                2xl:w-[55%]
                ">
                {allCardType.map((card) => <HomePageCard cardTypeData={card} />)}
            </div>

            <div className="mx-auto w-55 flex justify-center my-6">
                <Button onClick={ () => navigate('/inscription')} arrow={true}> Créer un compte</Button>
                <FillButton onClick={ () => {
                    navigate('/formulaire-recherche-de-solutions')
                }} arrow={true}>Découvrir la solution</FillButton>
            </div>

        </>
    );
};

export default Home


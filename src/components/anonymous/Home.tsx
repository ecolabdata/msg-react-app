import { useNavigate } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import Button from '../dsfrComponents/Button';
import FillButton from '../dsfrComponents/FillButton';
import {Signal, Calendar, Euro, Rocket, Eye} from './../../assets/Icons';
import HomePageCard, {HomePageCardProps} from './../customComponents/HomePageCard';
const Home = () => {
    useTitle("Accueil")
    const navigate = useNavigate();
    const cardsData:HomePageCardProps[]= [
    
        {
            SVGLogo: () => {
                return (
                    <>
                    
                        {Signal({color:"#F95C5E", viewBox:"0 0 14 14", height:"32", width:"32"})}
                    
                    </>
                )
            },
            title: "Organismes publics ouverts à l’innovation",
            description: "Collectivités ou organismes publiques ouverts à l’innovation",
            
        },
        {
            SVGLogo: () => {
                return (
                    <>
                    
                        {Calendar({color:"#D8C634", viewBox:"0 0 24 24", width:"24", height:"24"})}
                    
                    </>
                )
            },
            title: "Achats publics prévisionnels",
            description: "Achats publics prévus ces trois prochaines années dans votre domaine.",
            
        },
        {
            SVGLogo: () => {
                return (
                    <>
                    
                        {Euro({color:"#68A532", viewBox:"0 0 14 14", height:"42", width:"42"})}
                    
                    </>
                )
            },
            title: "Investisseurs privés ",
            description: "Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.",
        },
        {
            SVGLogo: () => {
                return (
                    <>
                    
                        {Rocket({color:"#8585F6", viewBox:"0 0 14 14", height:"20", width:"20"})}
                    
                    </>
                )
            },
            title: "Aides à l’innovation",
            description: "Aides publiques dédiées à votre développement (Adème, BPI...)",
        },
        {
            SVGLogo: () => {
                return (
                    <>
                    
                        {Eye({color:"#A558A0",  viewBox:"0 0 16 14", height:"24", width:"24"})}
                    
                    </>
                )
            },
            title: "Aides aux clients",
            description: "Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions"
        },
    
    ];

    return (
        <>
            <div className="container-title
                mx-auto w-93
                flex flex-col items-center">
                <h1 className="w-3/5 font-bold text-3xl text-center"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                <h2 className="
                    fr-text--md
                    w-55 mt-2 
                    text-center"> A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes <br/> de leviers autour des 5 axes suivants :</h2>
            </div>

            <div className="container-content
                mx-auto w-55 h-min-full p-4
                flex flex-wrap justify-center
                .2
                ">
                    {
                        cardsData.map((card) => {
                            return (  
                                <>
                                    {card.SVGLogo &&

                                        <HomePageCard SVGLogo={card.SVGLogo} title={card.title} description={card.description} />
                                    }
                                </>
                            )
                        })
                    }
            </div>

            <div className="mx-auto w-55 flex justify-evenly">
                <Button onClick={ () => navigate('/inscription')} arrow={true}> Créer un compte</Button>
                <FillButton onClick={ () => {
                    navigate('/formulaire-recherche-de-solutions')
                }} arrow={true}>Découvrir la solution</FillButton>
            </div> 

        </>
    );
};

export default Home

    
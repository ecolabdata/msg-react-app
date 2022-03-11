import {Signal, Calendar, Euro, Rocket, Eye} from './../../assets/Icons';

const Home = () => {

    return (
        
        <>
            <div className="container-title
                mx-auto w-93
                flex flex-col items-center">
                <h1 className="w-3/5 font-bold text-3xl text-center"> Start-up greentech, trouvez automatiquement des pistes pour booster votre développement !  </h1>
                <h2 className="
                    fr-text--md
                    w-55 mt-2 
                    text-center
                    " >A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes <br/> de leviers autour des 5 axes suivants :</h2>
            </div>

            <div className="container-content
                mx-auto w-4/5 h-min-full 
                flex 
                bg-green-700">
                
                {/* <div className="
                    w-4/12 
                    border-r border-gray-300 bg-red-100">
                    <Signal color="#F95C5E"  viewBox="0 0 14 14" height="32" width="32"/>
                    <h3>Organismes publics ouverts à l’innovation</h3>
                    <p>Collectivités ou organismes publiques ouverts à l’innovation</p>
                </div>
                
                <div className="
                    w-4/12 border-r border-gray-300 bg-blue-100">
                    <Calendar color="#D8C634" viewBox="0 0 24 24" width="24" height="24"/>
                    <h3>Achats publics prévisionnels</h3>
                    <p>Achats publics prévus ces trois prochaines années dans votre domaine.</p>
                </div>

                <div className="
                    w-4/12 border-r border-gray-300 bg-pink-100">
                    <Euro color="#68A532"  viewBox="0 0 14 14" height="42" width="42"/>
                    <h3>Investisseurs privés</h3>
                    <p>Investisseurs privés adaptés à votre maturité pour votre  prochaine levée de fonds.</p>
                </div>
                
                <div className="
                    w-4/12 border-r border-gray-300 bg-yellow-100">
                    <Rocket color="#8585F6"  viewBox="0 0 14 14" height="20" width="20"/>
                    <h3>Aides à l’innovation</h3>
                    <p>Aides publiques dédiées à votre développement (Adème, BPI...)</p>
                </div>

                <div className="
                    w-4/12 border-r border-gray-300 bg-indigo-100">
                    <Eye color="#A558A0"  viewBox="0 0 16 14" height="24" width="24"/>

                    <h3>Aides aux clients</h3>
                    <p>Dispositifs incitatifs (état ou régions) qui aident vos clients à accéder à vos solutions</p>

                </div> */}


            </div>
        </>

    )
}

export default Home
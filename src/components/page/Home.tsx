import ProfileCard from '../customComponents/ProfileCard';

const Home: React.FC = () => {
  return (
    <>
      <div
        className="container-title container max-w-headerSize mx-auto p-2 mb-8
                flex flex-col items-center">
        <h1
          className="mt-4 w-full text-3xl text-center 
                md:max-w-[70%]
                ">
          Bienvenue sur Mes Services Greentech !
        </h1>
        <h2
          className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%] font-bold
                ">
          Afin de vous orienter vers les meilleurs leviers, choisissez votre profil :
        </h2>
      </div>
      <ul className="flex flex-col md:flex-row justify-center mb-16">
        <ProfileCard
          title="Je représente une entreprise éco-innovante"
          description="Accédez à nos fiches acheteurs, aux achats publics programmés, au centre de ressource et téléchargez un argumentaire BtoA."
          badge="Entreprise"
          type="startup"
        />
        <ProfileCard
          title="Je suis acheteur public"
          description="Sourcez des entreprises et fournisseurs pour vos projets d’achats durables et innovants. Pilotez vos achats durables en consultant nos fiches acheteurs et le centre de ressource."
          badge="Acheteur public"
          type="publicActor"
        />
      </ul>
    </>
  );
};

export default Home;

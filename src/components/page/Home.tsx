import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';

const Home: React.FC = () => {
  useTitle('Accueil');

  return (
    <>
      <div
        className="container-title container max-w-headerSize mx-auto p-2 mb-8
                flex flex-col items-center"
      >
        <h1
          className="mt-4 w-full text-3xl text-center 
                md:max-w-[70%]
                "
        >
          Bienvenue sur Mes Services Greentech !
        </h1>
        <h2
          className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%] font-bold
                "
        >
          Afin de vous orienter vers les meilleurs leviers, choisissez votre profil :
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center mb-16">
        <ProfileCard
          title="Je représente une entreprise éco-innovante"
          description="Trouvez des leviers dans la recherche d’aides, d’investisseurs, d’acteurs publics ouverts à l’innovation, et d’accès à la commande publique"
          badge="Entreprise"
          type="startup"
        />
        <ProfileCard
          title="Je suis acheteur public"
          description="Trouvez des aides financières pour financer vos achats responsables, sourcez des entreprises pour vos projets d’achats et ayez une visibilité sur les achats ou projets d’achats des autres acteurs publics."
          badge="Acheteur public"
          type="publicActor"
        />
      </div>
    </>
  );
};

export default Home;

interface ProfileCardProps {
  title: string;
  description: string;
  badge: string;
  type: 'startup' | 'publicActor';
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, description, badge, type }) => {
  return (
    <div className="fr-card fr-enlarge-link w-full max-w-[300px] m-2">
      <div className="fr-card__body ">
        <div className="fr-card__content !pt-4 !px-6 !pb-16 ">
          <h3 className="fr-card__title">
            <Link
              to={type === 'startup' ? '/startup' : '/acteurs-publics'}
              className="rm-link-underline"
            >
              <p className="clamp mt-2 font-bold text-lg">{title}</p>
            </Link>
          </h3>
          <div className="fr-card__desc">{description}</div>
          <div className="fr-card__start">
            <ul className="fr-tags-group" aria-hidden={true}>
              <li>
                <p className={`fr-badge fr-badge--sm `}>{badge} </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

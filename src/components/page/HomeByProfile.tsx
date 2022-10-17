import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { startupPersona as allCardType } from '../../model/CardType';
import LinksCard from '../customComponents/LinksCard';
import HomeCard from '../dsfrComponents/HomeCard';

interface HomeByProfileProps {
  profile: 'startup' | 'publicActor';
}

const HomeByProfile: React.FC<HomeByProfileProps> = ({ profile }) => {
  useTitle(contentByProfile[profile].pageTitle);

  return (
    <>
      <div
        className="container-title container max-w-headerSize mx-auto p-2 
                flex flex-col items-center">
        <h1
          className="mt-4 w-full font-bold text-3xl text-center 
                md:max-w-[70%]
                ">
          {contentByProfile[profile].mainContent.title}
        </h1>
        <h2
          className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%]
                ">
          {' '}
          {contentByProfile[profile].mainContent.description}
        </h2>
      </div>

      <div role="list" className="cardsContainer mx-auto flex flex-wrap justify-center">
        {allCardType
          .filter((card) => contentByProfile[profile].cardNames.includes(card.name))
          .map((card, index) => (
            <HomeCard cardTypeData={card} key={index} />
          ))}
      </div>

      <div
        className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center">
        <h2 className="my-8 w-full font-bold text-3xl text-center md:max-w-[70%]">
          Cela peut aussi vous intéresser
        </h2>
        <div className="fr-container">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {contentByProfile[profile].suggestions.map(({ title, description, links }) => (
              <li key={title}>
                <LinksCard title={title} description={description} links={links} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {profile === 'startup' && (
        <div
          className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center">
          {' '}
          <h2 className="my-8 w-full font-bold text-3xl text-center md:max-w-[70%]">
            {contentByProfile[profile].secondaryContent.title}
          </h2>
          {contentByProfile[profile].secondaryContent.description && (
            <p
              className="text-center w-[65%] leading-7 
                lg:max-w-[62%]
                ">
              {contentByProfile[profile].secondaryContent.description}
            </p>
          )}
        </div>
      )}
      <div
        className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center">
        <Link
          className="w-fit h-9 text-base my-8 text-dark-text-action p-1 rm-link-underline flex justify-center text-xl"
          to={contentByProfile[profile].secondaryContent.extraUrl}>
          {contentByProfile[profile].secondaryContent.extraLink}
        </Link>
      </div>
    </>
  );
};

export default HomeByProfile;

const contentByProfile = {
  startup: {
    pageTitle: 'Accueil startups',
    cardNames: ['achats-previsionnels', 'acheteurs-publics'],
    mainContent: {
      title: 'Start-up greentech, trouvez des leviers pour booster votre développement ! ',
      description:
        'A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes de leviers autour des 5 axes suivants :'
    },
    suggestions: [
      {
        title: 'Investisseurs',
        description: 'Consultez le catalogue de notre partenaire',
        links: [
          { name: 'Le Pexe', url: 'https://ecoentreprises-france.fr/' },
          { name: 'Investisseurs en France', url: '#' }
        ]
      },
      {
        title: 'Aides financières',
        description: 'Trouvez des aides à l’innovation ou pour vos clients',
        links: [
          { name: 'Aides Territoires', url: 'https://aides-territoires.beta.gouv.fr/' },
          { name: 'Mission Transition', url: 'http://mission-transition.beta.gouv.fr/' },
          { name: 'Bpifrance', url: 'https://www.bpifrance.fr/' },
          { name: 'Ademe', url: 'https://www.ademe.fr/' }
        ]
      },
      {
        title: "Appels d'offres",
        description: 'Retrouvez les principaux profils d’acheteurs',
        links: [
          {
            name: 'Place',
            url: 'https://www.marches-publics.gouv.fr/?page=Entreprise.AccueilEntreprise'
          },
          { name: 'Maximilien', url: 'https://www.maximilien.fr/' },
          { name: 'Ugap', url: 'https://www.ugap.fr/' }
        ]
      }
    ],
    secondaryContent: {
      title:
        'Vous souhaitez que votre entreprise éco-innovante soit visible dans Mes Services Greentech ?',
      description:
        'Très bonne idée ! Pour accentuer votre visibilité auprès des acheteurs publics et de l’écosystème Greentech Innovation, enregistrer vos recherches et recevoir des alertes, remplissez ce formulaire d’inscription ! (Sous réserve de validation par nos équipes)',
      extraLink: 'Vous n’êtes pas une entreprise ? Aller sur la version acheteur public',
      extraUrl: '/acteurs-publics'
    }
  },
  publicActor: {
    pageTitle: 'Accueil acheteur public',
    cardNames: ['startups', 'acheteurs-publics'],
    mainContent: {
      title: 'Acteurs publics, sourcez des entreprises éco-innovantes !',
      description:
        'A partir de la description de votre besoin, nous vous proposons des solutions adaptées'
    },
    suggestions: [
      {
        title: 'Communauté',
        description: 'Rejoignez Rapidd, la communauté des achats durables',
        links: [{ name: 'Rapidd', url: 'https://rapidd.developpement-durable.gouv.fr/' }]
      },
      {
        title: 'Financements',
        description: 'Trouvez des aides pour financer vos achats responsables',
        links: [{ name: 'Aides Territoires', url: 'https://aides-territoires.beta.gouv.fr/' }]
      },
      {
        title: 'Achats programmés',
        description: 'Publiez vos projets, entrez en contact avec des entreprises',
        links: [
          {
            name: 'Approch',
            url: 'https://projets-achats.marches-publics.gouv.fr/#'
          }
        ]
      },
      {
        title: 'Clause',
        description: "Facilitez vous l'intégration de clauses environnementales.",
        links: [
          {
            name: 'La clause verte',
            url: 'https://laclauseverte.fr/'
          }
        ]
      },
      {
        title: 'Inclusion',
        description: "Toutes les structures de l'insertion et du handicap à un seul endroit",
        links: [
          {
            name: "Le marché de l'inclusion",
            url: 'https://lemarche.inclusion.beta.gouv.fr/#'
          }
        ]
      }
    ],
    secondaryContent: {
      title:
        'Vous souhaitez que votre entreprise éco-innovante soit visible dans Mes Services Greentech ?',
      description: null,
      extraLink: 'Vous n’êtes pas un acheteur public ? Aller sur la version entreprise',
      extraUrl: '/startup'
    }
  }
};

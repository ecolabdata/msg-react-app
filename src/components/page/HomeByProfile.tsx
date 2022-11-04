import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { startupPersona as allCardType } from '../../model/CardType';
import CtaBloc from '../customComponents/CtaBloc';
import LinksCard from '../customComponents/LinksCard';
import HomeCard from '../dsfrComponents/HomeCard';

interface HomeByProfileProps {
  profile: 'startup' | 'publicActor';
}

const HomeByProfile: React.FC<HomeByProfileProps> = ({ profile }) => {
  const pageContent = homePageContent[profile];

  useTitle(pageContent.pageTitle);

  return (
    <>
      <section>
        <div
          className="container-title container max-w-headerSize mx-auto p-2 
                flex flex-col items-center"
        >
          <h1
            className="mt-4 w-full font-bold text-4xl text-center 
                md:max-w-[60%]
                "
          >
            {pageContent.mainContent.title}
          </h1>
          <h2
            className="mt-8 text-center w-[65%] leading-7 
                lg:max-w-[62%]
                "
          >
            {' '}
            {pageContent.mainContent.description}
          </h2>
        </div>

        <ul className="cardsContainer mx-auto flex flex-wrap justify-center">
          {allCardType
            .filter((card) => pageContent.cardNames.includes(card.name))
            .map((card, index) => (
              <li key={index}>
                <HomeCard cardTypeData={card} />
              </li>
            ))}
        </ul>
      </section>
      {!!pageContent.ctaBlocs?.length && (
        <div className="container flex flex-col my-8 mx-auto justify-center max-w-headerSize md:max-w-[80%]  md:flex-row">
          {pageContent.ctaBlocs.map(({ title, description, links, cta }) => (
            <section key={title} className="w-[50%] max-w-[700px] p-16">
              <CtaBloc title={title} description={description} links={links} cta={cta} />
            </section>
          ))}
        </div>
      )}
      <section
        className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center"
      >
        <h2 className="my-8 w-full font-bold text-3xl text-center md:max-w-[70%]">
          Cela peut aussi vous intéresser
        </h2>
        <div className="fr-container">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pageContent.suggestions.map(({ title, description, links }) => (
              <li key={title}>
                <LinksCard title={title} description={description} links={links} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {profile === 'startup' && (
        <section
          className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center"
        >
          {' '}
          <h2 className="my-8 w-full font-bold text-3xl text-center md:max-w-[70%]">
            {pageContent.secondaryContent.title}
          </h2>
          {pageContent.secondaryContent.description && (
            <p
              className="text-center w-[65%] leading-7 
                lg:max-w-[62%]
                "
            >
              {pageContent.secondaryContent.description}
            </p>
          )}
        </section>
      )}
      <div
        className="container-title container max-w-headerSize my-8 mx-auto p-2 
              flex flex-col items-center"
      >
        <Link
          className="w-fit h-9 text-base my-8 text-dark-text-action p-1 rm-link-underline flex justify-center text-xl"
          onClick={() => window.scrollTo(0, 0)}
          to={pageContent.secondaryContent.extraUrl}
        >
          {pageContent.secondaryContent.extraLink}
        </Link>
      </div>
    </>
  );
};

export default HomeByProfile;

const homePageContent = {
  startup: {
    pageTitle: 'Accueil startups',
    cardNames: ['achats-previsionnels', 'acheteurs-publics'],
    mainContent: {
      title: 'Start-up greentech, trouvez des leviers pour booster votre développement ! ',
      description:
        'A partir de la description de votre activité ou de votre solution, nous vous proposons des pistes de leviers autour des 5 axes suivants :'
    },
    ctaBlocs: [
      {
        title: 'Parlez la même langue que les acheteurs publics !',
        description:
          'Téléchargez notre template d’argumentaire innovation qui vous permettra de valoriser votre solution auprès des acheteurs publics !',

        cta: {
          name: "télécharger le template d'argumentaire",
          url: 'https://docs.google.com/document/d/1tFbq0duIZauZPTekjfJXFPylT96LHmNL/edit',
          icon: 'download'
        },
        links: [
          {
            name: 'Voir le guide pratique des achats innovants',
            url: 'https://www.economie.gouv.fr/files/2020-08/guide-pratique-achat-public-innovant.pdf'
          },
          {
            name: "Evaluer son caractère innovant grâce à l'échelle TRL",
            url: 'https://www.entreprises.gouv.fr/files/files/directions_services/politique-et-enjeux/innovation/tc2015/technologies-cles-2015-annexes.pdf'
          }
        ]
      },
      {
        title: "Recevez la Green'Actu !",
        description:
          'Recevez chaque mois les actualités, les nouveaux podcast, les offres d’emplois et les événements de Greentech Innovation et de son écosystème.',
        cta: {
          name: "M'inscrire à la Green'Actu",
          url: 'https://email.developpement-durable.gouv.fr/users/subscribe/js_id/5sie/id/2',
          icon: 'sendMail'
        }
      }
    ],
    suggestions: [
      {
        title: 'Investisseurs',
        description: 'Consultez le catalogue de notre partenaire',
        links: [
          {
            name: 'Le Pexe',
            url: 'https://annuaire.investisseurs.ecoentreprises-france.fr/annuaire/1101206'
          },
          {
            name: 'Investisseurs en France',
            url: 'https://prairie-manchego-f09.notion.site/850-investisseurs-en-France-0d144a68e5a44dd391c1c019a2f1ae33'
          }
        ]
      },
      {
        title: 'Aides financières',
        description: 'Trouvez des aides à l’innovation ou pour vos clients',
        links: [
          { name: 'Aides Territoires', url: 'https://aides-territoires.beta.gouv.fr/' },
          { name: 'Mission Transition', url: 'http://mission-transition.beta.gouv.fr/' },
          { name: 'Bpifrance', url: 'https://www.bpifrance.fr/nos-solutions/financement' },
          {
            name: 'Ademe',
            url: "https://librairie.ademe.fr/urbanisme-et-batiment/5208-aides-financieres-en-2022-les-9791029719127.html#:~:text=En%20savoir%20plus-,MaPrimeRenov'%2C%20%C3%A9co%2Dpr%C3%AAt%20%C3%A0%20taux%20z%C3%A9ro%2C%20Certificats%20d,%2C%20les%20%C3%A9nergies%20renouvelables..."
          }
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
          { name: 'Maximilien', url: 'https://www.boamp.fr/pages/recherche/?sort=dateparution' },
          {
            name: 'Ugap',
            url: 'https://www.ugap.fr/programme-dappels-doffres-previsionnel-2019-2020_4524522.html'
          }
        ]
      }
    ],
    secondaryContent: {
      title:
        'Vous souhaitez que votre entreprise éco-innovante soit visible dans Mes Services Greentech ?',
      description: (
        <>
          Très bonne idée ! Pour accentuer votre visibilité auprès des acheteurs publics et de
          l’écosystème Greentech Innovation, enregistrer vos recherches et recevoir des alertes,
          remplissez
          <a
            className="text-base my-8 text-dark-text-action p-1 rm-link-underline"
            href="https://airtable.com/shrY73vlVka9j2cg8"
            target="_blank"
            rel="noreferrer"
          >
            ce formulaire d’inscription
          </a>
          ! (Sous réserve de validation par nos équipes)
        </>
      ),
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
    ctaBlocs: [],
    suggestions: [
      {
        title: 'Communauté',
        description: 'Rejoignez Rapidd, la communauté des achats durables',
        links: [{ name: 'Rapidd', url: 'https://rapidd.developpement-durable.gouv.fr/' }]
      },
      {
        title: 'Aide',
        description:
          'Obtenez un accompagnement pour intégrer des considérations environnementales dans vos  achats.',
        links: [
          { name: 'Le guichet vert', url: 'https://gipmaximilien.limesurvey.net/353211?lang=fr%20' }
        ]
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
      },
      {
        title: 'Label Ville durable innovante',
        description: 'Informations sur le label porté par le Cerema et Efficacity',
        links: [
          {
            name: 'Label VDI',
            url: 'https://www.label-vdi.fr/detail-label'
          }
        ]
      }
    ],
    secondaryContent: {
      title: null,
      description: null,
      extraLink: 'Vous n’êtes pas un acheteur public ? Aller sur la version entreprise',
      extraUrl: '/startup'
    }
  }
};

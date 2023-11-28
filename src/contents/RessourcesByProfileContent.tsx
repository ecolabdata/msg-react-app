import { publicActorPersona, startupPersona } from '../model/CardType';
import ExternalLink from '../components/Core/ExternalLink';

const ressourcesByProfileContent = {
  startup: {
    pageTitle: 'Ressources entreprises',
    cards: startupPersona,
    mainContent: {
      title: 'Start-up greentech, trouvez des leviers pour booster votre développement ! ',
      description: 'Trouvez des ressources autour des 5 axes suivants'
    },
    ctaBlocs: [
      {
        title: 'Parlez la même langue que les acheteurs publics !',
        description:
          'Téléchargez notre modèle d’argumentaire innovation qui vous permettra de valoriser votre solution auprès des acheteurs publics !',

        cta: {
          name: "Télécharger le modèle d'argumentaire",
          url: 'https://drive.google.com/uc?export=download&id=1tFbq0duIZauZPTekjfJXFPylT96LHmNL',
          icon: 'download'
        },
        links: [
          {
            name: 'Voir le guide pratique achats innovants',
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
        title: 'Aides financières',
        description: 'Trouvez des aides à l’innovation ou pour vos clients',
        links: [
          { name: 'Aides Territoires', url: 'https://aides-territoires.beta.gouv.fr/' },
          { name: 'Mission Transition', url: 'http://mission-transition.beta.gouv.fr/' },
          { name: 'Bpifrance', url: 'https://www.bpifrance.fr/nos-solutions/financement' },
          {
            name: 'Ademe',
            url: 'https://www.ademe.fr/nos-missions/financement'
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
            name: 'Ugap prévisionnel 2022/2023',
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
          Très bonne idée ! Pour accentuer votre visibilité auprès des acheteurs publics et de l’écosystème Greentech,
          nous vous invitons à candidater à l'AMI Greentech Innovation, présenté sur le site internet{' '}
          <ExternalLink
            href="https://greentechinnovation.fr/"
            content="Greentech Innovation "
            className="text-base my-8 text-blue-france-625 p-1 link-underline"
          />
          !
        </>
      ),
      extraLink: 'Vous n’êtes pas une entreprise ? Aller sur la version acheteur public',
      extraUrl: '/ressources-acheteurs-publics'
    }
  },
  publicActor: {
    pageTitle: 'Ressources acheteurs publics',
    cards: publicActorPersona,
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
        title: 'Aides',
        description:
          'Obtenez un accompagnement pour intégrer des considérations environnementales dans vos  achats.',
        links: [{ name: 'Le guichet vert', url: 'https://laclauseverte.fr/le-guichet-vert/' }]
      },
      {
        title: 'Financements',
        description: 'Trouvez des aides pour financer vos achats responsables',
        links: [{ name: 'Aides Territoires', url: 'https://aides-territoires.beta.gouv.fr/' }]
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
        title: 'Labels',
        description: 'Informations sur les labels valorisant votre politique d’achats durables',
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
      extraUrl: '/ressources-entreprises'
    }
  }
};

export default ressourcesByProfileContent;

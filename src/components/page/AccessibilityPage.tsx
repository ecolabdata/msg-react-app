import ExternalLink from 'components/Core/ExternalLink';

export const AccessibilityPage = () => {
  return (
    <div className="mx-8 w-4/5">
      <h1 className="mt-8 mb-16 text-center justify-center items-center font-bold text-4xl">
        Accessibilité
      </h1>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Déclaration d’accessibilité</h2>
        <p>
          Greentech Innovation s’engage à rendre son site Web accessible conformément à l’article 47
          de la loi n° 2005-102 du 11 février 2005. Cette déclaration d’accessibilité s’applique au
          site de Greentech Innovation : https://msg.greentechinnovation.fr/
        </p>
      </NoticeBlock>{' '}
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Etat de conformité</h2>
        <p>
          Greentech est en totale conformité avec le référentiel général d’amélioration de
          l’accessibilité.
        </p>
      </NoticeBlock>{' '}
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Résultats des tests</h2>
        <p>
          L’audit de conformité au RGAA 4.1 réalisé par la société{' '}
          <ExternalLink
            className="font-bold text-blue-france-625 mr-1"
            href="https://www.numerik-ea.fr/"
            content="Numerik-ea"
          />{' '}
          révèle que : 100% des critères RGAA sont respectés.
        </p>
        <p>Dans le détail :</p>
        <ul>
          <li>Nombre de critères conformes : 49</li>
          <li>Nombre de critères non applicables : 57</li>
          <li>Nombre de critères non conformes : 0</li>
        </ul>
        <h3 className="my-4 font-bold text-xl">
          Contenus non soumis à l’obligation d’accessibilité
        </h3>
        <ul>
          <li>
            Les fichiers disponibles dans des formats bureautiques publiés avant le 23 septembre
            2018;
          </li>
          <li>
            Les contenus de tiers qui ne sont ni financés ni développés par l’organisme concerné et
            qui ne sont pas sous son contrôle (carte google, bandeau cookie, lecteur youtube,
            résultats de recherche) ;
          </li>
        </ul>
      </NoticeBlock>{' '}
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Etablissements de cette déclaration</h2>
        <p>Cette déclaration a été établie le 15 décembre 2022.</p>
        <h3 className="my-4 font-bold text-xl">Technologies utilisées</h3>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Javascript</li>
        </ul>
        <h3 className="my-4 font-bold text-xl">Environnement de test</h3>
        <p>
          Les tests des pages web ont été effectués avec les combinaisons de navigateurs web et
          lecteurs d’écran suivants :
        </p>
        <ul>
          <li>NVDA 2022.1</li>
        </ul>

        <h3 className="my-4 font-bold text-xl">
          Les outils suivants ont été utilisés lors de l’évaluation :
        </h3>
        <ul>
          <li>Color Contrast Analyser</li>
          <li>HeadingsMap</li>
          <li>Web developer</li>
          <li>ARC Toolkit</li>
        </ul>

        <h3 className="my-4 font-bold text-xl">
          Pages du site ayant fait l’objet de la vérification de conformité
        </h3>
        <ol>
          <li>Accueil</li>
          <li>Plan du site</li>
          <li>Mentions légales</li>
          <li>Données personnelles</li>
          <li>Gestions des cookies</li>
          <li>Startup</li>
          <li>Achat publics à venir</li>
          <li>
            Achat publics à venir : Article “Travaux des protections de façades à Saint-Cloud”
          </li>
        </ol>
      </NoticeBlock>{' '}
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Retour d’information et contact</h2>
        <p>
          Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le
          responsable du site web pour être orienté vers une alternative accessible ou obtenir le
          contenu sous une autre forme.
        </p>
        <ul>
          <li>
            Envoyer un message via{' '}
            <ExternalLink
              className="font-bold text-blue-france-625 mr-1"
              href="https://airtable.com/shrwwE4lA2GFxK0T4"
              content="un formulaire"
            />
          </li>
        </ul>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Voies de recours</h2>
        <p>
          Cette procédure est à utiliser dans le cas suivant. Vous avez signalé au responsable du
          site web un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des
          services et vous n’avez pas obtenu de réponse satisfaisante.
        </p>
        <ul>
          <li>
            Écrire un message au{' '}
            <ExternalLink
              className="font-bold text-blue-france-625 mr-1"
              href="https://formulaire.defenseurdesdroits.fr/"
              content="Défenseur des droits"
            />
          </li>
          <li>
            Contacter le{' '}
            <ExternalLink
              className="font-bold text-blue-france-625 mr-1"
              href="https://www.defenseurdesdroits.fr/saisir/delegues"
              content="délégué du Défenseur des droits dans votre région"
            />
          </li>
          <li>
            Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) Défenseur des
            droitsLibre réponse 71120 75342 Paris CEDEX 07
          </li>
        </ul>
      </NoticeBlock>
    </div>
  );
};

const NoticeBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 mb-8 pb-8 border-b border-bg-light-50 pr-8 xl:pr-96">{children}</div>;
};
export default AccessibilityPage;

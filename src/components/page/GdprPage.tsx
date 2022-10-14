import Accordion, { AccordionGroup } from '../dsfrComponents/Accordion';

export const GdprPage = () => {
  return (
    <div className="mx-8 w-4/5">
      <h1 className="mt-8 mb-16 text-center justify-center items-center font-bold text-4xl">
        Données personnelles
      </h1>
      <div className="mt-4 mb-8 pb-4 border-b border-bg-light-50 pr-8 xl:pr-64">
        <p>
          Le Commissariat Général au Développement durable, situé 1 place Carpeaux 92800 à Puteaux,
          s’engage à traiter vos données personnelles en toute confidentialité, dans le respect de
          la réglementation et notamment du Règlement Général sur la Protection des Données 2016/679
          et de la Loi Informatique et Libertés n°78-17 mise à jour.
        </p>
      </div>
      <div className="mt-4 mb-8 pb-4 border-b border-bg-light-50 pr-8 xl:pr-64">
        <h2 className="my-4 font-bold text-2xl">Traitements des données à caractère personnel</h2>
        <AccordionGroup>
          <Accordion
            id="accordion_suscription"
            title="Gestion des abonnements à la lettre d’information Greentech Innovation (newsletter)"
          >
            <h4 className="mt-2">Finalités</h4>
            <p>
              Le traitement a pour objet la gestion de l’envoi de la lettre d’information de
              Greentech Innovation. Il permet à greentech Innovation de :
            </p>
            <ul>
              <li>gérer les abonnements ;</li>
              <li>élaborer des statistiques liées au service via un « pixel invisible ».</li>
            </ul>
            <h4 className="mt-2">Base juridique de traitement (article 6 du RGPD)</h4>
            <p>
              Ce traitement de données personnelles relève de la mission d’intérêt public dont le
              ministère est investi. Il concerne néanmoins uniquement les personnes qui souhaitent
              s’enregistrer pour recevoir la lettre d’information du ministère.
            </p>
            <h4 className="mt-2">Données traitées</h4>
            <ul>
              <li>adresses de courrier électronique (e-mail) ;</li>
              <li>statistiques liées au service de newsletter.</li>
            </ul>
            <p>
              Ces données sont issues de l’enregistrement, par la personne souhaitant recevoir la
              newsletter, de son e-mail dans le champ dédié du formulaire d’inscription à la
              newsletter.
            </p>
            <h4 className="mt-2">Destinataires</h4>
            <p>
              Sont destinataires de ces données les agents habilités de la Direction de la
              communication ainsi que ses sous-traitants.
            </p>
            <h4 className="mt-2">Durée de conservation</h4>
            <p>
              Le ministère conserve l’adresse e-mail tant que la personne concernée ne se désinscrit
              pas (via le lien de désinscription intégré dans chaque newsletter).
            </p>
            <h4 className="mt-2">Vos droits</h4>
            <p>
              Vous pouvez accéder aux données vous concernant, les faire rectifier ou les faire
              effacer. Vous disposez également d’un droit à la limitation et d’opposition au
              traitement.{' '}
            </p>
            <p>
              <a href="https://www.google.com/url?q=https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles&amp;sa=D&amp;source=editors&amp;ust=1664548335104542&amp;usg=AOvVaw0-c_H2SM2_oXgMHdYYDvU3">
                Comprendre vos droits sur le site de la CNIL
              </a>
            </p>
          </Accordion>
          <Accordion id="accordion_form" title="Formulaire de contact">
            <h4 className="mt-2">Finalités</h4>
            <p>
              Le traitement a pour objet le recueil des demandes des usagers et leur routage vers le
              service instructeur compétent au sein du pôle ministériel dans le cadre du droit de
              saisine par voie électronique de l’administration.
            </p>
            <h4 className="mt-2">Base juridique de traitement (article 6 du RGPD)</h4>
            <p>
              Ce traitement de données personnelles relève de la mission d’intérêt public dont le
              ministère est investi.. Le traitement est en effet nécessaire au respect du Code des
              relations entre le public et l'administration (articles L112-8 à L112-10) auquel le
              ministère est soumis.
            </p>
            <h4 className="mt-2">Données traitées</h4>
            <ul>
              <li>Nom, prénom du demandeur ;</li>
              <li>
                adresses de courrier électronique (e-mail) pour vérifier l’exactitude de l’adresse
                et échanger &nbsp;;
              </li>
              <li>
                coordonnées postales si la modalité de réponse sélectionnée est par voie postale ;
              </li>
              <li>contenu de la saisine.</li>
            </ul>
            <h4 className="mt-2">Destinataires</h4>
            <p>
              Les services instructeurs de l’administration centrale du pôle ministériel sont les
              destinataires de ces données. Les données sont directement envoyées dans la boîte de
              réception de courrier électronique déclarée par le service compétent en fonction de la
              thématique choisie par le demandeur.
            </p>
            <h4 className="mt-2">Durée de conservation</h4>
            <p>
              Les messages échangés sont conservés pendant leur durée de vie utile pour
              l'administration dans le cadre de la réglementation en matière d'archives.
            </p>
            <p>Vos droits</p>
            <p>
              Vous pouvez accéder aux données vous concernant, les faire rectifier ou les faire
              effacer. Vous disposez également d’un droit à la limitation et d’opposition au
              traitement.
            </p>
            <p>
              <a href="https://www.google.com/url?q=https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles&amp;sa=D&amp;source=editors&amp;ust=1664548335107194&amp;usg=AOvVaw1ezq1DJT-rL8R1ToYJE1-W">
                Comprendre vos droits sur le site de la CNIL
              </a>
            </p>
          </Accordion>
          <Accordion id="accordion_personnalAccount" title="Formulaire de création de compte">
            <p>Pas encore de compte utilisateur évolution à venir à moyen ou long terme</p>
          </Accordion>
          <Accordion id="accordion_myRights" title="Comment exercer mes droits ?">
            <p>
              Pour exercer vos droits ou pour toute question sur le traitement de vos données, vous
              pouvez contacter notre Délégué à la Protection des Données à cette adresse :{' '}
              <a href="mailto:dpd.daj.sg@developpement-durable.gouv.fr">
                dpd.daj.sg@developpement-durable.gouv.fr
              </a>
            </p>
            <p>Vous préciserez le traitement en cause dans le titre du message.</p>
            <p>
              Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés
              » ne sont pas respectés, vous pouvez adresser une réclamation à la{' '}
              <span>
                <a href="https://www.google.com/url?q=https://www.cnil.fr/&amp;sa=D&amp;source=editors&amp;ust=1664548335109004&amp;usg=AOvVaw2FxT74VkhSU9s4KD7vEfT9">
                  CNIL
                </a>
              </span>
              <span>.</span>
            </p>{' '}
          </Accordion>
        </AccordionGroup>
      </div>
      <div className="mt-4 mb-8 pb-4 border-b border-bg-light-50 pr-8 xl:pr-64">
        <h2 className="my-4 font-bold text-2xl">Cookies</h2>
        <p>
          La CNIL définit les cookies comme « un petit fichier stocké par un serveur dans le
          terminal (ordinateur, téléphone, etc.) d’un utilisateur et associé à un domaine web
          (c'est-à-dire dans la majorité des cas à l’ensemble des pages d’un même site web). Ce
          fichier est automatiquement renvoyé lors de contacts ultérieurs avec le même domaine ».
        </p>
        <p>Ce site peut être amené à utiliser deux types de cookies :</p>
        <ul>
          <li>
            <p>
              - les cookies internes pour des fonctionnalités de mesure d’audience et de bon
              fonctionnement du site,
            </p>
          </li>
          <li>
            <p>
              - les cookies tiers, déposés pour accéder à des fonctionnalités proposées par des
              services tiers.
            </p>
          </li>
        </ul>
        <p>
          À tout moment, vous pouvez consulter plus d’informations et paramétrer vos choix en
          matière de cookies en vous rendant sur la boîte de dialogue modale de gestion des cookies.
        </p>
      </div>
    </div>
  );
};

export default GdprPage;

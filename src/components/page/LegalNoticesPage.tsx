import React from 'react';

const NoticeBlock = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 mb-8 pb-8 border-b border-bg-light-50 pr-8 xl:pr-96">{children}</div>;
};

export const LegalNotices = () => {
  return (
    <div className="mx-8 w-4/5">
      <h1 className="mt-8 mb-16 text-center justify-center items-center font-bold text-4xl">
        Mentions Légales
      </h1>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Informations éditeurs</h2>
        <h3 className="my-4 font-bold text-xl">Service gestionnaire</h3>
        <p>Ministère de la Transition écologique et de la Cohésion des territoires</p>
        <p>
          Direction et coordination : Thomas Cottinet, chef de l’Ecolab, le laboratoire d’innovation
          par la donnée
        </p>
        <p>Commissariat général au développement durable</p>
        <p>Tour Esplanade</p>
        <p>1 Pl. Carpeaux</p>
        <p>92800 Puteaux</p>
        <p>Téléphone : 01 40 81 21 22</p>
        <h3 className="my-4 font-bold text-xl">Gestion du portail</h3>
        <p>Comité &nbsp;de rédaction</p>
        <p>
          Rédacteur en chef : Matthieu Humbersot. Rédactrice.teur.s en chef adjoint.e.s : Coralie
          Coton, Charlotte Samson, Alexis Brissard
        </p>
        <p>
          Equipe numérique : Matthieu Humbersot, Coralie Coton, Charlotte Samson, Alexis Brissard
        </p>
        <p>
          <span>Graphisme : Coralie Coton, Equipe du </span>
          <span>
            <a href="https://www.google.com/url?q=https://www.systeme-de-design.gouv.fr/&amp;sa=D&amp;source=editors&amp;ust=1664548335093447&amp;usg=AOvVaw13mfmriUxzyt52550sf7G8">
              système de design de l’état
            </a>
          </span>
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Informations techniques</h2>
        <h3 className="my-4 font-bold text-xl">Hébergement du site</h3>
        <p>Scaleway</p>
        <p>11bis Rue Roquépine</p>
        <p>75008 Paris</p>
        <p>France</p>
        <p>
          <span></span>
        </p>
        <p>
          <span>
            <a href="https://www.google.com/url?q=https://www.scaleway.com/fr/&amp;sa=D&amp;source=editors&amp;ust=1664548335094839&amp;usg=AOvVaw1m3VCLPogEPFQpvVFKfGVZ">
              https://www.scaleway.com/fr/
            </a>
          </span>
        </p>
        <h3 className="my-4 font-bold text-xl">Conception et développement</h3>
        <p>Data science : Charlotte Samson / CGDD</p>
        <p>Développement full stack : Alexis Brissard / CGDD</p>
        <p>Développement front : Alexis Brissard / CGDD et Fitlab</p>
        <p>128 rue de la Boetie</p>
        <p>75008 Paris</p>
        <p>
          <span>
            <a href="https://www.google.com/url?q=https://www.fitlab.fr/&amp;sa=D&amp;source=editors&amp;ust=1664548335096146&amp;usg=AOvVaw1iovu3UxkCGpwgNSmtSNB3">
              https://www.fitlab.fr/
            </a>
          </span>
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Propriété intellectuelle</h2>
        <p>
          Les documents "publics" ou "officiels" ne sont couverts par aucun droit d'auteur (article
          L.122-5 du Code de Propriété intellectuelle) et peuvent donc être reproduits librement.
          C'est le cas notamment pour les discours et interventions des ministres et les
          communiqués. Les informations utilisées ne doivent l'être qu'à des fins personnelles,
          associatives ou professionnelles ; toute utilisation à des fins commerciales ou
          publicitaires est formellement interdite.
        </p>
        <p>
          La reproduction des documents sur support papier ou sous forme électronique doit obéir aux
          principes suivants :
        </p>
        <p>gratuité de la diffusion ;</p>
        <p>
          respect de l'intégrité des documents reproduits (aucune modification, ni altération
          d'aucune sorte) ;
        </p>
        <p>
          citation explicite du site ecologie.gouv.fr comme source et mention que les droits de
          reproduction sont réservés et strictement limités.
        </p>
        <p>
          Tous les autres contenus présents sur le site sont couverts par le droit d'auteur. Toute
          reprise est dès lors conditionnée à l'accord de l'auteur en vertu de l'article L.122-4 du
          Code de la Propriété Intellectuelle.
        </p>

        <p>
          Toute réutilisation des vidéos, des photographies, des créations graphiques, des
          illustrations et des lexiques, ainsi que de l'ensemble des contenus éditoriaux produits
          pour l'animation éditoriale du site est conditionnée à l'accord de l'auteur. Le répertoire
          des informations publiques du ministère de la Transition écologique précise la charte de
          réutilisation des informations publiques.
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Liens hypertextes</h2>
        <p>
          Tout site public ou privé est autorisé à établir, sans autorisation préalable, un lien
          vers les informations diffusées par le ministère de la Transition écologique. En revanche,
          les pages du site ne doivent pas être imbriquées à l’intérieur des pages d’un autre site.
        </p>
        <p>
          L’autorisation de mise en place d’un lien est valable pour tout support, à l’exception de
          ceux diffusant des informations à caractère polémique, pornographique, xénophobe ou
          pouvant, dans une plus large mesure porter atteinte à la sensibilité du plus grand nombre.
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Responsabilité du ministère</h2>
        <p>
          Les informations proposées sur ce site le sont au titre de service rendu au public. Malgré
          tout le soin apporté à l’actualisation des textes officiels et à la vérification des
          contenus, les documents mis en ligne ne sauraient engager la responsabilité du ministère
          de la Transition écologique.
        </p>
        <p>
          Les informations et/ou documents disponibles sur ce site sont susceptibles d’être modifiés
          à tout moment, et peuvent faire l’objet de mises à jour.
        </p>
        <p>
          Le ministère de la Transition écologique ne pourra en aucun cas être tenu responsable de
          tout dommage de quelque nature qu’il soit résultant de l’interprétation ou de
          l’utilisation des informations et/ou documents disponibles sur ce site.
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Disponibilité du site</h2>
        <p>
          L’éditeur s’efforce de permettre l’accès au site 24 heures sur 24, 7 jours sur 7, sauf en
          cas de force majeure ou d’un événement hors du contrôle du ministère de la Transition
          écologique, et sous réserve des éventuelles pannes et interventions de maintenance
          nécessaires au bon fonctionnement du site et des services.
        </p>

        <p>
          Par conséquent, le ministère de la Transition écologique ne peut garantir une
          disponibilité du site et/ou des services, une fiabilité des transmissions et des
          performances en terme de temps de réponse ou de qualité. Il n’est prévu aucune assistance
          technique vis-à-vis de l’utilisateur que ce soit par des moyens électronique ou
          téléphonique. s
        </p>
        <p>
          La responsabilité de l’éditeur ne saurait être engagée en cas d’impossibilité d’accès à ce
          site et/ou d’utilisation des services.
        </p>
        <p>
          Le ministère de la Transition écologique peut être amené à interrompre le site ou une
          partie des services, à tout moment sans préavis, le tout sans droit à indemnités.
          L’utilisateur reconnaît et accepte que le ministère de la Transition écologique ne soit
          pas responsable des interruptions, et des conséquences qui peuvent en découler pour
          l’utilisateur ou tout tiers.
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Droit applicable</h2>
        <p>
          Quel que soit le lieu d’utilisation, le présent site est régi par le droit français. En
          cas de contestation éventuelle, et après l’échec de toute tentative de recherche d’une
          solution amiable, les tribunaux français seront seuls compétents pour connaître de ce
          litige.
        </p>
        <p>
          Pour toute question relative aux présentes conditions d’utilisation du site, vous pouvez
          nous écrire à l’adresse suivante :
        </p>
        <p>Ministère de la Transition écologique</p>
        <p>Direction de la Communication</p>
        <p>244, Boulevard Saint Germain</p>
        <p>75007 Paris</p>
        <p>France</p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">Acceptation des conditions d’utilisation</h2>
        <p>
          L’utilisateur reconnaît avoir pris connaissance des conditions d’utilisation, au moment de
          sa connexion vers le site du ministère et déclare expressément les accepter sans réserve.
        </p>
        <p>
          <span></span>
        </p>
      </NoticeBlock>
      <NoticeBlock>
        <h2 className="my-4 font-bold text-2xl">
          Modifications des conditions générales d’utilisation
        </h2>
        <p>
          Le ministère de la Transition écologique se réserve la possibilité de modifier, à tout
          moment et sans préavis, les présentes conditions d’utilisation afin de les adapter aux
          évolutions du site et/ou de son exploitation.
        </p>
      </NoticeBlock>
    </div>
  );
};

export default LegalNotices;

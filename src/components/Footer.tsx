import { DonnezVotreAvis } from './../components/customComponents/DonnezVotreAvis';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="fr-footer relative" role="contentinfo" id="footer">
        <div className="fr-container dsfr-lg:relative">
          <div className="fr-footer__body">
            <div className="fr-footer__brand fr-enlarge-link">
              <a href="/" title="Retour à l’accueil">
                <p className="fr-logo uppercase">
                  ministère <br />
                  de la transition <br />
                  écologique <br />
                  et de la cohésion <br />
                  des territoires
                </p>
              </a>
            </div>
            <div className="fr-footer__content">
              <p className="fr-footer__content-desc">
                Mes services Greentech est en version beta. L’outil vous propose automatiquement des
                pistes pour booster votre développement ! Merci de nous aider à améliorer
                l’expérience en répondant à ce{' '}
                <a className="font-bold" href="#">
                  formulaire.
                </a>
              </p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://legifrance.gouv.fr">
                    legifrance.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://gouvernement.fr">
                    gouvernement.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://service-public.fr">
                    service-public.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a className="fr-footer__content-link" href="https://data.gouv.fr">
                    data.gouv.fr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="fr-footer__bottom">
            <ul className="fr-footer__bottom-list">
              <li className="fr-footer__bottom-item">
                <a className="fr-footer__bottom-link" href="#">
                  Plan du site
                </a>
              </li>
              <li className="fr-footer__bottom-item">
                <a className="fr-footer__bottom-link" href="/legal/accessibility">
                  Accessibilité
                </a>
              </li>
              <li className="fr-footer__bottom-item">
                <a className="fr-footer__bottom-link" href="/legal/legal-notices">
                  Mentions légales
                </a>
              </li>
              <li className="fr-footer__bottom-item">
                <a className="fr-footer__bottom-link" href="/legal/gdpr">
                  Données personnelles
                </a>
              </li>
              <li className="fr-footer__bottom-item">
                <a className="fr-footer__bottom-link" href="/legal/cookies">
                  Gestion des cookies
                </a>
              </li>
              <li className="fr-footer__bottom-item">
                <button
                  className="fr-footer__bottom-link fr-fi-theme-fill fr-link--icon-left"
                  aria-controls="fr-theme-modal"
                  data-fr-opened="fals">
                  Paramètres d'affichage
                </button>
              </li>
            </ul>
            <div className="fr-footer__bottom-copy">
              <p>
                Sauf mention contraire, tous les contenus de ce site sont sous{' '}
                <a
                  href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                  target="_blank"
                  rel="noreferrer">
                  licence etalab-2.0
                </a>
              </p>
            </div>
          </div>
          <div className="git-version text-gray-600 text-xs">
            git version:{' '}
            <a
              href={`https://github.com/ecolabdata/mes-services-greentech/commit/${window.gitInfo.gitCommitFullHash}`}>
              {window.gitInfo.gitCommitHash}
            </a>
          </div>
          <DonnezVotreAvis />
        </div>
      </footer>
    </>
  );
};

export default Footer;

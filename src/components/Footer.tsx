import { Link } from 'react-router-dom';
import ExternalLink from './Core/ExternalLink';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="fr-footer relative mt-8" role="contentinfo" id="footer">
        <div className="container dsfr-lg:relative">
          <div className="fr-footer__body">
            <div className="fr-footer__brand fr-enlarge-link">
              <Link
                to="/"
                title="Ministère de la transition écologique et de la cohésion des territoires - Retour à l’accueil">
                <p className="fr-logo uppercase">
                  ministère <br />
                  de la transition <br />
                  écologique <br />
                  et de la cohésion <br />
                  des territoires
                </p>
              </Link>
            </div>
            <div className="fr-footer__content">
              <p className="fr-footer__content-desc font-bold text-sm text-white">
                Mes services Greentech est en version beta. L’outil vous propose des leviers pour
                booster votre développement ! Pour nous faire part de vos remarques ou nous aider à
                améliorer l’expérience merci de répondre à cette{' '}
                <ExternalLink
                  className="font-bold text-blue-france-625 mr-1"
                  href="https://airtable.com/shrwwE4lA2GFxK0T4"
                  content="courte enquête"
                />
                (3 minutes).
              </p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link text-grey-625-active font-normal text-sm"
                    href="https://www.ecologie.gouv.fr/"
                    content="ecologie.gouv.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link text-grey-625-active font-normal text-sm"
                    href="https://www.economie.gouv.fr/"
                    content="economie.gouv.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link text-grey-625-active font-normal text-sm"
                    href="https://gouvernement.fr"
                    content="gouvernement.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link text-grey-625-active font-normal text-sm"
                    href="https://service-public.fr"
                    content="service-public.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link text-grey-625-active font-normal text-sm"
                    href="https://data.gouv.fr"
                    content="data.gouv.fr"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="fr-footer__bottom">
            <ul className="fr-footer__bottom-list">
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link text-grey-625 font-bold text-xs text-grey-625 font-bold text-xs"
                  to="/legal/accessibility">
                  Accessibilité
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link text-grey-625 font-bold text-xs text-grey-625 font-bold text-xs"
                  to="/plan-du-site">
                  Plan du site
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link text-grey-625 font-bold text-xs"
                  to="/legal/legal-notices">
                  Mentions légales
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link text-grey-625 font-bold text-xs"
                  to="/legal/gdpr">
                  Données personnelles
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link text-grey-625 font-bold text-xs"
                  to="/legal/cookies">
                  Gestion des cookies
                </Link>
              </li>

              {/* <li className="fr-footer__bottom-item">
                <button
                  className="fr-footer__bottom-link fr-fi-theme-fill fr-link--icon-left text-grey-625 font-bold text-xs"
                  aria-controls="fr-theme-modal"
                  data-fr-opened="fals"
                >
                  Passer au thème clair
                </button>
              </li> */}
            </ul>
            <div className="fr-footer__bottom-copy text-grey-625 font-bold text-xs mb-4">
              <p>
                Sauf mention contraire, tous les contenus de ce site sont sous{' '}
                <ExternalLink
                  href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                  content="licence etalab-2.0"
                />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

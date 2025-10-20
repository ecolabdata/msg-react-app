import { Link } from 'react-router-dom';
import ExternalLink from './Core/ExternalLink';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import { SURVEY_URL } from 'utils/constants';

const Footer: React.FC<{
  isOpenModale: boolean;
  setIsOpenModale: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpenModale, setIsOpenModale }) => {
  return (
    <>
      <footer className="fr-footer relative mt-8" role="contentinfo" id="footer">
        <div className="container dsfr-lg:relative">
          <div className="fr-footer__body">
            <div className="fr-footer__brand fr-enlarge-link">
              <Link
                to="/"
                title="Ministère de la transition écologique et de la cohésion des territoires - Retour à l’accueil">
                <p className="fr-logo uppercase">gouvernement</p>
              </Link>
            </div>
            <div className="fr-footer__content">
              <p className="fr-footer__content-desc font-bold text-sm">
                Mes services Greentech est en version beta. Cet outil est porté par le Ministère de
                l’Aménagement du territoire et de la Transition écologique. Pour les entreprises,
                cet outil vous permet d'accéder à des ressources utiles pour accéder aux marchés
                publics d'innovation. Pour les acteurs publics, profitez de cet outil pour faire
                votre sourcing de solutions, retrouver des sources possibles de financement, et des
                informations sur les marchés d'innovation. Pour nous faire part de vos remarques ou
                nous aider à améliorer l’expérience, merci de répondre à cette{' '}
                <ExternalLink
                  className={`font-bold ${localStorage.getItem('scheme') === 'dark'
                    ? 'text-blue-france-625'
                    : 'text-blue-france-sun-113'
                    } mr-1`}
                  href={SURVEY_URL}
                  content="courte enquête"
                />
                (3 minutes).
              </p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link font-normal text-sm"
                    href="https://www.ecologie.gouv.fr/"
                    content="ecologie.gouv.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link font-normal text-sm"
                    href="https://www.economie.gouv.fr/"
                    content="economie.gouv.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link font-normal text-sm"
                    href="https://gouvernement.fr"
                    content="gouvernement.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link font-normal text-sm"
                    href="https://service-public.fr"
                    content="service-public.fr"
                  />
                </li>
                <li className="fr-footer__content-item">
                  <ExternalLink
                    className="fr-footer__content-link font-normal text-sm"
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
                  className="fr-footer__bottom-link  font-bold text-xs font-bold text-xs"
                  to="/accessibilite">
                  Accessibilité
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link font-bold text-xs font-bold text-xs"
                  to="/plan-du-site">
                  Plan du site
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link className="fr-footer__bottom-link font-bold text-xs" to="/mentions-legales">
                  Mentions légales
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link
                  className="fr-footer__bottom-link font-bold text-xs"
                  to="/donnees-personnelles">
                  Données personnelles
                </Link>
              </li>
              <li className="fr-footer__bottom-item">
                <Link className="fr-footer__bottom-link font-bold text-xs" to="/cookies">
                  Gestion des cookies
                </Link>
              </li>

              <li className="fr-footer__bottom-item">
                <button
                  className="fr-footer__bottom-link fr-fi-theme-fill fr-link--icon-left  font-bold text-xs"
                  aria-controls="fr-theme-modal"
                  data-fr-opened={isOpenModale}
                  onClick={() => setIsOpenModale(!isOpenModale)}>
                  Changer le thème
                </button>
              </li>
            </ul>
            <div className="fr-footer__bottom-copy font-bold text-xs mb-4">
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

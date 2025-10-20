import { PropsWithChildren } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';
import ExternalLink from './Core/ExternalLink';
interface NavigationMenuProps {
  isBurgerMenuOpen: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isBurgerMenuOpen }) => {
  const isMobile = useCheckMobileScreen();

  return (
    <>
      {(!isMobile || (isMobile && isBurgerMenuOpen)) && (
        <div className="fr-header">
          <div className="fr-header__body">
            <div className="container ">
              <div className="flex">
                <nav
                  className="fr-nav md:self-start md:w-full flex-1"
                  id="header-navigation"
                  role="navigation"
                  aria-label="Menu principal">
                  <ul className="fr-nav__list">
                    <li className="fr-nav__item">
                      <NavigationLink to="/">
                        Accueil
                      </NavigationLink>
                    </li>
                    <li className="fr-nav__item">
                      <NavigationLink to="/entreprises">
                        Entreprises
                      </NavigationLink>
                    </li>
                    <li className="fr-nav__item">
                      <NavigationLink to="/acteurs-publics">
                        Acteurs publics
                      </NavigationLink>
                    </li>
                    <li className="fr-nav__item">
                      <button
                        className="fr-nav__btn"
                        aria-expanded="false"
                        aria-controls="menu-774">
                        Ressources
                      </button>
                      <div className="fr-collapse fr-menu" id="menu-774">
                        <ul className="fr-menu__list">
                          <li>
                            <NavigationLink
                              className="fr-nav__link"
                              to="/ressources-entreprises"
                              target="_self">
                              Entreprises
                            </NavigationLink>
                          </li>
                          <li>
                            <NavigationLink
                              className="fr-nav__link"
                              to="/ressources-acteurs-publics"
                              target="_self">
                              Acteurs publics
                            </NavigationLink>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li className="fr-nav__item">
                      <ExternalLink
                        className="fr-nav__link"
                        href="mailto:greentechinnovation@developpement-durable.gouv.fr"
                        content="Contact"
                      />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default NavigationMenu;

const NavigationLink: React.FC<PropsWithChildren<LinkProps>> = ({ to, children, ...props }) => {
  const { pathname } = useLocation();

  return (
    <Link
      className="fr-nav__link"
      {...props}
      to={to}
      target="_self"
      {...(pathname === to && { 'aria-current': 'page' })}>
      {children}
    </Link>
  );
};

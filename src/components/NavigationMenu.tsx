import { PropsWithChildren } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';
import ExternalLink from './customComponents/ExternalLink';

interface NavigationMenuProps {
  isBurgerMenuOpen: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isBurgerMenuOpen }) => {
  const isMobile = useCheckMobileScreen();

  return (
    <>
      {(!isMobile || (isMobile && isBurgerMenuOpen)) && (
        <div className="fr-header shadow-header bg-grey-75">
          <div className="fr-header__body">
            <div className="fr-container ">
              <div className="flex">
                <nav
                  className="fr-nav md:self-start md:w-full flex-1"
                  id="header-navigation"
                  role="navigation"
                  aria-label="Menu principal"
                >
                  <ul className="fr-nav__list">
                    <li className="fr-nav__item">
                      <NavigationLink to="/">Accueil</NavigationLink>
                    </li>
                    <li className="fr-nav__item">
                      <NavigationLink to="/startup">Entreprises</NavigationLink>
                    </li>
                    <li className="fr-nav__item">
                      <NavigationLink to="/acteurs-publics">Acheteurs</NavigationLink>
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

const NavigationLink: React.FC<PropsWithChildren<LinkProps>> = ({ to, children }) => {
  const { pathname } = useLocation();

  return (
    <Link
      className="fr-nav__link"
      to={to}
      target="_self"
      {...(pathname === to && { 'aria-current': 'page' })}
    >
      {children}
    </Link>
  );
};

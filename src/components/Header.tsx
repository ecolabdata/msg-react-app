import { useState } from 'react';
import Countdown from 'react-countdown';
import { Link, useLocation } from 'react-router-dom';
import { useJwtPayload } from '../utils/jwt';
import MsgLogo from './customComponents/MsgLogo';
import SkipLinks from './dsfrComponents/SkipLinks';
import NavigationMenu from './NavigationMenu';

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { pathname } = useLocation();
  const jwtPayload = useJwtPayload();
  const userIsAuth = jwtPayload != null;

  window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  return (
    <>
      <header role="banner" className="fr-header shadow-header bg-grey-75">
        <SkipLinks />
        <div className="fr-header__body">
          <div className="fr-container ">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link ">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <p className="fr-logo uppercase">
                      ministère <br />
                      de la transition <br />
                      écologique <br />
                      et de la cohésion <br />
                      des territoires
                    </p>
                  </div>
                </div>
                <div className="fr-header__service flex">
                  <Link
                    className="flex items-center"
                    to="/"
                    title="Accueil - Mes services GreenTech - Ministère de la transition écologique et de la cohésion des territoires">
                    <MsgLogo />
                  </Link>
                </div>
              </div>
              {pathname !== '/' && (
                <div className="fr-header__navbar">
                  <button
                    onClick={() => {
                      setIsBurgerMenuOpen(!isBurgerMenuOpen);
                    }}
                    className="fr-btn--menu fr-btn"
                    data-fr-opened={isBurgerMenuOpen}
                    aria-controls="header-navigation"
                    aria-haspopup="menu"
                    aria-expanded={isBurgerMenuOpen}
                    title="Menu de navigation principal"
                    id="fr-btn-menu-mobile">
                    Menu de navigation principal
                  </button>
                </div>
              )}

              {screenWidth >= 1024 && (
                <div className="fr-header__tools flex justify-end">
                  <div className="">
                    {userIsAuth && (
                      <div>
                        {jwtPayload?.name && <span>Connected as: {jwtPayload?.name}</span>}
                        {jwtPayload?.exp && (
                          <div>
                            Votre lien magique expire dans{' '}
                            <Countdown
                              intervalDelay={1000}
                              date={jwtPayload?.exp * 1000}
                              renderer={countdownRenderer}
                            />{' '}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <NavigationMenu isBurgerMenuOpen={isBurgerMenuOpen} />
    </>
  );
};

type CountdownRendererType = (o: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => JSX.Element;

const countdownRenderer: CountdownRendererType = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    document.location.href = '/';
  } else {
    // Render a countdown
    return (
      <span>
        {days}j {hours % 24}h {minutes}min {seconds}sec
      </span>
    );
  }
  return <></>;
};

export default Header;

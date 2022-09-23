import { useContext, useState } from 'react';
import Countdown from 'react-countdown';
import { Link, useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../App';
import { useJwtPayload } from '../utils/jwt';
import { pages, Route } from '../utils/pages';
import LogoMSG from './../assets/msg-icon.svg';

interface HeaderProps {
  decouvrir?: boolean;
}

const Header = ({ decouvrir }: HeaderProps) => {
  const [burgerMenuOpen, setBurgerMenuClicked] = useState(false);
  const { usedFavoris, usedCorbeille } = useContext(ApplicationContext);
  const [idc1, idc2, favoris] = usedFavoris;
  const [idc3, idc4, corbeille] = usedCorbeille;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const jwtPayload = useJwtPayload();
  const userIsAuth = jwtPayload != null;

  const routeKeyToItemLength: Record<string, number> = {
    SELECTION: Object.keys(favoris).length,
    CORBEILLE: Object.keys(corbeille).length
  };

  window.addEventListener('resize', (e) => setScreenWidth(window.innerWidth));

  const generateNavLinks = (route: Route) => (
    <>
      {userIsAuth && (
        <li key={route.key} className="fr-nav__item h-full w-full p-0">
          <Link to={route.path} className="fr-nav__link">
            <div className="flex">
              {route.icon}
              <div className="flex flex-col">
                <p className="font-bold"> {route.name} </p>
                <p className="text-xs"> {routeKeyToItemLength[route.key]} pistes </p>
              </div>
            </div>
          </Link>
        </li>
      )}
    </>
  );

  const navbar = pages.map((route: Route) => generateNavLinks(route));

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container ">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link ">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <p className="fr-logo uppercase">
                    ministère <br />
                    de la transition <br />
                    ecologique
                  </p>
                </div>
                <div className="fr-header__navbar">
                  <button
                    onClick={() => {
                      setBurgerMenuClicked(!burgerMenuOpen);
                    }}
                    className="fr-btn--menu fr-btn bg-red-200"
                    data-fr-opened={burgerMenuOpen}
                    aria-controls="modal-833"
                    aria-haspopup="menu"
                    title="Menu"
                    id="fr-btn-menu-mobile"
                  >
                    Menu
                  </button>
                </div>
              </div>
              <div className="fr-header__service flex">
                <Link
                  className="flex"
                  to="/"
                  title="Accueil - Mes services GreenTech - Ministère de la transition écologique"
                >
                  <img
                    className="h-12 mt-1 mr-2"
                    src={LogoMSG}
                    alt="Icône d'indication, version beta "
                  />
                  <p
                    className="fr-header__service-title capitalize
                                     after:rounded-sm after:content-['beta'] after:ml-2 after:relative after:bottom-1 after:w-content after:h-content after:px-1 
                                     after:text-center after:text-xs after:font-bold after:bg-beta"
                  >
                    mes services
                    <br /> greentech
                  </p>
                </Link>
              </div>
            </div>
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
                  <ul className="fr-nav__list">
                    {/* {fr-header__tools-links} */}
                    {decouvrir && userIsAuth ? <DecouvrirButton /> : navbar}
                    {/* {generatePopOverOrLoginButton()} */}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fr-header__menu fr-modal" id="modal-833" aria-labelledby="fr-btn-menu-mobile">
        <div className="fr-container">
          <button className="fr-link--close fr-link" aria-controls="modal-833">
            Fermer
          </button>
          <div className="fr-header__menu-links">
            {decouvrir ? <DecouvrirButton /> : navbar}
            {/* {generatePopOverOrLoginButton()} */}
          </div>
        </div>
      </div>
    </header>
  );
};

function DecouvrirButton() {
  const { usedCorbeille, usedNextScrollTarget } = useContext(ApplicationContext);
  const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget;
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        setNextScrolTarget({ top: 0 });
        navigate('/explorer');
      }}
      className=" fr-btn"
    >
      Découvrir
    </button>
  );
}

type CountdownRendererType = (o: {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  completed: any;
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

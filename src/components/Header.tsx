import { NavLink } from 'react-router-dom';
import FillButton from './dsfrComponents/FillButton';
import { protectedRoutes, publicRoutes } from './../utils';
import Trash from './../assets/icons/trash-fill.svg';
import Star from './../assets/icons/star-fill.svg';
import LogoMSG from './../assets/msg-icon.png';
import AvatarPopOver from './customComponents/AvatarPopOver';
import {Route} from './../utils/routes';
import { useState, useEffect } from 'react';
import { appActions } from '../_actions/app.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../_reducers/root.reducer';

interface HeaderProps {
    userIsAuth: boolean;
}

const Header = ({userIsAuth}: HeaderProps) => {
    const [burgerMenuOpen, setBurgerMenuClicked] = useState(false);

    const screenWidth = useSelector((state:RootState) => state?.appState.screenWidth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('screenWidth :>> ', screenWidth);

        const handleResize = () => {
          dispatch(appActions.resizeScreenWidth());
        };
    
        window.addEventListener('resize', handleResize);

    }, [screenWidth]);

    const generatePopOverOrLoginButton = () => {
            return (
                <>
                    {userIsAuth ?

                        <li className="fr-nav__item">
                            <AvatarPopOver/>
                        </li>
                        :

                                
                        <li className="fr-nav__item" >
                            <FillButton>
                                <a href="/authentification">Connexion</a>
                            </FillButton>
                        </li>

                    }
                </>
            )
           
    }
    const generateNavLinks = (route:Route) => {
        return (
            <>
                {userIsAuth &&
                    <li key={route.key} className="fr-nav__item h-full w-full p-0">
                
                        <a href={route.path} className="fr-nav__link"> 
                        
                            <div className="flex">

                                {route.key === 'SELECTION' ?
                                    <img  className="w-5 h-5 m-1" src={Star} alt="Icône d'étoile" />
                                
                                    :
                                    <img className="w-5 h-5 m-1" src={Trash} alt="Icône de poubelle" />
                                }
                                
                                <div className="flex flex-col">
                                    <p className="font-bold"> {route.name} </p>
                                    <p className="text-xs"> X pistes </p>
                                </div>

                            </div>
                        </a>

                    </li>
                }
            </>
        )
        
    };

    const generateNavBar = () => {

        let routesToDisplay;
        routesToDisplay = userIsAuth ? protectedRoutes : publicRoutes;

        return  routesToDisplay.map((route:Route) => {

            return generateNavLinks(route);
        })
    };

    return (
        <header role="banner" className="fr-header">

            <div className="fr-header__body">
                <div className="fr-container">
                    <div className="fr-header__body-row">
                        <div className="fr-header__brand fr-enlarge-link">
                            <div className="fr-header__brand-top">
                                <div className="fr-header__logo">
                                    <p className="fr-logo uppercase">
                                        ministère <br/>
                                        de la transition <br/>
                                        ecologique
                                    </p>
                                </div>
                                <div className="fr-header__navbar">
                                    <button onClick={ () => {setBurgerMenuClicked(!burgerMenuOpen)}} className="fr-btn--menu fr-btn bg-red-200" data-fr-opened={burgerMenuOpen} aria-controls="modal-833" aria-haspopup="menu" title="Menu" id="fr-btn-menu-mobile">
                                        Menu
                                    </button>
                                </div>
                            </div>
                            <div className="fr-header__service flex">
                                <a className="flex" href="/" title="Accueil - Mes services GreenTech - Ministère de la transition écologique">
                                    <img className="h-12 mt-1 mr-2" src={LogoMSG} alt="Icône d'indication, version beta "/>
                                    <p className="fr-header__service-title capitalize
                                     after:rounded-sm after:content-['beta'] after:ml-2 after:relative after:bottom-1 after:w-content after:h-content after:px-1 
                                     after:text-center after:text-xs after:font-bold after:bg-beta">mes services<br/> greentech</p>
                                </a>
                            </div>
                        </div>
                            { screenWidth >= 1024 &&

                                <div className="fr-header__tools flex justify-end">
                                    <div className="">
                                        <ul className="fr-nav__list">
                                            {/* {fr-header__tools-links} */}
                                            {generateNavBar()}
                                            {generatePopOverOrLoginButton()}
                                        </ul>
                                    </div>
                                </div>
                            }
                    </div>
                </div>
            </div>

            <div className="fr-header__menu fr-modal" id="modal-833" aria-labelledby="fr-btn-menu-mobile">
                <div className="fr-container">
                    <button className="fr-link--close fr-link" aria-controls="modal-833">Fermer</button>
                    <div className="fr-header__menu-links">
                        {generateNavBar()}
                        {generatePopOverOrLoginButton()}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
import { NavLink } from 'react-router-dom';
import FillButton from './dsfrComponents/FillButton';
import { protectedRoutes, publicRoutes } from './../utils/routes';
import {LightTrash, LightStar} from './../assets/Icons';
import LogoMSG from './../assets/msg-icon.png';
import LogoMSGBeta from './../assets/icon-msg-txt-beta.png';
import AvatarPopOver from './customComponents/AvatarPopOver';
import {Route} from './../utils/routes';
interface HeaderProps {
    userIsAuth: boolean;
}

const Header = ({userIsAuth}: HeaderProps) => {

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
                                <NavLink to="/authentification">Conexion</NavLink>
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
                
                        <NavLink 
                            key={route.key}
                            to={route.path} 
                            className="fr-nav__link"
                        > 
                        
                                <div className="flex">

                                    {route.key === 'SELECTION' ?
                                    
                                        <span className="h-full my-auto mr-2">
                                            <LightStar/>
                                        </span>
                                    
                                        :
                                        <LightTrash/>                               
                                    }
                                    
                                    <div className="flex flex-col">
                                        <p className="font-bold"> {route.name} </p>
                                        <p className="text-xs"> X pistes </p>
                                    </div>

                                </div>
                        </NavLink>

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
                                    <button className="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="modal-833" aria-haspopup="menu" title="Menu" id="fr-btn-menu-mobile">
                                        Menu
                                    </button>
                                </div>
                            </div>
                            <div className="fr-header__service">
                                <a className="flex bg-gray-200" href="/" title="Accueil - Mes services GreenTech - Ministère de la transition écologique">
                                    {/* <img className="h-12 mt-1 mr-2" src={LogoMSG} alt="Icône d'indication, version beta "/> */}
                                    {/* <p className="fr-header__service-title capitalize ">mes services<br/> greentech</p> */}
                                    <img className="h-12 mt-1 mr-2" src={LogoMSGBeta} alt="Icône d'indication, version beta "/>
                                </a>
                                <p className="fr-header__service-tagline">baseline - précisions sur l‘organisation</p>
                            </div>
                        </div>
                        <div className="fr-header__tools flex justify-end">
                            <div className="">
                                <ul className="fr-nav__list">
                                    {/* {fr-header__tools-links} */}
                                    {generateNavBar()}
                                    {generatePopOverOrLoginButton()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fr-header__menu fr-modal" id="modal-833" aria-labelledby="fr-btn-menu-mobile">
                <div className="fr-container">
                    <button className="fr-link--close fr-link" aria-controls="modal-833">Fermer</button>
                    <div className="fr-header__menu-links"></div>
                </div>
            </div>
        </header>
    )
}

export default Header;
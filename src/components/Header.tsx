import { NavLink } from 'react-router-dom';
import { protectedRoutes, unProtectedRoutes } from './../utils/routes';

interface HeaderProps {
    userIsAuth: boolean;
}

const Header = ({userIsAuth}: HeaderProps) => {
    const navBar = () => {

        let routesToDisplay;
        routesToDisplay = userIsAuth ? protectedRoutes : unProtectedRoutes;

        return  routesToDisplay.map((route) => {
            
            return (
                <li key={route.key}>
                    <NavLink key={route.key} to={route.path} className={ ({ isActive }) => isActive ? "bg-amber-400" : "bg-amber-100"}>{route.name}</NavLink>
                </li>
            )
        })
    };

    return (
        <>
            <ul>
                {navBar()}
            </ul>
        </>
    )
}

export default Header;
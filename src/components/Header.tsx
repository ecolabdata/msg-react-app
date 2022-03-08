import { NavLink } from 'react-router-dom';

const Header = (userIsAuth) => {
    
    const navBar = (authenticatedRoutes) => {
        
        authenticatedRoutes.map((route, index) => {
            return (
                <NavLink key={index} to={route.path}>{route.name}</NavLink>
            )
        }
    };
    return (
        <>
            <ul>
                {navBar(authenticatedRoutes)}
            </ul>
        </>
    )
}

export default Header
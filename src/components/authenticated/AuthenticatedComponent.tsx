import { Route } from 'react-router-dom';
import { protectedRoutes } from '../../utils/routes';


const AuthenticatedComponent = () => {

    const authenticatedRoutes = () => {
        
        return protectedRoutes.map((route) => {

            return <Route path={route.path} element={route.element} />
        })
        
    };

    return (
        authenticatedRoutes()
    );
}

export default AuthenticatedComponent;
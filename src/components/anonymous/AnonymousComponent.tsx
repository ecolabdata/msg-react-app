import {Route} from 'react-router-dom';
import { unProtectedRoutes } from './../../utils/routes';

const AnonymousComponent = () => {

    const unauthenticatedRoutes = () => {
        
        return unProtectedRoutes.map((route) => {
            
            return <Route path={route.path} element={route.element} />
        })

    };

    return (

        unauthenticatedRoutes()
    );
}

export default AnonymousComponent;
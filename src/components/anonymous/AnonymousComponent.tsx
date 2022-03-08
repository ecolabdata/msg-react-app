import {Route} from 'react-router-dom';
import { unProtectedRoutes } from './../../utils/routes';
import Home from './Home';

const AnonymousComponent = () => {

    const unauthenticatedRoutes = () => {
        
        return unProtectedRoutes.map((route) => {
            console.log('route.element :>> ', route.element);
            
            return <Route path={route.path} element={<route.element/>} />
        })

    };

    return (
        <>
            {
                unauthenticatedRoutes() 
            }
        </>
    );
}

export default AnonymousComponent;
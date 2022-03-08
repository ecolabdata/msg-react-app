import {Route} from 'react-router-dom';
import { protectedRoutes } from '../../utils/routes';
import MySelection from './MySelection';
import WasteBin from './WasteBin';

const AuthenticatedComponent = () => {

    const authenticatedRoutes = () => {
        
        // protectedRoutes.map((route) => {
        //     console.log('route :>> ', route);
            
        //     return <Route key={route.key} path={route.path} element={<WasteBin/>} />
        // })
        
            return <Route key="TEST" path="/corbeille" element={<WasteBin/>} />
    };

    console.log('authenticatedRoutes() :>> ', authenticatedRoutes());

    return (
        <>
            {
                authenticatedRoutes()
            }
        </>
    );
}

export default AuthenticatedComponent;
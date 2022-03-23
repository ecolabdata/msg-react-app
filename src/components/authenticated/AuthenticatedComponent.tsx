import { Navigate, Outlet } from 'react-router-dom';
import isAuth from '../../helpers/isAuth';

const AuthenticatedComponent = () => {
    return isAuth() ? <Outlet /> : <Navigate to="/authentification"/>;
}

export default AuthenticatedComponent;
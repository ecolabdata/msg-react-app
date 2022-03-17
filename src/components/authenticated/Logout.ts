import isAuth from '../../helpers/isAuth';
const Logout = ():boolean => {
    localStorage.removeItem('user')
    return isAuth();
};

export default Logout;
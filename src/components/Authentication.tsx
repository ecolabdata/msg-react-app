


import isAuth from '../helpers/isAuth';
const Authentication = ():boolean => { 

    localStorage.setItem('user', "Constantin");
    return isAuth();
}; 

export default Authentication;
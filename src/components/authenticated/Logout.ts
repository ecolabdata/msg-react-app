const Logout = ():boolean => {
    localStorage.removeItem('user')
    return true;
};

export default Logout;
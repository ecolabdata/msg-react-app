const isAuth = () :boolean => {
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  }
  return false;
};

export default isAuth;
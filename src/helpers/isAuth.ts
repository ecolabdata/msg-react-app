const isAuth = () :boolean => {
  // const user = localStorage.getItem('user');
  const user = false;
  if (user) {
    return true;
  }
  return false;
};

export default isAuth;
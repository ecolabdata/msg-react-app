const isAuth = (): boolean => {
  // const user = localStorage.getItem('user');
  const user = true;
  if (user) {
    return true;
  }
  return false;
};

export default isAuth;

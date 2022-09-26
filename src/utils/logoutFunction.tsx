export const logoutFunction = () => {
  return localStorage.removeItem('user');
};

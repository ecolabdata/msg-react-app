import { logoutFunction } from './index';

export const  handleErrors = (error:any) => {
    const responseJSON = error.toJSON();
  
    if (responseJSON.status === 401) {
      logoutFunction();
      throw new Error('Identifiants incorrects');
    }
  
    if (responseJSON.status === 409) {
      throw new Error('Utilisateur déjà existant');
    }
    
    const serverError = (error && error.message) || error.statusText;
    throw new Error(serverError);
  }
  
import {useNavigate} from 'react-router-dom';
import isAuth from '../helpers/isAuth';

const Authentication= () => { 
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')

    };

    const login = () => {
        localStorage.setItem('user', "Grizly")
        navigate('/');
    };

    return (
        <>
            {isAuth() ? 

                logout()
                    
                :

                <>
                    <h1> Formulaire de connexion </h1>
                    <button className="bg-blue-300 rounded-md w-44 font-bold text-2xl" onClick={() => login()}>Login</button>
                </>

            }
        </>
    )
}; 

export default Authentication;
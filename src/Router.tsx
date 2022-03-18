import {Routes, Route} from 'react-router-dom';
import isAuth from './helpers/isAuth';
import Header from './components/Header'
import Footer from './components/Footer'
import AuthenticatedComponent from './components/authenticated/AuthenticatedComponent';
import Page404 from './components/anonymous/Page404';
import Home from './components/anonymous/Home';
import './App.css';
import MySelection from './components/authenticated/MySelection';
import WasteBin from './components/authenticated/WasteBin';
import Authentication from './components/Authentication';
const Router = () => {

    
    return (
        <>
            <Header userIsAuth={isAuth()}/>
            <main className="h-full p-6"> 
                <Routes>

                    <Route path="/" element={<Home/>} />
                    <Route path="/authentification" element={<Authentication/>} />
                    <Route path="/profile" element={<AuthenticatedComponent />}>
                        <Route path="ma-selection" element={<MySelection/>} />
                        <Route path="corbeille" element={<WasteBin/>} />
                    </Route>
                    <Route path="*" element={<Page404/>} />

                </Routes>
                </main>
            <Footer/>
        </>
    
    );
};

export default Router;
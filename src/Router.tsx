import {BrowserRouter, Routes, Route} from 'react-router-dom';
import isAuth from './helpers/isAuth';
import Header from './components/Header'
import Page404 from './components/anonymous/Page404';
import AuthenticatedComponent from './components/authenticated/AuthenticatedComponent';
import AnonymousComponent from './components/anonymous/AnonymousComponent';
import './App.css';
const Router = () => {

    return (

        <BrowserRouter>
        
            <Header userIsAuth={isAuth()}/>
            <main>
                <Routes>
                    {isAuth() ? AuthenticatedComponent() : AnonymousComponent()}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </main>

        </BrowserRouter>

    );
};

export default Router;


import {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import isAuth from './helpers/isAuth';
import Header from './components/Header'
import Footer from './components/Footer'
import AuthenticatedComponent from './components/authenticated/AuthenticatedComponent';
import AnonymousComponent from './components/anonymous/AnonymousComponent';
import Page404 from './components/anonymous/Page404';
import Home from './components/anonymous/Home';
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { appActions } from './_actions/app.actions';
import './App.css';

const Router = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(appActions.storeNavigateHook(navigate));
    })
    
    return (
            <>
                <Header userIsAuth={isAuth()}/>
                <main className="h-full p-6">
                    <Routes>

                        {isAuth() ? AuthenticatedComponent() : AnonymousComponent()}
                        
                        <Route path="*" element={<Home/>} />

                    </Routes>
                    </main>
                <Footer/>
            </>
    
    );
};

export default Router;
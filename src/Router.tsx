import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import isAuth from './helpers/isAuth';
import Header from './components/Header'
import Footer from './components/Footer'
import AuthenticatedComponent from './components/authenticated/AuthenticatedComponent';
import Page404 from './components/anonymous/Page404';
import HomePage from './components/anonymous/HomePage';
import './App.css';
import MySelectionPage from './components/authenticated/MySelectionPage';
import WasteBinPage from './components/authenticated/WasteBinPage';
import Authentication from './components/Authentication';
import ResearchForm from './components/anonymous/ResearchFormPage';
import { TrackPage } from './hooks/useTrackPage';
import ListResearchResult from './components/anonymous/ListResearchResultPage';
import { investisseur } from './model/CardType';
import CardDetails from './components/customComponents/CardDetails';


const Router = () => {
    localStorage.setItem('scheme', 'dark');
    useEffect( () => {

    },[localStorage.scheme])

    return (
        <>
            <Header userIsAuth={isAuth()} />
            <main className={`h-full p-6 
                ${localStorage.scheme === 'dark' ? 'bg-[#262626]' :''}`}>
                <Routes>
                    <Route path="/" element={<TrackPage />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/formulaire-recherche-de-solutions" element={<ResearchForm />} />
                        <Route path="/recherche/:searchId" element={<ResearchForm />} />
                        <Route path="/investisseurs/:searchId" element={<ListResearchResult cardType={investisseur} />} />
                        <Route path="/exemple-details-card" element={<CardDetails/>} />
                        <Route path="/authentification" element={<Authentication />} />
                        <Route path="/profile" element={<AuthenticatedComponent />}>
                            <Route path="ma-selection" element={<MySelectionPage />} />
                            <Route path="corbeille" element={<WasteBinPage />} />
                        </Route>
                        <Route path="*" element={<Page404 /> } />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>

    );
};

export default Router;
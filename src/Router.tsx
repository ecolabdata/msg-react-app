import { createContext, useEffect } from 'react';
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
import { all as allCardType } from './model/CardType';
import CardDetailsJson from './components/customComponents/CardDetailsJson';
import { defaultUsedCorbeille, defaultUsedFavoris, useCorbeille, UsedCorbeille, UsedFavoris, useFavoris } from './utils/categoris';
import CardDetails from './components/customComponents/CardDetails';

export const ApplicationContext = createContext<{
    usedFavoris: UsedFavoris,
    usedCorbeille: UsedCorbeille}
>({usedFavoris: defaultUsedFavoris, usedCorbeille: defaultUsedCorbeille})

const Router = () => {
    localStorage.setItem('scheme', 'dark');
    useEffect(() => {

    }, [localStorage.scheme])
    const usedFavoris = useFavoris()
    const usedCorbeille = useCorbeille()

    return (
        <>
        <ApplicationContext.Provider value={{usedFavoris, usedCorbeille}}>
            <Header userIsAuth={isAuth()} />
            <main className={`h-full p-6 
                ${localStorage.scheme === 'dark' ? 'bg-[#262626]' : ''}`}>  
                <Routes>
                    <Route path="/" element={<TrackPage />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/formulaire-recherche-de-solutions" element={<ResearchForm />} />
                        <Route path="/recherche" element={<ResearchForm />} />
                        <Route path="/recherche/:searchId" element={<ResearchForm />} />
                        <Route path="/:cardType/:searchId/:cardId/details" element={<CardDetailsJson />} />
                        <Route path="/:cardType/:cardId/details" element={<CardDetailsJson />} />
                        <Route path="/exemple/details" element={<CardDetails/>} />
                        {allCardType.map(cardType => <>
                            <Route path={`${cardType.searchLink}/:searchId`} element={<ListResearchResult cardType={cardType} />}/>
                            <Route path={`${cardType.searchLink}/:searchId/:page`} element={<ListResearchResult cardType={cardType} />} />
                        </>)}
                        {/* <Route path="/investisseur/:cardId/details" element={<CardDetailsInvestisseur />} /> */}
                        <Route path="/authentification" element={<Authentication />} />
                        <Route path="/profile" element={<AuthenticatedComponent />}>
                            <Route path="ma-selection" element={<MySelectionPage />} />
                            <Route path="corbeille" element={<WasteBinPage />} />
                        </Route>
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
            </ApplicationContext.Provider>
        </>

    );
};

export default Router;
import { Routes, Route } from 'react-router-dom';
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


const Router = () => {


    return (
        <>
            <Header userIsAuth={isAuth()} />
            <main className="h-full p-6">
                <Routes>

                    <Route path="/" element={<HomePage/>} />
                    <Route path="/formulaire-recherche-de-solutions" element={<ResearchForm/>} />
                    <Route path="/liste-resultats" element={<ListResearchResult investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds."/>} />
                    <Route path="/authentification" element={<Authentication/>} />
                    <Route path="/profile" element={<AuthenticatedComponent />}>
                        <Route path="ma-selection" element={<MySelectionPage/>} />
                        <Route path="corbeille" element={<WasteBinPage/>} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>

    );
};

export default Router;
import { Routes, Route } from 'react-router-dom';
import isAuth from './helpers/isAuth';
import Header from './components/Header'
import Footer from './components/Footer'
import AuthenticatedComponent from './components/authenticated/AuthenticatedComponent';
import Page404 from './components/anonymous/Page404';
import Home from './components/anonymous/HomePage';
import './App.css';
import MySelection from './components/authenticated/MySelectionPage';
import WasteBin from './components/authenticated/WasteBinPage';
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
                    <Route path="/" element={<TrackPage />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/recherche" element={<ResearchForm />} />
                        <Route path="/recherche/:searchId" element={<ResearchForm />} />
                        <Route path="/recherche/:searchId/investisseurs/" element={<ListResearchResult investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." />} />
                        <Route path="/recherche/:searchId/investisseurs/:preciseSearchId" element={<ListResearchResult investor="Investisseurs privés" numberOfResultsFound={18} investorPrecisions="Investisseurs privés adaptés à votre maturité pour votre prochaine levée de fonds." />} />
                        <Route path="/authentification" element={<Authentication />} />
                        <Route path="/profile" element={<AuthenticatedComponent />}>
                            <Route path="ma-selection" element={<MySelection />} />
                            <Route path="corbeille" element={<WasteBin />} />
                        </Route>
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </>

    );
};

export default Router;
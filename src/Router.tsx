import { Routes, Route } from 'react-router-dom';
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
import ResearchForm from './components/anonymous/ResearchForm';
import { TrackPage } from './hooks/useTrackPage';
const Router = () => {


    return (
        <>
            <Header userIsAuth={isAuth()} />
            <main className="h-full p-6">
                <Routes>
                    <Route path="/" element={<TrackPage />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/formulaire-recherche-de-solutions" element={<ResearchForm />} />
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
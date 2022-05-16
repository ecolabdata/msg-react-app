import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import { useTrackPage } from './hooks/useTrackPage';
import ListResearchResult from './components/anonymous/ListResearchResultPage';
import { all as allCardType } from './model/CardType';
import CardDetailsJson from './components/customComponents/CardDetailsJson';
import { defaultUsedCorbeille, defaultUsedFavoris, useCorbeille, UsedCorbeille, UsedFavoris, useFavoris } from './utils/categoris';
import CardDetails from './components/customComponents/CardDetails';
import { DonnezVotreAvis } from './components/customComponents/DonnezVotreAvis';
import mockApiResponse from './api/mock_api_resp.json';
import {CardDetailsInno, CardDetailsClient} from './components/customComponents/DetailsAide';


export const ApplicationContext = createContext<{
    usedFavoris: UsedFavoris,
    usedCorbeille: UsedCorbeille,
    usedNextScrollTarget: [ScrollToOptions | null, Dispatch<SetStateAction<ScrollToOptions | null>>]
}
>({ usedFavoris: defaultUsedFavoris, usedCorbeille: defaultUsedCorbeille, usedNextScrollTarget: [null, () => null] })

const Router = () => {
    localStorage.setItem('scheme', 'dark');
    useEffect(() => {   

    }, [localStorage.scheme])
    const usedFavoris = useFavoris()
    const usedCorbeille = useCorbeille()
    const usedNextScrollTarget = useState<ScrollToOptions | null>(null)
    const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget
    useEffect(() => {
        if (nextScrollTarget) {
            window.scrollTo(nextScrollTarget)
            setNextScrolTarget(null)
        }
    }, [usedNextScrollTarget]);
    useTrackPage();
    return (
        <>
            <ApplicationContext.Provider value={{ usedFavoris, usedCorbeille, usedNextScrollTarget }}>
                <DonnezVotreAvis />
                <Routes>
                    <Route path="/" element={<Header userIsAuth={isAuth()} decouvrir={true}/>} />
                    <Route path="*" element={<Header userIsAuth={isAuth()} />} />
                </Routes>
                <main className={`h-full p-6 
                ${localStorage.scheme === 'dark' ? 'bg-[#262626]' : ''}`}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/explorer" element={<ResearchForm alpha={false} />} />
                        <Route path="/explorer-alpha" element={<ResearchForm alpha={true}/>} />
                        <Route path="/exemple/details" element={<CardDetails />} />
                        {allCardType.map((cardType => <>
                            <Route path={cardType.searchLink} element={
                                cardType.SearchPage ? <cardType.SearchPage /> : <ListResearchResult cardType={cardType}/>
                            }/>
                            <Route path={`/${cardType.name}/details`} element={
                                cardType.DetailsPage ? <cardType.DetailsPage /> : <CardDetailsJson cardType={cardType}/>
                            }/>
                        </>))}
                        <Route path="/authentification" element={<Authentication />} />
                        <Route path="/profile" element={<AuthenticatedComponent />}>
                            <Route path="ma-selection" element={<MySelectionPage />} />
                            <Route path="corbeille" element={<WasteBinPage />} />
                        </Route>
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
                <Footer />
            </ApplicationContext.Provider>
        </>

    );
};

export default Router;
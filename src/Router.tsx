import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/page/HomePage';
import Page404 from './components/page/Page404';
import ExplorePage from './components/page/ExplorePage';
import MySelectionPage from './components/page/MySelectionPage';
import WasteBinPage from './components/page/WasteBinPage';
import { AuthentificationRequired } from './components/AuthentificationRequired';
import CardDetailsJson from './components/customComponents/CardDetailsJson';
import Footer from './components/Footer';
import Header from './components/Header';
import { useTrackPage } from './hooks/useTrackPage';
import { JwtAuthProvider } from './jwt';
import { all as allCardType } from './model/CardType';
import { defaultUsedCorbeille, defaultUsedFavoris, useCorbeille, UsedCorbeille, UsedFavoris, useFavoris } from './utils/categoris';
import BreadCumb from './components/dsfrComponents/BreadCumb';

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

    const TrackPage = () => {
        useTrackPage();
        return <></>
    }

    const Authentified = () => <>
        <Routes>
            <Route path="/" element={<Header decouvrir={true} />} />
            <Route path="*" element={<Header />} />
        </Routes>
        <main className={`h-full p-1 md:p-6 ${localStorage.scheme === 'dark' && 'bg-[#262626]'}`}>
            {/* <BreadCumb /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorer" element={<ExplorePage alpha={false} />} />
                <Route path="/explorer/search" element={<ExplorePage alpha={false} />} />
                <Route path="/explorer-alpha" element={<ExplorePage alpha={true} />} />

                {allCardType.map((cardType => <>
                    <Route path={cardType.searchLink} element={<cardType.SearchPage />} />
                    <Route path={cardType.searchLink + "/search"} element={<cardType.SearchPage />} />
                    <Route path={`/${cardType.name}/details/:slug`} element={
                        cardType.DetailsPage ? <cardType.DetailsPage /> : <CardDetailsJson cardType={cardType} />
                    } />
                </>))}
                <Route path="/profile">
                    <Route path="ma-selection" element={<MySelectionPage />} />
                    <Route path="corbeille" element={<WasteBinPage />} />
                </Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
        </main>
        <Footer />
    </>

    return (
        <>
            <ApplicationContext.Provider value={{ usedFavoris, usedCorbeille, usedNextScrollTarget }}>
                <JwtAuthProvider>
                    <TrackPage />
                    <Routes>
                        <Route path="*" element={<AuthentificationRequired />}>
                            <Route path="*" element={<Authentified />} />
                        </Route>
                    </Routes>
                </JwtAuthProvider>
            </ApplicationContext.Provider>
        </>

    );
};

export default Router;
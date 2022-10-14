import { Route, Routes } from 'react-router-dom';
import DetailsJson from '../components/customComponents/DetailsJson';
import BreadCumb from '../components/dsfrComponents/BreadCumb';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AccessibilityPage from '../components/page/AccessibilityPage';
import CookiePage from '../components/page/CookiePage';
import { ExplorePagePublicActor, ExplorePageStartUp } from '../components/page/ExplorePage';
import GdprPage from '../components/page/GdprPage';
import HomePagePublicActor from '../components/page/HomePagePublicActor';
import HomePageStartup from '../components/page/HomePageStartup';
import LegalNotices from '../components/page/LegalNoticesPage';
import MySelectionPage from '../components/page/MySelectionPage';
import Page404 from '../components/page/Page404';
import Sitemap from '../components/page/Sitemap';
import WasteBinPage from '../components/page/WasteBinPage';

import { all as allCardType } from './CardType';

export const routes = (
  <>
    <Routes>
      <Route path="*" element={<Header />} />
    </Routes>
    <main className={`h-full p-1 md:p-6 ${localStorage.scheme === 'dark' && 'bg-[#262626]'}`}>
      <BreadCumb />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<HomePageStartup />} />
          <Route path="/startup" element={<HomePageStartup />} />
          <Route path="/acteurs-publics" element={<HomePagePublicActor />} />
          <Route path="/startup/explorer" element={<ExplorePageStartUp alpha={false} />} />
          <Route path="/startup/explorer/search" element={<ExplorePageStartUp alpha={false} />} />
          <Route
            path="/acteurs-publics/explorer"
            element={<ExplorePagePublicActor alpha={false} />}
          />
          <Route
            path="/acteurs-publics/explorer/search"
            element={<ExplorePagePublicActor alpha={false} />}
          />
          {/* <Route path="/explorer-alpha" element={<ExplorePage alpha={true} />} /> */}

          {allCardType.map((cardType) => (
            <>
              <Route path={cardType.searchLink} element={<cardType.SearchPage />} />
              <Route path={cardType.searchLink + '/search'} element={<cardType.SearchPage />} />
              <Route
                path={`/${cardType.name}/details/:slug`}
                element={
                  cardType.DetailsPage ? (
                    <cardType.DetailsPage />
                  ) : (
                    <DetailsJson cardType={cardType} />
                  )
                }
              />
            </>
          ))}
          <Route path="/profile">
            <Route path="ma-selection" element={<MySelectionPage />} />
            <Route path="corbeille" element={<WasteBinPage />} />
          </Route>
          <Route path="/legal">
            <Route path="legal-notices" element={<LegalNotices />} />
            <Route path="cookies" element={<CookiePage />} />
            <Route path="gdpr" element={<GdprPage />} />
            <Route path="accessibility" element={<AccessibilityPage />} />
          </Route>
          <Route path="/plan-du-site" element={<Sitemap />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </main>
    <Footer />
  </>
);

export default routes;

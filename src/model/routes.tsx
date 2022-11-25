import { Route, Routes } from 'react-router-dom';
import BreadCumb from '../components/dsfrComponents/BreadCumb';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AccessibilityPage from '../components/page/AccessibilityPage';
import CookiePage from '../components/page/CookiePage';
import { SearchPage } from '../components/page/SearchPage';
import { Details } from '../components/page/DetailsPage';
import GdprPage from '../components/page/GdprPage';
import Home from '../components/page/Home';
import HomeByProfile from '../components/page/HomeByProfile';
import LegalNotices from '../components/page/LegalNoticesPage';
import Page404 from '../components/page/Page404';
import Sitemap from '../components/page/Sitemap';
import { all as allCardType } from './CardType';

export const routes = (
  <>
    <Routes>
      <Route path="*" element={<Header />} />
    </Routes>
    <div className="bg-gey-50 text-white">
      <BreadCumb />
    </div>
    <main
      className={`h-full p-1 md:pb-6 ${localStorage.scheme === 'dark' && 'bg-grey-50 text-white'}`}>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/startup" element={<HomeByProfile profile="startup" />} />
          <Route path="/acteurs-publics" element={<HomeByProfile profile="publicActor" />} />
          {allCardType
            .filter((cardType) =>
              ['acheteurs-publics', 'startups', 'achats-previsionnels'].includes(cardType.name)
            )
            .map((cardType) => (
              <>
                <Route path={cardType.searchLink} element={<SearchPage cardType={cardType} />} />
                <Route
                  path={cardType.searchLink + '/search'}
                  element={<SearchPage cardType={cardType} />}
                />
                <Route path={`/${cardType.name}/details/:id`} element={<Details />} />
              </>
            ))}
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

import { Route, Routes } from 'react-router-dom';
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

import PageLayout from '../components/page/PageLayout';
import TestApiV2 from '../components/TestApiV2';

export const routes = (
  <Routes>
    <Route element={<PageLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/test-apiv2" element={<TestApiV2/>} />
      <Route path="/startup" element={<HomeByProfile profile="startup" />} />
      <Route path="/acteurs-publics" element={<HomeByProfile profile="publicActor" />} />
      {allCardType.map((cardType) => (
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
    </Route>
  </Routes>
);

export default routes;

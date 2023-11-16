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
import {
  achatPrevi,
  acheteurPublic,
  aideClient,
  aideFin,
  aideInno,
  all as allCardType,
  CardType,
  investisseur,
  retex,
  sourcingSu,
  startups,
  achatProg
} from './CardType';

import PageLayout from '../components/page/PageLayout';
import TestApiV2 from '../components/TestApiV2';
import React from 'react';
import SingleSearchPage from 'components/page/SingleSearchFormPage';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';

function buildSearchRoute(cardType: CardType): React.ReactFragment {
  return (
    <>
      <Route
        path={cardType.name}
        element={
          <SearchPage usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType} />
        }
      />
    </>
  );
}

export const routes = (
  <Routes>
    <Route element={<PageLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/test-apiv2" element={<TestApiV2 />} />
      <Route path="/startupOld" element={<HomeByProfile profile="startup" />} />
      <Route path="/acteurs-publicsOld" element={<HomeByProfile profile="publicActor" />} />
      <Route path="/startup" element={<SingleSearchPage profile="startup" />} />
      <Route path="/acteurs-publics" element={<SingleSearchPage profile="publicActor" />} />
      {buildSearchRoute(aideClient)}
      {buildSearchRoute(aideInno)}
      {buildSearchRoute(aideFin)}
      {buildSearchRoute(investisseur)}
      {buildSearchRoute(startups)}
      {buildSearchRoute(sourcingSu)}
      {buildSearchRoute(acheteurPublic)}
      {buildSearchRoute(retex)}
      {buildSearchRoute(achatPrevi)}
      {buildSearchRoute(achatProg)}
      {allCardType.map((cardType, i) => (
        <Route
          key={i}
          path={`/${cardType.name}/details/:id`}
          element={<Details cardType={cardType} />}
        />
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

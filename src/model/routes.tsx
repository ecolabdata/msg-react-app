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
import { AideSearchPage } from 'components/page/search/AidesSearchPage';
import { InvestisseurSearchPage } from 'components/page/search/InvestisseurSearchPage';
import { StartupSearchPage } from 'components/page/search/StartupSearchPage';
import { ProjetAchatSearchPage } from 'components/page/search/ProjetAchatSearchPage';
import { ActeurPublicSearchPage } from 'components/page/search/ActeurPublicSearchPage';
import React from 'react';

function buildSearchRoute(cardType : CardType, Elem : React.FC<{cardType:CardType}>) : React.ReactFragment {
  return <>
      <Route path={cardType.searchLink} element={<Elem cardType={cardType} />} />
      <Route path={cardType.searchLink + '/search'} element={<Elem cardType={cardType} />} />
  </>
}

export const routes = (
  <Routes>
    <Route element={<PageLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/test-apiv2" element={<TestApiV2 />} />
      <Route path="/startup" element={<HomeByProfile profile="startup" />} />
      <Route path="/acteurs-publics" element={<HomeByProfile profile="publicActor" />} />
      {buildSearchRoute(aideClient, AideSearchPage)}
      {buildSearchRoute(aideInno, AideSearchPage)}
      {buildSearchRoute(aideFin, AideSearchPage)}
      {buildSearchRoute(investisseur, InvestisseurSearchPage)}
      {buildSearchRoute(startups, StartupSearchPage)}
      {buildSearchRoute(sourcingSu, StartupSearchPage)}
      {buildSearchRoute(acheteurPublic, ActeurPublicSearchPage)}
      {buildSearchRoute(retex, ActeurPublicSearchPage)}
      {buildSearchRoute(achatPrevi, ProjetAchatSearchPage)}
      {buildSearchRoute(achatProg, ProjetAchatSearchPage)}
      {/* <Route path={aideClient.searchLink} element={<AideSearchPage cardType={aideClient} />} />
      <Route path={aideClient.searchLink + '/search'} element={<AideSearchPage cardType={aideClient} />} />
      <Route path={aideClient.searchLink} element={<AideSearchPage  />} />
      <Route path={aideClient.searchLink + '/search'} element={<AideSearchPage />} />
      <Route path={aideInno.searchLink} element={<AideInnoSearchPage />} />
      <Route path={aideInno.searchLink + '/search'} element={<AideInnoSearchPage />} />
      <Route path={investisseur.searchLink} element={<InvestisseurSearchPage />} />
      <Route path={investisseur.searchLink + '/search'} element={<InvestisseurSearchPage />} />
      <Route path={startups.searchLink} element={<StartupSearchPage />} />
      <Route path={startups.searchLink + '/search'} element={<StartupSearchPage />} />
      <Route path={achatPrevi.searchLink} element={<ProjetAchatSearchPage />} />
      <Route path={achatPrevi.searchLink + '/search'} element={<ProjetAchatSearchPage />} />
      <Route path={acheteurPublic.searchLink} element={<ActeurPublicSearchPage />} />
      <Route path={acheteurPublic.searchLink + '/search'} element={<ActeurPublicSearchPage />} /> */}
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

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccessibilityPage from '../components/page/AccessibilityPage';
import CookiePage from '../components/page/CookiePage';
import GdprPage from '../components/page/GdprPage';
import Home from '../components/page/Home';
import LegalNotices from '../components/page/LegalNoticesPage';
import Page404 from '../components/page/Page404';
import Sitemap from '../components/page/Sitemap';
import { publicActorPersona, startupPersona } from './CardType';

import PageLayout from '../components/page/PageLayout';
import SingleSearchPage from 'components/page/SingleSearchFormPage';
import { Ressources } from 'components/page/Ressources';
import { SearchPage } from 'components/page/SearchPage';
import { DetailsPage } from 'components/page/DetailsPage';

export const routes = (
  <Routes>
    <Route element={<PageLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/entreprises" element={<SingleSearchPage profile="startup" />} />
      <Route path="/ressources-entreprises" element={<Ressources profile="startup" />} />
      <Route path="/ressources-acteurs-publics" element={<Ressources profile="publicActor" />} />
      <Route path="/acteurs-publics" element={<SingleSearchPage profile="publicActor" />} />
      {publicActorPersona.map((cardType, i) => (
        <React.Fragment key={i + cardType.name}>
          <Route
            path={`/acteurs-publics/${cardType.name}/:id`}
            element={<DetailsPage cardType={cardType} />}
          />
          <Route
            path={`/acteurs-publics/${cardType.name}`}
            element={<SearchPage cardType={cardType} />}
          />
        </React.Fragment>
      ))}
      {startupPersona.map((cardType, i) => (
        <React.Fragment key={i + cardType.name}>
          <Route
            path={`/entreprises/${cardType.name}/:id`}
            element={<DetailsPage cardType={cardType} />}
          />
          <Route
            path={`/entreprises/${cardType.name}`}
            element={<SearchPage cardType={cardType} />}
          />
        </React.Fragment>
      ))}

      <Route path="mentions-legales" element={<LegalNotices />} />
      <Route path="cookies" element={<CookiePage />} />
      <Route path="donnees-personnelles" element={<GdprPage />} />
      <Route path="accessibilite" element={<AccessibilityPage />} />
      <Route path="/plan-du-site" element={<Sitemap />} />
    </Route>

    <Route path="*" element={<Page404 />} />
  </Routes>
);

export default routes;

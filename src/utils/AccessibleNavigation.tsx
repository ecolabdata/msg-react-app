import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ScreenReaderOnlyText from '../components/Core/ScreenReaderOnlyText';

function AccessibleNavigation() {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const previousPathname = useRef(location.pathname);

  const pagesTitle: any = {
    'startup/aides-innovations': 'Aides à l’innovation',
    'startup/aides-clients': 'Aides pour vos clients',
    startup: 'Accueil startups',
    'acteurs-publics': 'Accueil acheteur public',
    startups: 'Start-up greentech',
    'startup/achats-publics-a-venir': 'Achats publics à venir',
    'startup/investisseurs': 'Investisseurs',
    'startup/acheteurs-publics': 'Ils ont travaillé avec des start-up',
    'acteurs-publics/acheteurs-publics': 'Ils ont travaillé avec des start-up',
    'acteurs-publics/aides-financieres': 'Aides financières',
    'acteurs-publics/sourcing-startup': 'Entreprises éco-innovantes',
    'acteurs-publics/achats-publics-a-venir': 'Achats publics à venir',
    'mentions-legales': 'Mentions Légales',
    cookies: 'Gestion des cookies',
    'donnees-personnelles': 'Données personnelles',
    accessibilite: 'Accessibilité',
    'plan-du-site': 'Plan du site'
  };
  useEffect(() => {
    const slug = location.pathname.slice(1);

    const pathnameChanged = previousPathname.current !== location.pathname;
    if (pathnameChanged) {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      previousPathname.current = location.pathname;
    }

    if (slug) {
      setMessage(`Navigation vers la page ${pagesTitle[slug] || slug}.`);
      document.title = `${pagesTitle[slug] || slug} - Mes Services Greentech`;
    } else {
      setMessage(`Navigation vers la page d'accueil`);
      document.title = `Accueil - Mes Services Greentech`;
    }

    const title = document.getElementsByTagName('h1')[0];
    setTimeout(() => {
      if (title) {
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
      }
    }, 100);
  }, [location.pathname, location.search]);

  return (
    <>
      <ScreenReaderOnlyText content={message} aria-live="polite" aria-atomic="true" />
    </>
  );
}

export default AccessibleNavigation;

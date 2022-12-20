import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScreenReaderOnlyText from '../components/Core/ScreenReaderOnlyText';

function AccessibleNavigation() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  const pagesTitle: any = {
    'aides-innovations': 'Aides à l’innovation',
    'aides-clients': 'Aides pour vos clients',
    startup: 'Accueil startups',
    'acteurs-publics': 'Accueil acheteur public',
    startups: 'Start-up greentech',
    'achats-previsionnels': 'Achats publics à venir',
    investisseurs: 'Investisseurs',
    'acheteurs-publics': 'Ils ont travaillé avec des start-up',
    'aides-financieres': 'Aides financières',
    'sourcing-startup': 'Entreprises éco-innovantes',
    'retour-experience': 'Ils ont travaillé avec des start-up',
    'achats-programmes': 'Achats publics programmés',
    'legal/legal-notices': 'Mentions Légales',
    'legal/cookies': 'Gestion des cookies',
    'legal/gdpr': 'Données personnelles',
    accessibility: 'Accessibilité',
    'plan-du-site': 'Plan du site'
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const slug = location.pathname.slice(1);

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
        title.focus();
      }
    }, 500);
  }, [location]);

  return (
    <>
      <ScreenReaderOnlyText content={message} aria-live="polite" aria-atomic="true" />
    </>
  );
}

export default AccessibleNavigation;

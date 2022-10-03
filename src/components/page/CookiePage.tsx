import React from 'react';

type CookieType = 'matomo' | 'facebook' | 'twitter' | 'linkedIn';

export const CookiePage = () => {
  const [cookies, setCookies] = React.useState({
    matomo: false,
    facebook: false,
    twitter: false,
    linkedIn: false
  });
  const isAllSelected = Object.values(cookies).every((c) => !!c);

  const handleClick = () => {
    if (isAllSelected) {
      setCookies({
        matomo: false,
        facebook: false,
        twitter: false,
        linkedIn: false
      });
    } else {
      setCookies({
        matomo: true,
        facebook: true,
        twitter: true,
        linkedIn: true
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setCookies((previousCookies) => {
        return { ...previousCookies, [e.target.name]: !cookies[e.target.name as CookieType] };
      });
    }
  };

  return (
    <div className="mx-8 w-4/5">
      <h1 className="my-4 font-bold text-3xl">Gestion des cookies</h1>
      <p>
        Des cookies sont utilisés sur ce site afin d'en mesurer la fréquentation pour en améliorer
        le fonctionnement et, avec votre accord, pour évaluer la performance des campagnes de
        communication ainsi que pour proposer des contenus tiers (vidéos, réseaux sociaux...) pour
        améliorer votre expérience utilisateur. Nous conservons votre choix pendant 6 mois. Vous
        pouvez changer ce choix à tout moment en cliquant sur le lien en bas du site "Gestion des
        cookies".
      </p>
      <button onClick={handleClick} className="fr-btn fr-btn--lg fr-btn--primary capitalize my-4">
        Autoriser tous les cookies
      </button>
      <h2 className="my-4 font-bold text-2xl">Cookies obligatoires</h2>
      <p>
        Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être
        désactivés.
      </p>
      <h2 className="my-4 font-bold text-2xl">Mesure d’audience</h2>
      <div>
        <label>
          <input type="checkbox" checked={cookies.matomo} onChange={handleChange} name="matomo" />
          Autoriser Matomo:
        </label>
        <a href="https://fr.matomo.org/">Matomo</a>
      </div>
      <h2 className="my-4 font-bold text-2xl">Réseaux sociaux</h2>
      <div>
        <label>
          <input type="checkbox" checked={cookies.twitter} onChange={handleChange} name="twitter" />
          Autoriser Twitter:
        </label>
        <a href="https://twitter.com/">Twitter</a>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={cookies.linkedIn}
            onChange={handleChange}
            name="linkedIn"
          />
          Autoriser LinkedIn:
        </label>
        <a href="https://www.linkedin.com/">LinkedIn</a>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={cookies.facebook}
            onChange={handleChange}
            name="facebook"
          />
          Autoriser Facebook:
        </label>
        <a href="https://www.facebook.com/">Facebook</a>
      </div>
    </div>
  );
};

export default CookiePage;

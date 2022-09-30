import React from 'react';

export const CookiePage = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  // https://www.npmjs.com/package/react-cookie
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
      <label>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        Autoriser tous les cookies
      </label>
      <h2 className="my-4 font-bold text-2xl">Cookies obligatoires</h2>
      <p>
        Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être
        désactivés.
      </p>
      <h2 className="my-4 font-bold text-2xl">Mesure d’audience</h2>
      <div>
        <a href="#">Matomo</a>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Autoriser Matomo
        </label>
      </div>
      <h2 className="my-4 font-bold text-2xl">Réseaux sociaux</h2>
      <div>
        <a href="#">Twitter</a>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Autoriser Twitter
        </label>
      </div>
      <div>
        <a href="#">LinkedIn</a>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Autoriser LinkedIn
        </label>
      </div>
      <div>
        <a href="#">Facebook</a>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Autoriser Facebook
        </label>
      </div>
    </div>
  );
};

export default CookiePage;

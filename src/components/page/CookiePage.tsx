import React from 'react';
import ToggleButton from '../dsfrComponents/ToggleButton';

export const CookiePage = () => {
  const [areCookiesEnabled, setAreCookiesEnabled] = React.useState(true);
  const handleClick = () => {
    setAreCookiesEnabled(!areCookiesEnabled);
  };

  return (
    <div className="mx-8 w-4/5">
      <h1 className="mt-8 mb-16 text-center justify-center items-center font-bold text-4xl">
        Gestion des cookies
      </h1>
      <div className="mt-4 mb-8 pb-8 border-b border-bg-light-50 pr-8 xl:pr-64">
        <p>
          Des cookies sont utilisés sur ce site afin d'en mesurer la fréquentation pour en améliorer
          le fonctionnement et, avec votre accord, pour évaluer la performance des campagnes de
          communication ainsi que pour proposer des contenus tiers (vidéos, réseaux sociaux...) pour
          améliorer votre expérience utilisateur. Nous conservons votre choix pendant 6 mois. Vous
          pouvez changer ce choix à tout moment en cliquant sur le lien en bas du site "Gestion des
          cookies".
        </p>
        <ToggleButton
          label={'Autoriser tous les cookies'}
          checked={areCookiesEnabled}
          color={'#8585F6'}
          onChange={handleClick}
        />
      </div>
      <div className="mt-4 mb-8 pb-8 border-b border-bg-light-50 pr-8 lg:pr-96">
        <h2 className="my-4 font-bold text-2xl">Cookies obligatoires</h2>
        <p>
          Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être
          désactivés.
        </p>
      </div>
    </div>
  );
};

export default CookiePage;

import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { JwtState, useJwtState } from '../../utils/jwt';
import ExternalLink from '../Core/ExternalLink';
import MsgLogo from '../customComponents/MsgLogo';

const template = (bigTitle: string, smallTitle: string) => (
  <div className="flex flex-col items-center justify-center w-[800px]">
    <div className="fr-header__brand fr-enlarge-link">
      <div className="fr-header__service flex items-center">
        <MsgLogo />
      </div>
    </div>
    <h1 className="fr-h3 mt-8 text-center font-thin">{bigTitle}</h1>
    <p>{smallTitle}</p>

    <ExternalLink
      href="https://airtable.com/shrBDPDWDKVqRnHhf"
      content="Je demande un accès"
      className="
                fr-btn fr-btn--primary mt-8
                hover:bg-claire-bf__hover flex justify-between"
    />
  </div>
);

const messages: Record<JwtState['name'], ReactElement | null> = {
  notoken: template(
    'La plateforme Mes Services Greentech est pour l’instant disponible en accès limité.',
    'Contactez-nous et recevez un accès anticipé !'
  ),
  badtoken: template(
    'Le lien magique dont vous disposez est faux ou expiré.',
    'Contactez-nous pour recevoir un nouvel accès !'
  ),
  checking: <></>,
  valid: null
};

export const AuthRequiredWall = () => {
  const jwtState = useJwtState();
  if (jwtState?.name === 'valid') {
    return <Outlet />;
  } else {
    const message = jwtState ? messages[jwtState.name] : messages['notoken'];
    return (
      <>
        <div
          className="
                    h-[100vh] p-2
                    flex items-center justify-center">
          {message}
        </div>
      </>
    );
  }
};

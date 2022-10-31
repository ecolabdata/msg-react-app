import { useState } from 'react';
import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup } from '../../../api/Api';

interface ContactAreaProps {
  card: AnyCard;
  className?: string;
}

const ContactArea: React.FC<ContactAreaProps> = ({ card, className }) => {
  const { title, content, cta, link } = normalizeContactInformations(card);
  const [showContact, setShowContact] = useState(false);

  return (
    <section className={`flex flex-col ${className}`}>
      <h2 className="text-2xl mb-4">{title}</h2>
      <p>{content}</p>
      {cta?.contact ? (
        <>
          {!showContact && (
            <button
              onClick={() => setShowContact(true)}
              className="fr-btn fr-btn--primary w-fit px-4 h-3 py-2 hover:bg-claire-bf__hover mt-6  "
            >
              {cta?.label}
            </button>
          )}
          {showContact && (
            <div className="flex flex-col px-8 my-4">
              {Object.entries(cta.contact).map(([k, v]) => (
                <p key={k}>{v}</p>
              ))}
            </div>
          )}
        </>
      ) : (
        <a
          href={cta?.url}
          className="fr-btn fr-btn--primary w-fit px-4 h-3 py-2 hover:bg-claire-bf__hover mt-6  "
          target="_blank"
          rel="noreferrer"
        >
          {cta?.label}
        </a>
      )}
      {link && (
        <a className="fr-link rm-link-underline mt-2" target="_blank" href={link} rel="noreferrer">
          Voir le site internet
        </a>
      )}
    </section>
  );
};

export default ContactArea;

const normalizeContactInformations = (card: AnyCard) => {
  if (isAcheteurPublic(card)) {
    return {
      title: 'Contact',
      content:
        'Certains contacts de services publics sont présents sur lannuaire.service-public.fr',
      cta: {
        label: "Accèder à l'annuaire",
        url: '#'
      }
    };
  }
  if (isStartup(card)) {
    return {
      title: 'Contact et détails',
      content: card['Start-up'],
      cta: {
        label: 'Voir le contact',
        icon: 'mail',
        contact: {
          mail: card.Mail,
          linkedIn: card.LinkedIn,
          phone: card.Téléphone
        }
      },
      link: card['Site internet']
    };
  }

  if (isProjetAchat(card)) {
    return {
      title: 'Contact',
      content:
        'APProch, les projets d’achats publics accessibles maintenant. Créez votre compte sur APProch, pour indiquer votre intérêt et entrer en contact avec l’entité acheteuse en amont de la publication de l’appel d’offre !',
      cta: {
        label: 'Signifiez votre intérêt',
        url: 'https://projets-achats.marches-publics.gouv.fr/#'
      }
    };
  }
  return {
    title: null,
    content: null,
    cta: null
  };
};

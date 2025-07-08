import { useState } from 'react';
import ExternalLink from '../../Core/ExternalLink';
import { UnknownCard } from 'api5/interfaces/common';

interface ContactAreaProps {
  data: UnknownCard;
  className?: string;
}

const ContactAreaV5: React.FC<ContactAreaProps> = ({ data, className }) => {
  const { cardTitle, phone, email, websiteUrl } = data;
  const [showContact, setShowContact] = useState(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="text-2xl mb-4">{'Contact et détails'}</h2>
      <p>{cardTitle}</p>
      {(phone || email) && (
        <>
          {!showContact && (
            <button
              onClick={() => setShowContact(true)}
              className="fr-btn fr-btn--primary w-fit px-4 h-3 py-2 hover:bg-claire-bf__hover mt-6  ">
              {'Voir le contact'}
            </button>
          )}
          {showContact && (
            <div className="flex flex-col my-4">
              {phone && <p>Téléphone: {phone}</p>}
              {email && (
                <p>
                  Email : <a href={`mailto:${email}`}>{email}</a>
                </p>
              )}
            </div>
          )}
          {websiteUrl && (
            <ExternalLink
              href={websiteUrl}
              content="Voir le site internet"
              className="fr-link rm-link-underline mt-2"
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContactAreaV5;

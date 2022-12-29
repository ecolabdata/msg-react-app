import Alerte from 'components/dsfrComponents/Alerte';
import { useState } from 'react';

interface CopieLinkProps {
  link?: string;
}

const CopieLink: React.FC<CopieLinkProps> = ({ link }) => {
  const [copiedMessage, setCopiedMessage] = useState<{ success: boolean; message: string | null }>({
    success: false,
    message: null
  });

  const handleCopy = (textToCopy: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      setCopiedMessage({ success: true, message: 'Lien copié dans votre presse papier' });
      return navigator.clipboard.writeText(textToCopy);
    } else {
      setCopiedMessage({
        success: false,
        message: `Le lien n'as pas été copié. VOus pouvez copier coller cette url : ${textToCopy}`
      });
      return Promise.reject('The Clipboard API is not available.');
    }
  };

  return (
    <>
      <button
        className="fr-btn fr-btn--tertiary-no-outline"
        onClick={() => handleCopy(link || window.location.href)}
      >
        <span
          className="fr-icon-links-line mr-3 fr-icon--md border p-3 rounded-full border-grey-625-active border-opacity-20"
          aria-hidden="true"
        ></span>
        Copier le lien
      </button>
      {copiedMessage.message && copiedMessage.success && (
        <Alerte type="success" message={copiedMessage.message} />
      )}
      {copiedMessage.message && !copiedMessage.success && (
        <Alerte type="error" message={copiedMessage.message} />
      )}
    </>
  );
};

export default CopieLink;

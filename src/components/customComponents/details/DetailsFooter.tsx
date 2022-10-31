import { AnyCard, isAcheteurPublic, isProjetAchat, isStartup } from '../../../api/Api';

interface DetailsFooterProps {
  card: AnyCard;
}

const DetailsFooter: React.FC<DetailsFooterProps> = ({ card }) => {
  const handleCopy = (textToCopy: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(textToCopy);
    } else {
      return Promise.reject('The Clipboard API is not available.');
    }
  };
  const sources = getSources(card);

  return (
    <section className="my-16">
      <p>
        Sources de la donnée :{' '}
        <span>
          {sources?.map(({ url, label }) => (
            <a key={label} className="fr-link" href={url}>
              {label}
            </a>
          ))}
        </span>
      </p>
      <div className="my-8">
        <p>Partager la page</p>
        <button
          className="fr-btn fr-btn--tertiary-no-outline fr-fi-checkbox-circle-line fr-btn--icon-left mt-8"
          onClick={() => handleCopy(window.location.href)}>
          Copier le lien
        </button>
      </div>
    </section>
  );
};

export default DetailsFooter;

const getSources = (card: AnyCard) => {
  if (isAcheteurPublic(card)) {
    return [
      { label: 'DECP', url: '' },
      { label: 'OECP', url: '' },
      { label: 'catalogue Greentech Innovation', url: '' }
    ];
  }
  if (isStartup(card)) {
    return [
      { label: 'Annuaire Greentech Innovation', url: '' },
      { label: 'Lauréats Solar Impulse', url: '' },
      { label: 'Ecolabel Européen', url: '' },
      { label: 'French Tech Green20', url: '' }
    ];
  }

  if (isProjetAchat(card)) {
    return [{ label: 'APProch', url: '' }];
  }
};

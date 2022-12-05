import ExternalLink from './ExternalLink';

type LinkContent = {
  url: string;
  name: string;
};

interface LinksCardProps {
  title: string;
  description: string;
  links: LinkContent[];
}

const LinksCard: React.FC<LinksCardProps> = ({ title, description, links }) => {
  return (
    <div className="fr-card w-full h-full">
      <div className="fr-card__body ">
        <div className="fr-card__content !pt-4 !px-6 !pb-16 ">
          <h3 className="fr-card__title">{title}</h3>
          <div className="fr-card__desc">
            <p>{description}</p>
            <ul className="flex flex-col items-end">
              {links.map(({ url, name }) => (
                <li key={name} className="mt-2">
                  <ExternalLink href={url} content={name} className="fr-link rm-link-underline" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksCard;

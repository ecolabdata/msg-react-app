import { PictoDownload, PictoSendMail } from '../../assets/Icons';
import ExternalLink from '../Core/ExternalLink';

type LinkContent = {
  url: string | undefined;
  name: string;
};

interface CtaBlocProps {
  title: string;
  description: string;
  cta: LinkContent & { icon: string };
  links?: LinkContent[];
}

const CtaBloc: React.FC<CtaBlocProps> = ({ title, description, cta, links }) => {
  const iconMapping = {
    sendMail: <PictoSendMail aria-hidden="true" />,
    download: <PictoDownload aria-hidden="true" />
  };
  return (
    <div>
      {iconMapping[cta.icon as 'sendMail' | 'download']}
      <h2 className="mt-2 mb-4 w-full font-bold text-3xl">{title}</h2>
      <p className="">{description}</p>
      {cta.url && (
        <ExternalLink
          href={cta.url}
          content={cta.name}
          className="my-8 fr-btn fr-btn--sm fr-btn--primary"
        />
      )}

      {links && (
        <div>
          <ul className="flex flex-col items-start">
            {links.map(({ url, name }) => (
              <li key={name} className="mt-2">
                {url && (
                  <ExternalLink href={url} content={name} className="fr-link rm-link-underline" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CtaBloc;

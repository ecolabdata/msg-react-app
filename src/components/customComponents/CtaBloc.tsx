import { PictoDownload, PictoSendMail } from '../../assets/Icons';

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
    sendMail: <PictoSendMail />,
    download: <PictoDownload />
  };
  return (
    <div>
      {iconMapping[cta.icon as 'sendMail' | 'download']}
      <h2 className="mt-2 mb-4 w-full font-bold text-3xl">{title}</h2>
      <p className="">{description}</p>
      <a className="my-8 fr-btn fr-btn--sm fr-btn--primary" href={cta.url}>
        {cta.name}
      </a>
      {links && (
        <div>
          <ul className="flex flex-col items-start">
            {links.map(({ url, name }) => (
              <li key={name} className="mt-2">
                <a
                  className="fr-link rm-link-underline"
                  target="_blank"
                  href={url}
                  rel="noreferrer">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CtaBloc;

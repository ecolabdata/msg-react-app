import { CardType } from '../../model/CardType';

interface CardTypeProps {
  cardTypeData: CardType | ExplorerTypeCard;
  explorerCard?: boolean;
}

export interface ExplorerTypeCard {
  SVGLogo: ({ ...other }: { [x: string]: any }) => JSX.Element;
  title: string;
  color: string;
  description: string;
  searchLink: string;
  version: string;
  name: string;
}

const HomeCard: React.FC<CardTypeProps> = (props) => {
  const isExplorerCard = props.explorerCard ?? false;
  const { SVGLogo, title, description, color, searchLink, version, name } = props.cardTypeData;
  const isAlpha = version === 'alpha';
  const alphaCardStyle =
    "after:text-sm after:px-4 after:py-1 after:rounded-2xl after:absolute after:bottom-2 after:right-2 after:content-['Bientôt'] ";
  return (
    <div
      className={`fr-card h-full ${
        isExplorerCard &&
        'bg-blue-france-main text-black before:bg-blue-france hover:bg-blue-france-main-hover'
      }
                ${!isExplorerCard && isAlpha ? alphaCardStyle : 'fr-enlarge-link'} }
                 m-[1em]
                `}
      style={{ width: isExplorerCard ? 'calc(361px * 2 + 2em)' : 361 }}>
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">
            {!isAlpha ? (
              <a
                href={searchLink}
                className={`${isExplorerCard && 'text-black '}
                                    text-lg`}>
                {title}
              </a>
            ) : (
              <p className="text-lg">{title}</p>
            )}
          </h3>
          <p className="fr-card__desc text-base ">{description}</p>
        </div>
      </div>
      <div className="fr-card__header">
        <div className="fr-card__img  p-[2rem] pb-[0]">
          {!isExplorerCard ? (
            <SVGLogo height="80" width="80" style={{ color: color }} aria-hidden="true" />
          ) : (
            <SVGLogo width="80" height="80" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeCard;

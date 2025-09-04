import { Link, useLocation } from 'react-router-dom';
import { CardType } from '../../model/CardType';
import { SearchState } from 'utils/InitialState';

interface CardTypeProps {
  cardTypeData: CardType | ExplorerTypeCard;
  explorerCard?: boolean;
  state?: SearchState;
  params: string;
}

export interface ExplorerTypeCard {
  SVGLogo: ({ ...other }: { [x: string]: unknown }) => JSX.Element;
  title: string;
  color: string;
  description: string;
  searchLink: string;
  version: string;
  name: string;
  homeDescription?: string;
}

const HomeCard: React.FC<CardTypeProps> = ({ explorerCard, cardTypeData, state, params }) => {
  const isExplorerCard = explorerCard ?? false;
  const { SVGLogo, title, description, color, searchLink, version, homeDescription } = cardTypeData;
  const isAlpha = version === 'alpha';
  const location = useLocation();

  const alphaCardStyle =
    "after:text-sm after:px-4 after:py-1 after:rounded-2xl after:absolute after:bottom-2 after:right-2 after:content-['Bientôt'] ";
  return (
    <li
      className={`fr-card self-stretch justify-center ${isExplorerCard &&
        'bg-blue-france-main-525 text-black before:bg-blue-france-sun-113 hover:bg-blue-france-main-525-hover'
        } 
                ${!isExplorerCard && isAlpha ? alphaCardStyle : 'fr-enlarge-link'} }
                 m-[1em]
                `}
      style={{ width: isExplorerCard ? 'calc(361px * 2 + 2em)' : 320 }}>
      <div className="fr-card__body flex-none">
        <div className="fr-card__content p-4 !pb-14 !h-auto">
          <h3 className="fr-card__title">
            {!isAlpha ? (
              <Link
                to={`${location.pathname}${searchLink}?${params}`}
                state={state}
                className={`${isExplorerCard && 'text-black '} text-lg`}>
                {title}
              </Link>
            ) : (
              <p className="text-lg">{title}</p>
            )}
          </h3>
          <p className="fr-card__desc text-base">{homeDescription ?? description}</p>
        </div>
      </div>
      <div className="fr-card__header">
        <div className="fr-card__img p-4 pb-0">
          {!isExplorerCard ? (
            <SVGLogo height="80" width="80" style={{ color: color }} aria-hidden="true" />
          ) : (
            <SVGLogo width="80" height="80" aria-hidden="true" />
          )}
        </div>
      </div>
    </li>
  );
};

export default HomeCard;

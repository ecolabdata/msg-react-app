import ScreenReaderOnlyText from 'components/Core/ScreenReaderOnlyText';
import { PropsWithChildren, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardType } from '../../model/CardType';

interface CardProps {
  name?: string | null;
  id?: string;
  toprow?: string | null;
  slug: string | null;
  cardType: CardType;
  isLoading?: boolean;
  node: ReactNode;
}

const ResultCard: React.FC<PropsWithChildren<CardProps>> = ({
  cardType,
  name,
  toprow,
  slug,
  isLoading,
  node
}) => {
  const location = useLocation()
  return (
    <li className="h-full" style={{ opacity: isLoading ? 0.15 : 'inherit' }}>
      <div className="fr-card fr-enlarge-link w-full h-full">
        <div className="fr-card__body ">
          <div className="fr-card__content !pt-4 !px-6 !pb-16 ">
            <h3 className="fr-card__title">
              {slug && (
                <Link to={`${location.pathname}${slug}`} className="rm-link-underline">
                  {name && (
                    <p className="clamp mt-2 font-bold text-lg" title={name}>
                      {toprow && <ScreenReaderOnlyText content={toprow} />}
                      {name}
                    </p>
                  )}
                </Link>
              )}
            </h3>
            <div className="fr-card__desc">{node}</div>
            <div className="fr-card__start">
              <ul className="fr-tags-group" aria-hidden={true}>
                <li>
                  <p
                    className={`fr-badge fr-badge--sm `}
                    style={{ color: localStorage.getItem("scheme") === "dark" ? cardType?.color : cardType.backgroundColor, backgroundColor: localStorage.getItem("scheme") === "dark" ? cardType?.backgroundColor : cardType.color }}>
                    {toprow}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ResultCard;

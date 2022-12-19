import { AnyCard } from 'api/Api';
import { PropsWithChildren, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../../App';
import { CardType } from '../../model/CardType';
import ScreenReaderOnlyText from './ScreenReaderOnlyText';

interface CardProps {
  name: string;
  nameElem? : JSX.Element;
  toprow: string;
  linkData: AnyCard | {};
  slug: string;
  cardType: CardType;
  isLoading?: boolean;
}

const ResultCard: React.FC<PropsWithChildren<CardProps>> = ({
  cardType,
  name,
  nameElem,
  toprow,
  linkData,
  slug,
  children,
  isLoading
}) => {
  const { usedNextScrollTarget } = useContext(ApplicationContext);

  const [, setNextScrolTarget] = usedNextScrollTarget;

  //TODO: When an endpoint by id exist. All this should be removed to link card to `/${cardType.name}/details/${cardData.id}`
  let linkTo = `/${cardType.name}/details/${slug}?id=${name}&cardData=${encodeURIComponent(
    JSON.stringify(linkData)
  )}`;

  if (linkTo.length > 8192) {
    linkTo = `/${cardType.name}/details/${slug}?id=${name}`;
  }

  return (
    <li className="h-full">
      <div className="fr-card fr-enlarge-link w-full h-full">
        <div className="fr-card__body ">
          <div className="fr-card__content !pt-4 !px-6 !pb-16 ">
            <h3 className="fr-card__title">
              <Link
                onClick={() => {
                  setNextScrolTarget({ top: 0 });
                }}
                to={linkTo}
                state={{ cardData: linkData }}
                className="rm-link-underline">
                <p className="clamp mt-2 font-bold text-lg" title={name}>
                  <ScreenReaderOnlyText content={toprow} />
                  {nameElem || name}
                </p>
              </Link>
            </h3>
            <div className="fr-card__desc">{children}</div>
            <div className="fr-card__start">
              <ul className="fr-tags-group" aria-hidden={true}>
                <li>
                  <p
                    className={`fr-badge fr-badge--sm `}
                    style={{ color: cardType.color, backgroundColor: cardType.backgroundColor }}>
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

import { Children, PropsWithChildren, useContext } from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import {
  AnyCard,
  applyCard,
  isAcheteurPublic,
  isAide,
  isInvestisseur,
  isProjetAchat,
  isStartup
} from '../../api/Api';
import { ApplicationContext } from '../../App';
import { CardType } from '../../model/CardType';
import ResultCardDescription from './ResultCardDescription';
import ScreenReaderOnlyText from './ScreenReaderOnlyText';

interface CardProps {
  name: string
  toprow: string
  linkData : any,
  slug: string
  cardType: CardType
  isLoading?: boolean
}

const ResultCard: React.FC<PropsWithChildren<CardProps>> = ({ cardType, name, toprow, linkData, slug, children, isLoading }) => {
  const { usedNextScrollTarget } = useContext(ApplicationContext);

  const [, setNextScrolTarget] = usedNextScrollTarget;

  let linkTo = `/${cardType.name}/details/${slug}?cardData=${encodeURIComponent(
    JSON.stringify(linkData)
  )}`;
  
  if (linkTo.length > 8192) {
    linkTo = `/${cardType.name}/details/${slug}`;
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
                state={{cardData: linkData}}
                className="rm-link-underline"
              >
                <p className="clamp mt-2 font-bold text-lg" title={name}>
                  <ScreenReaderOnlyText content={toprow} />
                  {name}
                </p>
              </Link>
            </h3>
            <div className="fr-card__desc">
              {children}
            </div>
            <div className="fr-card__start">
              <ul className="fr-tags-group" aria-hidden={true}>
                <li>
                  <p
                    className={`fr-badge fr-badge--sm `}
                    style={{ color: cardType.color, backgroundColor: cardType.backgroundColor }}
                  >
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

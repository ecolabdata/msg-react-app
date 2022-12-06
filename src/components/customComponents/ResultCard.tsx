import { useContext } from 'react';
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
  cardData: AnyCard;
  cardType: CardType;
  isLoading?: boolean;
  pageList: boolean;
}

const ResultCard: React.FC<CardProps> = ({ cardData, cardType }) => {
  const { usedNextScrollTarget } = useContext(ApplicationContext);

  const [, setNextScrolTarget] = usedNextScrollTarget;

  let displayableFinancers = '';
  if (isAide(cardData)) {
    displayableFinancers = cardData.financers?.join(' | ') || '';
  }

  const name = applyCard(
    cardData,
    (ap) => ap.public_actor_nom,
    (pa) => pa.label,
    (i) => i['Nom du fonds'],
    (a) => a.name,
    (su) => su['Start-up'],
    () => 'No title'
  );
  const toprow = isAide(cardData)
    ? displayableFinancers
    : isStartup(cardData)
    ? cardData['Thématique']
    : isInvestisseur(cardData)
    ? cardData['Vous êtes']
    : isAcheteurPublic(cardData)
    ? 'Ville / Région'
    : isProjetAchat(cardData)
    ? cardData.purchasingEntity.label
    : '';

  //TODO: When an endpoint by id exist. All this should be removed to link card to `/${cardType.name}/details/${cardData.id}`
  const cardSlug = applyCard(
    cardData,
    (ap) => ap.public_actor_nom,
    (pa) => pa.label,
    (i) => i['Nom du fonds'],
    (a) => a.slug,
    (su) => su['Start-up'],
    () => 'unknown-slug'
  );
  const slug = slugify(cardSlug);

  let linkTo = `/${cardType.name}/details/${slug}?cardData=${encodeURIComponent(
    JSON.stringify(cardData)
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
                state={{ cardData }}
                className="rm-link-underline"
              >
                <p className="clamp mt-2 font-bold text-lg" title={name}>
                  <ScreenReaderOnlyText content={toprow} />
                  {name}
                </p>
              </Link>
            </h3>
            <div className="fr-card__desc">
              <ResultCardDescription cardData={cardData} />
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

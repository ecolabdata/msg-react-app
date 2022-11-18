import { ReactNode, useContext } from 'react';
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
  let displayabeSubmissionDeadLine = '';
  if (isAide(cardData)) {
    displayableFinancers = cardData.financers?.join(' | ') || '';
    const d = cardData.submission_deadline ? new Date(cardData.submission_deadline) : null;
    displayabeSubmissionDeadLine =
      ('0' + d?.getUTCDate()).slice(-2) +
      '/' +
      ('0' + ((d?.getUTCMonth() || 0) + 1)).slice(-2) +
      '/' +
      d?.getUTCFullYear();
  }
  let targetDate = '';
  if (isProjetAchat(cardData)) {
    const d = new Date(cardData.publicationTargetDate);
    targetDate =
      ('0' + d?.getUTCDate()).slice(-2) +
      '/' +
      ('0' + ((d?.getUTCMonth() || 0) + 1)).slice(-2) +
      '/' +
      d?.getUTCFullYear();
  }
  const name = applyCard(
    cardData,
    (ap) => ap.nom,
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
    (ap) => ap.nom,
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
              {applyCard(
                cardData,
                (ap) =>
                  ap.Startups != '0' ? (
                    <div>
                      Ils ont travaillés avec:
                      <br />
                      {ap.Startups.split(',').join(', ')}
                    </div>
                  ) : null,
                () => (
                  <div>Date visée de publication: {targetDate}</div>
                ),
                (i) => (
                  <>
                    <div>
                      {i['Ticket min en K€']}K€ - {i['Ticket max en K€']}K€
                    </div>
                    <div
                      className="h-[3em] truncate"
                      title={i["Présentation de la politique d'investissement"]}
                    >
                      {i["Présentation de la politique d'investissement"].split(';').join(' | ')}
                    </div>
                    <DetailBadges contents={i['Type de financement'].split(';')} />
                  </>
                ),
                (a) => (
                  <>
                    <div data-org-value={a.submission_deadline}>
                      {' '}
                      {a.submission_deadline
                        ? `Date de clôture: ${displayabeSubmissionDeadLine}`
                        : 'Aide permanente'}
                    </div>
                    <DetailBadges contents={a.aid_types} />
                  </>
                ),
                (su) => (
                  <div>{su['Pitch']}</div>
                ),
                () => (
                  <></>
                )
              )}
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

const DetailBadges = ({ contents }: { contents: ReactNode[] }) => {
  return (
    <p className={`text-white font-bold uppercase text-xs mt-2`}>
      {contents.map((content, index) => (
        <>
          {content && (
            <>
              <span>{content}</span>
              {index !== contents.length - 1 && <span className="mx-1 "> | </span>}
            </>
          )}
        </>
      ))}
    </p>
  );
};

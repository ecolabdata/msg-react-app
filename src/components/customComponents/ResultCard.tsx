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
import ScreenReaderOnlyText from './ScreenReaderOnlyText';

interface CardProps {
  cardData: AnyCard;
  cardType: CardType;
  isLoading?: boolean;
  pageList: boolean;
}

const ResultCard: React.FC<CardProps> = ({ cardData, cardType }) => {
  const { usedNextScrollTarget } = useContext(ApplicationContext);

  const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget;

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
  const name = applyCard(
    cardData,
    (ap) => ap.nom,
    (pa) => pa.label,
    (i) => i['Nom du fonds'],
    (a) => a.name,
    (su) => su['Start-up'],
    () => 'No title'
  );
  let linkTo = `/${cardType.name}/details/${slug}?cardData=${encodeURIComponent(
    JSON.stringify(cardData)
  )}`;

  if (linkTo.length > 8192) {
    linkTo = `/${cardType.name}/details/${slug}`;
  }

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

  return (
    <li className="fr-col-xs-12 fr-col-sm-6 fr-col-md-4 fr-col-lg-3 w-full">
      <div className="fr-card fr-enlarge-link w-full">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <h3 className="fr-card__title">
              <Link
                onClick={() => {
                  setNextScrolTarget({ top: 0 });
                }}
                to={linkTo}
                state={{ cardData }}
                className="rm-link-underline">
                <p className="clamp mt-2 font-bold text-lg" title={name}>
                  <ScreenReaderOnlyText content={toprow} />
                  {name}
                </p>
              </Link>
            </h3>
            <p className="fr-card__desc">
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
                (pa) => (
                  <div>Date visée de publication: {targetDate}</div>
                ),
                (i) => (
                  <>
                    <div>
                      {i['Ticket min en K€']}K€ - {i['Ticket max en K€']}K€
                    </div>
                    <div
                      className="h-[3em] truncate"
                      title={i["Présentation de la politique d'investissement"]}>
                      {i["Présentation de la politique d'investissement"].split(';').join(' | ')}
                    </div>
                    <div
                      className="truncate"
                      style={{ color: cardType.color }}
                      title={i['Type de financement']}>
                      {i['Type de financement']}
                    </div>
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
                    <div style={{ color: cardType.color }}>{a.aid_types.join(' | ')}</div>
                  </>
                ),
                (su) => (
                  <div>{su['Pitch']}</div>
                ),
                () => (
                  <></>
                )
              )}
            </p>
            <div className="fr-card__start">
              <ul className="fr-tags-group">
                <li>
                  <p className={`fr-badge`} style={{ color: cardType.color }}>
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

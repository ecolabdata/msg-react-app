import { FC } from 'react';
import { AnyCard, applyCard, isAide, isProjetAchat } from '../../api/Api';
import DetailBadges from './DetailBadges';

interface ResultCardDescriptionProps {
  cardData: AnyCard;
}

const ResultCardDescription: FC<ResultCardDescriptionProps> = ({ cardData }) => {

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

  return applyCard(
    cardData,
    (ap) =>
      ap.labelled_startups?.length > 0 ? (
        <p>
          Ils ont travaillés avec:
          <br />
          {ap.labelled_startups
            .map((startup) => startup.nom)
            .filter(Boolean)
            .join(', ')}
        </p>
      ) : null,
    () => <p>Date visée de publication: {targetDate}</p>,
    (i) => (
      <>
        <p>
          {i['Ticket min en K€']}K€ - {i['Ticket max en K€']}K€
        </p>
        <p className="h-[3em] truncate" title={i["Présentation de la politique d'investissement"]}>
          {i["Présentation de la politique d'investissement"].split(';').join(' | ')}
        </p>
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
    (su) => <p>{su['Pitch']}</p>,
    () => <></>
  );
};

export default ResultCardDescription;

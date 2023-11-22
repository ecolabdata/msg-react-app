import { AidCard } from 'apiv4/interfaces/aid';
import { Aide } from '../../../api/Api';
import { InformationItemsWrapper, InformationItem } from './InformationItem';

interface HelpPageContentProps {
  card: AidCard;
  className?: string;
}

const HelpPage: React.FC<HelpPageContentProps> = ({ card, className }) => {
  const {
    submission_deadline,
    subvention_rate_lower_bound,
    subvention_rate_upper_bound,
    beneficiaries,
    zone,
    html_eligibility,
    html_description,
    recurrence,
    nature
  } = card;
  const d = submission_deadline ? new Date(submission_deadline) : null;

  const displayabeSubmissionDeadLine =
    ('0' + d?.getUTCDate()).slice(-2) +
    '/' +
    ('0' + ((d?.getUTCMonth() || 0) + 1)).slice(-2) +
    '/' +
    d?.getUTCFullYear();

  const subvention = handleSubventionDisplay(
    subvention_rate_lower_bound,
    subvention_rate_upper_bound
  );

  return (
    <section className={`${className}`}>
      <InformationItemsWrapper>
        {beneficiaries && (
          <InformationItem label={'Bénéficaires'} contents={beneficiaries} showDivider={false} />
        )}
        {submission_deadline && displayabeSubmissionDeadLine && (
          <InformationItem
            label={'Calendrier'}
            contents={`Date de cloture: ${displayabeSubmissionDeadLine}`}
            showDivider={false}
          />
        )}
      </InformationItemsWrapper>
      <InformationItem label={'Zone géographique couverte'} contents={zone} />
      <InformationItem label={'Récurence'} contents={recurrence} />
      <InformationItem label={"Critères d'éligibilité"} contents={html_eligibility} isHtml />
      <InformationItem label={'Description'} contents={html_description} isHtml />
      <InformationItemsWrapper>
        {nature && (
          <InformationItem label={"Nature de l'aide"} contents={nature} showDivider={false} />
        )}
        {subvention?.display && (
          <InformationItem
            label={'Taux de subvention'}
            contents={subvention?.txt}
            showDivider={false}
          />
        )}
      </InformationItemsWrapper>
    </section>
  );
};

export default HelpPage;

function handleSubventionDisplay(min?: number | null, max?: number | null) {
  const minMax = [];
  min && minMax.push(`Min: ${min}%`);
  max && minMax.push(`Max: ${max}%`);
  return {
    display: minMax.length || undefined,
    txt: minMax.join(',')
  };
}

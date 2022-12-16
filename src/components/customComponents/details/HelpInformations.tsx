import { Aide } from '../../../api/Api';
import { InformationItemsWrapper, InformationItem } from './InformationItem';

interface HelpPageContentProps {
  card: Aide;
  className?: string;
}

const HelpPage: React.FC<HelpPageContentProps> = ({ card, className }) => {
  const {
    submission_deadline,
    subvention_rate_lower_bound,
    subvention_rate_upper_bound,
    targeted_audiences,
    perimeter,
    eligibility,
    description,
    aid_types
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
        {displayabeSubmissionDeadLine && (
          <InformationItem
            label={'Calendrier'}
            contents={`Date de cloture: ${displayabeSubmissionDeadLine}`}
            showDivider={false}
          />
        )}
        {targeted_audiences && (
          <InformationItem
            label={'Bénéficaires'}
            contents={targeted_audiences}
            showDivider={false}
          />
        )}
      </InformationItemsWrapper>
      <InformationItem label={'Zone géographique couverte'} contents={perimeter} />
      <InformationItem label={"Critères d'éligibilité"} contents={eligibility} isHtml />
      <InformationItem label={'Description'} contents={description} isHtml />
      <InformationItemsWrapper>
        {aid_types && (
          <InformationItem label={"Nature de l'aide"} contents={aid_types} showDivider={false} />
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

import { Label } from 'api5/interfaces/common';
import { LabelDetails } from '../details/LabelDetails';

const LabelSectionV5: React.FC<{ labels: Label[] }> = ({ labels }) => {
  return (
    <div className="mt-16">
      {labels?.length > 0 &&
        labels.map(
          ({ label, name, description }, i) =>
            label && (
              <LabelDetails
                key={i}
                label={label}
                solutionName={name}
                description={description}
                className="mb-8"
              />
            )
        )}
    </div>
  );
};
export default LabelSectionV5;

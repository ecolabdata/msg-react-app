import { LabelNames } from 'api5/interfaces/common';
import frenchtech from '../../../assets/images/frenchtech.png';
import greentech from '../../../assets/images/greentech.png';
import solarImpulse from '../../../assets/images/solar-impulse.png';

interface LabelDetailsProps {
  label: LabelNames | null;
  solutionName: string | null;
  description: string | null;
  className?: string;
}

export const LabelDetails: React.FC<LabelDetailsProps> = ({
  label,
  solutionName,
  description,
  className
}) => {
  return (
    <div className={` flex  ${className}`}>
      <div className="w-[120px]">
        {label && <img src={getLabelLogo(label)} alt="" width="80" className="mt-4" />}
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-xl">{solutionName}</h3>
        <p
          className={`fr-badge fr-badge--sm  ${
            localStorage.getItem('scheme') === 'dark' && 'bg-green-menthe-moon-652-lightBackground'
          }  text-green-menthe-moon-652 my-4`}>
          {label}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
};

const getLabelLogo = (label: LabelNames) => {
  switch (label) {
    case 'GREEN20':
      return frenchtech;
    case 'Solar Impulse':
      return solarImpulse;
    case 'GreenTech Innovation':
    default:
      return greentech;
  }
};

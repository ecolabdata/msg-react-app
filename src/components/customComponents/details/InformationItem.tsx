import { ReactNode } from 'react';
import { TagsList } from '../TagsList';

interface InformationItemProps {
  label: string;
  contents: string | string[];
  showDivider?: boolean;
  className?: string;
}

export const InformationItem: React.FC<InformationItemProps> = ({
  label,
  contents,
  showDivider = true,
  className
}) => {
  return (
    <div className={`flex flex-col mb-8 ${className}`}>
      {showDivider && <div className="h-0.5 w-[10%] bg-gray-700 my-6" />}
      <h2 className="text-2xl mb-2">{label}</h2>
      {Array.isArray(contents) ? <TagsList tags={contents} /> : <p>{contents}</p>}
    </div>
  );
};

export const InformationItemsWrapper = ({ children }: { children: ReactNode[] }) => {
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <div className="flex flex-col w-50% flex-1 mr-2">{children[0]}</div>
      <div className="flex flex-col w-50% flex-1 ml-2">{children[1]}</div>
    </div>
  );
};

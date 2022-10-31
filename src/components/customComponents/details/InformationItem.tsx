import { ReactNode } from 'react';

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
    <div className={`flex flex-col mb-4 ${className}`}>
      {showDivider && <div className="h-0.5 w-[10%] bg-gray-700 my-4" />}
      <h2 className="text-2xl mb-2">{label}</h2>
      {Array.isArray(contents) ? (
        <div className="flex flex-col sm:flex-row flex-wrap">
          {contents.map((c) => (
            <div className="bg-gray-700 w-fit h-fit px-2 mt-2 sm:mt-0 rounded-xl mr-2 mb-2" key={c}>
              {c}
            </div>
          ))}
        </div>
      ) : (
        <p>{contents}</p>
      )}
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

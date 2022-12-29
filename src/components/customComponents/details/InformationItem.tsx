import { ReactNode } from 'react';
import { TagsList } from '../../Core/TagsList';

interface InformationItemProps {
  label: string;
  contents: string | string[];
  showDivider?: boolean;
  className?: string;
  isHtml?: boolean;
}

export const InformationItem: React.FC<InformationItemProps> = ({
  label,
  contents,
  showDivider = true,
  className,
  isHtml
}) => {
  if (!contents || (Array.isArray(contents) && contents.length === 0)) return <></>;

  return (
    <div className={`flex flex-col my-5 ${className}`}>
      <h2 className="text-xl mb-5 font-bold">{label}</h2>
      {Array.isArray(contents) ? (
        <TagsList tags={contents} />
      ) : (
        <>{isHtml ? <p dangerouslySetInnerHTML={{ __html: contents }} /> : <p>{contents}</p>}</>
      )}
      {showDivider && <div className="h-0.5 w-20 bg-grey-625-active opacity-20 my-8" />}
    </div>
  );
};

export const InformationItemsWrapper = ({ children }: { children: ReactNode[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </div>
  );
};

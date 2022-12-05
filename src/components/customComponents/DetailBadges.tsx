import { ReactNode } from 'react';

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

export default DetailBadges;

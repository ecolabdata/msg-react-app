import { PropsWithChildren } from 'react';

interface SearchFieldWrapperProps {
  label: string;
  usedInListPage: boolean;
  className?: string;
}

const SearchFieldWrapper: React.FC<PropsWithChildren<SearchFieldWrapperProps>> = ({
  usedInListPage,
  children,
  className
}) => {
  return (
    <div
      className={`container ${className} p-4 my-2 mr-0 bg-research-precision-container justify-start ${
        usedInListPage ? 'mt-8' : 'items-center w-full '
      }
          flex flex-col lg:mt-0`}
    >
      {children}
    </div>
  );
};

export default SearchFieldWrapper;

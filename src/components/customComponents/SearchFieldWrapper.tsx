import { PropsWithChildren } from 'react';
import { OverlappingTitle } from './OverlappingTitle';

interface SearchFieldWrapperProps {
  label: string;
  usedInListPage: boolean;
  step: number;
}

const SearchFieldWrapper: React.FC<PropsWithChildren<SearchFieldWrapperProps>> = ({
  label,
  usedInListPage,
  step,
  children
}) => {
  return (
    <div
      className={`projectContainer md:w-[50%] p-4 my-2 mr-0 md:first:mr-2 md:last:ml-2 bg-research-precision-container ${
        usedInListPage ? 'mt-8' : 'items-center w-full -- lg:h-full'
      }
          flex flex-col justify-center lg:mt-0`}>
      <OverlappingTitle usedInListPage={usedInListPage} number={step} txt={label} />
      <div
        className={`fieldsContainer mb-auto  mt-2 flex flex-col w-full   ${
          !usedInListPage && 'mt-8'
        }`}>
        {children}
      </div>
    </div>
  );
};

export default SearchFieldWrapper;

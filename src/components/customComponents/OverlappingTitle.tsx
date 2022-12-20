export const OverlappingTitle: React.FC<{
  txt: string;
  usedInListPage: boolean;
  number: number;
}> = ({ txt, usedInListPage, number }) => {
  return (
    <>
      <div
        className={`container ${!usedInListPage && 'absolute h-0 -top-5 left-4 overflow-visible'}`}
      >
        <div className="flex w-fit">
          <h2
            className="text-xl italic text-dark-text-action font-[Spectral] flex items-baseline
                  md:text-3xl"
          >
            {number} <span className="mx-2 elipsis"></span> {txt}
          </h2>
        </div>
      </div>
    </>
  );
};

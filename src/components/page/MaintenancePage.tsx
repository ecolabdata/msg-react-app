export const AccessibilityPage = () => {
  return (
    <div className="mx-8 w-4/5">
      <h1 className="mt-8 mb-16 text-center justify-center items-center font-bold text-4xl">
        Maintenance en cours
      </h1>
      <NoticeBlock>
        <p className="text-xl">
          Mes Services Greentech est en maintenance. Le site revient très vite.{' '}
        </p>
      </NoticeBlock>{' '}
    </div>
  );
};

const NoticeBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 mb-8 pb-8 border-b border-bg-light-50 pr-8 justify-center flex">
      {children}
    </div>
  );
};
export default AccessibilityPage;

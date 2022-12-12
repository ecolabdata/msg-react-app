import { Outlet } from 'react-router-dom';
import BreadCumb from '../dsfrComponents/BreadCumb';
import Footer from '../Footer';
import Header from '../Header';

export const PageLayout = () => {
  return (
    <>
      <Header />
      <div className="bg-gey-50 text-white">
        <BreadCumb />
      </div>
      <main
        role="main"
        className={`h-full p-1 md:pb-6 ${
          localStorage.scheme === 'dark' && 'bg-grey-50 text-white'
        }`}
      >
        <div id="main-content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;

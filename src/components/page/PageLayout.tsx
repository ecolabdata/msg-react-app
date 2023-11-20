import { Outlet } from 'react-router-dom';
import BreadCumb from '../dsfrComponents/BreadCumb';
import Footer from '../Footer';
import Header from '../Header';
import ModalThemeSelection from 'components/dsfrComponents/ModalThemeSelection';
import { useState } from 'react';



export const PageLayout = () => {
  const [isOpenModale, setIsOpenModale] = useState(false)



  return (
    <>

      <Header />
      <div className="bg-gey-50 text-white">{/* <BreadCumb /> */}</div>
      <main
        role="main"
      >
        <div id="main-content">
          <Outlet />
        </div>
      </main>
      <Footer isOpenModale={isOpenModale} setIsOpenModale={setIsOpenModale} />
      <ModalThemeSelection isOpenModale={isOpenModale} setIsOpenModale={setIsOpenModale} />
    </>
  );
};

export default PageLayout;

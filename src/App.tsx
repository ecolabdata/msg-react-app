import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { AuthRequiredWall } from './components/page/AuthRequiredWall';
import { useTrackPage } from './hooks/useTrackPage';
import routes from './model/routes';
import AccessibleNavigation from './utils/AccessibleNavigation';
import {
  defaultUsedCorbeille,
  defaultUsedFavoris,
  useCorbeille,
  UsedCorbeille,
  UsedFavoris,
  useFavoris
} from './utils/categoris';
import { JwtAuthProvider } from './utils/jwt';

export const ApplicationContext = createContext<{
  usedFavoris: UsedFavoris;
  usedCorbeille: UsedCorbeille;
  usedNextScrollTarget: [ScrollToOptions | null, Dispatch<SetStateAction<ScrollToOptions | null>>];
}>({
  usedFavoris: defaultUsedFavoris,
  usedCorbeille: defaultUsedCorbeille,
  usedNextScrollTarget: [null, () => null]
});

const Router = () => {
  localStorage.setItem('scheme', 'dark');
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => { }, [localStorage.scheme]);
  const usedFavoris = useFavoris();
  const usedCorbeille = useCorbeille();
  const usedNextScrollTarget = useState<ScrollToOptions | null>(null);
  const [nextScrollTarget, setNextScrolTarget] = usedNextScrollTarget;

  useEffect(() => {
    if (nextScrollTarget) {
      window.scrollTo(nextScrollTarget);
      setNextScrolTarget(null);
    }
  }, [usedNextScrollTarget]);

  const TrackPage = () => {
    useTrackPage();
    return <></>;
  };

  const Authentified = () => <>{routes}</>;

  return (
    <>
      <ApplicationContext.Provider value={{ usedFavoris, usedCorbeille, usedNextScrollTarget }}>
        <AccessibleNavigation />
        <JwtAuthProvider>
          <TrackPage />
          <Routes>
            <Route path="*" element={<Authentified />} />
          </Routes>
        </JwtAuthProvider>
      </ApplicationContext.Provider>
    </>
  );
};

export default Router;

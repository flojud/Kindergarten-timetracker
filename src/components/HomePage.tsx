import { LinearProgress } from '@mui/material';
import { lazy, Suspense, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';
import MainContainer from './common/MainContainer';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const UserHomePage = lazy(() => import('./UserHomePage'));
  const UnautheticatedHomePage = lazy(() => import('./UnautheticatedHomePage'));
  return (
    <>
      <MainContainer>
        {authContext !== null && authContext.loggedIn ? (
          <Suspense fallback={<LinearProgress color="secondary" />}>
            <UserHomePage />
          </Suspense>
        ) : (
          <Suspense fallback={<LinearProgress color="secondary" />}>
            <UnautheticatedHomePage />
          </Suspense>
        )}
      </MainContainer>
    </>
  );
};

export default HomePage;

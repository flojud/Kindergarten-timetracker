import MainContainer from './common/MainContainer';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useContext } from 'react';
import UserHomePage from './UserHomePage';
import UnautheticatedHomePage from './UnautheticatedHomePage';

const HomePage = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      <MainContainer>{authContext !== null && authContext.loggedIn ? <UserHomePage /> : <UnautheticatedHomePage />}</MainContainer>
    </>
  );
};

export default HomePage;

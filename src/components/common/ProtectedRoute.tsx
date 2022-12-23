import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Props } from '../../interfaces/Types';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (authContext !== null) {
    if (authContext.user?.emailVerified == false) {
      return <Navigate to="/verifyemail" />;
    }
    if (authContext.loggedIn) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
};

export default ProtectedRoute;

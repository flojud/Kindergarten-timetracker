import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextProvider';
import { Props } from '../interfaces/Props';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (authContext !== null) {
    if (authContext.loggedIn) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
};

export default ProtectedRoute;

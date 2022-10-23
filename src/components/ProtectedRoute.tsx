import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { Props } from '../interfaces/Props';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const authContext = useAuthContext();

  if (!authContext || !authContext.user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

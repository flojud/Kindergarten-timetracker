import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { Props } from '../interfaces/Props';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const authContext = useAuthContext();

  if (authContext?.user?.uid) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;

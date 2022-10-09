import React, { FC, ReactChildren, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContextProvider';

type Props = { children: ReactNode | any }

const ProtectedRoute: FC<Props> = ({children}) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContextProvider';
import { Props } from '../interfaces/Props';

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

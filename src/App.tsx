import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './contexts/AuthContextProvider';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';

const App = () => {
  return (
    <>
      <NavigationBar />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/legal/terms" element={<Home />} />
          <Route path="/legal/policy" element={<Home />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;

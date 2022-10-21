import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './contexts/AuthContextProvider';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Signup from './pages/SignUp';
import Policy from './pages/legal/Policy';
import Terms from './pages/legal/Terms';

const App = () => {
  return (
    <>
      <NavigationBar />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/policy" element={<Policy />} />

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

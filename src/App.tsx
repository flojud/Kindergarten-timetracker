import { Route, Routes } from 'react-router-dom';
import NavigationDrawer from './components/menu/NavigationDrawer';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './components/HomePage';
import PolicyPage from './components/legal/PolicyPage';
import TermsPage from './components/legal/TermsPage';
import ProfilePage from './components/settings/ProfilePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import TimeInputPage from './components/time/TimeInputPage';
import TimeHistoryPage from './components/time/TimeHistoryPage';

const App = () => {
  return (
    <>
      <NavigationDrawer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
          <Route path="/legal/policy" element={<PolicyPage />} />

          <Route
            path="/time/view"
            element={
              <ProtectedRoute>
                <TimeHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/time/add"
            element={
              <ProtectedRoute>
                <TimeInputPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </NavigationDrawer>
    </>
  );
};

export default App;

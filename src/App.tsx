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
import AbsencesYearPage from './components/absences/AbsencesYearPage';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContextProvider';
import { ThemeProvider } from '@emotion/react';
import { createMuiTheme, createTheme, CssBaseline } from '@mui/material';
import { darkThemeOptions, lightThemeOptions } from './utils/MyThemeOptions';

const App = () => {
  const themeContext = useContext(ThemeContext);
  const lightTheme = createTheme(lightThemeOptions);
  const darkTheme = createTheme(darkThemeOptions);
  const appliedTheme = createTheme(themeContext.light ? lightTheme : darkTheme);

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />

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
              path="/absences/view"
              element={
                <ProtectedRoute>
                  <AbsencesYearPage />
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
      </ThemeProvider>
    </>
  );
};

export default App;

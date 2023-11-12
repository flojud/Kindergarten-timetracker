import { ThemeProvider } from '@emotion/react';
import { CssBaseline, LinearProgress, createTheme } from '@mui/material';
import { Suspense, lazy, useCallback, useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import NavigationDrawer from './components/menu/NavigationDrawer';
import TimeEditPage from './components/time/TimeEditPage';
import { ThemeContext } from './contexts/ThemeContextProvider';
import A2HSInstaller from './utils/A2HSInstaller';
import AnalyticsTracker from './utils/AnalyticsTracker';
import { darkThemeOptions, lightThemeOptions } from './utils/MyThemeOptions';

const App = () => {
  const themeContext = useContext(ThemeContext);
  const lightTheme = createTheme(lightThemeOptions);
  const darkTheme = createTheme(darkThemeOptions);
  const appliedTheme = createTheme(themeContext.light ? lightTheme : darkTheme);

  const HomePage = lazy(() => import('./components/HomePage'));
  const PolicyPage = lazy(() => import('./components/legal/PolicyPage'));
  const TermsPage = lazy(() => import('./components/legal/TermsPage'));
  const ProfilePage = lazy(() => import('./components/settings/ProfilePage'));
  const SignInPage = lazy(() => import('./components/SignInPage'));
  const SignUpPage = lazy(() => import('./components/SignUpPage'));
  const TimeInputPage = lazy(() => import('./components/time/TimeInputPage'));
  const TimeHistoryPage = lazy(() => import('./components/time/TimeHistoryPage'));
  const AbsencesYearPage = lazy(() => import('./components/absences/AbsencesYearPage'));
  const VerifyemailPage = lazy(() => import('./components/VerifyemailPage'));

  // Google Analytics
  const { pathname, search } = useLocation();

  const analytics = useCallback(() => {
    AnalyticsTracker({ path: pathname, search: search, title: pathname.split('/')[1] });
  }, [pathname, search]);

  useEffect(() => {
    analytics();
  }, [analytics]);

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />

        <NavigationDrawer>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LinearProgress color="secondary" />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/signin"
              element={
                <Suspense fallback={<LinearProgress color="secondary" />}>
                  <SignInPage />
                </Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <Suspense fallback={<LinearProgress color="secondary" />}>
                  <SignUpPage />
                </Suspense>
              }
            />
            <Route
              path="/legal/terms"
              element={
                <Suspense fallback={<LinearProgress color="secondary" />}>
                  <TermsPage />
                </Suspense>
              }
            />
            <Route
              path="/legal/policy"
              element={
                <Suspense fallback={<LinearProgress color="secondary" />}>
                  <PolicyPage />
                </Suspense>
              }
            />
            <Route
              path="/verifyemail"
              element={
                <Suspense fallback={<LinearProgress color="secondary" />}>
                  <VerifyemailPage />
                </Suspense>
              }
            />
            <Route
              path="/time/view"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LinearProgress color="secondary" />}>
                    <TimeHistoryPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/absences/view"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LinearProgress color="secondary" />}>
                    <AbsencesYearPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/time/add"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LinearProgress color="secondary" />}>
                    <TimeInputPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/time/edit/:day"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LinearProgress color="secondary" />}>
                    <TimeEditPage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<LinearProgress color="secondary" />}>
                    <ProfilePage />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Routes>
        </NavigationDrawer>
        <A2HSInstaller />
      </ThemeProvider>
    </>
  );
};

export default App;

import { Route, Routes } from 'react-router-dom';
import NavigationDrawer from './components/NavigationDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Policy from './pages/legal/Policy';
import Terms from './pages/legal/Terms';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Add from './pages/time/Add';
import View from './pages/time/Views';

const App = () => {
  return (
    <>
      <NavigationDrawer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/legal/terms" element={<Terms />} />
          <Route path="/legal/policy" element={<Policy />} />

          <Route
            path="/time/view"
            element={
              <ProtectedRoute>
                <View />
              </ProtectedRoute>
            }
          />
          <Route
            path="/time/add"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </NavigationDrawer>
    </>
  );
};

export default App;

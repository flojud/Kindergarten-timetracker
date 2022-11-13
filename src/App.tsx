import { Route, Routes } from 'react-router-dom';
import NavigationDrawer from './components/menu/NavigationDrawer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/Home';
import Policy from './components/legal/Policy';
import Terms from './components/legal/Terms';
import Profile from './components/settings/Profile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Add from './components/time/Add';
import View from './components/time/Views';

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

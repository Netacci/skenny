import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { ROUTES } from './utils/routes.js';

const App = () => {
  const HomePage = lazy(() => import('./pages/Home/HomePage'));
  const About = lazy(() => import('./pages/About/About'));
  const Properties = lazy(() => import('./pages/Properties/AllProperties'));
  const Property = lazy(() => import('./pages/Properties/Property'));
  const Contact = lazy(() => import('./pages/Contact/Contact'));
  const Register = lazy(() =>
    import('./pages/RealtorAuth/Register/Register.jsx')
  );
  const Login = lazy(() => import('./pages/RealtorAuth/Login/Login.jsx'));
  const AddNewListing = lazy(() =>
    import('./pages/Realtor/AddNewListing/AddNewListing.jsx')
  );
  const RealtorProperties = lazy(() =>
    import('./pages/Realtor/RealtorProperties/RealtorProperties.jsx')
  );
  const RealtorProperty = lazy(() =>
    import('./pages/Realtor/RealtorProperties/RealtorProperty.jsx')
  );
  const RealtorProfile = lazy(() =>
    import('./pages/Realtor/RealtorProfile/RealtorProfile.jsx')
  );
  const Settings = lazy(() => import('./pages/Realtor/Settings/Settings.jsx'));
  const ConfirmEmail = lazy(() =>
    import('./pages/RealtorAuth/Register/ConfirmEmail.jsx')
  );
  const ForgotPassword = lazy(() =>
    import('./pages/RealtorAuth/Login/ForgotPassword.jsx')
  );
  const ResetPassword = lazy(() =>
    import('./pages/RealtorAuth/Login/ResetPassword.jsx')
  );

  const Checkout = lazy(() => import('./pages/Checkout/Checkout'));

  return (
    <>
      <Routes>
        <Route
          path={ROUTES.register}
          element={
            <Suspense>
              <Register />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.confirmEmail}
          element={
            <Suspense>
              <ConfirmEmail />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.profile}
          element={
            <Suspense>
              <PrivateRoute>
                <RealtorProfile />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path={ROUTES.settings}
          element={
            <Suspense>
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path={ROUTES.addNewListing}
          element={
            <Suspense>
              <PrivateRoute>
                <AddNewListing />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path={ROUTES.realtorsProperties}
          element={
            <Suspense>
              <PrivateRoute>
                <RealtorProperties />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path='/realtor-properties/:id'
          element={
            <Suspense>
              <PrivateRoute>
                <RealtorProperty />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path='/checkout'
          element={
            <Suspense>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.login}
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.forgot_password}
          element={
            <Suspense>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.reset_password}
          element={
            <Suspense>
              <ResetPassword />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.home}
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.about}
          element={
            <Suspense>
              <About />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.properties}
          element={
            <Suspense>
              <Properties />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.property}
          element={
            <Suspense>
              <Property />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.contact}
          element={
            <Suspense>
              <Contact />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;

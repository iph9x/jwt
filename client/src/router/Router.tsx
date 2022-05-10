import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage, MainPage, RegistrationPage } from 'src/pages';
import { ROUTES } from 'src/shared/constants';
import { useAppSelector } from 'src/store/store';

import PrivateRoute from './private-route';

const Router: React.VFC = () => {
  const { email } = useAppSelector((store) => store.userReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.root}
          element={
            <PrivateRoute redirectPath={ROUTES.login} isAllowed={!!email}>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.login}
          element={
            <PrivateRoute redirectPath={ROUTES.root} isAllowed={!email}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.registration}
          element={
            <PrivateRoute redirectPath={ROUTES.root} isAllowed={!email}>
              <RegistrationPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.root} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

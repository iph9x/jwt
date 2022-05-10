import { FC } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  isAllowed: boolean;
  redirectPath: string;
  children: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { isAllowed, redirectPath, children } = props;

  if (isAllowed) {
    return children ? children : <Outlet />;
  }

  return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;

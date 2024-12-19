import {Navigate} from 'react-router-dom';
import { AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  autorizationStatus: AuthorizationStatus;
}

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {children, autorizationStatus} = props;

  return (
    autorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login'/>

  );

}


export default PrivateRoute;

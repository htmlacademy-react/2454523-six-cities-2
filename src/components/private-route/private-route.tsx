import {Navigate} from 'react-router-dom';
import { AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const autorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    autorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to = '/login'/>

  );

}


export default PrivateRoute;

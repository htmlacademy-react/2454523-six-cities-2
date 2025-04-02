import Logo from '../logo/logo';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus} from '../../const';
import HeaderNavAuth from './header-nav-auth';
import HeaderNavNoAuth from './header-nav-noAuth';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { getEmail } from '../../services/email';


function Header () :JSX.Element {

  const autorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getEmail);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo/>
          {autorizationStatus === AuthorizationStatus.Auth ? <HeaderNavAuth userEmail={userEmail}/> : <HeaderNavNoAuth/> }
        </div>
      </div>
    </header>
  );
}

export default Header;

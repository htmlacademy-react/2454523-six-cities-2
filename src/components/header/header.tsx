import Logo from '../logo/logo';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus} from '../../const';
import HeaderNavAuth from './header-nav-auth';
import HeaderNavNoAuth from './header-nav-noAuth';


function Header () :JSX.Element {

  const autorizationStatus = useAppSelector((state)=>state.authorizationStatus);
  const userEmail = useAppSelector((state)=> state.userEmail);

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

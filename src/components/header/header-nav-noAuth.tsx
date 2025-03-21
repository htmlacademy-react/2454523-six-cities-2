import { Link } from 'react-router-dom';

function HeaderNavNoAuth () : JSX.Element{
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to='/login'>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    </nav>);

}

export default HeaderNavNoAuth;

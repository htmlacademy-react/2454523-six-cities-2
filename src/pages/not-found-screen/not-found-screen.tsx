import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';

function NotFoundScreen (): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="page__not-found-container container">
          <section className="not-found">
            <h1 style={{
              color: 'red'
            }}
            >404 Not Found
            </h1>
            <Link to="/">Вернуться на главную</Link>
          </section>

        </div>
      </main>
    </div>
  );

}

export default NotFoundScreen;
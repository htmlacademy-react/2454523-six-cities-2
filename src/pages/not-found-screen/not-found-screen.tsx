import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import styles from '../not-found-screen/not-found-screen.module.css';
import { Helmet } from 'react-helmet-async';

function NotFoundScreen (): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Six cities. Not found.</title>
      </Helmet>
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
            <h1 className={styles.title}>404 Not Found
            </h1>
            <Link to="/" className={styles.link}>Вернуться на главную</Link>
          </section>

        </div>
      </main>
    </div>
  );

}

export default NotFoundScreen;

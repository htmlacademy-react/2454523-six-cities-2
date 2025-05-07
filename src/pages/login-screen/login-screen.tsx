import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useRef, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction, clearErrorAction } from '../../store/api-actions';
import { setError } from '../../store/error/error-slice';
import { AppRoute, AuthorizationStatus, CITIES } from '../../const';
import { isValidPassword } from '../../utils/validatePassword';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { changeCity } from '../../store/filters/filters-slice';


function LoginScreen () :JSX.Element {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth){
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSelectCity = (city: string) => {
    dispatch(changeCity(city));
  };

  function getRandomCity(cities: string[]) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }

  const randomCity = getRandomCity(CITIES);


  const handleSubmit = (evt: FormEvent<HTMLFormElement>)=> {
    evt.preventDefault();

    if(emailRef.current !== null && passwordRef.current !== null){
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const passwordIsValid = isValidPassword(password);


      if (!passwordIsValid) {
        dispatch(setError('Пароль должен содержать хотя бы одну букву и цифру'));
        dispatch(clearErrorAction());
        return;
      }

      dispatch(loginAction({
        email: email,
        password
      }));
    }

  };


  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Six cities. Authentication.</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit = {handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email" name="email"
                  placeholder="Email"
                  required
                  data-testid="loginElement"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref = {passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  data-testid = 'passwordElement'
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="/"
                onClick={()=> handleSelectCity(randomCity)}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );

}

export default LoginScreen;

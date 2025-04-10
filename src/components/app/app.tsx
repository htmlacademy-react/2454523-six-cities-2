import MainScreen from '../../pages/main-screen/main-screen';
import { Routes, Route } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useEffect } from 'react';
import { fetchOffersAction, checkAuthAction, fetchFavoritesOffersAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import FetchingError from '../error-message/fetching-error';
import { getIsOffersDataLoading } from '../../store/offers/offers-selectors';
import { getIsOffersFetchingError } from '../../store/offers/offers-selectors';

function App (): JSX.Element {
  const dispatch = useAppDispatch();
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  useEffect(()=> {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesOffersAction());

  }, [dispatch]);

  const isOffersFetchingError = useAppSelector(getIsOffersFetchingError);

  if (isOffersFetchingError) {
    return (
      <FetchingError/>
    );
  }

  if (isOffersDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return(
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element = {<MainScreen />}/>
            <Route path = {AppRoute.Favorites} element = {
              <PrivateRoute>
                <FavoriteScreen/>
              </PrivateRoute>
            }
            />
            <Route path = {AppRoute.Login} element = {<LoginScreen/>}/>
            <Route path={`${AppRoute.Offer}/:offerId`} element={
              <OfferScreen/>
            }
            />

          </Route>
          <Route path='*' element ={<NotFoundScreen/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );

}

export default App;

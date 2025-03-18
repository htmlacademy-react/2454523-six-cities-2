import MainScreen from '../../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useEffect } from 'react';
import { fetchOffersAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';


function App (): JSX.Element {
  const dispatch = useAppDispatch();
  const isOffersDataLoading = useAppSelector((state)=> state.isOffersDataLoading);

  useEffect(()=> {
    dispatch(fetchOffersAction());
  }, [dispatch]);


  if (isOffersDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element = {<MainScreen />}/>
            <Route path = {AppRoute.Favorites} element = {
              <PrivateRoute autorizationStatus={AuthorizationStatus.Auth}>
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
      </BrowserRouter>
    </HelmetProvider>
  );

}

export default App;

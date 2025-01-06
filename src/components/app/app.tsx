import MainScreen from '../../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { OfferDetails, Offers } from '../../types/offer';
import { Reviews } from '../../types/review';

type AppProps = {
  rentalOffersCount: number;
  offers:Offers;
  offerDetails: OfferDetails;
  reviews: Reviews;
}

function App ({rentalOffersCount, offers, offerDetails, reviews}: AppProps): JSX.Element {
  return(
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main}>
            <Route index element = {<MainScreen rentalOffersCount = {rentalOffersCount} />}/>
            <Route path = {AppRoute.Favorites} element = {
              <PrivateRoute autorizationStatus={AuthorizationStatus.Auth}>
                <FavoriteScreen/>
              </PrivateRoute>
            }
            />
            <Route path = {AppRoute.Login} element = {<LoginScreen/>}/>
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen />} />

          </Route>
          <Route path='*' element ={<NotFoundScreen/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );

}

export default App;

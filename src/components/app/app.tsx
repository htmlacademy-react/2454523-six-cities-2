import MainScreen from '../../pages/main-screen/main-screen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
  rentalOffersCount: number;
}

function App ({rentalOffersCount}: AppProps): JSX.Element {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element = {<MainScreen rentalOffersCount = {rentalOffersCount} />}/>
          <Route path = {AppRoute.Favorites} element = {
            <PrivateRoute autorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoriteScreen/>
            </PrivateRoute>
          }
          />
          <Route path = {AppRoute.Login} element = {<LoginScreen/>}/>
          <Route path = {AppRoute.Offer} element = {<OfferScreen/>}>
            <Route path=':id' element = {<OfferScreen/>}/>
          </Route>
        </Route>
        <Route path='*' element ={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import OffersList from './offers-list';
import Map from '../../components/map/map';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesTabs from './cities-tabs';
import { CITIES, СITIES_COORDS } from '../../const';
import { changeCity, fetchOffers } from '../../store/action';
import { getOffersByCity, getCityCoords } from '../../utils/utils';
import SortingOptions from '../../components/sorting/sortingOptions';


function MainScreen (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);


  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );
  const handleOffersListHover = (offerId: string) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  const handleClickCities = (city: string) => {
    dispatch(changeCity(city));
  };

  const offersByCity = getOffersByCity(offers, currentCity);
  const cityCoords = getCityCoords(СITIES_COORDS, currentCity);

  useEffect(()=> {
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities. Main.</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesTabs cities = {CITIES} onClick={handleClickCities}/>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>

              <SortingOptions/>


              <OffersList offers = {offersByCity}
                onOffersListHover = {handleOffersListHover}

              />

            </section>
            <div className="cities__right-section">
              <Map
                block = "cities"
                location = {cityCoords}
                offers = {offersByCity}
                selectedOffer = {selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;

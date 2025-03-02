//import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Offers, Offer } from '../../types/offer';
import OffersList from './offers-list';
import Map from '../../components/map/map';
import { AMSTERDAM_CENTER_COORDS } from '../../mocks/offers';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesTabs from './cities-tabs';
import { CITIES } from '../../const';
import { changeCity } from '../../store/action';

type MainScreenProps = {
  offers: Offers;
}

function MainScreen ({offers}: MainScreenProps): JSX.Element {

  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

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
              <b className="places__found">312 places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>


              <OffersList offers = {offers}
                onOffersListHover = {handleOffersListHover}
              />

            </section>
            <div className="cities__right-section">
              <Map
                block = "cities"
                location = {AMSTERDAM_CENTER_COORDS}
                offers = {offers}
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

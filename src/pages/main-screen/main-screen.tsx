import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import OffersList from './offers-list';
import Map from '../../components/map/map';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CitiesTabs from './cities-tabs';
import { CITIES, СITIES_COORDS } from '../../const';
import { getOffersByCity, getCityCoords } from '../../utils/utils';
import SortingOptions from '../../components/sorting/sorting-options';
import { sortOffers } from '../../utils/sortOffers';
import MainEmptyScreen from './main-empty-screen';
import { getCity, getSortType } from '../../store/filters/filters-selectors';
import { getOffers } from '../../store/offers/offers-selectors';
import { changeCity, changeSortOptions } from '../../store/filters/filters-slice';
import { useMemo } from 'react';


function MainScreen (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getSortType);


  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );
  const handleOfferHover = useCallback((offerId: string) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  }, [offers]);


  const handleCityClick = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const handleSortTypeClick = useCallback((sortType: string)=> {
    dispatch(changeSortOptions(sortType));
  }, [dispatch]);

  const offersByCity = getOffersByCity(offers, currentCity);

  const sortingOffers = useMemo(() => sortOffers(offersByCity, currentSortType), [offersByCity, currentSortType]);

  if(offersByCity.length === 0){
    return <MainEmptyScreen/>;
  }

  const cityCoords = getCityCoords(СITIES_COORDS, currentCity);


  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities. Main.</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesTabs cities = {CITIES} onCityClick={handleCityClick} currentCity = {currentCity}/>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>

              <SortingOptions onSortTypeClick = {handleSortTypeClick}/>


              <OffersList offers = {sortingOffers}
                onOfferHover = {handleOfferHover}

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

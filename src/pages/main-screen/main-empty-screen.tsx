import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import CitiesTabs from './cities-tabs';
import { CITIES } from '../../const';
import { changeCity } from '../../store/filters/filters-slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity } from '../../store/filters/filters-selectors';


function MainEmptyScreen() : JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities. Main-empty.</title>
      </Helmet>
      <Header/>

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs cities = {CITIES} onCityClick={handleCityClick} currentCity={currentCity}/>

        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainEmptyScreen;

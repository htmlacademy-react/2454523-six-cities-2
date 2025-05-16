/* eslint-disable react-refresh/only-export-components */

import { Link } from 'react-router-dom';
import { memo } from 'react';

type CitiesTabsProps = {
cities: string[];
onCityClick: (city: string) => void;
currentCity: string;
}

function CitiesTabs ({cities, currentCity, onCityClick}: CitiesTabsProps) : JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city)=> {
            const isActiveCity = currentCity === city;
            const keyValue = `${city}-tab`;
            return (
              <li key ={keyValue}
                className="locations__item"
                onClick = {() => onCityClick(city)}
              >
                <Link className={`locations__item-link tabs__item ${
                  isActiveCity ? 'tabs__item--active' : ''}
                }`} to="/"
                >
                  <span>{city}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}


export default memo(CitiesTabs);

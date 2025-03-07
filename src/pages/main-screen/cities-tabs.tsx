
import { Link } from 'react-router-dom';

type CitiesTabsProps = {
cities: string[];
onClick: (city: string) => void;
}

function CitiesTabs ({cities, onClick}: CitiesTabsProps) : JSX.Element {

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city)=> {
            const keyValue = `${city}-tab`;
            return (
              <li key ={keyValue}
                className="locations__item"
                onClick = {() => onClick(city)}
              >
                <Link className="locations__item-link tabs__item" to="/">
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

export default CitiesTabs;

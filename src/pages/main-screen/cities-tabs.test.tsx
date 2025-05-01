import { render, screen} from '@testing-library/react';
import { withHistory } from '../../utilsMocks/mock-component';
import userEvent from '@testing-library/user-event';
import CitiesTabs from './cities-tabs';
import { CITIES } from '../../const';


describe('CitiesTabs', ()=> {

  const onCitySelect = vi.fn();

  it('should render correctly', () => {
    const activeCity = 'Paris';

    const withHistoryComponent = withHistory(<CitiesTabs cities = {CITIES} currentCity ={activeCity} onCitySelect={onCitySelect} />);

    render(withHistoryComponent);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });

    const activeLink = screen.getByText(activeCity).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');

  });

  it('should calls onCitySelect when clicking on a tab', async () => {
    const activeFirstCity = 'Paris';
    const activeSecondCity = 'Amsterdam';

    const withHistoryComponent = withHistory(<CitiesTabs cities = {CITIES} currentCity ={activeFirstCity} onCitySelect={onCitySelect} />);

    render(withHistoryComponent);

    await userEvent.click(screen.getByText(activeFirstCity));
    expect(onCitySelect).toHaveBeenCalledTimes(1);
    expect(onCitySelect).toHaveBeenCalledWith(activeFirstCity);

    await userEvent.click(screen.getByText(activeSecondCity));
    expect(onCitySelect).toHaveBeenCalledTimes(2);
    expect(onCitySelect).toHaveBeenCalledWith(activeSecondCity);

  });
});

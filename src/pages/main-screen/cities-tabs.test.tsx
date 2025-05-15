import { render, screen} from '@testing-library/react';
import { withHistory } from '../../utils-mocks/mock-component';
import userEvent from '@testing-library/user-event';
import CitiesTabs from './cities-tabs';
import { CITIES } from '../../const';


describe('CitiesTabs', ()=> {

  const onCitySelectClick = vi.fn();

  it('should render correctly', () => {
    const activeCity = 'Paris';

    const withHistoryComponent = withHistory(<CitiesTabs cities = {CITIES} currentCity ={activeCity} onCityClick={onCitySelectClick} />);

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

    const withHistoryComponent = withHistory(<CitiesTabs cities = {CITIES} currentCity ={activeFirstCity} onCityClick={onCitySelectClick} />);

    render(withHistoryComponent);

    await userEvent.click(screen.getByText(activeFirstCity));
    expect(onCitySelectClick).toHaveBeenCalledTimes(1);
    expect(onCitySelectClick).toHaveBeenCalledWith(activeFirstCity);

    await userEvent.click(screen.getByText(activeSecondCity));
    expect(onCitySelectClick).toHaveBeenCalledTimes(2);
    expect(onCitySelectClick).toHaveBeenCalledWith(activeSecondCity);

  });
});

import Logo from './logo';
import { withHistory } from '../../utils-mocks/mock-component';
import { screen, render } from '@testing-library/react';

describe('Logo', ()=> {

  it('should render correctly', ()=> {
    const expectedAltText = '6 cities logo';

    const preparedComponent = withHistory(<Logo/>);


    render(preparedComponent);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(screen.getByRole('link')).toHaveClass('header__logo-link');
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toHaveClass('header__logo');

  });
});

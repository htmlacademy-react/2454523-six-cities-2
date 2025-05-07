import FavoriteEmptyScreen from './favorite-empty-screen';
import { screen, render } from '@testing-library/react';
import { withHistory } from '../../utilsMocks/mock-component';
import { vi } from 'vitest';

vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header-mock" />
}));

describe('FavoriteEmptyScreen', ()=> {

  it('should render correctly', ()=> {
    const expectedHeaderText = 'Favorites (empty)';
    const expectedText = 'Nothing yet saved.';
    const expectedLongText = 'Save properties to narrow down search or plan your future trips.';
    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<FavoriteEmptyScreen/>);


    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLongText)).toBeInTheDocument();
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('footer__logo-link');
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();

  });
});

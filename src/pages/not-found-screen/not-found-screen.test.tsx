import NotFoundScreen from './not-found-screen';
import { screen, render } from '@testing-library/react';
import { withHistory } from '../../utilsMocks/mock-component';
import { vi } from 'vitest';


vi.mock('../../components/header/header', () => ({
  default: () => <div data-testid="header-mock" />
}));

describe('NotFoundScreen', ()=> {

  it('should render correctly', ()=> {

    const expectedHeaderText = '404 Not Found';
    const preparedComponent = withHistory(<NotFoundScreen/>);

    render(preparedComponent);

    expect(screen.getByText(expectedHeaderText)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Вернуться на главную');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});

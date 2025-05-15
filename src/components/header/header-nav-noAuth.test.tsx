import HeaderNavNoAuth from './header-nav-noAuth';
import { withHistory } from '../../utils-mocks/mock-component';
import { screen, render } from '@testing-library/react';

describe('HeaderNavnoAuth', ()=> {

  it('should render correctly', ()=> {
    const expectedText = 'Sign in';
    const preparedComponent = withHistory(<HeaderNavNoAuth/>);


    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();

  });
});

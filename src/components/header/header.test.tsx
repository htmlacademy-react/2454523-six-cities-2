import { render, screen} from '@testing-library/react';
import { withStore } from '../../utils-mocks/mock-component';
import Header from './header';
import { makeFakeStore } from '../../utils-mocks/mocks';
import { vi } from 'vitest';
import { AuthorizationStatus } from '../../const';

vi.mock('../logo/logo', () => ({
  default: () => <div data-testid="logo-mock" />
}));

vi.mock('./header-nav-auth', () => ({
  default: () => <span>test@mail.ru</span>
}));

vi.mock('./header-nav-noAuth', () => ({
  default: () => <span>Sign in</span>
}));


describe('Header', ()=> {

  it('should render correctly when "AuthorizationStatus.Auth" ', ()=> {
    const { withStoreComponent} = withStore(
      <Header/>,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userEmail: 'test@mail.ru',
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId('logo-mock')).toBeInTheDocument();
    expect(screen.getByText('test@mail.ru')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();

  });
  it('should render correctly when "AuthorizationStatus.NoAuth" ', ()=> {
    const { withStoreComponent} = withStore(
      <Header/>,
      makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: null,
        }
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId('logo-mock')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('test@mail.ru')).not.toBeInTheDocument();

  });

});
